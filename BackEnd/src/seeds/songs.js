import mongoose from "mongoose";
import { Song } from "../models/songModel.js";
import { config } from "dotenv";

config();

const songs = [
	{
		tieuDe: "Stay With Me",
		ngheSi: "Sarah Mitchell",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/1.mp3",
		thoiGian: 46, // 0:46
	},
	{
		tieuDe: "Midnight Drive",
		ngheSi: "The Wanderers",
		imageUrl: "/cover-images/2.jpg",
		audioUrl: "/songs/2.mp3",
		thoiGian: 41, // 0:41
	},
	{
		tieuDe: "Lost in Tokyo",
		ngheSi: "Electric Dreams",
		imageUrl: "/cover-images/3.jpg",
		audioUrl: "/songs/3.mp3",
		thoiGian: 24, // 0:24
	},
	{
		tieuDe: "Summer Daze",
		ngheSi: "Coastal Kids",
		imageUrl: "/cover-images/4.jpg",
		audioUrl: "/songs/4.mp3",
		thoiGian: 24, // 0:24
	},
	{
		tieuDe: "Neon Lights",
		ngheSi: "Night Runners",
		imageUrl: "/cover-images/5.jpg",
		audioUrl: "/songs/5.mp3",
		thoiGian: 36, // 0:36
	},
	{
		tieuDe: "Mountain High",
		ngheSi: "The Wild Ones",
		imageUrl: "/cover-images/6.jpg",
		audioUrl: "/songs/6.mp3",
		thoiGian: 40, // 0:40
	},
	{
		tieuDe: "City Rain",
		ngheSi: "Urban Echo",
		imageUrl: "/cover-images/7.jpg",
		audioUrl: "/songs/7.mp3",
		thoiGian: 39, // 0:39
	},
	{
		tieuDe: "Desert Wind",
		ngheSi: "Sahara Sons",
		imageUrl: "/cover-images/8.jpg",
		audioUrl: "/songs/8.mp3",
		thoiGian: 28, // 0:28
	},
	{
		tieuDe: "Ocean Waves",
		ngheSi: "Coastal Drift",
		imageUrl: "/cover-images/9.jpg",
		audioUrl: "/songs/9.mp3",
		thoiGian: 28, // 0:28
	},
	{
		tieuDe: "Starlight",
		ngheSi: "Luna Bay",
		imageUrl: "/cover-images/10.jpg",
		audioUrl: "/songs/10.mp3",
		thoiGian: 30, // 0:30
	},
	{
		tieuDe: "Winter Dreams",
		ngheSi: "Arctic Pulse",
		imageUrl: "/cover-images/11.jpg",
		audioUrl: "/songs/11.mp3",
		thoiGian: 29, // 0:29
	},
	{
		tieuDe: "Purple Sunset",
		ngheSi: "Dream Valley",
		imageUrl: "/cover-images/12.jpg",
		audioUrl: "/songs/12.mp3",
		thoiGian: 17, // 0:17
	},
	{
		tieuDe: "Neon Dreams",
		ngheSi: "Cyber Pulse",
		imageUrl: "/cover-images/13.jpg",
		audioUrl: "/songs/13.mp3",
		thoiGian: 39, // 0:39
	},
	{
		tieuDe: "Moonlight Dance",
		ngheSi: "Silver Shadows",
		imageUrl: "/cover-images/14.jpg",
		audioUrl: "/songs/14.mp3",
		thoiGian: 27, // 0:27
	},
	{
		tieuDe: "Urban Jungle",
		ngheSi: "City Lights",
		imageUrl: "/cover-images/15.jpg",
		audioUrl: "/songs/15.mp3",
		thoiGian: 36, // 0:36
	},
	{
		tieuDe: "Crystal Rain",
		ngheSi: "Echo Valley",
		imageUrl: "/cover-images/16.jpg",
		audioUrl: "/songs/16.mp3",
		thoiGian: 39, // 0:39
	},
	{
		tieuDe: "Neon Tokyo",
		ngheSi: "Future Pulse",
		imageUrl: "/cover-images/17.jpg",
		audioUrl: "/songs/17.mp3",
		thoiGian: 39, // 0:39
	},
	{
		tieuDe: "Midnight Blues",
		ngheSi: "Jazz Cats",
		imageUrl: "/cover-images/18.jpg",
		audioUrl: "/songs/18.mp3",
		thoiGian: 29, // 0:29
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);

		// Xóa all bài hát
		await Song.deleteMany({});

		// Thêm mới 
		await Song.insertMany(songs);

		console.log("Các bài hát đã được khởi tạo thành công!");
	} catch (error) {
		console.error("Lỗi khi khởi tạo dữ liệu bài hát", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();