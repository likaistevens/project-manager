import ToolBoxModal from "../DB/model/ToolBox";
import { isEmpty } from "lodash";
import url from "url";
import { HandleProps } from "./type";
import UserModel from "../DB/model/User";

export const createToolBoxItem = async (props: HandleProps) => {
  const { postData, uid } = props;

  const res = await ToolBoxModal.create({
    ...JSON.parse(postData),
    createTime: new Date().getTime(),
  });

  await UserModel.updateOne({ uid }, { $push: { link: res._id.toString() } });
  return res;
};

export const listToolBoxItem = async (props: HandleProps) => {
  const { request, uid } = props;
  const usr = await UserModel.findOne({ uid });
  if (!usr) {
    return [];
  }
  const link = usr.link;
  var queryData = url.parse(request.url || "", true).query;
  let list = [];
  if (isEmpty(queryData)) {
    list = await ToolBoxModal.find({ _id: { $in: link } })
      .lean()
      .sort({
        createTime: -1,
      });
  } else {
    list = await ToolBoxModal.find({
      _id: { $in: link },
      title: { $regex: queryData.search, $options: "i" },
    })
      .lean()
      .sort({
        createTime: -1,
      });
  }

  const res = list.map((item) => ({
    id: item._id,
    ...item,
  }));

  return res;
};

export const updateToolBoxItem = async (props: HandleProps) => {
  const { postData } = props;
  const data = JSON.parse(postData);
  console.log("updateOne ", data, data.id);
  const res = await ToolBoxModal.updateOne({ _id: data.id }, data);
  return res;
};

export const deleteToolBoxItem = async (props: HandleProps) => {
  const { postData, uid } = props;
  const data = JSON.parse(postData);
  console.log("deleteOne ", data.id);
  const res = await ToolBoxModal.deleteOne({ _id: data.id });

  const usr = await UserModel.findOne({ uid });
  if (usr) {
    await UserModel.updateOne({ uid }, { $pull: { link: data.id } });
  }
  return res;
};
