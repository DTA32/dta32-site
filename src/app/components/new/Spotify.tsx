"use client";
import NowPlayingFull from "./NowPlayingFull";
import NowPlayingSkeleton from "./NowPlayingSkeleton";
import TopTracks from "./TopTracks";
import { Suspense } from "react";
import TopTracksSkeleton from "./TopTracksSkeleton";

export default function Spotify() {
    return (
        <div className="w-full h-full py-6 md:py-12 px-8 overflow-hidden relative">
            <div className="spotify-bg absolute inset-0 -z-10"></div>
            <div className="flex justify-between w-full h-full gap-16 overflow-x-auto">
                <div className="flex flex-col w-full h-full">
                    <Suspense fallback={<NowPlayingSkeleton />}>
                        <NowPlayingFull />
                    </Suspense>
                </div>
                <Suspense fallback={<TopTracksSkeleton />}>
                    <TopTracks />
                </Suspense>
            </div>
        </div>
    );
}
