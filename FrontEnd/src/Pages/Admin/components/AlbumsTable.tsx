import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMusicStore } from "@/stores/useMusicStore"
import { Calendar, Music,  Trash2 } from "lucide-react"
import { useEffect } from "react"

const AlbumsTable = () => {
  const {albums, deleteAlbum, fetchAlbums} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  },[fetchAlbums])
  console.log(albums)
  return (
    <Table className="text-white">
			<TableHeader className="text-white">
				<TableRow className='hover:bg-zinc-800/50'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead>Tên Album</TableHead>
					<TableHead>Nghệ sĩ</TableHead>
					<TableHead>Năm phát hành</TableHead>
					<TableHead>Bài hát</TableHead>
					<TableHead className='text-right'>Hành động</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{albums.map((album) => (
					<TableRow key={album._id} className='hover:bg-zinc-800/50'>
						<TableCell>
							<img src={album.imageUrl} alt={album.tieuDe} className='w-10 h-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium'>{album.tieuDe}</TableCell>
						<TableCell>{album.ngheSi}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{album.namPhatHanh}
							</span>
						</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Music className='h-4 w-4' />
								{album.songs.length} bài hát
							</span>
						</TableCell>
						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => deleteAlbum(album._id)}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
  )
}

export default AlbumsTable