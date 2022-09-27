import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

const DiarySchema = new Schema({
  id: { type: String },
  date: { type: Number },
  content: { type: String },
  createTime: { type: Number },
});

const DiaryModel = mongoose.model("diary", DiarySchema);

export default DiaryModel;
