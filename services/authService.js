import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

const SECRETKEY = process.env.JWT_KEY;

// Serviço de registro de usuário
export const register = async (email, password) => {
  const existUser = await userRepository.findByEmail(email);
  if (existUser) {
    throw new Error('E-mail já cadastrado!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userRepository.createUser({
    email,
    password: hashedPassword,
    balance: 0,
  });
};

// Serviço de login de usuário
export const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('E-mail ou senha inválidos!');
  }

  const token = jwt.sign({ email: user.email }, SECRETKEY, { expiresIn: '7d' });
  return token;
};
