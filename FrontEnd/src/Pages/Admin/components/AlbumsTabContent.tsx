
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbum from "./AddAlbum";

const AlbumsTabContent = () => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-violet-500" />
              Thư viện Album
            </CardTitle>
            <CardDescription>Quản lý album</CardDescription>
          </div>
          {/* Component Add Album */}
          <AddAlbum/>
        </div>
      </CardHeader>

{/* Bảng */}
      <CardContent>
        <AlbumsTable/>
      </CardContent>
    </Card>
  );
};

export default AlbumsTabContent;
