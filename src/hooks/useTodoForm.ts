import { useState, useCallback } from "react";
import type { TodoFormType, Todo } from "../types/todo";

function useTodoForm(
  addTodo: (form: TodoFormType) => void,
  updateTodo: (id: number, form: TodoFormType) => void,
) {
  const [form, setForm] = useState<TodoFormType>({
    todo: "",
    date: "",
    priority: "medium",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetTodo = useCallback(() => {
    setForm({ todo: "", priority: "medium", date: "" });
  }, []);

  const edit = useCallback((todo: Todo) => {
    setForm({ todo: todo.todo, priority: todo.priority, date: todo.date });
    setEditingId(todo.id);
  }, []); // چون از setters استفاده کردیم و این ها همیشه ثابت هستند پس نیازی به dependency نیست

  const saveTodo = () => {
    if (form.todo.trim() === "") return;

    if (editingId === null) {
      addTodo(form);
    } else {
      updateTodo(editingId, form);
    }

    setEditingId(null);
    resetTodo();
  }

  return {
    form,
    setForm,
    editingId,
    setEditingId,
    saveTodo,
    edit,
  };
}

export default useTodoForm;
