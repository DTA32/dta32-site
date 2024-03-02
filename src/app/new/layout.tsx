import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DTA32",
    description: "DTA32 Personal Website v2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth snap-y snap-mandatory ">
            <body className={jakarta.className}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
