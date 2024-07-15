export default function Loading() {
    return (
        <div className="mt-16 m-2">
            <div className="rounded-md shadow-md max-w-3xl mx-auto flex flex-col bg-white">
                <div className="bg-gray-500 h-[240px] rounded-t-md w-full"></div>
                <div className="p-4 flex flex-col animate-pulse">
                    <div className="flex flex-col md:flex-row gap-2 justify-between">
                        <div className="h-12 rounded-md bg-gray-300 max-w-md w-full"></div>
                        <div className="flex flex-col text-sm gap-1 min-w-fit">
                            <div className="w-24 h-6 rounded-md bg-gray-300"></div>
                            <div className="w-24 h-6 rounded-md bg-gray-300"></div>
                        </div>
                    </div>
                    <hr className="my-6" />
                    <div className="flex flex-col gap-2 mb-32">
                        <div className="w-full h-6 bg-gray-300"></div>
                        <div className="w-full h-6 bg-gray-300"></div>
                        <div className="w-full h-6 bg-gray-300"></div>
                        <div className="w-full h-6 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
