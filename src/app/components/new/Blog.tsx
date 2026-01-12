import { Suspense } from "react";
import BlogSkeleton from "./BlogSkeleton";
import BlogList from "./BlogList";
import QuotesGraffiti from "@/app/components/new/QuotesGraffiti";

export default function Blog() {
    return (
        <div className="h-full w-full bg-background relative">
            <Suspense>
                <QuotesGraffiti/>
            </Suspense>
            <div className="absolute inset-0 top-0 left-0 container z-10 flex flex-col mx-auto items-center gap-16 h-full py-8 px-4">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-4xl">Blog</h1>
                    <h2 className="text-xl">tutorial, quotes, random story, rant, etc.</h2>
                </div>
                <div className="flex gap-12 overflow-x-auto w-full snap-x h-full">
                    <Suspense fallback={<BlogSkeleton />}>
                        <BlogList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
