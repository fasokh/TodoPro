import { beforeEach, describe, it, expect } from "vitest";
import { saveTodos, getInitialTodos, getLastTodoId } from "./todoStorage";

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
];

describe("saveTodos", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should save todos", () => {
    saveTodos(todos);
    const res = localStorage.getItem("todos");
    expect(res).not.toBeNull(); //اگر res برابر null بود، تست fail شو

    const parsed = JSON.parse(res!); //من به TypeScript می‌گم مطمئنم این مقدار null یا undefined نیست.
    expect(parsed).toEqual(todos);
  });
});

describe("getInitialTodos", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should return empty array when there is no stored todos", () => {
    const res = getInitialTodos();
    expect(res).toEqual([]);
  });

  it("should return stored todos", () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const result = getInitialTodos();
    expect(result).toEqual(todos);
  });

  it("should return empty array when stored data is invalid", () => {
    localStorage.setItem("todos", "invalid JSON");
    const res = getInitialTodos();
    expect(res).toEqual([]);
    console.log(res);
  });
});

describe("getLastId", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("should return last id", () => {
    const res = getLastTodoId();
    expect(res).toBe(0);
  });
  it("should return last id with 15", () => {
    const lastTodoId = 15;
    localStorage.setItem("lastTodoId", JSON.stringify(lastTodoId));
    const res = getLastTodoId();
    expect(res).toBe(15);
  });
  it("should return 0 when the value is unvalid", () => {
    const lastTodoId = " ";
    localStorage.setItem("lastTodoId", JSON.stringify(lastTodoId));
    const res = getLastTodoId();
    expect(res).toBe(0);
  });
  it("should return 0 if there is NAN", () => {
    const lastTodoId = NaN;
    localStorage.setItem("lastTodoId", JSON.stringify(lastTodoId));
    const res = getLastTodoId();
    expect(res).toBe(0);
    console.log(JSON.stringify(NaN));
    console.log(JSON.stringify(Infinity));
  });
  it("should return 0 if id is a invalid number", () => {
    const lastTodoId = 0;
    localStorage.setItem("lastTodoId", JSON.stringify(lastTodoId));
    const res = getLastTodoId();
    expect(res).toBe(0);
  });
});
