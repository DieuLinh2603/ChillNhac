import { Router } from "express";
import { authCallback } from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post("/callback", authCallback)

export default authRoutes;