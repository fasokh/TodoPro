# TodoPro

A simple and functional Todo application built with React and TypeScript. It helps users manage their tasks, organize them by priority, and track their progress.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or active
- Search tasks by title
- Filter tasks by status (All, Active, Completed)
- Filter tasks by priority (All, High, Medium, Low)
- Sort tasks alphabetically (A–Z / Z–A)
- Persist tasks using LocalStorage

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Vitest
- React Testing Library

## Project Structure

```text
src/
├── components/
│   └── TodoPro/
│       ├── TodoPro.tsx
│       ├── TodoForm.tsx
│       ├── TodoItem.tsx
│       └── TodoList.tsx
├── hooks/
│   ├── useTodos.ts
│   ├── useTodoForm.ts
│   ├── useFilterTodos.ts
│   └── useTodos.test.ts
├── reducers/
│   ├── todoReducer.ts
│   └── todoReducer.test.ts
├── types/
│   └── todo.ts
└── utils/
    ├── todoStorage.ts
    └── todosStorage.test.ts
```

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd TodoPro
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the project for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Check code quality with ESLint |
| `pnpm test` | Run tests with Vitest |

## Testing

The project includes tests for:

- Todo reducer
- Todo storage utilities
- `useTodos` hook

Run the tests with:

```bash
pnpm test
```

## Preview
- `![TodoPro Preview](public/todopro-preview.png)`

## License

This project is open-source.