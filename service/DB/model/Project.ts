import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  name: { type: String },
  fields: {
    meego: { type: String },
    demand: { type: String },
    design: { type: String },
    test: { type: String },
    dev: { type: String },
    summary: { type: String },
    retrospect: { type: String },
    eventTracking: { type: String },
    starling: { type: String },
  },
  hasDesc: { type: Boolean },
  description: { type: String },
  createTime: { type: String },
  todo: [
    {
      id: { type: String },
      done: { type: Boolean },
      event: { type: String },
    },
  ],
});

const ProjectModel = mongoose.model("myprojects", ProjectSchema);

export default ProjectModel;
