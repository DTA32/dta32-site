"use client";

import { Suspense } from "react";
import BlogSkeleton from "./BlogSkeleton";
import BlogList from "./BlogList";

export default function Blog() {
    return (
        <div className="container flex flex-col mx-auto items-center gap-16 h-full py-8 md:py-16 px-4">
            <div className="flex flex-col space-y-5 text-center">
                <h1 className="text-4xl">Blog</h1>
                <h2 className="text-2xl">tutorial, quotes, random story, rant, etc.</h2>
            </div>
            <div className="flex gap-12 overflow-x-auto w-full snap-x h-fit">
                <Suspense fallback={<BlogSkeleton />}>
                    <BlogList />
                </Suspense>
            </div>
        </div>
    );
}
