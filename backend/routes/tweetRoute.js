import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { deleteTweet, newTweet, updateTweet } from '../controller/tweetController.js';
const router = express.Router();
router.post("/newtweet" ,protectRoute , newTweet);
router.post("/updatetweet/:id" ,protectRoute ,updateTweet);
router.get("/deletetweet/:id" ,protectRoute , deleteTweet)
export default router;