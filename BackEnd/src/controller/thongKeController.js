
import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import {User} from "../models/userModel.js"
export const getThongKe = async (req, res, next) => {
  try {
    const [tongBaiHat, tongAlbum, uniqueArtist, tongNguoiDung] = await Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        {
          $group: {
            _id: "$ngheSi",
          },
        },
        {
          $count: "count",
        },
      ]),
      User.countDocuments(),
    ]);

    res.status(200).json({
      tongBaiHat,
      tongAlbum,
      tongNgheSi: uniqueArtist[0]?.count || 0,
      tongNguoiDung,
    });
  } catch (error) {
    next(error);
  }
};
