import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

const ToolBoxSchema = new Schema({
  id: { type: String },
  title: { type: String },
  url: { type: String },
  desc: { type: String },
});

const ToolBoxModel = mongoose.model("toolbox", ToolBoxSchema);

export default ToolBoxModel;
