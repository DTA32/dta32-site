import axios from "axios";
import { use } from "react";
import { Comic_Neue } from "next/font/google";
const comicNeue = Comic_Neue({ subsets: ["latin"], weight: "400" });

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchQuotes() {
    return new Promise<string[]>(async (resolve, reject) => {
        await axios
            .get(`${serverURL}/api/v2/quote`)
            .then((res) => {
                if (res.data.status === "error") reject(new Error(res.data.message));
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err));
            });
    });
}
const promise = fetchQuotes();
export default function QuotesGraffiti() {
    const articles = use(promise);
    if (articles.length === 0) return <></>;
    return (
        <div className={`${comicNeue.className} absolute inset-0 z-0 top-0 left-0 opacity-30 blur-[1px] flex flex-col select-none pointer-events-none w-full overflow-clip h-full break-words md:text-lg`}>
            {
                articles.map((quote, index) => (
                    <p
                        key={index}
                        className="m-0 p-0"
                        style={{
                            position: "absolute",
                            top: `${5 + Math.random() * 90}%`,
                            left: `${5 + Math.random() * 90}%`,
                            transform: `translate(-50%, -50%) rotate(${Math.random() > 0.5 ? "-" : ""}${Math.random() * 30}deg)`,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {quote}
                    </p>
                    )
                )
            }
        </div>
    );
}
