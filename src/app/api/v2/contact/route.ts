import { contact } from "@prisma/client";
import { NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";

export const dynamic = "force-dynamic";
export async function GET(): Promise<NextResponse<ResponseTemplate<contact[] | null>>> {
    try {
        const contacts = await prisma.contact.findMany({
            where: {
                active: true,
            },
        });
        return NextResponse.json({
            status: "success",
            data: contacts,
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
