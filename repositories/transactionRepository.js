import prisma from '../lib/prisma.js';

//Salva uma transação
export const saveTransaction = async ({type, amount, fromId, toId, date}) => {
    return await prisma.transaction.create({
       data: {
         type,
         amount,
         fromId,
         toId,
         date
        }
    })
};

//Busca transações de um usuário
export const findByUser = async (email) => {
    const user = await prisma.user.findUnique({
       where: { email }
    });
  
    if (!user) throw new Error('Usuário não encontrado');
    
    return await prisma.transaction.findMany({
        where: {
            OR: [
               {fromId: user.id},
               {toId: user.id},
            ],
        },
        orderBy: {
            date: 'desc',
        },
        include: {
            from: { select: { email: true } },
            to: { select: { email: true } }
        }
    });
}