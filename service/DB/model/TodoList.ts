import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

const TodoListSchema = new Schema({
  id: { type: String },
  done: { type: Boolean },
  event: { type: String },
});

const TodoListModel = mongoose.model("todo", TodoListSchema);

export default TodoListModel;
