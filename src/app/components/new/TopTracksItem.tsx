import Image from "next/image";

type TopTracksItemProps = {
    data?: {
        rank: number;
        imageUrl: string;
        title: string;
        artist: string;
        link: string;
    };
};

export default function TopTracksItem(props: TopTracksItemProps) {
    if (props.data === null || props.data === undefined) {
        return (
            <div className="grid grid-cols-8 items-center py-2 gap-4 w-full h-full animate-pulse cursor-pointer">
                <div className="w-4 h-4 bg-slate-700 rounded justify-self-center"></div>
                <div className="w-12 h-full bg-gray-800 rounded"></div>
                <div className="flex flex-col col-span-6 gap-2">
                    <div className="w-60 h-6 bg-slate-700 rounded"></div>
                    <div className="w-40 h-4 bg-slate-700 rounded"></div>
                </div>
            </div>
        );
    }
    return (
        <a target="_blank" href={props.data.link} className="grid grid-cols-8 items-center py-2 gap-2 w-full h-full">
            <p className="text-lg text-center">{props.data.rank === 0 ? "★" : props.data.rank.toString()}</p>
            <Image
                src={props.data.imageUrl}
                alt={props.data.title}
                width={48}
                height={48}
                unoptimized={true}
                loading="lazy"
            />
            <div className="flex flex-col col-span-6">
                <h4 className="text-xl">{props.data.title}</h4>
                <h6>{props.data.artist}</h6>
            </div>
        </a>
    );
}
