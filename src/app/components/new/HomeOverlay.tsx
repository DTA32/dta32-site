"use client";
import Typewriter from "typewriter-effect";

export default function HomeOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 text-xl w-full h-full">
      <Typewriter
        options={{
          strings: ["new version coming soon...", "DTA32 was not the Impostor"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}
