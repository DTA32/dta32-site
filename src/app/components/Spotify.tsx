import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export default function Spotify() {
  return (
    <a
      href="https://open.spotify.com/user/t56tgotgnyyhud9rkhvbabz7a"
      className="hidden lg:block h-2/3 border border-slate-600 w-[360px]"
    >
      <div className="flex flex-row px-2 h-full w-full items-center gap-x-2">
        <div>
          <FontAwesomeIcon icon={faSpotify} size="2x" />
        </div>
        <div className="grid grid-rows-2 h-full">
          <p className="text-gray-300 text-xs self-end">
            Currently listening to
          </p>
          <p className="truncate w-full text-sm">
            Tame Impala - The Less I Know The Better
          </p>
        </div>
      </div>
    </a>
  );
}
