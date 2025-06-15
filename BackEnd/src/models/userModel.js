import mongoose from "mongoose";

//Tạo một MongoDB model tên là User có các trường bên dưới 
const userSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        clerkId:{
            type: String,
            required: true,
            unique: true,
        },
    },
    //Tự động thêm createdAt và updatedAt nhờ timestamps
     {timestamps: true }
);

export const User = mongoose.model("User", userSchema)