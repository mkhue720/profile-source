import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import blogRoute from './Routes/blog.js'
import commentRoute from './Routes/comment.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.get('/',(req,res) => {
    res.send('API is working')
})


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

// db connection
mongoose.set('strictQuery',false)
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('connect db')
    } catch (err) {
        console.log('connect db failed')
    }
}

// middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/blogs', blogRoute)
app.use('/api/v1/comments', commentRoute)

app.listen(port, () => {
    connectDB();
    console.log('Server is running on port ' + port)
})
