export default function Navbar() {
  return (
    <nav className="bg-slate-900 flex flex-row md:justify-between px-8 h-[10vh] items-center sticky top-0 justify-center">
      <div className="flex flex-row gap-x-20 text-white items-center">
        <h2 className="text-4xl select-none">DTA32</h2>
        <div className="md:flex flex-row gap-x-10 text-2xl hidden">
          <a href="#home" className="hover:underline hover:underline-offset-1">
            Home
          </a>
          <a href="#about" className="hover:underline hover:underline-offset-1">
            About
          </a>
          <a
            href="#portfolio"
            className="hover:underline hover:underline-offset-1"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="hover:underline hover:underline-offset-1"
          >
            Contact
          </a>
        </div>
      </div>
      <div
        style={{ width: "300px", backgroundColor: "white" }}
        className="md:flex h-4/6 content-center text-black items-center hidden"
      >
        Placeholder for spotify listening activity
      </div>
    </nav>
  );
}
