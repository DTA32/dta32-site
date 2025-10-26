import { quote } from "@prisma/client";
import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<ResponseTemplate<string[] | null>>> {
    try {
        const quotes = await prisma.quote.findMany({
            where: {
                active: true,
            },
        });
        const quoteContents = quotes.map((q: quote) => q.content);
        return NextResponse.json({
            status: "success",
            data: quoteContents,
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
            {
                status: 500,
            }
        );
    }
}
