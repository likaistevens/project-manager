import React, { useEffect, useState } from "react";
import { listTodo, updateTodoList } from "../../api/todolist";
import { TodoTextArea } from "../../components/TodoTextArea";
import { TodoItem } from "../../type";

export const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const getList = async () => {
    const data = await listTodo();
    setTodoList(data);
  };

  const onSubmit = async (item: TodoItem, status: string) => {
    await updateTodoList(item, status);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <TodoTextArea
      onChange={(v, item, status) => {
        console.log("TodoTextArea onChange", item, status);
        setTodoList(() => {
          return v;
        });
        onSubmit(item, status);
      }}
      value={todoList}
    />
  );
};
