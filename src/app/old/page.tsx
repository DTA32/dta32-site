import Home from "../components/old/Home";
import About from "../components/old/About";
import Portfolio from "../components/old/Portfolio";
import Contact from "../components/old/Contact";
import Navbar from "../components/old/Navbar";
import Footer from "../components/old/Footer";

export default function Page() {
    return (
        <div>
            <Navbar />
            <main>
                <Home />
                <About />
                <Portfolio />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
