import { NextRequest, NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";
import { Preview } from "@/app/types/Blog";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest): Promise<NextResponse<ResponseTemplate<Preview[] | null>>> {
    // TODO: get latest tweet and append
    const limit: number = request.nextUrl.searchParams.get("limit")
        ? parseInt(request.nextUrl.searchParams.get("limit") as string)
        : 100;
    try {
        const articles = await prisma.article.findMany({
            where: {
                active: true,
            },
            orderBy: {
                date_created: "desc",
            },
            take: limit,
        });
        const previews = articles.map((article) => {
            return {
                slug: article.slug,
                image: article.image,
                category: article.category,
                title: article.title,
                description: article.content.substring(0, 200),
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
