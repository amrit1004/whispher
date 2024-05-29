import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { newTweet } from '../controller/tweetController.js';
const router = express.Router();
router.post("/newtweet" ,protectRoute , newTweet);

export default router;