import TopTracksItem from "./TopTracksItem";

const TracksPlaceholder = () => {
    var tracks: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
        tracks.push(<TopTracksItem key={i} />);
    }
    return tracks;
};

export default function TopTracksSkeleton() {
    return (
        <div className="rounded-xl bg-gray-500/50 w-1/2 h-full flex flex-col min-w-fit text-zinc-200 backdrop-blur-md">
            <div className="rounded-t-xl bg-gray-600/50 w-full flex flex-col items-center text-white p-2 backdrop-blur-md">
                <h1 className="text-3xl">Top tracks</h1>
                <div className="w-40 bg-slate-700 h-6 rounded animate-pulse mt-1"></div>
            </div>
            <div className="flex flex-col divide-y overflow-y-auto">{TracksPlaceholder()}</div>
        </div>
    );
}
