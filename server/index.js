import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import blogRoute from './Routes/blog.js'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

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

// app.get('*', (req, res) => {
//     const context = {};
//     const sheet = new ServerStyleSheet();

//     const appHtml = renderToString(
//         sheet.collectStyles(
//             <StaticRouter location={req.url} context={context}>
//                 <App />
//             </StaticRouter>
//         )
//     );

//     const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    
//     if (context.url) {
//         res(301, context.url);
//     } else {
//         const html = `
//             <!DOCTYPE html>
//             <html>
//                 <head>
//                     ${styleTags}
//                 </head>
//                 <body>
//                     <div id="root">${appHtml}</div>
//                     <script src="/bundle.js"></script>
//                 </body>
//             </html>
//         `;

//         res.send(html);
//     }
// });
app.get("/*", (req, res) => {
        res.status(404).send("<h1>404</h1>");
      });
app.listen(port, () => {
        connectDB();
        console.log('Server is running on port ' + port)
})