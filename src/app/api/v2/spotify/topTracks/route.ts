import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import { getAccessToken } from "../lib";
import { song } from "@prisma/client";
import prisma from "@/app/api/v2/lib";

const spotifyAPI = "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term";

const fetchSpotify: () => Promise<ResponseTemplate<any[] | null>> = async () => {
    const tokenData = await getAccessToken();
    if (tokenData.status === "error")
        return { status: "error", data: null, message: "Error fetching " + tokenData.message };
    const response = await fetch(spotifyAPI, {
        headers: { Authorization: `Bearer ${tokenData.data.token}` },
        next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 43200 },
    });
    const data = await response.json();
    if (!response.ok)
        return {
            status: "error",
            data: null,
            message:
                "Error fetching data from spotify" +
                (process.env.NODE_ENV === "development" ? ": " + data.error?.message : ""),
        };
    return { status: "success", data: data.items, message: null };
};

const fetchDatabase: () => Promise<ResponseTemplate<song[] | null>> = async () => {
    try {
        const songs = await prisma.song.findMany({
            where: {
                active: true,
            },
        });
        return {
            status: "success",
            data: songs,
            message: null,
        };
    } catch (error: any) {
        return {
            status: "error",
            data: null,
            message:
                "Error fetching data from database" +
                (process.env.NODE_ENV === "development" ? ": " + error.message : ""),
        };
    }
};

interface TopTracksData {
    favorite: boolean;
    imageUrl: string;
    title: string;
    artist: string;
    link: string;
}

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<ResponseTemplate<TopTracksData[] | null>>> {
    const spotifyData = await fetchSpotify();
    if (spotifyData.status === "error")
        return NextResponse.json({ status: "error", data: null, message: spotifyData.message });
    const databaseData = await fetchDatabase();
    if (databaseData.status === "error")
        return NextResponse.json({ status: "error", data: null, message: databaseData.message });
    const dbSongs =
        databaseData.data === null
            ? new Array()
            : databaseData.data.map((song) => {
                  return {
                      favorite: true,
                      imageUrl: song.imageUrl,
                      title: song.title,
                      artist: song.artist,
                      link: song.link,
                  };
              });
    const spotifySongs =
        spotifyData.data === null
            ? null
            : spotifyData.data.map((song) => {
                  return {
                      favorite: false,
                      imageUrl: song.album.images[0].url,
                      title: song.name,
                      artist: song.artists[0].name,
                      link: song.external_urls.spotify,
                  };
              });

    const mergedSongs = dbSongs.concat(spotifySongs);
    return NextResponse.json({
        status: "success",
        data: mergedSongs,
        message: null,
    });
}
