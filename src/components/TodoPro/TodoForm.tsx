import type { Priority, TodoFormType } from "../../types/todo";
import type { Dispatch, SetStateAction } from "react";

type FromTodoProps = {
  onForm: Dispatch<SetStateAction<TodoFormType>>;
  form: TodoFormType;
  editingId: number | null;
  onSave: () => void;
};

const TodoForm = ({ onForm, form, editingId, onSave }: FromTodoProps) => {
  return (
    <div className="flex flex-col gap-8">
      <input
        type="text"
        placeholder="Your Task ..."
        onChange={(e) => onForm((prev) => ({ ...prev, todo: e.target.value }))}
        value={form.todo}
        className="mt-4 outline-none border border-gray-300 rounded-lg p-1"
      />
      <select
        value={form.priority}
        onChange={(e) =>
          onForm((prev) => ({ ...prev, priority: e.target.value as Priority }))
        }
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input
        type="date"
        value={form.date}
        onChange={(e) => onForm((prev) => ({ ...prev, date: e.target.value }))}
      />
      <button
        onClick={onSave}
        className="border-none bg-amber-50 p-2 rounded-lg hover:bg-amber-100 transition-colors mb-1"
      >
        {editingId === null ? "Add" : "Update"}
      </button>
    </div>
  );
};

export default TodoForm;
