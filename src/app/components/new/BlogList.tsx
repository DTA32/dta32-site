import BlogCard from "./BlogCard";
import axios from "axios";
import { Preview } from "@/app/types/Blog";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

function fetchArticles() {
    return new Promise<Preview[]>(async (resolve, reject) => {
        await axios
            .get(`${serverURL}/api/v2/blog/getAll`)
            .then((res) => {
                if (res.data.status === "error") reject(new Error(res.data.message));
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err));
            });
    });
}

export default async function BlogList() {
    const articles = await fetchArticles()
        .then((res) => res)
        .catch((err) => {
            console.error(err);
            return [];
        });
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
