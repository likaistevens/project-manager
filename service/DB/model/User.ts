import mongoose from "../DBHelper";
import { ProjectSchema } from "./Project";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: { type: String },
  username: { type: String },
  phone: { type: String },
  pwd: { type: String },
  project: [{ type: String }],
  diary: [{ type: String }],
  todo: [{ type: String }],
  link: [{ type: String }],
  qrcode: [{ type: String }],
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
