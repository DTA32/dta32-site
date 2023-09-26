"use client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const serverURL =
  process.env.NEXT_PUBLIC_NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://dta32.github.io";

export default function Spotify() {
  const { data, error, isLoading } = useSWR(
    `${serverURL}/api/spotify`,
    fetcher
  );
  if (isLoading)
    return (
      <div className="hidden lg:block h-2/3 select-none w-[360px]">
        <div className="flex flex-row px-2 h-full w-full items-center gap-x-2 animate-pulse">
          <div className="bg-slate-700 h-10 w-10"></div>
          <div className="grid grid-rows-2 h-full gap-y-2">
            <div className="bg-slate-700 h-2 w-24 rounded self-end"></div>
            <div className="bg-slate-700 h-4 w-48 rounded"></div>
          </div>
        </div>
      </div>
    );
  if (error || !data)
    return (
      <div className="hidden lg:block h-2/3 select-none w-[360px]">
        <div className="flex flex-row px-2 h-full w-full items-center gap-x-2 ">
          <div>
            <FontAwesomeIcon icon={faSpotify} size="2x" color="red" />
          </div>
          <div className="grid grid-rows-2 h-full">
            <p className="text-gray-300 text-xs self-end">
              Spotify listening activity
            </p>
            <p className="truncate w-full text-sm">Error fetching data</p>
          </div>
        </div>
      </div>
    );

  let isPlaying = data.is_playing;
  return (
    <a
      href={
        isPlaying
          ? data.item.external_urls.spotify
          : "https://open.spotify.com/user/t56tgotgnyyhud9rkhvbabz7a"
      }
      className="hidden lg:block h-2/3 select-none w-[360px]"
    >
      <div className="group relative h-full w-full">
        <div className="flex flex-row px-2 h-full w-full items-center gap-x-2 group-hover:brightness-[0.25] duration-300">
          <div>
            {isPlaying ? (
              <Image
                src={data.item.album.images[0].url}
                alt={`${data.item.name} album art`}
                width={40}
                height={40}
              />
            ) : (
              <FontAwesomeIcon icon={faSpotify} size="2x" color="gray" />
            )}
          </div>
          <div className="grid grid-rows-2 h-full">
            <p className="text-gray-300 text-xs self-end">
              {isPlaying
                ? "Currently listening to"
                : "click to view my profile :3"}
            </p>
            <p className="truncate w-full">
              {isPlaying
                ? `${data.item.artists[0].name} - ${data.item.name}`
                : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex opacity-0 group-hover:opacity-100 absolute inset-0 h-full w-full duration-300">
          <p className="my-auto mx-auto text-center py-1 px-2 text-sky-300 after:content-['_↗']">
            Open in Spotify
          </p>
        </div>
      </div>
    </a>
  );
}
