import Image from "next/image";

export default function About() {
  return (
    <section
      className="min-h-[90vh] bg-slate-900 flex flex-col md:flex-row items-center justify-center px-8 md:px-16 xl:px-32 gap-12 lg:gap-20"
      id="about"
    >
      <Image
        src="/meh.gif"
        alt="meh"
        width={480}
        height={480}
        className="w-1/2 sm:w-1/3 lg:w-auto max-w-[400px]"
      />
      <div className="flex flex-col gap-6 w-full text-white">
        <h1 className="text-3xl md:text-4xl">About Me</h1>
        <p className="text-md sm:text-lg md:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>
  );
}
