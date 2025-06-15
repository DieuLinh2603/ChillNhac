import FeaturedGridSkeleton from "@/components/Khung/FeaturedGridSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"
import PlayButton from "./PlayButton"
const DacSacSongs = () => {
   const {isLoading,featuredSongs, error} = useMusicStore()
  //  console.log(featuredSongs)
  //  console.log('hi')
   if(isLoading) return <FeaturedGridSkeleton/>

   if(error) return <p className="text-red-500 mb-4 text-lg">{error}</p>
  return (

    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {featuredSongs.map((song) => (
          <div key={song._id} className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50
          transition-colors group cursor-pointer relative">
            <img src={song.imageUrl} alt={song.tieuDe} className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"/>
            <div className="flex-1 p-4">
              <p className="font-medium truncate">{song.tieuDe}</p>
              <p className="text-sm text-zinc-400 truncate">{song.ngheSi}</p>
            </div>
             {/* Nút play */}
          <PlayButton song={song}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DacSacSongs