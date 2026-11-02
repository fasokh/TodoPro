import type { Todo } from "../../types/todo";
import { memo } from "react";
import { CalendarDays } from "lucide-react";

type ItemProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
};

const TodoItem = memo(function TodoItem({
  todo,
  onDelete,
  onToggle,
  onEdit,
}: ItemProps) {
  return (
    <div className="bg-white rounded-xl p-4 mb-3 flex gap-4 justify-between items-center shadow-sm">
      <span
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <span title={todo.date}>
          <CalendarDays />
        </span>
        <input
          type="checkbox"
          name="completed"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${todo.priority === "high" ? "text-red-700 bg-red-100" : todo.priority === "medium" ? "text-yellow-700 bg-yellow-100" : todo.priority === "low" ? "text-green-700 bg-gray-100" : "bg-white"}`}
        >
          {todo.todo}
        </span>
      </span>
      <span className="flex gap-3">
        <button className="cursor-pointer" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
        <button className="cursor-pointer" onClick={() => onEdit(todo)}>
          Edit
        </button>
      </span>
    </div>
  );
});

export default TodoItem;

//با immutable update، reference آیتم تغییرکرده عوض می‌شود و reference بقیه حفظ می‌شود؛ React.memo می‌تواند از این تفاوت استفاده کند تا رندر غیرضروری آیتم‌های دیگر را رد کند.
//و این همان جایی است که immutability + reference equality + React.memo به هم وصل می‌شوند.
