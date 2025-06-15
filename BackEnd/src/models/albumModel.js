import mongoose from "mongoose";

//Tạo một MongoDB model tên là User có các trường bên dưới 
const albumSchema = new mongoose.Schema({
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
        namPhatHanh:{
            type: Number,
            required: true,
        },
        songs: [{type: mongoose.Schema.Types.ObjectId, ref: "Song"}],
    },
    //Tự động thêm createdAt và updatedAt nhờ timestamps
     {timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema)