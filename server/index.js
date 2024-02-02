import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'fs';
import React from 'react';
import App from '../client/src/App';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

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

app.get('*', (req, res) => {
    const context = {};
    const sheet = new ServerStyleSheet();

    const appHtml = renderToString(
        sheet.collectStyles(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        )
    );

    const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
    
    if (context.url) {
        res.redirect(301, context.url);
    } else {
        const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    ${styleTags}
                </head>
                <body>
                    <div id="root">${appHtml}</div>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `;

        res.send(html);
    }
});

app.listen(port, () => {
        connectDB();
        console.log('Server is running on port ' + port)
})