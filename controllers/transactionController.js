import * as transactionService from '../services/transactionService.js';

// Controla o depósito
export const deposit = async (req, res) => {
  const { amount } = req.body;
  const { email } = req.user;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ success: false, error: 'O valor do depósito deve ser um número positivo.' });
  }

  try {
    const result = await transactionService.deposit(email, amount);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controla a transferência
export const transfer = async (req, res) => {
  const { to, amount } = req.body;
  const { email } = req.user;

  if (!to || !amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ success: false, error: 'Destinatário e valor válido são obrigatórios.' });
  }

  try {
    const result = await transactionService.transfer(email, to, amount);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Lista as transações do usuário
export const getUserTransactions = async (req, res) => {
  const { email } = req.user;

  try {
    const transactions = await transactionService.getUserTransactions(email);
    const balance = await transactionService.getBalance(email);

    res.status(200).json({ success: true, data: { balance, transactions } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controla a reversão das transações
export const reverse = async (req, res) => {
  const { id } = req.params;
  const transactionId = parseInt(id);

  if (isNaN(transactionId)) {
    return res.status(400).json({ success: false, error: 'ID da transação inválido.' });
  }

  try {
    const result = await transactionService.reverseTransaction(transactionId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
