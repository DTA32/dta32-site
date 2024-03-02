import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";

interface Preview {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
}

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<ResponseTemplate<Preview[] | null>>> {
    // TODO: get latest tweet and append
    try {
        const articles = await prisma.article.findMany({
            where: {
                active: true,
            },
            orderBy: {
                date_created: "desc",
            },
            take: 10,
        });
        const previews = articles.map((article) => {
            return {
                id: article.id,
                image: article.image,
                category: article.category,
                title: article.title,
                description: article.content.substring(0, 100) + "...",
            };
        });
        return NextResponse.json({
            status: "success",
            data: previews,
            message: null,
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            data: null,
            message:
                "Error fetching data from database" +
                (process.env.NODE_ENV === "development" ? ": " + error.message : ""),
        });
    }
}
