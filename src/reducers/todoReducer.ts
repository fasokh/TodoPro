import type { Todo, TodoAction } from "../types/todo";

const assertNever = (value: never): never => { //بهش میگن type-safty 
  throw new Error(`Unhandled action: ${value}`);
};

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {  completed: false, ...action.payload },
      ];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.data }
          : todo,
      );
    default:
      return assertNever(action);
  }
};

export default todoReducer;
