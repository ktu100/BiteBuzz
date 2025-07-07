import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRouter from './routes/userRoute.js';
import itemRouter from './routes/itemRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';

//https://bitebuzz-backend-9ex9.onrender.com

const app=express();
const port=(process.env.PORT || 4000);

//Middleware
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Database
connectDB();

//Routes
app.use('/api/user', userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/items', itemRouter);
app.use('/api/cart', cartRouter)
app.use('/api/orders',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working");
})

app.listen(port,()=>{
    console.log("Server Listening");
})


