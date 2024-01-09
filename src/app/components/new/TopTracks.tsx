import TopTracksItem from "./TopTracksItem";

const TracksPlaceholder = () => {
    var tracks: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
        tracks.push(<TopTracksItem key={i} rank={i + 1} title={"Lorem Ipsum"} artist={"Dolor sit amet"} loading={true} />);
    }
    return tracks;
};

export default function TopTracks() {
    return (
        <div className="rounded-xl bg-gray-500 w-full h-full flex flex-col">
            <div className="rounded-t-xl bg-gray-600 w-full flex flex-col text-center text-white p-2">
                <h1 className="text-3xl">Top 10 tracks</h1>
                <h2 className="text-lg">November 2023</h2>
            </div>
            <div className="flex flex-col divide-y overflow-y-auto">{TracksPlaceholder()}</div>
        </div>
    );
}
