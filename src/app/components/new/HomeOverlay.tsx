"use client";
import Typewriter from "typewriter-effect";

export default function HomeOverlay() {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 text-xl w-full h-full p-4">
            <Typewriter
                options={{
                    strings: [
                        "Welcome to DTA32's Personal Web!",
                        "new version and still under construction",
                        "DTA32 was not the Impostor. ∞ Impostor remain.",
                    ],
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>
    );
}
