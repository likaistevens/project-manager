import TodoListModel from "./DB/model/TodoList";
import ToolBoxModel from "./DB/model/ToolBox";
import DiaryModel from "./DB/model/Diary";
import ProjectModel from "./DB/model/Project";
import UserModel from "./DB/model/User";

const run = async () => {
  // const projects = await ProjectModel.find().lean();
  // await UserModel.updateOne(
  //   { name: "likai" },
  //   { project: projects.map((p) => p._id) }
  // );
  // const diary = await DiaryModel.find().lean();
  // await UserModel.updateOne(
  //   { name: "likai" },
  //   { diary: diary.map((p) => p._id) }
  // );
  // const todo = await TodoListModel.find().lean();
  // await UserModel.updateOne(
  //   { name: "likai" },
  //   { todo: todo.map((p) => p._id) }
  // );
  // const link = await ToolBoxModel.find().lean();
  // await UserModel.updateOne(
  //   { name: "likai" },
  //   { link: link.map((p) => p._id) }
  // );
};
run();
