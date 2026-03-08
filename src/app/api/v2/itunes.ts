import { ResponseTemplate } from "@/app/types/api";
const searchURL = "https://itunes.apple.com/search";

const searchTracks: (
  query: string,
  artist?: string,
  limit?: number,
) => Promise<ResponseTemplate<any>> = async (query, artist, limit = 10) => {
  const url = new URL(searchURL);
  if (artist) {
    query += ` ${artist}`;
  }
  url.search = new URLSearchParams({
    term: query,
    country: "ID",
    media: "music",
    entity: "musicTrack",
    limit: limit.toString(),
  }).toString();
  const request = await fetch(url.toString(), {
    method: "GET",
    next: { revalidate: 0 },
  });
  const data = await request.json();

  if (!request.ok)
    return {
      status: "error",
      data: null,
      message: data.error?.message || "Error fetching data",
    };
  return {
    status: "success",
    data: data,
    message: null,
  };
};

const getTrackArtwork: (
  query: string,
  artist?: string,
) => Promise<ResponseTemplate<string | null>> = async (query, artist) => {
  const searchResult = await searchTracks(query, artist, 1);
  if (searchResult.status === "error") {
    return {
      status: "error",
      data: null,
      message: searchResult.message,
    };
  }
  if (
    searchResult.data.resultCount === 0 ||
    searchResult.data.results.length === 0 ||
    !searchResult.data.results[0].artworkUrl100
  ) {
    return {
      status: "success",
      data: null,
      message: "Not found",
    };
  }
  return {
    status: "success",
    data: searchResult.data.results[0].artworkUrl100,
    message: null,
  };
};

export { getTrackArtwork };
