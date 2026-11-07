import { describe, expect, it } from "vitest";
import todoReducer from "./todoReducer";

export const todos = [
  {
    id: 1,
    todo: "Learn React",
    completed: false,
    priority: "high" as const,
    date: "2026-09-13",
  },
  {
    id: 2,
    todo: "Learn TypeScript",
    completed: false,
    priority: "medium" as const,
    date: "2026-09-14",
  },
  
];

describe("todoReducer", () => {
  it("should delete a todo", () => {
    const result = todoReducer(todos, {
      type: "DELETE_TODO",
      payload: 1,
    });

    expect(result).toEqual([
      {
        id: 2,
        todo: "Learn TypeScript",
        completed: false,
        priority: "medium",
        date: "2026-09-14",
      },
    ]);
  });
});

describe("todoReducer", () =>
  it("it should toggle an item", () => {
    const res = todoReducer(todos, {
      type: "TOGGLE_TODO",
      payload: 1,
    });

    expect(res).toEqual([
      {
        id: 1,
        todo: "Learn React",
        completed: true,
        priority: "high",
        date: "2026-09-13",
      },
      {
        id: 2,
        todo: "Learn TypeScript",
        completed: false,
        priority: "medium",
        date: "2026-09-14",
      },
    ]);
  }));

describe("todoReducer", () =>
  it("should not mutate the previous state", () => {
    const previousState = structuredClone(todos);

    todoReducer(todos, {
      type: "TOGGLE_TODO",
      payload: 1,
    });

    expect(todos).toEqual(previousState);
  }));

describe("todoReducer", () =>
  it("should add an item", () => {
    const result = todoReducer(todos, {
      type: "ADD_TODO",
      payload: { id: 3, todo: "React", priority: "high", date: "2026-09-20" },
    });

    expect(result).toHaveLength(3);
    expect(result[2].completed).toBe(false);
    expect(result[2].todo).toBe("React");
    expect(result[2].date).toBe("2026-09-20");
    expect(result[2].priority).toBe("high");
    expect(typeof result[2].id).toBe("number");
    expect(result[2].id).toBe(3);
  }));

describe("todoReducer", () =>
  it("should update an item", () => {
    const previuosTodos = structuredClone(todos);

    const res = todoReducer(todos, {
      type: "UPDATE_TODO",
      payload: {
        id: 2,
        data: { priority: "high" },
      },
    });

    expect(res[1].priority).toBe("high");
    expect(todos).toEqual(previuosTodos);
  }));

// state قبلی
//    │
//    │  + action
//    ↓
// reducer
//    │
//    │  ❌ state قبلی را تغییر نمی‌دهد
//    │
//    └────→ state جدید را می‌سازد و return می‌کند
//                     │
//                     ↓
//                   React
//                     │
//                     ↓
//           state جدید = state فعلی
