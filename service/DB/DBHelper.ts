import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const usr = process.env.MONGODB_USER;
const pwd = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;

const DB_URL = `mongodb://${usr}:${pwd}@${host}:27017/project_manager`;

// 创建连接
mongoose.connect(DB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// 连接成功
mongoose.connection.on("connected", () => {
  console.log("Mongoose connection open to " + DB_URL);
});

// 连接异常
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// 断开连接
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});

export default mongoose;
