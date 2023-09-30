import { NextResponse } from "next/server";
import querystring from "querystring";

const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
const basicAuth = process.env.NEXT_PUBLIC_SPOTIFY_BASIC_AUTH;
const nowPlayingAPI = "https://api.spotify.com/v1/me/player/currently-playing";
const tokenAPI = "https://accounts.spotify.com/api/token";

export const dynamic = "force-dynamic";

const getAccessToken = async () => {
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
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  return response;
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(nowPlayingAPI, {
    headers: { Authorization: `Bearer ${access_token}` },
    next: { revalidate: 200 },
  });
  if (response.status === 204) return NextResponse.json({ is_playing: false });
  return response.json();
};

export async function GET() {
  const response = await getNowPlaying();
  if (response.error?.status) {
    return NextResponse.json({ error: response.error });
  }
  if (response.is_playing === false || !Object.keys(response).length) {
    return NextResponse.json({ is_playing: false });
  }
  return NextResponse.json(response);
}
