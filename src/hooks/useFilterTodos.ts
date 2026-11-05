import { useState, useMemo } from "react";
import type { Status, Priority, Todo } from "../types/todo";

export function useFilterTodos(todos: Todo[]) {
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [filter, setFilter] = useState<Status>("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const filteredTodos = useMemo(() => {
    const result = todos.filter((t) => {
      const matchesSearch = t.todo
        .toLocaleLowerCase()
        .includes(search.trim().toLocaleLowerCase());
      const matchesStatus =
        filter === "completed"
          ? t.completed
          : filter === "active"
            ? !t.completed
            : true;

      const matchesPriority =
        priorityFilter === "high"
          ? t.priority === "high"
          : priorityFilter === "medium"
            ? t.priority === "medium"
            : priorityFilter === "low"
              ? t.priority === "low"
              : true;
      return matchesPriority && matchesSearch && matchesStatus; 
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
