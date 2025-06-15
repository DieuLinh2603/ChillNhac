import { Message } from "../models/messageModel.js";
import {User} from "../models/userModel.js"
import { getAuth } from "@clerk/express";
export const getAllUsers = async (req, res, next) => {
    try {
        //hiện tất cả ngoại trừ mình 
        const  {userId}  = getAuth(req);
        const users = await User.find({clerkId: {$ne: userId}})
        //console.log(users)
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getMessage = async (req, res, next) => {
    try {
        const {userId} = getAuth(req);
        const {nguoiNhan} = req.params;

        const message = await Message.find({
            $or: [
                {id_NguoiGui: userId, id_NguoiNhan: nguoiNhan},
                {id_NguoiGui: nguoiNhan, id_NguoiNhan: userId}
            ]
        }).sort({createdAt: 1});

        res.status(200).json(message);
    } catch (error) {
        next(error)
    }
}