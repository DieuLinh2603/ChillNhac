import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";

function removeVietnameseTones(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export const Search = async (req, res) => {
  const query = req.query.q;
  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm" });
  }

  const keyword = removeVietnameseTones(query || "");

  try {
    const allSongs = await Song.find({});
    const allAlbums = await Album.find({});

    const songs = allSongs.filter((song) =>
      removeVietnameseTones(song.tieuDe).includes(keyword)
    );

    const albums = allAlbums.filter((album) =>
      removeVietnameseTones(album.tieuDe).includes(keyword)
    );

    res.json({ songs, albums });
  } catch (err) {
    console.error("Lỗi khi tìm kiếm:", err);
    res.status(500).json({ message: "Lỗi khi tìm kiếm" });
  }
};
