import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

const QrCodeSchema = new Schema({
  id: { type: String },
  name: { type: String },
  protocol: { type: String },
  path: { type: String },
  params: [{ type: [{ type: String }] }],
  aweme: { type: String },
  url: { type: String },
  imageId: { type: String },
});

const QrCodeModel = mongoose.model("qrcode", QrCodeSchema);

export default QrCodeModel;
