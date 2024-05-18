"use client";
import Typewriter from "typewriter-effect";
import words from "../../data/footer.json";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-row justify-between items-center bg-slate-950 px-4 h-8 text-white">
            <small className="select-none" data-telurpaskah="new version coming soon">
                <Typewriter
                    options={{
                        strings: words,
                        autoStart: true,
                        loop: true,
                    }}
                />
            </small>
            <Link href="/new">
                <small className="">&#169; 2023 DTA32</small>
            </Link>
        </footer>
    );
}
