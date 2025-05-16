import prisma from '../lib/prisma.js';
import * as userRepository from '../repositories/userRepository.js';
import * as transactionRepository from '../repositories/transactionRepository.js';

// Serviço de depósito
export const deposit = async (email, amount) => {
  if (amount <= 0) throw new Error('O valor do depósito deve ser positivo');

  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Usuário não encontrado!');

  const newBalance = user.balance + amount;
  await userRepository.updateBalance(email, newBalance);

  await transactionRepository.saveTransaction({
    type: 'depósito',
    amount,
    toId: user.id,
    date: new Date(),
  });

  return { balance: newBalance };
};

// Serviço de transferência
export const transfer = async (fromEmail, toEmail, amount) => {
  if (amount <= 0) throw new Error('O valor da transferência deve ser positivo');

  const remetente = await userRepository.findByEmail(fromEmail);
  const destinatario = await userRepository.findByEmail(toEmail);

  if (!remetente || !destinatario) throw new Error('Usuário não encontrado!');
  if (remetente.balance < amount) throw new Error('Saldo insuficiente!');

  const novoSaldoRemetente = remetente.balance - amount;
  const novoSaldoDestinatario = destinatario.balance + amount;

   // Atualiza os saldos
  await userRepository.updateBalance(fromEmail, novoSaldoRemetente);
  await userRepository.updateBalance(toEmail, novoSaldoDestinatario);

  await transactionRepository.saveTransaction({
    type: 'transferência',
    fromId: remetente.id,
    toId: destinatario.id,
    amount,
    date: new Date()
  });

  return { balance: novoSaldoRemetente };
};

// Serviço para listar transações do usuário
export const getUserTransactions = async (email) => {
  return await transactionRepository.findByUser(email);
};

//Serviço para retornar o valor do saldo
export const getBalance = async (email) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Usuário não encontrado');
  return user.balance;
};

//Serviço de reversão da transação
export const reverseTransaction = async (id) => {
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction) throw new Error('Transação não encontrada');
  if (transaction.reversed) throw new Error('Transação já foi revertida');

  if (transaction.type === 'depósito') {
    const user = await userRepository.findById(transaction.toId);

    if (!user || user.balance < transaction.amount) {
      throw new Error('Saldo insuficiente para reverter o depósito');
    }

    await prisma.user.update({
      where: { id: transaction.toId },
      data: { balance: user.balance - transaction.amount }
    });

    await prisma.transaction.create({
      data: {
        type: 'reversão',
        amount: -transaction.amount,
        toId: transaction.toId,
        date: new Date()
      }
    });

  } else if (transaction.type === 'transferência') {
    const remetente = await userRepository.findById(transaction.fromId);
    const destinatario = await userRepository.findById(transaction.toId);

    if (!remetente || !destinatario || destinatario.balance < transaction.amount) {
      throw new Error('Não é possível reverter, saldo insuficiente!');
    }

    await prisma.user.update({
      where: { id: remetente.id },
      data: { balance: remetente.balance + transaction.amount }
    });

    await prisma.user.update({
      where: { id: destinatario.id },
      data: { balance: destinatario.balance - transaction.amount }
    });

    await prisma.transaction.create({
      data: {
        type: 'reversão',
        amount: -transaction.amount,
        fromId: transaction.toId,
        toId: transaction.fromId
      }
    });
  }

  await prisma.transaction.update({
    where: { id },
    data: { reversed: true }
  });

  return { message: 'Transação revertida com sucesso' };
};
