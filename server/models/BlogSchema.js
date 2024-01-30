import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  author: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", BlogSchema);