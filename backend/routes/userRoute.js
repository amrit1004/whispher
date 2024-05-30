import express from "express"
import { getUsers } from "../controller/userController.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.get("/getusers" ,protectRoute ,getUsers)

export default router;