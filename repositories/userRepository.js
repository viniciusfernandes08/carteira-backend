import prisma from '../lib/prisma.js';

//Busca o usuário pelo e-mail
export const findByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {email},
    })
};

//Cria um novo usuário
export const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData,
    })
};

//Atualiza o saldo do usuário
export const updateBalance = async (email, newBalance) => {
    return prisma.user.update({
        where: {email},
        data: {balance: newBalance},
    })
}

//Busca o ID para a reversão
export const findById = async (id) => {
  return await prisma.user.findUnique({ where: { id } });
};