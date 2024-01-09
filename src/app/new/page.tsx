import HomeOverlay from "../components/new/HomeOverlay";
import Navbar from "../components/new/Navbar";
import Suusss from "../components/new/Suusss";
import Blog from "../components/new/Blog";
import Spotify from "../components/new/Spotify";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Contact from "../components/new/Contact";
config.autoAddCss = false;

export default function Page() {
    return (
        <div>
            <div id="home" className="h-screen max-h-screen snap-center">
                <Navbar />
                <Suusss />
                <HomeOverlay />
            </div>
            <div id="blog" className="h-screen max-h-screen snap-center bg-zinc-200">
                <Blog />
            </div>
            <div id="spotify" className="h-screen max-h-screen snap-center bg-zinc-400">
                <Spotify />
            </div>
            <div id="contact" className="h-screen max-h-screen snap-center bg-zinc-200">
                <Contact />
            </div>
        </div>
    );
}
