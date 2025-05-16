# API de Gerenciamento de Transações Financeiras

API REST para gerenciamento de transações financeiras simples, com funcionalidades de registro, login, depósitos, transferências e reversão de transações.

---

## Tecnologias usadas

- Node.js  
- Express  
- Prisma  
- SQLite  
- JWT para autenticação  
- bcrypt para hash de senhas

---

## Funcionalidades

- Registro e autenticação de usuários com token JWT  
- Depósito em conta  
- Transferência entre usuários  
- Listagem de transações do usuário  
- Reversão de transações com controle de saldo e histórico

---

## Como rodar o projeto localmente

### Pré-requisitos

- Node.js instalado  
- SQLite (configurado automaticamente pelo Prisma)

### Passos

#### 1. Clone o repositório  
   git clone https://github.com/seu-usuario/seu-projeto.git

#### 2.Instale as dependências

  npm install

#### 3. Crie o arquivo .env na raiz com as variáveis:

JWT_KEY=sua_chave_secreta

#### 4. Rode as migrações do Prisma (se aplicável)

npx prisma migrate dev

#### 5. Inicie o servidor

node server.js

O servidor vai rodar na porta 3000 (ou a que você configurou).

---

## Endpoints disponíveis

- POST /register - Registro de usuário

- POST /register/login - Login e geração de token

- POST /transactions/deposit - Depósito em conta (precisa token)

- POST /transactions/transfer - Transferência entre usuários (precisa token)

- GET /transactions - Listar transações do usuário (precisa token)

- POST /transactions/:id/reverse - Reverter transação (precisa token)

---

## Como usar

Para usar as rotas protegidas, envie o token JWT no header:

Authorization: Bearer <token>

---

## Boas práticas implementadas
- Senhas armazenadas com hash usando bcrypt

- Autenticação via JWT com expiração

- Tratamento de erros e validação de dados

- Arquitetura em camadas (routes, controllers, services, repositories)

- Uso do Prisma para segurança

# Autor
**Vinícius Fernandes de Oliveira**
[https://www.linkedin.com/in/vinicius-f-deoliveira]