import BlogCard from "./BlogCard";
import axios from "axios";
import { Preview } from "@/app/types/Blog";
import { use } from "react";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchArticles() {
    return new Promise<Preview[]>(async (resolve, reject) => {
        await axios
            .get(`${serverURL}/api/v2/blog/get`)
            .then((res) => {
                if (res.data.status === "error") reject(new Error(res.data.message));
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err));
            });
    });
}
const promise = fetchArticles();
export default function BlogList() {
    const articles = use(promise);
    // NOTE: temporary error handling
    if (articles.length === 0) return <div className="text-2xl text-center">Whoops, blog data not found</div>;
    return (
        <>
            {articles.map((article) => {
                return <BlogCard key={article.slug} {...article} />;
            })}
        </>
    );
}