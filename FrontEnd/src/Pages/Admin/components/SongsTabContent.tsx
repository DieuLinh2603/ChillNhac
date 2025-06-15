
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongTable from "./SongTable";
import AddSong from "./AddSong";


const SongsTabContent = () => {
  return (
    <Card className="bg-zinc-800 text-white" >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 ">
              <Music className="size-5  text-emerald-500" />
              Thư Viện Bài Hát
            </CardTitle>
            <CardDescription>Quản lý bài hát</CardDescription>
          </div>
          <AddSong/>
        </div>
      </CardHeader>
      <CardContent>
        <SongTable/>
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
