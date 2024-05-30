import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from 'dotenv'
import connectToMongoDB from './db.js';
import authRoutes from './routes/authRoutes.js'
import tweetRoute from './routes/tweetRoute.js'
import userRoute from './routes/userRoute.js'
dotenv.config();
const app = express()
const port = 3000
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' , authRoutes);
app.use('/api/tweet' , tweetRoute);
app.use('/api/user' ,userRoute);
app.listen(port, () => {
    connectToMongoDB();
  console.log(` app listening on port ${port}`)
})