import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT;

dotenv.config();

app.use(cors())
app.use(express.json())

app.use('/register', registerRoutes)
app.use('/transactions', transactionRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})