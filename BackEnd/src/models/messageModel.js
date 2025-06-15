import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    id_NguoiGui: {
        type: String,
        required: true
    },
    id_NguoiNhan: {
        type: String,
        required: true
    },
    noiDung: {
        type: String,
        required: true
    }
},
    //Tự động thêm createdAt và updatedAt nhờ timestamps
     {timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema)