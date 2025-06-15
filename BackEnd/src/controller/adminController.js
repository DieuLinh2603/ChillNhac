import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import cloudinary from "../lib/cloudinary.js";

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({admin: true});
}


const uploadToCloudinary = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.log("Error in uploadToCloudinary", error);
		throw new Error("Error uploading to cloudinary");
	}
};



//Tạo bài hát
export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Vui lòng tải lên tất cả các tệp!" });
    }

    const { tieuDe, ngheSi, albumId, thoiGian } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      tieuDe,
      ngheSi,
      audioUrl,
      imageUrl,
      thoiGian,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (err) {
    console.log("Error in creatSong", err);
    next(err);
  }
};


//Xóa bài hát
export const deleteSong = async (req, res,next) => {
    try {
        //id = id url
        const {id} = req.params

        const song = await Song.findById(id);

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id},
            })
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({message : "Xóa bài hát thành công!"});
    } catch (error) {
        console.log("Error in deleteSong", error)
        next(error);
    }
}


//Tạo Album
export const createAlbum = async (req, res, next) => {
	try {
		const { tieuDe, ngheSi, namPhatHanh } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			tieuDe,
			ngheSi,
			imageUrl,
			namPhatHanh
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};



//Xóa Album
export const deleteAlbum = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId : id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Xóa album thành công!"});

    } catch (error) {
        console.log("Error in deleteAlbum", error)
        next(error);
    }
}