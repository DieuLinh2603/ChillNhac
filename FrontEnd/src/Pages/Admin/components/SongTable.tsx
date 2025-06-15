import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore"
import { Calendar, Trash2 } from "lucide-react";


const SongTable = () => {
    const {songs, isLoading, deleteSong}= useMusicStore();
    //console.log(songs)
    
    if(isLoading)
    {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-zinc-400">Đang tải bài hát...</div>
            </div>
        )
    }
  return (
    <Table >
        <TableHeader >
            <TableRow className='hover:bg-zinc-800/50 ' >
					<TableHead className='w-[50px]'></TableHead>
					<TableHead>Tên bài hát</TableHead>
					<TableHead>Nghệ sĩ</TableHead>
					<TableHead>Ngày tạo</TableHead>
					<TableHead className='text-right'>Hành động</TableHead>
				</TableRow>
        </TableHeader>
            {songs.map((song) => (
                <TableRow key={song._id} className="hover:bg-zinc-800/50">
                    <TableCell>
                        <img src={song.imageUrl} alt={song.tieuDe} className="size-10 rounded object-cover"/>
                    </TableCell>
                    <TableCell className='font-medium'>{song.tieuDe}</TableCell>
					<TableCell>{song.ngheSi}</TableCell>

{/* Ngày tạo */}
                    <TableCell>
						<span className='inline-flex items-center gap-1 text-zinc-400'>
							<Calendar className='h-4 w-4' />
							{song.createdAt.split("T")[0]}
						</span>
					</TableCell>

{/* Hành động */}
                    <TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant={"ghost"}
									size={"sm"}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10  cursor-pointer'
									onClick={() => deleteSong(song._id)}
								>
									<Trash2 className='size-4' />
								</Button>
							</div>
						</TableCell>
                </TableRow>
            ))}
        <TableBody>

        </TableBody>
    </Table>
  )
}

export default SongTable