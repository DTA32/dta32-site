import TopTracksItem from "./TopTracksItem";
import axios from "axios";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

function fetchTopTracks() {
    return new Promise<any>(async (resolve, reject) => {
        await axios
            .get(`${serverURL}/api/v2/spotify/topTracks`)
            .then((res) => {
                if (res.data.status === "error") reject(new Error(res.data.message));
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err));
            });
    });
}

export default async function TopTracks() {
    const data = await fetchTopTracks();
    return (
        <div className="rounded-xl bg-gray-500/50 w-1/2 h-full flex flex-col min-w-fit text-zinc-200 backdrop-blur-md">
            <div className="rounded-t-xl bg-gray-600/50 w-full flex flex-col items-center p-2 backdrop-blur-md">
                <h1 className="text-3xl">Top tracks</h1>
                <h2 className="text-lg">{data.period}</h2>
            </div>
            <div className="flex flex-col divide-y overflow-y-auto">
                {data.tracks.map((track: any, i: any) => {
                    return <TopTracksItem key={i} data={track} />;
                })}
            </div>
        </div>
    );
}
