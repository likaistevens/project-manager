import TodoListModel from "../DB/model/TodoList";
import { isEqual, pick } from "lodash";
import { HandleProps } from "./type";
import UserModel from "../DB/model/User";

export const listTodoList = async (props: HandleProps) => {
  const { uid } = props;
  const usr = await UserModel.findOne({ uid });
  if (!usr) {
    return [];
  }
  const todo = usr.todo;
  console.log(todo);

  const list = await TodoListModel.find({ id: { $in: todo } }).lean();

  return list;
};

export const updateTodoList = async (props: HandleProps) => {
  const { postData, uid } = props;
  const { data, status } = JSON.parse(postData);
  console.log("updateOne ", data, data.id);

  let res = {} as any;
  if (status === "create") {
    res = await TodoListModel.create({
      ...data,
      createTime: new Date().getTime(),
    });
    await UserModel.updateOne({ uid }, { $push: { todo: res.id } });
  } else if (status === "update") {
    res = await TodoListModel.updateOne({ id: data.id }, data);
  } else if (status === "delete") {
    res = await TodoListModel.deleteOne({ id: data.id });
    const usr = await UserModel.findOne({ uid });
    if (usr) {
      await UserModel.updateOne({ uid }, { $pull: { todo: data.id } });
    }
  }

  return res;
};
