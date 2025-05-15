# Task Manager - To-do List - Full Stack Project

Projeto full stack para gerenciamento de tarefas, construída com Node.js, Express, React e TypeScript.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **TypeScript**: Superset tipado do JavaScript
- **Supabase**: Banco de dados PostgreSQL como serviço
- **Swagger**: Documentação da API

### Frontend
- **React 19**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado do JavaScript
- **Vite**: Ferramenta de build rápida para desenvolvimento web
- **Zustand**: Biblioteca de gerenciamento de estado
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Headless UI**: Componentes acessíveis sem estilo
- **Jest**: Framework de testes JavaScript
- **React Testing Library**: Biblioteca para testar componentes React

## Telas Disponíveis

- **Login**: Autenticação de usuários.
- **Registro de Usuário**: Criação de nova conta.
- **Recuperação de Senha**: Solicitação de redefinição de senha por email.
- **Reset de Senha**: Definição de nova senha a partir do link enviado por email.
- **Área Logada**: Gerenciamento de tarefas.

## Funcionalidades de Autenticação

- O reset de senha é feito por email enviado pelo Supabase. O usuário recebe um link para redefinir sua senha.
- Cada usuário pode ter até **50 tarefas ativas** (não deletadas). Ao atingir esse limite, não será possível adicionar novas tarefas até que alguma seja removida.
- Na área logada, há uma barra de navegação exibindo o nome do usuário (email) e um botão de logout para encerrar a sessão.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)
- Conta no Supabase

## Configuração do Ambiente

### Backend

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
6. Para mais detalhes, consulte o [README do backend](./backend/README.md)

### Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Para mais detalhes, consulte o [README do frontend](./frontend/README.md)

## Executando a Aplicação

### Executando Backend e Frontend Separadamente

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Executando Backend e Frontend Juntos

O projeto já está configurado com concurrently para executar tanto o backend quanto o frontend com um único comando:

```bash
npm run dev
```

Após executar o comando, o backend estará disponível em `http://localhost:3001` e o frontend em `http://localhost:3000`.

> **Nota:** Se você estiver executando o projeto pela primeira vez, certifique-se de instalar as dependências tanto no diretório raiz quanto nos diretórios `frontend` e `backend` usando `npm install`.

## Variáveis de Ambiente

### Backend

```env
# Supabase Configuration
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-anon-key"

# Environment
NODE_ENV="development"

# Server Configuration (opcional)
PORT=3001
```

### Frontend

```env
# API URL
VITE_API_URL="http://localhost:3001/api"
```

## Scripts Disponíveis

### Backend

- **Desenvolvimento**:
  ```bash
  npm run dev
  ```
  Inicia o servidor em modo de desenvolvimento

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

### Frontend

- **Desenvolvimento**:
  ```bash
  npm run dev
  ```
  Inicia o servidor de desenvolvimento Vite

- **Build**:
  ```bash
  npm run build
  ```
  Compila o projeto para produção

- **Testes**:
  ```bash
  npm test
  ```
  Executa os testes com Jest

- **Testes com Watch**:
  ```bash
  npm run test:watch
  ```
  Executa os testes em modo watch

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend**: Contém a API REST e a lógica de negócio. Para detalhes sobre a estrutura de pastas e arquivos, consulte o [README do backend](./backend/README.md).

- **Frontend**: Contém a interface do usuário. Para detalhes sobre a estrutura de pastas e arquivos, consulte o [README do frontend](./frontend/README.md).

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

## Documentação da API (Swagger)

A documentação completa da API está disponível através do Swagger UI:

1. Inicie o servidor backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Acesse a documentação do Swagger no seu navegador:
   ```
   http://localhost:3001/api-docs
   ```

3. Na interface do Swagger, você pode:
   - Visualizar todos os endpoints disponíveis
   - Ver os parâmetros necessários para cada endpoint
   - Testar os endpoints diretamente na interface
   - Verificar os modelos de dados e respostas

## Funcionalidades do Frontend

- **Login**: Autenticação de usuários.
- **Registro de Usuário**: Criação de nova conta.
- **Recuperação de Senha**: Solicitação de redefinição de senha por email.
- **Reset de Senha**: Definição de nova senha a partir do link enviado por email.
- **Área Logada**: Gerenciamento de tarefas.
- **Adicionar Tarefas:** Adicione novas tarefas.
- **Remover Tarefas:** Remova tarefas que não são mais necessárias.
- **Alternar Status de Tarefa:** Marque tarefas como concluídas ou pendentes.
- **Editar Tarefas:** Edite o conteúdo das tarefas existentes.
- **Ordenação de Tarefas:** Ordene as tarefas por:
  - Data de criação (padrão)
  - Ordem alfabética
  - Status pendente
  - Status concluído
- **Estatísticas de Tarefas:** Visualize estatísticas como o número total de tarefas, tarefas pendentes e tarefas concluídas.
- **Interface Responsiva:** A aplicação é projetada para funcionar bem em diferentes tamanhos de tela.
- **Barra de Navegação:** Na área logada, exibe o nome do usuário (email) e botão de logout.

## Boas Práticas

- Código TypeScript com tipagem estrita
- Arquitetura em camadas (Controller -> Service -> Repository)
- Tratamento centralizado de erros
- Validações de entrada
- Documentação com Swagger
- Soft delete para exclusão de registros
- Componentes React reutilizáveis
- Estado gerenciado com Zustand
- Estilização com Tailwind CSS

---

# Task Manager - To-do List - Full Stack Project - English

Full stack project for task management, built with Node.js, Express, React and TypeScript.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **Supabase**: PostgreSQL database as a service
- **Swagger**: API documentation

### Frontend
- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Vite**: Fast build tool for modern web development
- **Zustand**: Simple state management library
- **Tailwind CSS**: Utility CSS framework for styling
- **Headless UI**: Unstyled, accessible components
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing library for React

## Available Screens

- **Login**: User authentication.
- **User Registration**: Create a new account.
- **Password Recovery**: Request password reset via email.
- **Password Reset**: Set a new password using the link sent by email.
- **Logged Area**: Task management.

## Authentication Features

- Password reset is performed via email sent by Supabase. The user receives a link to reset their password.
- Each user can have up to **50 active tasks** (not deleted). When this limit is reached, no new tasks can be added until some are removed.
- In the logged area, there is a navigation bar displaying the user's name (email) and a logout button to end the session.

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Supabase account

## Environment Setup

### Backend

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
6. For more details, check the [backend README](./backend/README.md)

### Frontend

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. For more details, check the [frontend README](./frontend/README.md)

## Running the Application

### Running Backend and Frontend Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Running Backend and Frontend Together

The project is already configured with concurrently to run both backend and frontend with a single command:

```bash
npm run dev
```

After executing the command, the backend will be available at `http://localhost:3001` and the frontend at `http://localhost:3000`.

> **Note:** If you are running the project for the first time, ensure to install dependencies in both the root directory and the `frontend` and `backend` directories using `npm install`.

## Environment Variables

### Backend

```env
# Supabase Configuration
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-anon-key"

# Environment
NODE_ENV="development"

# Server Configuration (optional)
PORT=3001
```

### Frontend

```env
# API URL
VITE_API_URL="http://localhost:3001/api"
```

## Available Scripts

### Backend

- **Development**:
  ```bash
  npm run dev
  ```
  Starts the server in development mode

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

### Frontend

- **Development**:
  ```bash
  npm run dev
  ```
  Starts the Vite development server

- **Build**:
  ```bash
  npm run build
  ```
  Compiles the project for production

- **Tests**:
  ```bash
  npm test
  ```
  Runs tests with Jest

- **Tests with Watch**:
  ```bash
  npm run test:watch
  ```
  Runs tests in watch mode

## Project Structure

The project is divided into two main parts:

- **Backend**: Contains the REST API and business logic. For details about the folder and file structure, check the [backend README](./backend/README.md).

- **Frontend**: Contains the user interface. For details about the folder and file structure, check the [frontend README](./frontend/README.md).

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

## API Documentation (Swagger)

Complete API documentation is available through Swagger UI:

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Access the Swagger documentation in your browser:
   ```
   http://localhost:3001/api-docs
   ```

3. In the Swagger interface, you can:
   - View all available endpoints
   - See the required parameters for each endpoint
   - Test endpoints directly in the interface
   - Check data models and responses

## Frontend Features

- **Login**: User authentication.
- **User Registration**: Create a new account.
- **Password Recovery**: Request password reset via email.
- **Password Reset**: Set a new password using the link sent by email.
- **Logged Area**: Task management.
- **Add Tasks:** Add new tasks.
- **Remove Tasks:** Remove tasks that are no longer needed.
- **Toggle Task Status:** Mark tasks as completed or pending.
- **Edit Tasks:** Edit the content of existing tasks.
- **Task Sorting:** Sort tasks by:
  - Creation date (default)
  - Alphabetical order
  - Pending status
  - Completed status
- **Task Statistics:** View statistics such as the total number of tasks, pending tasks, and completed tasks.
- **Responsive Interface:** The application is designed to work well on different screen sizes.
- **Navigation Bar:** In the logged area, displays the user's name (email) and a logout button.

## Best Practices

- TypeScript code with strict typing
- Layered architecture (Controller -> Service -> Repository)
- Centralized error handling
- Input validations
- Swagger documentation
- Soft delete for record deletion
- Reusable React components
- State managed with Zustand
- Styling with Tailwind CSS

## Imagem / Screenshot
<div style="display: flex; justify-content: center">
  <img src="/frontend/src/assets/print-task-manager.png" width="600px">
</div>
