import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DTA32",
    description: "DTA32 Personal Website v2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth snap-y snap-mandatory ">
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
