import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/albumController.js";

const albumRoutes = Router();

albumRoutes.get("/", getAllAlbums);
albumRoutes.get("/:albumId", getAlbumById)

export default albumRoutes;