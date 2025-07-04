import { Card, CardContent } from "@/components/ui/card";
import type React from "react"

type CardProps = {
    icon: React.ElementType;
    label: string;
    value: string;
    bgColor: string;
    iconColor: string;
}
const CardThongKe = ({ bgColor, icon: Icon, iconColor, label, value }: CardProps) => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors h-20 flex justify-center'>
			<CardContent className='p-6'>
				<div className='flex items-center gap-4'>
					<div className={`p-3 rounded-lg ${bgColor}`}>
						<Icon className={`size-6 ${iconColor}`} />
					</div>
					<div>
						<p className='text-sm text-zinc-400'>{label}</p>
						<p className='text-2xl font-bold text-amber-50'>{value}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CardThongKe