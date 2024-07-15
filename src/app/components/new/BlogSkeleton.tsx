const PostPlaceholder = () => {
    var posts: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
        posts.push(
            <div
                key={i}
                className="w-80 rounded-md hover:shadow-md shrink-0 flex flex-col snap-start bg-white cursor-pointer"
            >
                <div className="h-1/2 w-full bg-gray-500 rounded-t-md"></div>
                <div className="p-4 flex flex-col gap-4 animate-pulse ">
                    <div className="w-16 bg-slate-700 h-6 rounded"></div>
                    <div className="w-full bg-slate-700 h-8 rounded"></div>
                    <div className="flex flex-col gap-2">
                        <div className="w-full bg-slate-700 h-4 rounded"></div>
                        <div className="w-full bg-slate-700 h-4 rounded"></div>
                        <div className="w-full bg-slate-700 h-4 rounded"></div>
                        <div className="w-full bg-slate-700 h-4 rounded"></div>
                        <div className="w-full bg-slate-700 h-4 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }
    return posts;
};

export default function BlogSkeleton() {
    return <>{PostPlaceholder()}</>;
}
