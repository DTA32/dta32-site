import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export default function NowPlayingFull() {
    const isLoading: boolean = true; // TODO: Implement loading state
    if (isLoading)
        return (
            <>
                <a href="https://open.spotify.com/user/t56tgotgnyyhud9rkhvbabz7a">
                    <FontAwesomeIcon icon={faSpotify} className="text-6xl text-green-500" />
                </a>
                <div className="flex flex-col w-11/12 gap-6 h-full justify-center self-center">
                    <h3 className="text-2xl text-center">Now Playing</h3>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-pulse cursor-pointer">
                        <div className="bg-slate-500 w-64 h-64"></div>
                        <div className="flex flex-col gap-4">
                            <div className="w-40 bg-slate-700 h-4 rounded"></div>
                            <div className="w-60 bg-slate-700 h-8 rounded"></div>
                            <div className="w-52 bg-slate-700 h-6 rounded"></div>
                        </div>
                    </div>
                </div>
            </>
        );

    return (
        <>
            <a href="https://open.spotify.com/user/t56tgotgnyyhud9rkhvbabz7a">
                <FontAwesomeIcon icon={faSpotify} className="text-6xl text-green-500" />
            </a>
            <div className="flex flex-col w-11/12 gap-6 h-full justify-center self-center">
                <h3 className="text-2xl text-center">Now Playing</h3>
                <div className="flex justify-center items-center gap-4">
                    <div className="bg-gray-500 w-64 h-64"></div>
                    <div className="flex flex-col gap-4">
                        <h6 className="text-xl">Artist</h6>
                        <h2 className="text-4xl">Song Title</h2>
                        <h4 className="text-2xl">Album</h4>
                    </div>
                </div>
            </div>
        </>
    );
}
