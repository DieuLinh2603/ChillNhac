import { Server } from "socket.io";
import { Message } from "../models/messageModel.js"

export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	});

	//tạo 2 Map lưu trạng thái
	const userSockets = new Map(); // { userId: socketId}
	const userActivities = new Map(); // {userId: activity}

	//Khi có một client kết nối
	io.on("connection", (socket) => {
		socket.on("user_connected", (userId) => {
			userSockets.set(userId, socket.id);
			userActivities.set(userId, "Không nghe nhạc");

			// // gửi thông báo đến tất cả người khác
			io.emit("user_connected", userId);

			// gửi danh sách người online cho người mới
			socket.emit("users_online", Array.from(userSockets.keys()));

			// gửi trạng thái hoạt động đến tất cả
			io.emit("activities", Array.from(userActivities.entries()));
		});

		//Khi ngươif dùng hoạt động -> Phát đến tất cả socket biết là người đó đang làm gì
		socket.on("update_activity", ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			userActivities.set(userId, activity);
			io.emit("activity_updated", { userId, activity });
		});

		socket.on("send_message", async (data) => {
			try {
				const { id_NguoiGui, id_NguoiNhan, noiDung } = data;

				const message = await Message.create({
					id_NguoiGui,
					id_NguoiNhan,
					noiDung,
				});

				// gửi đến người nhận theo thời gian thực, nếu họ đang online
				const receiverSocketId = userSockets.get(id_NguoiNhan);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message); //// gửi tin nhắn theo thời gian thực
				}

				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);
			}
		});

		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				//tìm người dùng bị ngắt kết nối
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
		});
	});
};