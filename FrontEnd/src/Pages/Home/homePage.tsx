import Topbar from "@/components/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import DacSacSongs from "./components/DacSacSongs";
import { ScrollArea } from "@/components/ui/scroll-area";

import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
    const {
        isLoading,
        featuredSongs, fetchFeaturedSongs,
        madeForYouSongs, fetchMadeForYouSongs,
        trendingSongs, fetchTrendingSongs
    } = useMusicStore();

    const {initializeQueue} = usePlayerStore()
    useEffect(() => {
        fetchFeaturedSongs();
        fetchMadeForYouSongs();
        fetchTrendingSongs();
    },[fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs])

    //chuyển bài trong trang chủ
    useEffect(() => {
        if(madeForYouSongs.length > 0 && featuredSongs.length> 0 && trendingSongs.length > 0)
        {
            const allSongs = [...featuredSongs,...madeForYouSongs, ...trendingSongs];
            initializeQueue(allSongs);
        }
    }, [initializeQueue, madeForYouSongs,trendingSongs,featuredSongs])
   // console.log(featuredSongs, madeForYouSongs,trendingSongs,isLoading)
    return (
       <main className="rounded-md overflow-hiddenh-full bg-gradient-to-b from-zinc-800 to-zince-900 ">
        <Topbar/>
        <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-6" >
                    Đặc Sắc
                </h1>
             <DacSacSongs/>
            </div>

            <div className="space-y-8">
                <SectionGrid title="Dành Cho Bạn" songs={madeForYouSongs} isLoading={isLoading}/>
                <SectionGrid title="Thịnh Hành" songs={trendingSongs} isLoading={isLoading}/>

            </div>
        </ScrollArea>
       </main>
    )
}

export default HomePage;