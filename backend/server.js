import cookieParser from 'cookie-parser';
import express from 'express'
import dotenv from 'dotenv'
import connectToMongoDB from './db.js';
dotenv.config();
const app = express()
const port = 3000
app.use(express.json());
app.use(cookieParser());
//app.use('/api/auth' , authRoutes);

app.listen(port, () => {
    connectToMongoDB();
  console.log(` app listening on port ${port}`)
})