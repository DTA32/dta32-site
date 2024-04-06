import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NowPlayingSkeleton() {
    return (
        <>
            <a href="https://open.spotify.com/user/t56tgotgnyyhud9rkhvbabz7a">
                <FontAwesomeIcon icon={faSpotify} className="text-6xl text-slate-500" />
            </a>
            <div className="flex flex-col justify-center w-11/12 h-full self-center items-center">
                <div className="flex flex-col gap-6 justify-center p-8 rounded-xl bg-gray-500/50 text-zinc-200 backdrop-blur-md w-fit">
                    <h3 className="text-2xl text-center">Now Playing</h3>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 animate-pulse cursor-pointer">
                        <div className="bg-slate-500 w-64 h-64 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                            <div className="w-40 bg-slate-700 h-4 rounded"></div>
                            <div className="w-60 bg-slate-700 h-8 rounded"></div>
                            <div className="w-52 bg-slate-700 h-6 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
