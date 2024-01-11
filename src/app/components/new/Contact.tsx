"use client";

import { Suspense } from "react";
import ContactSkeleton from "./ContactSkeleton";
import ContactList from "./ContactList";
import { useContactList } from "@/app/lib/promises";

export default function Contact() {
    return (
        <div className="container flex flex-col mx-auto items-center gap-8 h-full py-8 md:py-16 px-4 md:px-0">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-4xl">Contact</h1>
                <p>and links</p>
            </div>
            <div className="px-16 md:px-32 w-full h-full">
                <Suspense fallback={<ContactSkeleton />}>
                    <ContactList promise={useContactList()} />
                </Suspense>
            </div>
        </div>
    );
}
