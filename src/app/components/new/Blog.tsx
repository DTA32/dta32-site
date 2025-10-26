import {Suspense} from "react";
import BlogSkeleton from "./BlogSkeleton";
import BlogList from "./BlogList";
import QuotesGraffiti from "@/app/components/new/QuotesGraffiti";

export default function Blog() {
    return (
        <div
            className="min-h-screen h-full w-full bg-background relative flex">
            <Suspense>
                <QuotesGraffiti/>
            </Suspense>
            <div className="flex-1 container z-20 flex flex-col items-center gap-16 py-8">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-4xl">Blog</h1>
                    <h2 className="text-xl">tutorial, quotes, random story, rant, etc.</h2>
                </div>
                <div className="z-10 flex flex-col md:flex-row gap-6 md:gap-12 overflow-x-auto w-full snap-x min-h-fit flex-1 items-center md:items-stretch">
                    <Suspense fallback={<BlogSkeleton/>}>
                        <BlogList/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
