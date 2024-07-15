"use client";
import { Preview } from "@/app/types/Blog";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogCard(props: Preview) {
    const currentPath = usePathname();

    // TODO: use props instead of pathname
    const basePath = currentPath.startsWith("/blog") ? "" : "/blog";

    const imageSrc: string = props.image ? props.image : "https://static.dta32.my.id/personal/blogPlaceholder.jpg";

    return (
        <Link
            href={`${basePath}/${props.slug}`}
            className="w-80 rounded-md hover:shadow-md shrink-0 flex flex-col snap-start bg-white"
        >
            <Image
                src={imageSrc}
                alt={"thumbnail for " + props.title}
                className="h-1/3 w-full bg-gray-500 rounded-t-md object-cover"
                width={320}
                height={240}
            />
            <div className="p-4 flex flex-col gap-3">
                <p>{props.category}</p>
                <h3 className="font-semibold text-xl">{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </Link>
    );
}
