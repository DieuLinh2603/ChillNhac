import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const adminRoutes = Router();

//Các adminRoutes đều yêu cầu đăng nhập và là admin
adminRoutes.use(protectRoute, requireAdmin)

//check xem tài khoản đang đăng nhập là admin hay người dùng
adminRoutes.get("/check", checkAdmin)

//Song
adminRoutes.post("/songs", createSong)
adminRoutes.delete("/songs/:id", deleteSong)

//Album
adminRoutes.post("/albums", createAlbum);
adminRoutes.delete("/album/:id", deleteAlbum)
export default adminRoutes;