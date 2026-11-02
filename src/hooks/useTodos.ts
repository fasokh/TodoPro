import type { AddTodoPayload, TodoFormType } from "../types/todo";
import { useCallback, useEffect, useReducer } from "react";
import todoReducer from "../reducers/todoReducer";
import {
  getInitialTodos,
  saveTodos,
  getLastTodoId,
  saveLastTodoId,
} from "../utils/todoStorage";

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, getInitialTodos); //ساختار useReducer وقتی بخوایم از initializer سوم استفاده کنیم، آرگومان دوم همچنان باید وجود داشته باشه. ما در اینجا مقدار خاصی نداریم که به initializer بدهیم

  const addTodo = (form: TodoFormType) => {
    const lastId = getLastTodoId();
    const newId = lastId + 1;
    saveLastTodoId(newId);
    const payload: AddTodoPayload = {
      id: newId,
      ...form,
    };

    dispatch({
      type: "ADD_TODO",
      payload,
    });
  };

  const updateTodo = useCallback((id: number, form: TodoFormType) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id: id, data: form },
    });
  }, []); // اینجا از dispatch استفاده کردیم که reference پایدارتری داره پس لازم نیست در  dependency array قرار بگیره

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }, []); // اینجا از dispatch استفاده کردیم که reference پایدارتری داره پس لازم نیست در  dependency array قرار بگیره

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, []); // اینجا از dispatch استفاده کردیم که reference پایدارتری داره پس لازم نیست در  dependency array قرار بگیره

  const completedCount = todos.filter((todo) => todo.completed).length; //نیازی به استفاده از useMemo نیست چون خیلی ارزان است

  const remainingTodo = todos.filter((todo) => !todo.completed).length; // از useMemo استفاده نکردم چون ارزانه و نیازی نداره

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return {
    todos,
    completedCount,
    remainingTodo,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
  };
}

export default useTodos;

//ما state را مستقیم mutate نمی‌کنیم تا state/آبجکت جدید reference جدید داشته باشد و React بتواند تغییر را درست تشخیص بدهد.
//dispatch یک تابع برای فرستادن action به reducer است.

//چرا React dispatch را می‌سازد؟
// چون React باید خودش مدیریت کند که:
// چه زمانی reducer اجرا شود
// state فعلی به reducer داده شود
// نتیجه‌ی reducer تبدیل به state جدید شود
// componentهایی که به state وابسته‌اند دوباره render شوند
