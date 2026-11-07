import { describe, expect, it } from "vitest";
import useFilterTodos from "./useFilterTodos";
import { renderHook, act } from "@testing-library/react";

const todos = [
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
  {
    id: 3,
    todo: "gym",
    completed: true,
    priority: "high" as const,
    date: "2026-09-14",
  },
  {
    id: 4,
    todo: "pilates",
    completed: true,
    priority: "high" as const,
    date: "2026-09-14",
  },
];

describe("useFilterTodo", () => {
  it("should return todos matching both filters", () => {
    const { result } = renderHook(() => useFilterTodos(todos));

    act(() => {
      result.current.setFilter("completed");
      result.current.setPriorityFilter("high");
    });

    expect(result.current.filteredTodos).toEqual([
      {
        id: 3,
        todo: "gym",
        completed: true,
        priority: "high" as const,
        date: "2026-09-14",
      },
      {
        id: 4,
        todo: "pilates",
        completed: true,
        priority: "high" as const,
        date: "2026-09-14",
      },
    ]);
  });
});
