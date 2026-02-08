import { NextResponse } from "next/server";
import {PlayingData, ResponseTemplate} from "@/app/types/api";
import {getNowPlaying} from "@/app/api/v2/lastfm";

export const dynamic = "force-dynamic";

const corsRules: { [key in string]: string } = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(): Promise<NextResponse<ResponseTemplate<PlayingData>>> {
    const npData = await getNowPlaying();
    if (npData.status === "error") {
        return NextResponse.json(
            {
                status: "error",
                data: { is_playing: false, playing_data: null },
                message: "Error fetching " + npData.message,
            },
            {
                headers: corsRules,
            }
        );
    }
    if (!npData.data.is_playing) {
        return NextResponse.json(
            { status: "success", data: { is_playing: false, playing_data: null }, message: null },
            {
                headers: corsRules,
            }
        );
    }
    return NextResponse.json(
        npData,
        {
            headers: corsRules,
        }
    );
}
