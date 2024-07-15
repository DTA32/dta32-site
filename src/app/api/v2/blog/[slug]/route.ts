import { article } from "@prisma/client";
import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";

export const dynamic = "force-dynamic";
export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { slug: string };
    }
): Promise<NextResponse<ResponseTemplate<article | null>>> {
    try {
        const article = await prisma.article.findFirst({
            where: {
                slug: params.slug,
            },
        });
        if (article == null || !article.active) {
            return NextResponse.json(
                {
                    status: "error",
                    data: null,
                    message: "Article not found",
                },
                { status: 404 }
            );
        }
        return NextResponse.json({
            status: "success",
            data: article,
            message: null,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: "error",
                data: null,
                message:
                    "Error fetching data from database" +
                    (process.env.NODE_ENV === "development" ? ": " + error.message : ""),
            },
            { status: 500 }
        );
    }
}
