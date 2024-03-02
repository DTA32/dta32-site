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
        params: { id: string };
    }
): Promise<NextResponse<ResponseTemplate<article | null>>> {
    if (params.id.length !== 24) {
        return NextResponse.json({
            status: "error",
            data: null,
            message: "Invalid article ID",
        });
    }
    try {
        const article = await prisma.article.findUnique({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json({
            status: "success",
            data: article,
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
