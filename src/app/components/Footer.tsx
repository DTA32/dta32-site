"use client";
import Typewriter from "typewriter-effect";
import words from "../data/footer.json";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between items-center bg-slate-950 px-4 h-8 text-white">
      <small className="select-none" data-telurpaskah="oh hey, you found me">
        <Typewriter
          options={{
            strings: words,
            autoStart: true,
            loop: true,
          }}
        />
      </small>
      <small className="">&#169; 2023 DTA32</small>
    </footer>
  );
}
