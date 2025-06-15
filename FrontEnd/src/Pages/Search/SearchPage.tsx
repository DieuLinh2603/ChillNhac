import Topbar from "@/components/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import PlayButton from "../Home/components/PlayButton";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatThoiGian } from "../Album/AlbumPage";

const SearchPage = () => {
  const { query, searchSongs, searchResults } = useMusicStore();

  useEffect(() => {
    searchSongs(query || "");
    console.log(searchResults);
  }, [query, searchSongs]);

  console.log(searchResults.albums);

  return (
    <>
      <Topbar />
<ScrollArea className="h-[calc(100vh-180px)]">
  {searchResults.albums.length > 0 || searchResults.songs.length > 0 ? (
    <div className="flex min-h-[600px] space-y-6 bg-zinc-800 ">
      {/* Hiển thị album tìm kiếm nếu có */}
      {searchResults.albums.length > 0 && (
        <div className="w-1/2 m-5">
          <p className="font-medium text-2xl">Albums</p>
          {searchResults.albums.map((album) => (
            <div
              key={album._id}
              className="bg-zinc-900 p-2.5 mt-5 rounded-2xl"
            >
              <Link to={`/albums/${album._id}`}>
                <img
                  src={album.imageUrl}
                  alt={album.tieuDe}
                  className="w-20 h-20 rounded object-cover m-4"
                />
                <p className="font-medium text-3xl mt-5 hover:underline hover:decoration-1 hover:underline-offset-2">
                  {album.tieuDe}
                </p>
                <p>{album.ngheSi}</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Hiển thị bài hát nếu có */}
      {searchResults.songs.length > 0 && (
        <div className="w-1/2 m-5">
          <p className="font-medium text-2xl">Bài hát</p>
          {searchResults.songs.map((song) => (
            <div
              key={song._id}
              className="bg-zinc-800/4 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer w-full"
            >
              <div className="rounded-md p-4 shadow-lg overflow-hidden flex items-center relative bg-zinc-900">
                <div className="flex items-center space-x-3">
                  <img
                    src={song.imageUrl}
                    alt={song.tieuDe}
                    className="w-10 h-10 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div>
                    <p>{song.tieuDe}</p>
                    <p>{song.ngheSi}</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center">
                  <p className="text-sm text-right">
                    {formatThoiGian(song.thoiGian)}
                  </p>
                  <PlayButton song={song} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    // Nếu không có albums và songs
    <div className="flex items-center justify-center min-h-[600px] text-zinc-300 text-xl">
      Không tìm thấy nội dung phù hợp
    </div>
  )}
</ScrollArea>

    </>
  );
};

export default SearchPage;
