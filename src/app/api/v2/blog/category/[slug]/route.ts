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
): Promise<NextResponse<ResponseTemplate<string | null>>> {
    const slug = params.slug.replace(/-/g, " ");
    try {
        const category = await prisma.blog_category.findFirst({
            where: {
                name: {
                    equals: slug,
                    mode: "insensitive",
                },
            },
        });
        if (category == null) {
            return NextResponse.json(
                {
                    status: "error",
                    data: null,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }
        return NextResponse.json({
            status: "success",
            data: category.description,
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
