import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { use } from "react";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchNowPlaying() {
    return new Promise<any>(async (resolve, reject) => {
        await axios
            .get(`${serverURL}/api/v2/spotify/nowPlaying`, {
                headers: {
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            })
            .then((res) => {
                if (res.data.status === "error") reject(console.error("error!!", res));
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(console.error("error!", err));
            });
    });
}

const promise = fetchNowPlaying();

export default function NowPlayingFull() {
    const fetchedData = use(promise);

    const isOffline = fetchedData.is_playing === false && fetchedData.playing_data === null;
    const isNotTrack = fetchedData.playing_data?.type !== "track";

    const vinyl = (
        <div className="bg-slate-500 w-64 h-64 aspect-square rounded-full">
            {isOffline || isNotTrack ? null : (
                <Image
                    src={fetchedData.playing_data?.item.album.imageUrl}
                    alt={`${fetchedData.playing_data?.item.album.name} album art`}
                    width={256}
                    height={256}
                    className={`rounded-full w-full h-full aspect-square ${
                        fetchedData.is_playing ? "animate-[spin_5s_linear_infinite]" : ""
                    }`}
                    loading="lazy"
                    unoptimized={true}
                />
            )}
        </div>
    );

    const details = (
        <div className="flex flex-col gap-4">
            {isOffline ? (
                <>
                    <h2 className="text-4xl">Currently offline</h2>
                    <h4 className="text-2xl">Check again later?</h4>
                </>
            ) : isNotTrack ? (
                <>
                    <h2 className="text-4xl">Either an ad or podcast</h2>
                    <small>spotify api couldn&apos;t return data for this one</small>
                </>
            ) : (
                <>
                    <a target="_blank" href={fetchedData.playing_data.item.artist.href} className="text-xl">
                        {fetchedData.playing_data.item.artist.name}
                    </a>
                    <a target="_blank" href={fetchedData.playing_data.item.href} className="text-4xl">
                        {fetchedData.playing_data.item.name}
                    </a>
                    <a target="_blank" href={fetchedData.playing_data.item.album.href} className="text-2xl">
                        {fetchedData.playing_data.item.album.name}
                    </a>
                </>
            )}
        </div>
    );

    const lastUpdated: string = !isOffline ? new Date(fetchedData.playing_data.timestamp).toLocaleString() : "unknown";

    return (
        <>
            <div>
                <a
                    title="Click to go to my profile"
                    target="_blank"
                    href="https://open.spotify.com/user/t56tgotgnyyhud9rkhvbabz7a"
                >
                    <FontAwesomeIcon
                        icon={faSpotify}
                        className={`text-6xl ${isOffline ? "text-slate-500" : "text-green-500"} `}
                    />
                </a>
            </div>
            <div className="flex flex-col justify-center w-11/12 h-full self-center items-center">
                <div className="flex flex-col gap-6 justify-center p-8 rounded-xl bg-gray-500/50 text-zinc-200 backdrop-blur-md w-fit">
                    <h3
                        title={fetchedData.playing_data ? `Last updated ${lastUpdated}` : "Offline"}
                        className="text-2xl text-center"
                    >
                        Now Playing
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                        {vinyl}
                        {details}
                    </div>
                </div>
            </div>
        </>
    );
}
