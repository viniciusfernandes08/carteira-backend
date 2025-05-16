import express from 'express';
import * as authController from '../controllers/authController.js'

const router = express.Router()

//Rota para cadastro
router.post('/', authController.register)

//Rota para login
router.post('/login', authController.login)

export default router;