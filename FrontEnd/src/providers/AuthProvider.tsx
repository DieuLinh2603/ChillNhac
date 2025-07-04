import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

//Kiểm tra tính xác thực và thêm token
const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};


const AuthProvider = ({children} : {children:React.ReactNode}) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const {checkAdminStatus} = useAuthStore();
  const {initSocket, disconnectSocket} = useChatStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);

        if (token && userId) {
          await checkAdminStatus();

          //Khởi tạo kết nối giữa client và server
          if(userId)
          {
            initSocket(userId)
          }
        }


      } catch (error) {
        updateApiToken(null);
        console.error("Lỗi khi khởi tạo Auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    //Xoas
    return () => disconnectSocket()
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin"/>
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
