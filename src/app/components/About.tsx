import Image from "next/image";
import AboutTechStack from "./AboutTechStack";

export default function About() {
  return (
    <section
      className="min-h-[90vh] bg-slate-900 flex flex-col md:flex-row items-center justify-center px-8 md:px-16 xl:px-32 gap-12 lg:gap-20 py-8"
      id="about"
    >
      <Image
        src="/meh.gif"
        alt="meh"
        width={480}
        height={480}
        className="w-1/2 sm:w-1/3 lg:w-auto max-w-[400px]"
      />
      <div className="flex flex-col gap-4 w-full text-white">
        <h1 className="text-3xl md:text-4xl">About Me</h1>
        <div className="text-md sm:text-lg md:text-xl flex flex-col gap-8">
          <p>
            A normal human being <small>(sometimes NPC)</small> that&apos;s also
            tech-geek, <small>(a little)</small> melophile, and gamer. Currently
            studying at BINUS University{" "}
            <small>(yes the photo is not on binus)</small>, majoring in Computer
            Science. Interested in web development <small>(for now)</small>, but
            also have learned about algorithms, data structures, database,
            desktop app development, and UI/UX design.
          </p>
          <AboutTechStack />
        </div>
      </div>
    </section>
  );
}
