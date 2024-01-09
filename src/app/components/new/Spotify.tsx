import NowPlayingFull from "./NowPlayingFull";
import TopTracks from "./TopTracks";

export default function Spotify() {
    return (
        <div className="container mx-auto h-full py-6 md:py-12 px-4 md:px-0 gap-8">
            <div className="flex justify-between w-full h-full gap-16 overflow-x-auto">
                <div className="flex flex-col w-full h-full">
                    <NowPlayingFull />
                </div>
                <div className="w-3/4 h-full p-4">
                    <TopTracks />
                </div>
            </div>
        </div>
    );
}
