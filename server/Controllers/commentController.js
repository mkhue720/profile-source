import CommentSchema from "../models/CommentSchema.js";

export const addComment = async (req, res) => {
    const comment = new CommentSchema({
        blogId: req.body.blogId, 
        user: req.body.user,  
        comment: req.body.comment,
    })
    try {
        const savedComment = await comment.save();
        res.status(201).json({ success: true, message: "Successfully added.", data: savedComment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add." });
    }
}

export const addReply = async (req, res) => {
    const id = req.params.id
    try {
        const comment = await CommentSchema.findById(id);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found." });
        }

        const newReply = {
            user: req.body.user,  
            text: req.body.text,
        };

        comment.replies.push(newReply);
        await comment.save();

        res.status(201).json({ success: true, message: "Reply added successfully.", data: comment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add reply." });
    }
}

export const getComment = async(req, res) => {
    const blogId = req.params.blogId
    try {
        const comments = await CommentSchema.find({blogId: blogId})
            .populate('user', 'name')
            .populate('replies.user', 'name');
        res.status(200).json({success:true, message:"Comments found.", data:comments})
    } catch (err) {
        res.status(404).json({success:false, message:"Not found."})
    }
}

export const deleteComment = async(req, res) => {
    const id = req.params.id
    try {
        await CommentSchema.findByIdAndDelete(id,)
        res.status(200).json({success:true, message:"Successfully delete."})
    }
    catch (err) {
        res.status(500).json({success:false, message:"Failed delete."})
    }
}

export const getAllComment = async(req, res) => {
    try {
        const comments = await CommentSchema.find({})
        res.status(200).json({success:true, message:"Comments found.", data:comments})
    } catch (err) {
        res.status(404).json({success:false, message:"Not found."})
        
    }
}


