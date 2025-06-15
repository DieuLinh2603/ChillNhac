import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatThoiGian = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;

}

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const {isPlaying, currentSong, playAlbum,togglePlay} = usePlayerStore()

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

//Phát all bài hát trong Album (nút phát lớn nhất)
const handlePlayAlbum = () => {
  if(!currentAlbum) return;
  const isCurrentAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id);
  if(isCurrentAlbumPlaying) togglePlay();
  else {
    //phát từ bài đầu
    playAlbum(currentAlbum?.songs, 0)
  }
}


//Phát bài hát đã chọn trong album
  const handlePlaySong = (index: number) => {
    if(!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index)
  }
  return (
    <div className="h-full">
      
      <ScrollArea className="h-full rounded-md">
        {/* Main */}
        <div className="relative min-h-full">
          {/* gradient cho background - inset- 0 */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80
           via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.tieuDe}
                className="w-[240px] h-[240px] shadow-xl rounded object-cover"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.tieuDe}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.ngheSi}
                  </span>
                  <span>⦿ {currentAlbum?.songs.length} bài hát</span>
                  <span> ⦿ {currentAlbum?.namPhatHanh}</span>
                </div>
              </div>
            </div>

            {/* Nút play phát all */}
            <div className="px-6 pb-4 flex items-center gap-6 ">
              <Button onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer"
              >
                {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) 
                ? (<Pause className="h-7 w-7"/>) 
                : (<Play className="h-7 w-7 text-black " />)}
              </Button>
            </div>

            {/* Table */}
            <div className="bg-black/20 ">
              {/* Header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Tiêu đề</div>
                <div>Ngày phát hành</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

            
              {/* Danh sách bài hát */}
            <div className='px-6'>
								<div className='space-y-2 py-4'>
									{currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id
										return (
											<div
												key={song._id}
                        onClick={() => handlePlaySong(index)}
												className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}
											>
												<div className='flex items-center justify-center'>
												
													{isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♬</div>
                          ) : (
                            <span className="group-hover:hidden">{index+1}</span>
                          )}
													
													{!isCurrentSong && (
														<Play className='h-4 w-4 hidden group-hover:block' />
                          )}
													
												</div>

												<div className='flex items-center gap-3'>
													<img src={song.imageUrl} alt={song.tieuDe} className='size-10' />

													<div>
														<div className={`font-medium text-white`}>{song.tieuDe}</div>
														<div>{song.ngheSi}</div>
													</div>
												</div>
												<div className='flex items-center'>{song.createdAt.split("T")[0]}</div>
												<div className='flex items-center'>{ formatThoiGian(song.thoiGian)}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
