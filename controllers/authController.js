import * as authService from '../services/authService.js';

//Controla o registro do usuário
export const register = async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        await authService.register(email, password)
        res.status(201).json({ message: 'Usuário registrado com sucesso!'})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

//Controla o login do usuário
export const login = async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const token = await authService.login(email, password)
        res.json({ token })
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}