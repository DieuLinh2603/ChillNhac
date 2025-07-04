//import { SignedIn, SignedOut, SignOutButton, UserButton}
import {  SignedOut, UserButton} from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "../SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import SeachBar from "./SeachBar";

const Topbar = () => {
  const {isAdmin} = useAuthStore();
  //console.log(isAdmin)
  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
    backdrop-blur-md z-10"
    >
      <div className="flex gap-2 items-center">
        <img src="/logo.png" className="size-8" alt="Chill Nhac" />
        Chill Nhac
        </div>
        <SeachBar/>
      <div className="flex items-center gap-4 ">

        

        {isAdmin && (
          <Link to={"/admin"} className={cn(buttonVariants({variant: "ghost"}))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Trang Admin
          </Link>
        )}

        {/* Đăng xuất */}
        {/* <SignedIn>
          <SignOutButton>
            Đăng xuất
          </SignOutButton>
        </SignedIn> */}
        {/* Hiển thị nút Google */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton/>
      </div>
    </div>
  );
};

export default Topbar;
