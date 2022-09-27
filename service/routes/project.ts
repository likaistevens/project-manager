import ProjectModel from "../DB/model/Project";
import { IncomingMessage, ServerResponse } from "http";
import { isEmpty } from "lodash";
import url from "url";
import { HandleProps } from "./type";
import UserModel from "../DB/model/User";

export const createProject = async (props: HandleProps) => {
  const { postData, uid } = props;

  const res = await ProjectModel.create({
    ...JSON.parse(postData),
    createTime: new Date().getTime(),
  });

  await UserModel.updateOne(
    { uid },
    { $push: { project: res._id.toString() } }
  );
  return res;
};

export const listProject = async (props: HandleProps) => {
  const { request, uid } = props;
  const usr = await UserModel.findOne({ uid });
  if (!usr) {
    return [];
  }
  const project = usr.project;
  const queryData = url.parse(request.url || "", true).query;
  let list = [];
  if (isEmpty(queryData)) {
    list = await ProjectModel.find({ _id: { $in: project } })
      .lean()
      .sort({
        createTime: -1,
      });
  } else {
    list = await ProjectModel.find({
      _id: { $in: project },
      name: { $regex: queryData.search, $options: "i" },
    })
      .lean()
      .sort({
        createTime: -1,
      });
  }

  const res = list.map((item) => ({
    id: item._id,
    fields: {},
    ...item,
  }));
  console.log(res);

  return res;
};

export const updateProject = async (props: HandleProps) => {
  const { postData } = props;
  const data = JSON.parse(postData);
  console.log("updateOne ", data, data.id);
  const res = await ProjectModel.updateOne({ _id: data.id }, data);

  return res;
};

export const deleteProject = async (props: HandleProps) => {
  const { postData, uid } = props;
  const data = JSON.parse(postData);
  console.log("deleteOne ", data.id);
  const res = await ProjectModel.deleteOne({ _id: data.id });

  const usr = await UserModel.findOne({ uid });
  if (usr) {
    await UserModel.updateOne({ uid }, { $pull: { project: data.id } });
  }
  return res;
};
