import { TodoItem } from "../type";
import { _fetch } from "./fetch";

export const listTodo = async () => {
  const res = await _fetch("/listTodoList");
  return res;
};

export const updateTodoList = async (data: TodoItem, status: string) => {
  const res = await _fetch("/updateTodoList", {
    method: "POST",
    body: JSON.stringify({
      data,
      status,
    }),
  });
  return res;
};
