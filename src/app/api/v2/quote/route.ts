import { PrismaClient, quote } from "@prisma/client";
import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<ResponseTemplate<quote[] | null>>> {
    try {
        const quotes = await prisma.quote.findMany();
        return NextResponse.json({
            status: "success",
            data: quotes,
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
