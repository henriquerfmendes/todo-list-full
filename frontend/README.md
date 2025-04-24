# To-Do List - Gerenciador de Tarefas

Uma aplicação moderna de gerenciamento de tarefas construída com React, TypeScript e Tailwind CSS.

## Visão Geral

Este projeto é uma aplicação de gerenciamento de tarefas (To-Do List), projetada para ser intuitiva e eficiente. Ela permite que os usuários gerenciem suas tarefas com facilidade, oferecendo funcionalidades de adição, edição, remoção, marcação de conclusão e ordenação. Os dados são persistidos no armazenamento local do navegador, garantindo que as tarefas sejam mantidas entre as sessões, além de serem sincronizadas com o backend.

## Funcionalidades Principais

-   **Adicionar Tarefas:** Adicione novas tarefas.
-   **Remover Tarefas:** Remova tarefas que não são mais necessárias.
-   **Alternar Status de Tarefa:** Marque tarefas como concluídas ou pendentes.
-   **Editar Tarefas:** Edite as tarefas.
-   **Ordenação de Tarefas:** Ordene as tarefas por:
    -   Data de criação (padrão)
    -   Ordem alfabética
    -   Status pendente
    -   Status concluído
-   **Estatísticas de Tarefas:** Visualize estatísticas como o número total de tarefas, tarefas pendentes e tarefas concluídas.
-   **Armazenamento Persistente:** As tarefas são salvas do navegador, garantindo a persistência dos dados.
-   **Sincronização com o Backend:** As tarefas são sincronizadas com o backend, garantindo que os dados sejam mantidos entre as sessões.
-   **Interface Responsiva:** A aplicação é projetada para funcionar bem em diferentes tamanhos de tela.

## Tecnologias Utilizadas

-   **React 19:** Biblioteca JavaScript para construção de interfaces de usuário.
-   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
-   **Zustand:** Biblioteca de gerenciamento de estado simples e rápida para persistência de dados.
-   **Tailwind CSS:** Biblioteca de estilização.
-   **Vite:** Ferramenta de build rápida para desenvolvimento web moderno.
-   **Headless UI:** Biblioteca de componentes acessíveis.
-   **Jest:** Framework de testes.
-   **React Testing Library:** Biblioteca de testes para React.

## Estrutura do Projeto
```
frontend/
├── public/
├── src/
│   ├── components/           # Componentes de UI
│   │   ├── TaskForm.tsx      # Formulário para adicionar novas tarefas
│   │   ├── TaskItem.tsx      # Componente de tarefa individual
│   │   ├── TaskList.tsx      # Container principal da lista de tarefas
│   │   ├── TaskOrderSelector.tsx # Dropdown de ordenação
│   │   └── TaskStats.tsx     # Componente de estatísticas de tarefas
│   ├── services/             # Serviços de API
│   │   └── api.ts            # Cliente de API
│   ├── store/                # Gerenciamento de estado
│   │   └── useTodoStore.ts   # Store Zustand
│   ├── types/                # Definições de tipos TypeScript
│   └── App.tsx               # Componente principal da aplicação
├── index.html
└── package.json
```

## Pré-requisitos

-   **Node.js:** Versão 18 ou superior
-   **npm:** Versão 9 ou superior (geralmente instalado com Node.js)

## Projeto

O projeto está configurado para rodar na porta 3000 ou 3001, automaticamente, ao rodar o comando:
**npm run dev**

## Instalação e execução do projeto

```
cd frontend
npm install
npm run build
npm run dev
```

## Testes

Para rodar os testes:
- Todos os testes: **npm test** 
- Teste do componente "TaskList": **npm test TaskList** 
- Teste do arquivo "useTodoStore": **npm test useTodoStore**


---

# To-Do List - Task Manager

A modern task management application built with React, TypeScript, and Tailwind CSS.

## Overview

This project is a task management application designed to be intuitive and efficient. It allows users to easily manage their tasks, offering features for adding, editing, removing, marking completion, and sorting. Data is persisted in the browser's local storage, ensuring that tasks are retained between sessions and also synchronized with the backend.

## Key Features

-   **Add Tasks:** Add new tasks.
-   **Remove Tasks:** Remove tasks that are no longer needed.
-   **Edit Tasks:** Edit tasks.
-   **Toggle Task Status:** Mark tasks as completed or pending.
-   **Task Sorting:** Sort tasks by:
    -   Creation date (default)
    -   Alphabetical order
    -   Pending status
    -   Completed status
-   **Task Statistics:** View statistics such as the total number of tasks, pending tasks, and completed tasks.
-   **Persistent Storage:** Tasks are saved in the browser, ensuring data persistence.
-   **Responsive Interface:** The application is designed to work well on different screen sizes.

## Technologies Used

-   **React 19:** JavaScript library for building user interfaces.
-   **TypeScript:** Superset of JavaScript that adds static typing.
-   **Zustand:** Simple and fast state management library.
-   **Tailwind CSS:** Styling library.
-   **Headless UI:** Accessible components library.
-   **Jest:** Testing framework.
-   **React Testing Library:** Testing library for React.
-   **Vite:** Fast build tool for modern web development.

## Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/           # UI components
│   │   ├── TaskForm.tsx      # Form for adding new tasks
│   │   ├── TaskItem.tsx      # Individual task component
│   │   ├── TaskList.tsx      # Main task list container
│   │   ├── TaskOrderSelector.tsx # Sorting dropdown
│   │   └── TaskStats.tsx     # Task statistics component
│   ├── services/             # API services
│   │   └── api.ts            # API client
│   ├── store/                # State management
│   │   └── useTodoStore.ts   # Zustand store
│   ├── types/                # TypeScript type definitions
│   └── App.tsx               # Main application component
├── index.html
└── package.json
```

## Prerequisites

-   **Node.js:** Version 18 or higher
-   **npm:** Version 9 or higher (usually installed with Node.js)

## Project
The project is configured to run on port 3000 or 3001, automatically, when running the command:
**npm run dev**


## Installation and Execution

```
cd frontend
npm install
npm run build
npm run dev
```

## Tests
To run the tests:
- All tests: **npm test**
- "TaskList" component test: **npm test TaskList**
- "useTodoStore" file test: **npm test useTodoStore**

## Imagem / Screenshot
<div style="display: flex; justify-content: center">
  <img src="/src/assets/print-task-manager.png " width="600px">
</div>
