import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import { getAccessToken } from "../lib";

const nowPlayingAPI = "https://api.spotify.com/v1/me/player/currently-playing";

const getNowPlaying: () => Promise<
    ResponseTemplate<{
        is_playing: boolean;
        rawData: any | null;
    }>
> = async () => {
    const tokenData = await getAccessToken();
    if (tokenData.status === "error")
        return { status: "error", data: { is_playing: false, rawData: null }, message: tokenData.message };
    const response = await fetch(nowPlayingAPI, {
        headers: { Authorization: `Bearer ${tokenData.data.token}` },
        next: { revalidate: 0 },
    });
    if (response.status === 204)
        return { status: "success", data: { is_playing: false, rawData: null }, message: null };
    const data = await response.json();
    if (!response.ok)
        return {
            status: "error",
            data: {
                is_playing: false,
                rawData: null,
            },
            message: "now playing data" + (process.env.NODE_ENV === "development" ? ": " + data.error?.message : ""),
        };
    return { status: "success", data: { is_playing: true, rawData: data }, message: null };
};

interface PlayingData {
    is_playing: boolean;
    playing_data: {
        timestamp: number;
        progress: number;
        type: string;
        item: {
            album: {
                href: string;
                imageUrl: string;
                name: string;
            };
            artist: {
                href: string;
                name: string;
            };
            duration: number;
            href: string;
            name: string;
        } | null;
    } | null;
}

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
    if (npData.data.is_playing === false) {
        return NextResponse.json(
            { status: "success", data: { is_playing: false, playing_data: null }, message: null },
            {
                headers: corsRules,
            }
        );
    }
    const response = npData.data.rawData;
    return NextResponse.json(
        {
            status: "success",
            data: {
                is_playing: response.is_playing,
                playing_data: {
                    timestamp: response.timestamp,
                    progress: Math.round(response.progress_ms / 1000),
                    type: response.currently_playing_type,
                    item:
                        response.currently_playing_type === "track"
                            ? {
                                  album: {
                                      href: response.item.album.external_urls.spotify,
                                      imageUrl: response.item.album.images[0].url,
                                      name: response.item.album.name,
                                  },
                                  artist: {
                                      href: response.item.artists[0].external_urls.spotify,
                                      name: response.item.artists[0].name,
                                  },
                                  duration: Math.round(response.item.duration_ms / 1000),
                                  href: response.item.external_urls.spotify,
                                  name: response.item.name,
                              }
                            : null,
                },
            },
            message: null,
        },
        {
            headers: corsRules,
        }
    );
}
