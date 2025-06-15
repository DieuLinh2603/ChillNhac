//const express = require("express")

import express from "express"
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors"
import { createServer } from "http";

import { initializeSocket } from "./lib/socket.js";
import {connectDB} from "./lib/db.js"

import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js"
import albumRoutes from "./routes/albumRoutes.js"
import thongKeRoutes from "./routes/thongKeRoutes.js"
import searchRoutes from "./routes/searchRoute.js";


dotenv.config()

// lấy đường dẫn thư mục gốc hiện tại của project 
const __dirname = path.resolve();
const app = express()

const PORT = process.env.PORT;

const httpSever = createServer(app);
initializeSocket(httpSever)

// Cho phép tất cả origin
//app.use(cors());
app.use(cors({
    origin: "http://localhost:3000", // chỉ cho phép frontend này
    credentials: true
}));

//xử lý dữ liệu JSON được gửi từ client lên server trong phần body của request
app.use(express.json())

//	Kích hoạt hệ thống xác thực Clerk
app.use(clerkMiddleware())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10* 1024 * 1024,
    }
}))

app.use((err, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message});
})

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/thongke", thongKeRoutes)
app.use("/api/search", searchRoutes)


httpSever.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT)
    connectDB();
})