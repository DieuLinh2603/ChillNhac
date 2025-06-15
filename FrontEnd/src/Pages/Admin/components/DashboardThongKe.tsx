import { useMusicStore } from "@/stores/useMusicStore"
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import CardThongKe from "./CardThongKe";

const DashboardThongKe = () => {
  const {thongke} = useMusicStore()
  //console.log("thongke:", thongke);
  console.log(thongke)

const Data = [
  {
    icon: ListMusic,
    label: "Bài Hát",
    value: thongke.tongBaiHat.toString() ,
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: Library,
    label: "Album",
    value: thongke.tongAlbum.toString(),
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    icon: Users2,
    label: "Nghệ Sĩ",
    value: thongke.tongNgheSi.toString(),
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    icon: PlayCircle,
    label: "Người Dùng",
    value: thongke.tongNguoiDung.toLocaleString(),
    bgColor: "bg-sky-500/10",
    iconColor: "text-sky-500",
  },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {Data.map((item) => (
        <CardThongKe 
        key={item.label}
        icon={item.icon}
        label={item.label}
        value={item.value}
        bgColor={item.bgColor}
        iconColor={item.iconColor}/>
      ))}
    </div>
  )
}

export default DashboardThongKe