import { NextRequest, NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest): Promise<NextResponse<ResponseTemplate<string[] | null>>> {
    try {
        const categories = await prisma.blog_category.findMany();
        const categoriesList = categories.map((category) => category.name);
        return NextResponse.json({
            status: "success",
            data: categoriesList,
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
