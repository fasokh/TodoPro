import type { Todo } from "../types/todo";

const TODO_STORAGE_KEY = "todos";
const LAST_TODO_ID_KEY = "lastTodoId";

export const getInitialTodos = () => {
  const store = localStorage.getItem(TODO_STORAGE_KEY);
  if (!store) return [];
  try {
    return JSON.parse(store) as Todo[];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
};

export const getLastTodoId = () => {
  const stored = localStorage.getItem(LAST_TODO_ID_KEY);

  if (!stored) return 0;

  try {
    const value = JSON.parse(stored);
    return typeof value === "number" &&
      Number.isFinite(value) &&
      Number.isInteger(value) &&
      value >= 0
      ? value
      : 0;
  } catch {
    return 0;
  }
};

export const saveLastTodoId = (lastTodoId: number) => {
  localStorage.setItem(LAST_TODO_ID_KEY, JSON.stringify(lastTodoId));
};
