import User from "../models/UserSchema.js";

export const updateUser = async(req, res) => {
    const id = req.params.id
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success:true, message:"Successfully update.", data:updatedUser})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed update."})
    }
}

export const deleteUser = async(req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id,)
        res.status(200).json({success:true, message:"Successfully delete."})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed delete."})
        
    }
}

export const getSingleUser = async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id).select("+password")
        res.status(200).json({success:true, message:"User found.", data:user})
    } catch (err) {
        res.status(404).json({success:false, message:"No user found."})
        
    }
}

export const getAllUser = async(req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.status(200).json({success:true, message:"Users found.", data:users})
    } catch (err) {
        res.status(404).json({success:false, message:"Not found."})
        
    }
}
export const getUserProfile = async(req,res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId).select("+password")
        if (!user) {
            returnres.status(404).json({success: false, message: 'User not found.'})
        }
        const {password, ...rest} = user._doc
        res.status(200).json({success: true, message: 'Profile info is getting.', data:{...rest}})
    } catch (err) {
        res.status(500).json({success:false, message:"Someting went wrong, cannot get."})
    }
}
