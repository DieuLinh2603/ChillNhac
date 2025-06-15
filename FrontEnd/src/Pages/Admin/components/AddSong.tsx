import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";

import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong {
	tieuDe: string;
	ngheSi: string;
	album: string;
	thoiGian: string;
}

const AddSong = () => {
  const { albums } = useMusicStore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState<NewSong>({
    tieuDe: "",
    ngheSi: "",
    album: "",
    thoiGian: "0",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  //Xử lý thêm bài hát
  const { getToken } = useAuth(); 
  const handleSubmit = async () => {
  if (!files.audio || !files.image) {
    return toast.error("Vui lòng tải lên cả ảnh và tệp nhạc!");
  }

  setIsLoading(true);

  try {
    const formData = new FormData();

    formData.append("tieuDe", newSong.tieuDe);
    formData.append("ngheSi", newSong.ngheSi);
    formData.append("thoiGian", newSong.thoiGian.toString());

    if (newSong.album && newSong.album !== "none") {
      formData.append("albumId", newSong.album);
    }

    formData.append("audioFile", files.audio);
    formData.append("imageFile", files.image);

    const token = await getToken();

    await axiosInstance.post("/admin/songs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // Reset form state
    setNewSong({
      tieuDe: "",
      ngheSi: "",
      album: "",
      thoiGian: "0",
    });

    setFiles({
      audio: null,
      image: null,
    });

    // Reset input file fields (để UI clear tên file)
    if (audioInputRef.current) audioInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";

    toast.success("Thêm bài hát thành công!");
  } catch (error: any) {
    toast.error("Lỗi thêm bài hát: " + (error?.message ?? "Không xác định"));
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Thêm bài hát
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Thêm bài hát mới</DialogTitle>
          <DialogDescription>
            Thêm một bài hát mới vào thư viện nhạc
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))
            }
          />

          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          {/* Upload ảnh*/}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">Ảnh bài hát</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-black"
                  >
                    Chọn ảnh
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Upload nhạc */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tệp bài hát</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full text-black"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Chọn tệp bài hát"}
              </Button>
            </div>
          </div>

          {/* other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên bài hát</label>
            <Input
              value={newSong.tieuDe}
              onChange={(e) =>
                setNewSong({ ...newSong, tieuDe: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nghệ sĩ</label>
            <Input
              value={newSong.ngheSi}
              onChange={(e) =>
                setNewSong({ ...newSong, ngheSi: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Thời gian (s)</label>
            <Input
              type="number"
              // min="0"
              value={newSong.thoiGian}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  thoiGian: e.target.value ,
                })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album </label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Không có album</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.tieuDe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="border-1 cursor-pointer"
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Đóng
          </Button>
          <Button
            className="cursor-pointer hover:bg-green-400"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Đang cập nhật..." : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSong;
