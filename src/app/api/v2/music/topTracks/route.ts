import { NextResponse } from "next/server";
import {ResponseTemplate, TrackItem} from "@/app/types/api";
import {getTopTracksDatabase} from "@/app/api/v2/lib";
import {getTopTracks} from "@/app/api/v2/lastfm";
import {TopTracksResponse} from "@/app/types/api";

export const revalidate = 86400;

const corsRules: { [key in string]: string } = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(): Promise<NextResponse<ResponseTemplate<TopTracksResponse | null>>> {
    const musicProviderData: ResponseTemplate<TrackItem[]> = await getTopTracks();
    const databaseData: ResponseTemplate<TrackItem[]> = await getTopTracksDatabase();
    const musicProviderRecent = musicProviderData.status !== "error" && musicProviderData.data ? musicProviderData.data : [];
    const databaseRecent = databaseData.status !== "error" && databaseData.data ? databaseData.data : [];

    const mergedSongs = [...databaseRecent, ...musicProviderRecent]
    const now = new Date();
    const period = now.toLocaleString("default", { month: "long" }) + " " + now.getFullYear();
    return NextResponse.json({
        status: "success",
        data: {
            period: period,
            tracks: mergedSongs,
        },
        message: null,
    }, { headers: corsRules });
}
