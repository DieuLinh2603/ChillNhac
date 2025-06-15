import mongoose from "mongoose";
import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);

		// Xóa dữ liệu 
		await Album.deleteMany({});
		await Song.deleteMany({});

		// Tạo all bài hát 
		const createdSongs = await Song.insertMany([
			{
				tieuDe: "City Rain",
				ngheSi: "Urban Echo",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 39, // 0:39
			},
			{
				tieuDe: "Neon Lights",
				ngheSi: "Night Runners",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 36, // 0:36
			},
			{
				tieuDe: "Urban Jungle",
				ngheSi: "City Lights",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 36, // 0:36
			},
			{
				tieuDe: "Neon Dreams",
				ngheSi: "Cyber Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 39, // 0:39
			},
			{
				tieuDe: "Summer Daze",
				ngheSi: "Coastal Kids",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 24, // 0:24
			},
			{
				tieuDe: "Ocean Waves",
				ngheSi: "Coastal Drift",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 28, // 0:28
			},
			{
				tieuDe: "Crystal Rain",
				ngheSi: "Echo Valley",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 39, // 0:39
			},
			{
				tieuDe: "Starlight",
				ngheSi: "Luna Bay",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 30, // 0:30
			},
			{
				tieuDe: "Stay With Me",
				ngheSi: "Sarah Mitchell",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 46, // 0:46
			},
			{
				tieuDe: "Midnight Drive",
				ngheSi: "The Wanderers",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 41, // 0:41
			},
			{
				tieuDe: "Moonlight Dance",
				ngheSi: "Silver Shadows",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 27, // 0:27
			},
			{
				tieuDe: "Lost in Tokyo",
				ngheSi: "Electric Dreams",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 24, // 0:24
			},
			{
				tieuDe: "Neon Tokyo",
				ngheSi: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 39, // 0:39
			},
			{
				tieuDe: "Purple Sunset",
				ngheSi: "Dream Valley",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				thoiGian: 17, // 0:17
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				tieuDe: "Urban Nights",
				ngheSi: "Various Artists",
				imageUrl: "/albums/1.jpg",
				namPhatHanh: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				tieuDe: "Coastal Dreaming",
				ngheSi: "Various Artists",
				imageUrl: "/albums/2.jpg",
				namPhatHanh: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				tieuDe: "Midnight Sessions",
				ngheSi: "Various Artists",
				imageUrl: "/albums/3.jpg",
				namPhatHanh: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				tieuDe: "Eastern Dreams",
				ngheSi: "Various Artists",
				imageUrl: "/albums/4.jpg",
				namPhatHanh: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Khởi tạo dữ liệu thành công !");
	} catch (error) {
		console.error("Lỗi khởi tạo dữ liệu", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();