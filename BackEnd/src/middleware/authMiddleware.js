import { clerkClient,  getAuth } from "@clerk/express";

//Yêu cầu đăng nhập
export const protectRoute = async (req, res, next) => {
  // console.log(getAuth(req).userId)
  // if (!req.auth.userId) {
  //   return res.status(401).json({ message: "Unauthorized access" });
  // }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Bạn chưa đăng nhập" });
  }
  // Nếu đã xác thực thành công → tiếp tục xử lý route
  next();
};

//Yêu cầu phải là Admin
export const requireAdmin = async (req, res, next) => {
  try {
      const { userId } = getAuth(req);
    const currentUser = await clerkClient.users.getUser(userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized access - you must be an admin" });
    } else{
      
    }
    // Nếu đã xác thực thành công → tiếp tục xử lý route
    next();
  } catch (error) {
    next(error)
  }
};
