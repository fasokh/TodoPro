import { useState, useMemo } from "react";
import type { Status, Priority, Todo } from "../types/todo";

export function useFilterTodos(todos: Todo[]) {
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [filter, setFilter] = useState<Status>("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const filteredTodos = useMemo(() => {
    const result = todos.filter((t) => {
      const filterTodo = t.todo
        .toLowerCase()
        .includes(search.toLocaleLowerCase());

      if (filter === "completed") {
        return filterTodo && t.completed;
      }

      if (filter === "active") {
        return filterTodo && !t.completed;
      }

      if (priorityFilter !== "all") {
        return filterTodo && t.priority === priorityFilter;
      }

      return filterTodo;
    });

    result.sort((a: Todo, b: Todo) => {
      return isAscending
        ? a.todo.localeCompare(b.todo)
        : b.todo.localeCompare(a.todo);
    });

    return result;
  }, [todos, filter, search, isAscending, priorityFilter]);
  
  return {
    filteredTodos,
    setSearch,
    setFilter,
    setPriorityFilter,
    setIsAscending,
    search,
    filter,
    priorityFilter,
  };
}

export default useFilterTodos;
