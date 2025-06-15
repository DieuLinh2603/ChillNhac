import type { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import { Link } from "react-router-dom";

type props = {
  title: string;
  songs: Song[];
  isLoading: boolean;
}

const SectionGrid = ({title,songs, isLoading} : props) => {
 // console.log(title,songs,isLoading)
  if(isLoading) return <SectionGridSkeleton/>
  return (
    <div className="mb-8 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold ml-5"> {title}</h2>
        <Button className="text-zinc-400 hover:text-emerald-500 cursor-pointer" variant={'link'}>
          
        <Link to="/songs"> Xem tất cả</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div key={song._id} className="bg-zinc-800/4 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer">
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img src={song.imageUrl} alt={song.tieuDe} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
              </div>
              
              <PlayButton song={song}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGrid