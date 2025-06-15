import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react"
import { useMusicStore } from "@/stores/useMusicStore"
import PlaylistSkeleton from "@/components/Khung/PlaylistSkeleton"

const LeftSidebar = () => {

    const {albums, fetchAlbums, isLoading} = useMusicStore();

    useEffect(() => {
        fetchAlbums()
    },[fetchAlbums])

    //console.log({albums})
  return (
    <div className="h-full flex flex-col gap-2">
        {/* Trên  */}
        <div className="rounded-b-lg bg-zinc-900 p-4">
            <div className="space-y-2">
                <Link to={"/"} className={cn(buttonVariants(
                    {
                        variant: "ghost",
                        className: "w-full justify-start text-white "
                    }
                ))}>
                    <HomeIcon className="mr-2 size-5"/>
                    <span className="hidden md:inline"> Trang Chủ</span>
                </Link>

                <SignedIn>
                    <Link to={"/chat"} className={cn(buttonVariants(
                    {
                        variant: "ghost",
                        className: "w-full justify-start text-white "
                    }
                ))}>
                    <MessageCircleIcon className="mr-2 size-5"/>
                    <span className="hidden md:inline"> Nhắn tin</span>
                </Link>
                </SignedIn>
            </div>
        </div>

{/* Dưới */}
        <div className="flex-1 rounded-lg bg-zinc-800 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="size-5 mr-2"/>
                    <span className="hidden md:inline">Danh sách phát</span>
                </div>
            </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (<PlaylistSkeleton/>) : 
                        (albums.map((album) => (
                            <Link to={`/albums/${album._id}`} key={album._id}
                            className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                            >
                                <img src={album.imageUrl} className="size-12 rounded-md flex-shirnk-0 object-cover"/>

                                <div className="flex-1 min-w-0 hidden md:block">
                                    <p className="font-medium truncate">{album.tieuDe}</p>
                                    <p className="text-sm text-zinc-400 truncate"> Album - {album.ngheSi}</p>
                                </div>
                            </Link>
                        )))}
                    </div>
                </ScrollArea>
        </div>
    </div>

    
  )
}

export default LeftSidebar