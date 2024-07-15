import querystring from "querystring";
import { ResponseTemplate } from "../../../types/api";

const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
const basicAuth = process.env.NEXT_PUBLIC_SPOTIFY_BASIC_AUTH;
const tokenAPI = "https://accounts.spotify.com/api/token";

export const getAccessToken: () => Promise<ResponseTemplate<{ token: string | null }>> = async () => {
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
