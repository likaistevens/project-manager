import DiaryModel from "../DB/model/Diary";
import { IncomingMessage, ServerResponse } from "http";
import { isEmpty } from "lodash";
import url from "url";
import { HandleProps } from "./type";
import UserModel from "../DB/model/User";

export const createDiary = async (props: HandleProps) => {
  const { postData, uid } = props;
  const res = await DiaryModel.create({
    ...JSON.parse(postData),
    createTime: new Date().getTime(),
  });
  await DiaryModel.updateOne({ _id: res._id }, { id: res._id });
  await UserModel.updateOne({ uid }, { $push: { diary: res._id.toString() } });
  return res;
};

export const listDiary = async (props: HandleProps) => {
  const { request, uid } = props;
  const usr = await UserModel.findOne({ uid });
  if (!usr) {
    return [];
  }
  const diary = usr.diary;
  var queryData = url.parse(request.url || "", true).query;
  let list = [];
  if (isEmpty(queryData)) {
    list = await DiaryModel.find({ _id: { $in: diary } })
      .lean()
      .sort({
        date: -1,
      });
  } else {
    list = await DiaryModel.find({
      _id: { $in: diary },
      title: { $regex: queryData.search, $options: "i" },
    })
      .lean()
      .sort({
        date: -1,
      });
  }

  const res = list.map((item) => ({
    id: item._id,
    ...item,
  }));

  return res;
};

export const updateDiary = async (props: HandleProps) => {
  const { postData } = props;
  const data = JSON.parse(postData);
  console.log("updateOne ", data, data.id);
  const res = await DiaryModel.updateOne({ _id: data.id }, data);
  return res;
};

export const deleteDiary = async (props: HandleProps) => {
  const { postData, uid } = props;
  const data = JSON.parse(postData);
  console.log("deleteOne ", data.id);
  const res = await DiaryModel.deleteOne({ _id: data.id });

  const usr = await UserModel.findOne({ uid });
  if (usr) {
    await UserModel.updateOne({ uid }, { $pull: { diary: data.id } });
  }
  return res;
};
