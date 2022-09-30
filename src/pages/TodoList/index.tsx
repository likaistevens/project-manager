import { IconSwap } from "@arco-design/web-react/icon";
import React, { useEffect, useState } from "react";
import { listTodo, updateTodoList } from "../../api/todolist";
import { TodoTextArea } from "../../components/TodoTextArea";
import { TodoItem } from "../../type";
import "./index.css";
import _ from "lodash";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [originList, setOriginList] = useState<TodoItem[]>([]);
  const [sort, setSort] = useLocalStorage("todo_list_sort", false);

  const getList = async () => {
    const data = await listTodo();
    setOriginList(data);
    if (sort) {
      setTodoList(_.sortBy(data, ["done"]));
    } else {
      setTodoList(data);
    }
  };

  const onSubmit = async (item: TodoItem, status: string) => {
    await updateTodoList(item, status);
    await getList();
  };

  const onSort = () => {
    if (sort) {
      setTodoList(originList);
      setSort(false);
    } else {
      setTodoList((old) => {
        return _.sortBy(old, ["done"]);
      });
      setSort(true);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="h-full overflow-auto">
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

      <div
        className="absolute cursor-pointer sort-icon flex-center"
        onClick={onSort}
      >
        <IconSwap />
      </div>
    </div>
  );
};
