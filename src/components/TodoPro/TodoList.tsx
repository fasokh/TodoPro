import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

type PropFilter = {
  filteredTodos: Todo[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (t: Todo) => void;
};

function TodoList({
  filteredTodos,
  onDelete,
  onEdit,
  onToggle,
}: PropFilter) {
  console.log('TodoList Render')
  return (
    <div>
      {filteredTodos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
