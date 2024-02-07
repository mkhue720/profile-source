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
export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;
    let user;

    try {
        const admin = await User.findById(userId);

        if (admin) {
            user = admin;
        } else {
            // Nếu không tìm thấy user, có thể bạn muốn xử lý tùy thuộc vào logic của bạn
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        if (!roles.includes(user.role)) {
            return res.status(401).json({ success: false, message: 'You are not authorized' });
        }

        next();
    } catch (err) {
        // Xử lý lỗi nếu có
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
