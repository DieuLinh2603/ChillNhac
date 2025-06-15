import { Button } from '@/components/ui/button';
import { useAuth } from "@clerk/clerk-react";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { axiosInstance } from '@/lib/axios';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Plus, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const UploadImage = () => {
    const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [newAlbum, setNewAlbum] = useState({
		tieuDe: "",
		ngheSi: "",
		namPhatHanh: new Date().getFullYear(),
	});
	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

    // Xuử lý thêm album
    const { getToken } = useAuth(); 
    const handleSubmit = async () => {
		setIsLoading(true);

		try {
			if (!imageFile) {
				return toast.error("Vui lòng chọn ảnh upload");
			}

			const formData = new FormData();
			formData.append("tieuDe", newAlbum.tieuDe);
			formData.append("ngheSi", newAlbum.ngheSi);
			formData.append("namPhatHanh", newAlbum.namPhatHanh.toString());
			formData.append("imageFile", imageFile);

            const token = await getToken()
			await axiosInstance.post("/admin/albums", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
				},
			});

			setNewAlbum({
				tieuDe: "",
				ngheSi: "",
				namPhatHanh: new Date().getFullYear(),
			});
			setImageFile(null);
			setAlbumDialogOpen(false);
			toast.success("Tạo album thành công!");
		} catch (error: any) {
			toast.error("Tạo album không thành công!: " + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
			<DialogTrigger asChild>
				<Button className='bg-violet-500 hover:bg-violet-600 text-white'>
					<Plus className='mr-2 h-4 w-4' />
					Thêm Album
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-zinc-900 border-zinc-700'>
				<DialogHeader>
					<DialogTitle>Thêm Album Mới</DialogTitle>
					<DialogDescription>Thêm một Album mới!</DialogDescription>
				</DialogHeader>
				<div className='space-y-4 py-4'>
					<input
						type='file'
						ref={fileInputRef}
						onChange={handleImageSelect}
						accept='image/*'
						className='hidden'
					/>
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => fileInputRef.current?.click()}
					>
						<div className='text-center'>
							<div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
								<Upload className='h-6 w-6 text-zinc-400' />
							</div>
							<div className='text-sm text-zinc-400 mb-2'>
								{imageFile ? imageFile.name : "Tải lên ảnh bìa album"}
							</div>
							<Button variant='outline' size='sm' className='text-xs text-black'>
								Chọn tệp
							</Button>
						</div>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Tên Album</label>
						<Input
							value={newAlbum.tieuDe}
							onChange={(e) => setNewAlbum({ ...newAlbum, tieuDe: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
							placeholder='Nhập tên Album'
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Nghệ sĩ</label>
						<Input
							value={newAlbum.ngheSi}
							onChange={(e) => setNewAlbum({ ...newAlbum, ngheSi: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
							placeholder='Nhập tên nghệ sĩ/Nhiều nghệ sĩ'
						/>
					</div>
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Năm phát hành</label>
						<Input
							type='number'
							value={newAlbum.namPhatHanh}
							onChange={(e) => setNewAlbum({ ...newAlbum, namPhatHanh: parseInt(e.target.value) })}
							className='bg-zinc-800 border-zinc-700'
							min={1900}
							max={new Date().getFullYear()}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button className='text-black' variant='outline' onClick={() => setAlbumDialogOpen(false)} disabled={isLoading}>
						Đóng
					</Button>
					<Button
						onClick={handleSubmit}
						className='bg-violet-500 hover:bg-violet-600 cursor-pointer' 
						disabled={isLoading || !imageFile || !newAlbum.tieuDe || !newAlbum.ngheSi}
					>
						{isLoading ? "Creating..." : "Thêm"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UploadImage;
