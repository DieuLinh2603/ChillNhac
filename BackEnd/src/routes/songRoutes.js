import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/songController.js";

const songRoutes = Router();

songRoutes.get("/", protectRoute, getAllSongs)
songRoutes.get("/dac-sac",  getFeaturedSongs)
songRoutes.get("/danh-cho-ban",   getMadeForYouSongs)
songRoutes.get("/thinh-hanh",   getTrendingSongs)

export default songRoutes;