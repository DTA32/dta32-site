import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/new/Navbar";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DTA32",
    description: "DTA32 Personal Website v2",
    authors: [{ name: "DTA32" }],
    icons: "favicon.ico",
    openGraph: {
        title: "DTA32",
        description: "DTA32 Personal Website v2",
        type: "website",
        url: "https://dta32.my.id",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={jakarta.className}>
                <Navbar />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
