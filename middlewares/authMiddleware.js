import jwt from 'jsonwebtoken';

const SECRETKEY = process.env.JWT_KEY;

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido!'});

  //Verifica o token
  jwt.verify(token, SECRETKEY, (err, user) => {
    if (err) return res.sendStatus(403); //Se token for inválido
    req.user = user;
    next(); // Continua a requisição
  });
}