import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import blogRoute from './Routes/blog.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import history from 'connect-history-api-fallback';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.get('/',(req,res) => {
        res.send('API is working')
    })
const corsOptions = {
        origin: true
}

//db connection
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
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/blogs', blogRoute)


    
app.use((error,req,res,next)=>{
        const statusCode = error.statusCode || 500 ;
        const message = error.message || 'Internal Server Error';
        res.status(statusCode).json({
            success: false,
            statusCode,
            message});
        });
        
        app.use(express.static('../client/build'));

        app.use(history());

        app.get('*', (req, res) => {
  res.sendFile('../client/build/index.html', { root: __dirname });
});
app.listen(port, () => {
        connectDB();
        console.log('Server is running on port ' + port)
})