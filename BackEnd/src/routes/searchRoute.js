import { Router } from "express";
import { Search } from "../controller/searchController.js ";

const searchRoutes = Router();

searchRoutes.get("/", Search)

export default searchRoutes;