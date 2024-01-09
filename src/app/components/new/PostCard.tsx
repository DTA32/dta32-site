type PostCardProps = {
    loading: Boolean;
};

export default function PostCard(props: PostCardProps) {
    if (props.loading) {
        return (
            <div className="w-48 h-[400px] md:h-[480px] md:w-80 rounded-md shadow-md shrink-0 flex flex-col snap-start bg-white cursor-pointer">
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
}
