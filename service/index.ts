import route from "./routes/route";
import http from "http";
import url from "url";
import { Route } from "./routes/route";
import {
  createProject,
  deleteProject,
  listProject,
  updateProject,
} from "./routes/project";
import { listTodoList, updateTodoList } from "./routes/todolist";
import {
  createToolBoxItem,
  listToolBoxItem,
  updateToolBoxItem,
  deleteToolBoxItem,
} from "./routes/toolbox";
import {
  createDiary,
  deleteDiary,
  listDiary,
  updateDiary,
} from "./routes/diary";
import { FULL_CONFIG } from "./const";
import dotenv from "dotenv";
import {
  createQrCode,
  deleteQrCode,
  listQrCode,
  updateQrCode,
} from "./routes/qrcode";
import { validateUser } from "./routes/user";

dotenv.config();

const { SERVER_PORT } = FULL_CONFIG;

const handle = {
  "/createProject": createProject,
  "/listProject": listProject,
  "/updateProject": updateProject,
  "/deleteProject": deleteProject,
  // todo list
  "/updateTodoList": updateTodoList,
  "/listTodoList": listTodoList,
  // tool box item
  "/createToolBoxItem": createToolBoxItem,
  "/listToolBoxItem": listToolBoxItem,
  "/updateToolBoxItem": updateToolBoxItem,
  "/deleteToolBoxItem": deleteToolBoxItem,
  // diary
  "/createDiary": createDiary,
  "/listDiary": listDiary,
  "/updateDiary": updateDiary,
  "/deleteDiary": deleteDiary,
  // qrcode
  "/createQrCode": createQrCode,
  "/listQrCode": listQrCode,
  "/updateQrCode": updateQrCode,
  "/deleteQrCode": deleteQrCode,
  // validateUser
  "/validateUser": validateUser,
};

const start = (route: Route, handle: Record<string, Function>) => {
  const onRequest: http.RequestListener = (request, response) => {
    const pathname = url.parse(request.url || "").pathname || "";
    route(pathname, handle, request, response);
  };

  http.createServer(onRequest).listen(SERVER_PORT);
  console.log("server start at port " + SERVER_PORT);
};

start(route, handle);
