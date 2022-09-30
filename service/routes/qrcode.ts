import QrcodeModal from "../DB/model/QrCode";
import { isEmpty } from "lodash";
import url from "url";
import { HandleProps } from "./type";
import UserModel from "../DB/model/User";

export const createQrCode = async (props: HandleProps) => {
  const { postData, uid } = props;

  const res = await QrcodeModal.create({
    ...JSON.parse(postData),
    createTime: new Date().getTime(),
  });

  await UserModel.updateOne({ uid }, { $push: { qrcode: res._id.toString() } });
  return res;
};

export const listQrCode = async (props: HandleProps) => {
  const { request, uid } = props;
  const usr = await UserModel.findOne({ uid }).lean();
  if (!usr) {
    return [];
  }
  const qrcode = usr.qrcode;
  var queryData = url.parse(request.url || "", true).query;
  let list = [];
  if (isEmpty(queryData)) {
    list = await QrcodeModal.find({ _id: { $in: qrcode } })
      .lean()
      .sort({
        _id: -1,
      });
  } else {
    list = await QrcodeModal.find({
      _id: { $in: qrcode },
      title: { $regex: queryData.search, $options: "i" },
    })
      .lean()
      .sort({
        _id: -1,
      });
  }

  const res = list.map((item) => ({
    id: item._id,
    ...item,
  }));

  return res;
};

export const updateQrCode = async (props: HandleProps) => {
  const { postData } = props;
  const data = JSON.parse(postData);
  console.log("updateOne ", data, data.id);
  const res = await QrcodeModal.updateOne({ _id: data.id }, data);
  return res;
};

export const deleteQrCode = async (props: HandleProps) => {
  const { postData, uid } = props;
  const data = JSON.parse(postData);
  console.log("deleteOne ", data.id);
  const res = await QrcodeModal.deleteOne({ _id: data.id });

  const usr = await UserModel.findOne({ uid });
  if (usr) {
    await UserModel.updateOne({ uid }, { $pull: { qrcode: data.id } });
  }
  return res;
};
