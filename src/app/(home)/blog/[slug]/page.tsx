"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchArticle(slug: string) {
    const response = await fetch(`${serverURL}/api/v2/blog/${slug}`);
    if (response.status === 404) return notFound();
    return response.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
    const article = await fetchArticle(params.slug);
    if (article.status == "error") {
        throw new Error(article.message);
    }
    const data = article.data;
    const imageSrc: string = data.image ? data.image : "https://static.dta32.my.id/personal/blogPlaceholder.jpg";
    const dateCreatedRaw: Date = new Date(data.date_created);
    const dateCreated: string =
        dateCreatedRaw.getDate() + "-" + (dateCreatedRaw.getMonth() + 1) + "-" + dateCreatedRaw.getFullYear();
    return (
        <div className="mt-16 m-2">
            <div className="rounded-md shadow-md max-w-3xl mx-auto flex flex-col bg-white">
                <Image
                    src={imageSrc}
                    alt={"thumbnail for " + data.title}
                    className="rounded-t-md w-full bg-gray-500 h-[240px] object-cover"
                    width={320}
                    height={240}
                />
                <div className="p-4 flex flex-col">
                    <div className="flex flex-col md:flex-row gap-2">
                        <h3 className="font-semibold text-3xl w-full">{data.title}</h3>
                        <div className="flex flex-col text-sm gap-1 min-w-fit">
                            <Link href={`/blog/tags/${data.category}`} className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faIcons} className="w-4" />
                                <p>{data.category}</p>
                            </Link>
                            <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faCalendarDay} className="w-4" />
                                <p>{dateCreated}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6" />
                    <Markdown className="prose">{data.content}</Markdown>
                </div>
            </div>
        </div>
    );
}
