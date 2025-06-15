import mongoose from "mongoose";

//Tạo một MongoDB model tên là User có các trường bên dưới 
const songSchema = new mongoose.Schema({
        tieuDe: {
            type: String,
            required: true,
        },
        ngheSi: {
            type: String,
            required: true,
        },
        imageUrl:{
            type: String,
            required: true,
        },
        audioUrl:{
            type: String,
            required: true,
        },
        thoiGian:{
            type: Number,
            required: true,
        },
        //albumId là một khóa ngoại tham chiếu đến bảng Album (model Album).
        albumId: {
            //dùng để liên kết giữa các bảng.
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album',
            required: false,
        }
    },
    //Tự động thêm createdAt và updatedAt nhờ timestamps
     {timestamps: true }
);

export const Song = mongoose.model("Song", songSchema)