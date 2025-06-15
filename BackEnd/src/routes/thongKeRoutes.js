import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { getThongKe } from "../controller/thongKeController.js";

const thongKeRoutes = Router();

thongKeRoutes.get("/", protectRoute, requireAdmin, getThongKe )

export default thongKeRoutes;