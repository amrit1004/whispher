
import express from 'express'
import  {signup}  from '../controller/authController.js';
const router = express.Router();

router.get("/signup" , signup);
//router.get("/")

export default router