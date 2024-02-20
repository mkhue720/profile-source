import mongoose from 'mongoose';
import moment from 'moment-timezone';

const ReplySchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    createAt: {
        type: Date,
        default: () => moment().tz('Asia/Ho_Chi_Minh').toDate(),
    },
}, { _id: false });

const CommentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Types.ObjectId, ref: "Blog" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
    createAt: {
        type: Date,
        default: () => moment().tz('Asia/Ho_Chi_Minh').toDate(),
    },
    replies: [ReplySchema],
});

export default mongoose.model("Comment", CommentSchema);