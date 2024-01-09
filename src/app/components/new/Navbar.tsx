import Spotify from "../Spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className="py-2 w-full bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex justify-between text-white px-4 items-center absolute top-0 z-20">
      <div>
        <p className="select-none text-3xl text-center">DTA32</p>
      </div>
      <div className="w-10 h-10 flex justify-center items-center hover:bg-gray-300/25 rounded-lg cursor-pointer">
        <FontAwesomeIcon icon={faSun} />
      </div>
    </div>
  );
}
