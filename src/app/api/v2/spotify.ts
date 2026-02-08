import {PlayingData, ResponseTemplate, TrackItem} from "@/app/types/api";
import querystring from "querystring";
import {NextResponse} from "next/server";

const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
const basicAuth = process.env.NEXT_PUBLIC_SPOTIFY_BASIC_AUTH;
const tokenAPI = "https://accounts.spotify.com/api/token";
const searchAPI = "https://api.spotify.com/v1/search";
const topTracksAPI = "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term";
const nowPlayingAPI = "https://api.spotify.com/v1/me/player/currently-playing";

const getAccessToken: () => Promise<ResponseTemplate<{ token: string | null }>> = async () => {
  const response = await fetch(tokenAPI, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    next: { revalidate: 0 },
  });
  const data = await response.json();
  if (!response.ok)
    return {
      status: "error",
      data: {
        token: null,
      },
      message: "API token" + (process.env.NODE_ENV === "development" ? ": " + data.error?.message : ""),
    };
  return { status: "success", data: { token: data.access_token }, message: null };
};


const fetchNowPlaying: () => Promise<
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

const fetchTopTracks: () => Promise<ResponseTemplate<any[] | null>> = async () => {
  const tokenData = await getAccessToken();
  if (tokenData.status === "error")
    return { status: "error", data: null, message: "Error fetching " + tokenData.message };
  const response = await fetch(topTracksAPI, {
    headers: { Authorization: `Bearer ${tokenData.data.token}` },
    next: { revalidate: 0 },
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

const getNowPlaying: () => Promise<ResponseTemplate<PlayingData>> = async () => {
  const npData = await fetchNowPlaying();
  if (npData.status === "error") {
    return {
      status: "error",
      data: {is_playing: false, playing_data: null},
      message: "Error fetching " + npData.message,
    }
  }
  if (npData.data.is_playing === false) {
    return { status: "success", data: { is_playing: false, playing_data: null }, message: null }
  }
  const response = npData.data.rawData;
  return {
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
    }
}

const getTopTracks: () => Promise<ResponseTemplate<TrackItem[]>> = async () => {
  const spotifyData = await fetchTopTracks();
  if (spotifyData.status === "error")
    return { status: "error", data: [], message: spotifyData.message };
  if (spotifyData.data === null || spotifyData.data.length === 0)
    return { status: "error", data: [], message: "No top tracks found" };
  const tracks: TrackItem[] = spotifyData.data.map((song, i) => {
    return {
      rank: i + 1,
      imageUrl: song.album.images[0].url,
      title: song.name,
      artist: song.artists[0].name,
      link: song.external_urls.spotify,
    }
  });
  
  return {
    status: "success",
    data: tracks,
    message: null,
  }
}

const searchTrack: ({ track, artist }: { track: string; artist: string }) => Promise<
  ResponseTemplate<any>
> = async ({ track, artist }) => {
  const tokenData = await getAccessToken();
  if (tokenData.status === "error")
    return { status: "error", data: null, message: tokenData.message };
  const search = new URL(searchAPI);
  search.search = querystring.stringify({
    q: `track:"${track}" artist:"${artist}"`,
    type: "track",
    limit: 1,
  });
  const response = await fetch(search.toString(), {
    headers: { Authorization: `Bearer ${tokenData.data.token}` },
    next: { revalidate: 0 },
  });
  const data = await response.json();
  if (!response.ok)
    return {
      status: "error",
      data: null,
      message: data.error?.message || "Error fetching data from spotify",
    };
  return { status: "success", data: data, message: null };
};

export { getNowPlaying, getTopTracks, searchTrack }