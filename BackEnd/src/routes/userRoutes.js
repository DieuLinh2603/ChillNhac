import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getAllUsers, getMessage } from "../controller/userController.js";

const userRoutes = Router();

userRoutes.get("/", protectRoute, getAllUsers)

userRoutes.get("/messages/:nguoiNhan", protectRoute, getMessage)

export default userRoutes;