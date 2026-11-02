import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useTodos from "./useTodos";
import { saveTodos } from "../utils/todoStorage";

describe("addTodo", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should return todos", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo({
        todo: "TypeScript",
        priority: "medium",
        date: "2026-11-01",
      });
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].todo).toBe("TypeScript");
    expect(result.current.todos[0].priority).toBe("medium");
    expect(result.current.todos[0].date).toBe("2026-11-01");
    expect(result.current.todos[0].completed).toBe(false);
    expect(typeof result.current.todos[0].id).toBe("number");
  });

  it("should toggle a todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo({
        todo: "TypeScript",
        priority: "medium",
        date: "2026-11-01",
      });
    });
    act(() => {
      result.current.addTodo({
        todo: "React",
        priority: "medium",
        date: "2026-11-03",
      });
    });

    expect(result.current.todos[0].id).not.toBe(result.current.todos[1].id);
    expect(result.current.todos[0].id).toBe(1);
    expect(result.current.todos[1].id).toBe(2);

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id);
    });
    expect(result.current.todos[0].completed).toBe(true);
    expect(result.current.todos[1].completed).toBe(false);
    expect(result.current.todos).toHaveLength(2);
  });
  it("should delete a todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo({
        todo: "TypeScript",
        priority: "medium",
        date: "2026-11-01",
      });
    });
    act(() => {
      result.current.addTodo({
        todo: "React",
        priority: "medium",
        date: "2026-11-03",
      });
    });

    act(() => {
      result.current.removeTodo(result.current.todos[0].id);
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].todo).toBe("React");
  });
  it("should update a todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo({
        todo: "TypeScript",
        priority: "medium",
        date: "2026-11-01",
      });
    });
    act(() => {
      result.current.addTodo({
        todo: "React",
        priority: "medium",
        date: "2026-11-03",
      });
    });

    act(() => {
      result.current.updateTodo(result.current.todos[0].id, {
        todo: "TypeScript",
        priority: "high",
        date: "2026-11-01",
      });
    });

    expect(result.current.todos[0].priority).toBe("high");
    expect(result.current.todos[0].todo).toBe("TypeScript");
    expect(result.current.todos[0].date).toBe("2026-11-01");
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.todos[1].todo).toBe("React");
    expect(result.current.todos[1].priority).toBe("medium");
  });
  it("should calculate completed and remaining todos", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      //یه نکته‌ی خوب هم اینه که تغییر وضعیت رو داخل act() قرار دادی؛ چون این عملیات باعث تغییر state در Hook می‌شه.
      result.current.addTodo({
        todo: "TypeScript",
        priority: "medium",
        date: "2026-11-01",
      });
    });
    act(() => {
      result.current.addTodo({
        todo: "React",
        priority: "medium",
        date: "2026-11-03",
      });
    });
    expect(result.current.remainingTodo).toBe(2);
    expect(result.current.completedCount).toBe(0);

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id);
    });
    expect(result.current.remainingTodo).toBe(1);
    expect(result.current.completedCount).toBe(1);
  });
  describe("save a todo and restore it", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("should save todos to localStorage", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        //یه نکته‌ی خوب هم اینه که تغییر وضعیت رو داخل act() قرار دادی؛ چون این عملیات باعث تغییر state در Hook می‌شه.
        result.current.addTodo({
          todo: "TypeScript",
          priority: "medium",
          date: "2026-11-01",
        });
      });
      const data = localStorage.getItem("todos");
      expect(data).not.toBeNull();
      const parsed = JSON.parse(data!);

      expect(parsed).toHaveLength(1);
      expect(parsed[0].todo).toBe("TypeScript");
    });
  });
  describe("localStorage", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("should remove todo from localStorage", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        //یه نکته‌ی خوب هم اینه که تغییر وضعیت رو داخل act() قرار دادی؛ چون این عملیات باعث تغییر state در Hook می‌شه.
        result.current.addTodo({
          todo: "TypeScript",
          priority: "medium",
          date: "2026-11-01",
        });
      });
      act(() => {
        result.current.addTodo({
          todo: "React",
          priority: "medium",
          date: "2026-11-03",
        });
      });
      act(() => {
        result.current.removeTodo(result.current.todos[0].id);
      });

      const data = localStorage.getItem("todos");
      expect(data).not.toBeNull();
      const parsed = JSON.parse(data!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].todo).toBe("React");
    });
  });
  it("should restore todos from localStorage", () => {
    saveTodos([
      {
        id: 1,
        completed: false,
        todo: "TypeScript",
        priority: "medium",
        date: "2026-11-01",
      },
    ]);

    const { result } = renderHook(() => useTodos());

    expect(result.current.todos[0].todo).toBe("TypeScript");
  });
});
