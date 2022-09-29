import mongoose from "../DBHelper";

const Schema = mongoose.Schema;

const QrCodeSchema = new Schema({
  id: { type: String },
  title: { type: String },
  url: { type: String },
  imageId: { type: String },
});

const QrCodeModel = mongoose.model("qrcode", QrCodeSchema);

export default QrCodeModel;
