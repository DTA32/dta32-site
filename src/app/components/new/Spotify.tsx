"use client";
import NowPlayingFull from "./NowPlayingFull";
import NowPlayingSkeleton from "./NowPlayingSkeleton";
import TopTracks from "./TopTracks";
import { Suspense } from "react";
import TopTracksSkeleton from "./TopTracksSkeleton";

export default function Spotify() {
    return (
        <div className="w-full h-full py-6 md:py-12 overflow-hidden relative">
            <div className="spotify-bg absolute inset-0 -z-10"></div>
            <div className="flex flex-col lg:flex-row justify-between w-full h-full gap-8 lg:gap-16 overflow-y-auto lg:overflow-y-none lg:overflow-x-auto container">
                <div className="flex flex-col w-full h-full gap-4 lg:gap-0">
                    <Suspense fallback={<NowPlayingSkeleton />}>
                        <NowPlayingFull />
                    </Suspense>
                </div>
                <div className="flex justify-center lg:justify-end w-full h-full">
                    <Suspense fallback={<TopTracksSkeleton />}>
                        <TopTracks />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
