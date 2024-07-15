"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const currentPath = usePathname();
    const isBlog: boolean = currentPath.startsWith("/blog");

    return (
        <div
            className={`py-2 w-full ${
                isBlog ? "bg-[#c3b091] bg-opacity-60" : "bg-gray-300 bg-opacity-10 text-white"
            } bg-clip-padding backdrop-filter backdrop-blur-sm flex justify-between  px-4 items-center absolute top-0 z-20`}
        >
            <Link href="/">
                <p className="select-none text-3xl text-center">DTA32</p>
            </Link>
            <div
                className={`w-10 h-10 flex justify-center items-center ${
                    isBlog ? "hover:bg-[#c3b091]/25" : "hover:bg-gray-300/25"
                } rounded-lg cursor-pointer`}
            >
                <FontAwesomeIcon icon={faSun} />
            </div>
        </div>
    );
}
