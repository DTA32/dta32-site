import HomeOverlay from "../components/new/HomeOverlay";
import Blog from "../components/new/Blog";
import Spotify from "../components/new/Spotify";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Contact from "../components/new/Contact";
import Footer from "../components/new/Footer";
import dynamic from "next/dynamic";
config.autoAddCss = false;

const Suusss = dynamic(
    () => import('@/app/components/new/Suusss'),
    { ssr: false }
);

export default function Page() {
    return (
        <div>
            <div id="home" className="h-screen max-h-screen snap-center">
                <Suusss />
                <HomeOverlay />
            </div>
            <div id="blog" className="h-screen max-h-screen snap-center">
                <Blog />
            </div>
            <div id="spotify" className="h-screen max-h-screen snap-center">
                <Spotify />
            </div>
            <div id="contact" className="h-screen max-h-screen snap-center relative">
                <Contact />
                <div className="absolute bottom-0 left-0 w-full h-8 text-white/50">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
