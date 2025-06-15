import { Song } from "../models/songModel.js";
export const getAllSongs = async (req, res, next) => {
  try {
    // - 1: bài hát mới nhất sẽ lên trên, cũ sẽ xuống dưới (còn 1 thì ngược lại)
    const songs = await Song.find().sort({ createAt: -1 });
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    //goi 6 bai hat ngau nhien su dung mongodb aggregate()
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          tieuDe: 1,
          ngheSi: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    //goi 4 bai hat ngau nhien su dung mongodb aggregate()
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          tieuDe: 1,
          ngheSi: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    //goi 4 bai hat ngau nhien su dung mongodb aggregate()
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          tieuDe: 1,
          ngheSi: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};
