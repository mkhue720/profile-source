import jwt, { decode } from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
    //get token from headers
    const authToken = req.headers.authorization
    //check token is exists
    if(!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({success:false, message:'No token, authorization denied'})
    }
    try {
        const token = authToken.split(' ')[1]
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id
        req.role = decoded.role
        next() //must be call the next function
    } catch (err) {
        if(err.name === 'TokenExpiredError') {
            return res.status(401).json({message:'Token is expired'})
        }
        return res.status(401).json({success:false, message:'Invalid token'})
    }
}
export const restrict = roles => async(req, res, next) => {
    const userId = req.userId
    let users
    const user = await User.findById(userId)
    const admin = await User.findById(userId)
    if(user) {
        users = user
    }
    if(admin) {
        users = admin
    }
    if(!roles.includes(users.role)) {
        return res.status(401).json({success:false, message:'You are not authorized'})
    }
    next()
} 