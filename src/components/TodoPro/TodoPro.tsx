import { type ChangeEventHandler } from "react";
import type { Status, Priority } from "../../types/todo";
import TodoForm from "./TodoForm";
import useTodos from "../../hooks/useTodos";
import useTodoForm from "../../hooks/useTodoForm";
import useFilterTodos from "../../hooks/useFilterTodos";
import TodoList from "./TodoList";

const TodoPro = () => {
  const {
    removeTodo,
    toggleTodo,
    completedCount,
    remainingTodo,
    todos,
    addTodo,
    updateTodo,
  } = useTodos();
  const {
    setFilter,
    search,
    filter,
    setSearch,
    priorityFilter,
    setPriorityFilter,
    setIsAscending,
    filteredTodos,
  } = useFilterTodos(todos);

  const { form, setForm, editingId, saveTodo, edit } = useTodoForm(
    addTodo,
    updateTodo,
  );

  const total = todos.length;

  const selectHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const filteredValue = e.target.value as Status;
    setFilter(filteredValue);
  };

  return (
    <div className="flex flex-col w-full mt-14 gap-6 sm:w-96 sm:mx-auto sm:mt-24 outline-none">
      <div className="md:border border-gray-300 rounded-lg p-6">
        <input
          type="search"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={selectHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <div>Total: {total}</div>
        <div>Completed: {completedCount}</div>
        <div>Remaining: {remainingTodo}</div>
        <TodoForm
          onForm={setForm}
          form={form}
          onSave={saveTodo}
          editingId={editingId}
        />
        <button
          onClick={() => setIsAscending((prev) => !prev)}
          className="border-none bg-amber-50 p-2 flex justify-center items-center mx-auto w-full rounded-lg hover:bg-amber-100 transition-colors"
        >
          Sort A-Z
        </button>
      </div>
      <TodoList
        filteredTodos={filteredTodos}
        onDelete={removeTodo}
        onToggle={toggleTodo}
        onEdit={edit}
      />
    </div>
  );
};

export default TodoPro;

// Lazy Initialization: وقتی مقدار اولیه ارزان است یعنی وقتی
//useState(0)
// useState("")
// useState(false)
// useState([])
// useState({})
//  نیازی نیست از lazy استفاده کنیم
//ولی وقتی مقدار سنگین و نیاز به محاسبه داره مثل:
// useState(() => JSON.parse(localStorage.getItem("todos") ?? "[]"))

// useState(() => expensiveCalculation())

// useState(() => Date.now())
//بهتره از نسخه ها تابعی استفاده کنیم

//خود useMemo هم هزینه دارد (نگهداری cache و مقایسه dependencyها).

//چون useMemo فقط برای محاسبه است، نه تغییر State.
//useMemo با dependency خالی ([]) فقط یک بار تابع را اجرا می‌کند.

//پس useCallback هیچ تأثیری روی رندر شدن TodoPro ندارد
//فقط مرجع تابع رو ثابت نگه میداره
// فقط وقتی که ریکت میاد به رفرنس نگاه میکنه چون میبینه که تغییری نکرده پس دوباره نمیسازتش

//در هر رندر تابع ها دوباره ساخته میشن و شاید در ظاهر فرقی نکنه ولی ادرسش در حافظه فرق میکنه
////React مرجع (Reference) جدیدی می‌بیند، بنابراین از نظر مقایسه Props
//این تابع با تابع قبلی متفاوت است.
//useMemo خودش هم هزینه دارد:

// مقدار قبلی را نگه می‌دارد.
// dependencyها را بررسی می‌کند.
// تصمیم می‌گیرد مقدار قبلی قابل استفاده است یا نه.

// پس برای یک محاسبه خیلی ساده، ممکن است useMemo بیشتر از اینکه کمک کند، کد را پیچیده کند.
//یک قانون خیلی خوب برای ذهنت:

// useCallback برای خود تابع نیست؛ برای reference تابع است.

// یعنی نگو:

// «این تابع مهمه، پس useCallback.»

// بگو:

// «آیا لازم دارم reference این تابع بین renderها ثابت بماند؟»

// اگر جواب نه است → useCallback نزن.

// اگر تابع را به یک memo component می‌دهی یا در dependency یک useMemo/useEffect مهم استفاده می‌کنی → آن موقع بررسی کن که useCallback ارزش دارد یا نه.
// memo فقط وقتی ارزش دارد که:

// والد زیاد re-render شود.
// Child بتواند از re-renderهای غیرضروری جلوگیری کند.
// Props در بسیاری از renderها ثابت بمانند.
//useMemo      → حفظ Reference یک مقدار محاسبه‌شده
// useCallback  → حفظ Reference یک تابع
// memo         → جلوگیری از render کامپوننت وقتی props تغییر نکرده
