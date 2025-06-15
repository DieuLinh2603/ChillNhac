import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import ThanhTrangThai from "./components/ThanhTrangThai";
import AudioPlayer from "./components/AudioPlayer";
import PlayControls from "@/Pages/Home/components/PlayControls";

const MainLayout = () => {





  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction={"horizontal"} className="flex-1 flex h-full overflow-hidden p-2">
        {/* Phát nhạc */}
        <AudioPlayer/>


        {/* Thanh bên trái */}
        <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
            <LeftSidebar/>
        </ResizablePanel>

{/* Thu giảm chiều bên trái main */}
        <ResizableHandle className="w-2 bg-black rounded-b-lg transition-colors" />

        {/* Ở giữagiữa*/}
        <ResizablePanel>
          <Outlet />
        </ResizablePanel>

{/* Thu giảm chiều bên phải main */}
        <ResizableHandle className="w-2 bg-black rounded-b-lg transition-colors" />

        {/* Thanh bên phải */}
        <ResizablePanel defaultSize={20}>
          {/* <ThanhTrangThai/> */}
          <ThanhTrangThai/>
          </ResizablePanel>
       
      </ResizablePanelGroup>
      {/* Thanh điều khiển */}
      <PlayControls/>
    </div>
  );
};

export default MainLayout;
