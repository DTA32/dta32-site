import querystring from "querystring";
import {PlayingData, ResponseTemplate, TrackItem} from "@/app/types/api";
import { searchTrack } from "@/app/api/v2/spotify";

const apiKey = process.env.LAST_FM_API_KEY
const API = "https://ws.audioscrobbler.com/2.0/"

const fetchRecentTracks: (
  {limit}: {limit?: number}
) => Promise<ResponseTemplate<any>> = async (
  {limit = 10}
) => {
  const url = new URL(API);
  url.search = querystring.stringify({
    method: "user.getrecenttracks",
    user: "dta32_",
    api_key: apiKey,
    format: "json",
    limit: limit,
  });
  const request = await fetch(
    url.toString(),
    {
      method: "GET",
      next: {revalidate: 0},
    }
  );
  const data: any = await request.json();

  if (!request.ok)
    return {
      status: "error",
      data: null,
      message: data.error?.message || "Error fetching data"
    };
  return {
    status: "success",
    data: data,
    message: null,
  }
}

const fetchTopTracks: () => Promise<ResponseTemplate<any>> = async () => {
  const url = new URL(API);
  url.search = querystring.stringify({
    method: "user.gettoptracks",
    user: "dta32_",
    api_key: apiKey,
    format: "json",
    period: "1month",
    limit: 10,
  });
  const request = await fetch(
    url.toString(),
    {
      method: "GET",
      next: {revalidate: 0},
    }
  );
  const data: any = await request.json();

  if (!request.ok)
    return {
      status: "error",
      data: null,
      message: data.error?.message || "Error fetching data"
    };
  return {
    status: "success",
    data: data,
    message: null,
  }
}

const searchSpotifyTrack: ({ songId, title, artist }: { songId: string; title: string; artist: string }) => Promise<any> = async ({ songId, title, artist }) => {
  const track = await searchTrack({track: title, artist: artist});
  if(
    !track.data || !track.data.tracks || track.data.tracks.items.length === 0 
    || !track.data.tracks.items[0] || !track.data.tracks.items[0].album || !track.data.tracks.items[0].album.images 
    || track.data.tracks.items[0].album.images.length === 0) {
    return { songId: songId, imageUrl: null};
  }
  const imageUrl = track.data.tracks.items[0].album.images[0].url
  const songUrl = track.data.tracks.items[0].external_urls && track.data.tracks.items[0].external_urls.spotify ? track.data.tracks.items[0].external_urls.spotify : null;
  return { songId: songId, imageUrl: imageUrl, songUrl: songUrl};
}

const getTopTracks: () => Promise<
  ResponseTemplate<TrackItem[]>
> = async () => {
  const musicData = await fetchTopTracks();
  const data = musicData.data;
  
  if (musicData.status === "error")
    return {
      status: "error",
      data: [],
      message: musicData.message
    };
  if (
    !data.toptracks
    || !data.toptracks.track
    || data.toptracks.track.length === 0
  ) {
    return {status: "success", data: [], message: null};
  }
  
  // as lastfm cant return image, search from spotify instead
  const [...trackImage] = await Promise.all(
    data.toptracks.track.map(async (track: any) => {
      const songId = track.url ? track.url : track.name;
      const artistName = track.artist && track.artist.name ? track.artist.name : "";
      const trackName = track.name ? track.name : "";
      return searchSpotifyTrack({songId: songId, title: trackName, artist: artistName});
    }
  ));
  
  const tracks: TrackItem[] = data.toptracks.track.map((track: any, index: number) => {
    const spotifyData = trackImage.find((img: any) => img.songId === (track.url ? track.url : track.name))
    const imageUrl = spotifyData ? spotifyData.imageUrl : "";
    const artistName = track.artist && track.artist.name ? track.artist.name : "";
    const trackName = track.name ? track.name : "";
    const trackUrl = spotifyData && spotifyData.songUrl ? spotifyData.songUrl : track.url ? track.url : "";
    return {
      rank: index + 1,
      imageUrl: imageUrl,
      title: trackName,
      artist: artistName,
      link: trackUrl,
    };
  });
  
  return {
    status: "success",
    data: tracks,
    message: null,
  }
}

const getNowPlaying: () => Promise<
  ResponseTemplate<PlayingData>
> = async () => {
  const musicData = await fetchRecentTracks({limit: 1});
  if (musicData.status === "error")
    return {
      status: "error",
      data: {is_playing: false, playing_data: null},
      message: musicData.message
    };
  
  const data = musicData.data;
  if (
    !data.recenttracks
    || !data.recenttracks.track
    || data.recenttracks.track.length === 0
    || !data.recenttracks.track[0]["@attr"]
    || data.recenttracks.track[0]["@attr"].nowplaying !== "true"
  ) {
    return {status: "success", data: {is_playing: false, playing_data: null}, message: null};
  }
  
  const nowPlaying = data.recenttracks.track[0];
  const albumUrl =
    nowPlaying.artist && nowPlaying.album
      ? `https://www.last.fm/music/${encodeURIComponent(nowPlaying.artist["#text"])}/${encodeURIComponent(nowPlaying.album["#text"])}`
      : "";
  const albumImageUrl =
    nowPlaying.image && nowPlaying.image.length > 0
      ? nowPlaying.image.map((img: any) => img).filter((img: any) => img.size === "extralarge")[0]["#text"]
      : "";
  const albumName = nowPlaying.album ? nowPlaying.album["#text"] : "";
  const albumData = {
    href: albumUrl,
    imageUrl: albumImageUrl,
    name: albumName,
  }
  const artistUrl =
    nowPlaying.artist
      ? `https://www.last.fm/music/${encodeURIComponent(nowPlaying.artist["#text"])}`
      : "";
  const artistName = nowPlaying.artist ? nowPlaying.artist["#text"] : "";
  const artistData = {
    href: artistUrl,
    name: artistName,
  }
  const href = nowPlaying.url ? nowPlaying.url : "";
  const trackName = nowPlaying.name ? nowPlaying.name : "";

  return {
    status: "success",
    data: {
      is_playing: true,
      playing_data: {
        timestamp: 0,
        progress: 0,
        type: "track",
        item: {
          album: albumData,
          artist: artistData,
          duration: 0,
          href: href,
          name: trackName,
        },
      }
    },
    message: null,
  }
};

export { getNowPlaying, getTopTracks };