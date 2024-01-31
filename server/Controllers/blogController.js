import Blog from "../models/BlogSchema.js";

export const updateBlog = async(req, res) => {
    const id = req.params.id
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success:true, message:"Successfully update.", data:updatedBlog})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed update."})
        
    }
}

export const deleteBlog = async(req, res) => {
    const id = req.params.id
    try {
        await Blog.findByIdAndDelete(id,)
        res.status(200).json({success:true, message:"Successfully delete."})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed delete."})
        
    }
}

export const getAllBlog = async(req, res) => {
    try {
        const blogs = await Blog.find({}).select("-password")
        res.status(200).json({success:true, message:"Blogs found.", data:blogs})
    } catch (err) {
        res.status(404).json({success:false, message:"Not found."})
        
    }
}

export const addBlog = async (req, res) => {
    const blog = new Blog(req.body);
    try {
        const savedBlog = await blog.save();
        res.status(201).json({ success: true, message: "Successfully added.", data: savedBlog });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add." });
    }
}

export const getSingleBlog = async(req, res) => {
    const id = req.params.id
    try {
        const blog = await Blog.findById(id)
        res.status(200).json({success:true, message:"Blog found.", data:blog})
    } catch (err) {
        res.status(404).json({success:false, message:"No blog found."})
        
    }
}