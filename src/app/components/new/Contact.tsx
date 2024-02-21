"use client";

import { Suspense } from "react";
import ContactSkeleton from "./ContactSkeleton";
import ContactList from "./ContactList";
import { useContactList } from "@/app/lib/promises";

export default function Contact() {
    return (
        <div className="flex flex-col w-full text-zinc-200 items-center gap-4 md:gap-8 h-full py-8 md:py-16 px-4 md:px-0 bg-[url('/background/contact.jpg')] bg-no-repeat bg-cover bg-right">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-4xl">Contact</h1>
                <p>and links</p>
            </div>
            <div className="md:px-32 w-full h-full">
                <Suspense fallback={<ContactSkeleton />}>
                    <ContactList promise={useContactList()} />
                </Suspense>
            </div>
        </div>
    );
}
