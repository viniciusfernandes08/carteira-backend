import express from 'express';
import * as transactionController from '../controllers/transactionController.js';
import authenticateToken from '../middlewares/authMiddleware.js'

const router = express.Router()

//Rota para depósito
router.post('/deposit', authenticateToken, transactionController.deposit)

//Rota para transferência
router.post('/transfer', authenticateToken, transactionController.transfer)

//Rota para obter transações do usuário
router.get('/', authenticateToken, transactionController.getUserTransactions)

//Rota para reverter as transações
router.post('/:id/reverse', authenticateToken, transactionController.reverse)

export default router;