import User from '../models/UserSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';

const generateToken = user => {
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn: "365d"
    })
}
export const register = async(req,res) => {
    const {email, password, name, role, photo} = req.body
    try {
        let user = null
        if(role === 'admin'){
            user=await User.findOne({email})
        }
        //check user exitst
        if(user){
            return res.status(400).json({message: 'User already exitst.'})
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        if(role==='admin'){
            user = new User ({
                name, 
                email,
                password:hashPassword,
                role,
                photo,
            })
        }
        if(role==='user'){
            user = new User ({
                name, 
                email,
                password:hashPassword,
                role,
                photo,
            })
        }
        await user.save()
        res.status(200).json({success:true, message:'User Success Create'})
    } catch (err) {
        res.status(450).json({success:false, message:'Server error'})
    }
}
export const login = async(req,res) => {
    const {email} = req.body
    try {
        let user = null
        const admin = await User.findOne({email})
        if(admin){
            user = admin
        }
        // check user exist or not
        if(!user){
            return res.status(404).json({message: "User not found."})
        }
        //compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({status:false, message: "Invalid credentials."})
        }
        //get token
        const token = generateToken(user)
        const {password, role, ...rest} = user._doc
        res.status(200).json({status:true, message: "Successfully login.", token, data:{...rest}, role})
    } catch (err) {
        res.status(500).json({status:false, message: "Failed to login."})
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: "5m",
      });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: NMK,
            to: email,
            subject: 'Reset Password',
            html: `
            <h2>Please click on given link to reset your password</h2>
            <p>${process.env.CLIENT_URL}/ResetPassword/${user._id}/${token}</p>
            `
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        user.resetToken = token;
        user.expireToken = Date.now() + 300000;
        await user.save();
        res.status(200).json({ message: "Check your email to reset your password." });
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
}
export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({ _id: id, resetToken: token, expireToken: { $gt: Date.now() } });
        if (!user) {
            return res.status(404).json({ message: "User not found or token expired." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        await user.save();
        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};