type TopTracksItemProps = {
    title: String;
    artist: String;
    rank: Number;
    loading: Boolean;
};

export default function TopTracksItem(props: TopTracksItemProps) {
    if (props.loading) {
        return (
            <div className="grid grid-cols-8 items-center py-2 gap-4 w-full h-full animate-pulse cursor-pointer">
                <div className="ml-6 mr-4 h-4 bg-slate-700 rounded"></div>
                <div className="w-12 h-full bg-gray-800 rounded"></div>
                <div className="flex flex-col col-span-6 gap-2">
                    <div className="w-60 h-6 bg-slate-700 rounded"></div>
                    <div className="w-40 h-4 bg-slate-700 rounded"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-8 items-center py-2 gap-4 w-full h-full">
            <p className="pl-6 pr-4 text-lg">{props.rank.toString()}.</p>
            <div className="w-12 h-full bg-gray-800"></div>
            <div className="flex flex-col col-span-6">
                <p className="text-xl">{props.title}</p>
                <p>{props.artist}</p>
            </div>
        </div>
    );
}
