export default function NotFound() {
    return (
        <div className="mt-16 m-2">
            <div className="rounded-md shadow-md max-w-3xl mx-auto flex flex-col bg-white">
                <div className="bg-gray-500 h-[240px] rounded-t-md w-full"></div>
                <div className="flex flex-col p-4 justify-center items-center gap-2">
                    <h3 className="font-semibold text-3xl mb-2">Article not found</h3>
                    <p>
                        maybe slug for that article changed or you&apos;re trying to search for something that
                        doesn&apos;t exist <small>(her feelings for you, for example)</small>
                    </p>
                </div>
            </div>
        </div>
    );
}
