import { User } from "../models/userModel.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    //Kiểm tra user đã tồn tại chưa
    //Tìm trong MongoDB một người dùng có clerkId bằng id được truyền
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Nếu chưa có, thì đăng ký user mới
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next();
  }
};
