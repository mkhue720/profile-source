import mongoose from "mongoose";
import moment from "moment-timezone";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  createAt: {
    type: Date,
    default: () => moment().tz('Asia/Ho_Chi_Minh').toDate('DD/MM/YYYY'),
  },
  updateAt: {
    type: Date,
    default: () => moment().tz('Asia/Ho_Chi_Minh').toDate('DD/MM/YYYY'),
  },
});

export default mongoose.model("Blog", BlogSchema);
