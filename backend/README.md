# To-do API

API REST para gerenciamento de tarefas, construída com Node.js, Express e TypeScript.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **TypeScript**: Superset tipado do JavaScript
- **Supabase**: Banco de dados PostgreSQL como serviço
- **Zod**: Validação de email e senha
- **Swagger**: Documentação da API

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)
- Conta no Supabase

## Configuração do Ambiente

1. Clone o repositório
2. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
5. Preencha o arquivo `.env` com suas credenciais do Supabase

## Variáveis de Ambiente

```env
# Supabase Configuration
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-anon-key"

# Environment
NODE_ENV="development"

# Server Configuration (opcional)
PORT=3001
```

## Scripts Disponíveis

- **Desenvolvimento**:
  ```bash
  npm run dev
  ```
  Inicia o servidor em modo de desenvolvimento com hot-reload

- **Build**:
  ```bash
  npm run build
  ```
  Compila o TypeScript para JavaScript

- **Produção**:
  ```bash
  npm start
  ```
  Inicia o servidor em modo de produção

## Estrutura do Projeto

```
backend/
├── src/
│   ├── config/      # Configurações (Supabase, Swagger)
│   ├── controllers/ # Controladores da API
│   ├── docs/        # Documentação Swagger
│   ├── errors/      # Classe de erro
│   ├── middleware/  # Middlewares Express
│   ├── models/      # Interfaces e tipos
│   ├── repositories/# Camada de acesso a dados
│   ├── routes/      # Rotas da API
│   ├── services/    # Lógica de negócio
│   ├── validations/ # Validações
│   ├── app.ts       # Configuração Express
│   └── server.ts    # Entrada da aplicação
```

## API Endpoints

### Tarefas (To-dos)

- **POST /api/todos**
  - Cria uma nova tarefa
  - Body: `{ "text": "string" }`

- **GET /api/todos**
  - Lista todas as tarefas

- **GET /api/todos/:id**
  - Obtém uma tarefa específica

- **PUT /api/todos/:id**
  - Atualiza uma tarefa
  - Body: `{ "text": "string", "completed": boolean }`

- **DELETE /api/todos/:id**
  - Remove uma tarefa (soft delete)

## Autenticação e Usuários

Esta API utiliza o sistema de autenticação do Supabase. Não há uma tabela explícita de usuários no banco de dados, pois o Supabase já fornece uma tabela `auth.users` integrada que gerencia todos os aspectos de autenticação, incluindo registro, login e gerenciamento de sessões.

## Documentação

A documentação completa da API está disponível em:
http://localhost:3001/api-docs

## Boas Práticas

- Código em TypeScript com tipagem estrita
- Arquitetura em camadas (Controller -> Service -> Repository)
- Tratamento centralizado de erros
- Validações de entrada
- Documentação com Swagger
- Soft delete para exclusão de registros

---

# To-do API

REST API for task management, built with Node.js, Express and TypeScript.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **Supabase**: PostgreSQL database as a service
- **Zod**: Email and password validation
- **Swagger**: API documentation

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Supabase account

## Environment Setup

1. Clone the repository
2. Navigate to backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
5. Fill the `.env` file with your Supabase credentials

## Environment Variables

```env
# Supabase Configuration
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-anon-key"

# Environment
NODE_ENV="development"

# Server Configuration (optional)
PORT=3001
```

## Available Scripts

- **Development**:
  ```bash
  npm run dev
  ```
  Starts the server in development mode with hot-reload

- **Build**:
  ```bash
  npm run build
  ```
  Compiles TypeScript to JavaScript

- **Production**:
  ```bash
  npm start
  ```
  Starts the server in production mode

## Project Structure

```
backend/
├── src/
│   ├── config/      # Configurations (Supabase, Swagger)
│   ├── controllers/ # API Controllers
│   ├── docs/        # Swagger Documentation
│   ├── errors/      # Error Class
│   ├── middleware/  # Express Middlewares
│   ├── models/      # Interfaces and Types
│   ├── repositories/# Data Access Layer
│   ├── routes/      # API Routes
│   ├── services/    # Business Logic
│   ├── validations/ # Validations
│   ├── app.ts       # Express Configuration
│   └── server.ts    # Application Entry
```

## API Endpoints

### Tasks (To-dos)

- **POST /api/todos**
  - Creates a new task
  - Body: `{ "text": "string" }`

- **GET /api/todos**
  - Lists all tasks

- **GET /api/todos/:id**
  - Gets a specific task

- **PUT /api/todos/:id**
  - Updates a task
  - Body: `{ "text": "string", "completed": boolean }`

- **DELETE /api/todos/:id**
  - Removes a task (soft delete)

## Authentication and Users

This API uses Supabase's authentication system. There is no explicit users table in the database, as Supabase already provides an integrated `auth.users` table that manages all authentication aspects, including registration, login, and session management.

## Documentation

Complete API documentation is available at:
http://localhost:3001/api-docs

## Best Practices

- TypeScript code with strict typing
- Layered architecture (Controller -> Service -> Repository)
- Centralized error handling
- Input validations
- Swagger documentation
- Soft delete for record deletion

testing new deploy