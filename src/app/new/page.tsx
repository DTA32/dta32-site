import HomeOverlay from "../components/new/HomeOverlay";
import Navbar from "../components/new/Navbar";
import Suusss from "../components/new/Suusss";

export default function Page() {
  return (
    <div>
      <div className="h-screen max-h-screen">
        <Navbar />
        <Suusss />
        <HomeOverlay />
      </div>
      {/* <div className="h-screen max-h-screen bg-gray-500"></div> */}
    </div>
  );
}
