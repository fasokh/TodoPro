export type Status = "all" | "completed" | "active";

export type Priority = "high" | "medium" | "low";

export type TodoFormType = {
  todo: string;
  priority: Priority;
  date: string;
};

export type Todo = TodoFormType & {
  id: number;
  completed: boolean;
};

export type TodoAction =
  | {
      type: "ADD_TODO";
      payload: AddTodoPayload;
    }
  | {
      type: "DELETE_TODO";
      payload: number;
    }
  | {
      type: "TOGGLE_TODO";
      payload: number;
    }
  | {
      type: "UPDATE_TODO";
      payload: {
        id: number;
        data: Partial<TodoFormType>;
      };
    };

export type AddTodoPayload = TodoFormType & {
  id: number;
};
