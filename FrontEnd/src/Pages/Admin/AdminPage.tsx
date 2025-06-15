import { useAuthStore } from "@/stores/useAuthStore"
import HeaderAdmin from "./components/HeaderAdmin";
import DashboardThongKe from "./components/DashboardThongKe";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";



const AdminPage = () => {
    const {isAdmin, isLoading} = useAuthStore();
    const{fetchAlbums, fetchSongs, fetchThongKe} = useMusicStore();

    useEffect(() => {
      //fetchAlbums
      fetchAlbums();
      //fetchSongs
      fetchSongs();
      //fetchThongKe
      fetchThongKe()
    },[fetchAlbums,fetchSongs,fetchThongKe])

    if(!isAdmin && !isLoading) return <div>Admin</div>
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
        <HeaderAdmin/>
            
        <DashboardThongKe/>

        <Tabs defaultValue="songs" className="space-y-6">
          <TabsList className="p-1 bg-zinc-800/50">
{/* Tab bài hát */}
            <TabsTrigger value="songs" className="p-3 cursor-pointer">
              <Music className="mr-2 size-4"/>
              Bài Hát
            </TabsTrigger>

{/* Tab Album */}
            <TabsTrigger value="albums" className="p-3 cursor-pointer">
              <Album className="mr-1 size-4"/>
              Albums
            </TabsTrigger>
          </TabsList>


          <TabsContent value="songs">
            <SongsTabContent/>
          </TabsContent>
          <TabsContent value="albums">
            <AlbumsTabContent/>
          </TabsContent>

        </Tabs>

    </div>
  )
}

export default AdminPage