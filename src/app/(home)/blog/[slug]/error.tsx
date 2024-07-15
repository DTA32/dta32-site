"use client";

export default function Error({ error }: { error: Error }) {
    return (
        <div className="mt-16 m-2">
            <div className="rounded-md shadow-md max-w-3xl mx-auto flex flex-col gap-2 bg-white">
                <div className="bg-gray-400 h-[240px] rounded-t-md w-full"></div>
                <div className="flex flex-col p-4 justify-center items-center gap-2">
                    <h3 className="font-semibold text-3xl mb-2">Error</h3>
                    <p>Error in retrieving article data</p>
                    {error.message && <p className="text-sm">Detail: {error.message}</p>}
                </div>
            </div>
        </div>
    );
}
