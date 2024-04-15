import { NextRequest, NextResponse } from "next/server";
import { ResponseTemplate } from "@/app/types/api";
import prisma from "@/app/api/v2/lib";

export const dynamic = "force-dynamic";
export async function POST(NextRequest: NextRequest): Promise<NextResponse<ResponseTemplate<null>>> {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
    };
    const rawData = await NextRequest.json();
    const isNull: boolean =
        rawData === null ||
        Object.keys(rawData).length === 0 ||
        rawData["name"] === undefined ||
        rawData["email"] === undefined ||
        rawData["content"] === undefined;
    const isEmpty: boolean = rawData["name"] === "" || rawData["email"] === "" || rawData["content"] === "";
    if (isNull || isEmpty) {
        return NextResponse.json(
            {
                status: "error",
                data: null,
                message: "One or more field is empty!",
            },
            {
                headers: corsHeaders,
            }
        );
    }
    const isEmail = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    ).test(rawData.email);
    if (!isEmail) {
        return NextResponse.json(
            {
                status: "error",
                data: null,
                message: "Email is not valid!",
            },
            {
                headers: corsHeaders,
            }
        );
    }
    try {
        await prisma.message.create({
            data: {
                name: rawData.name,
                email: rawData.email,
                content: rawData.content,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: "error",
                data: null,
                message: "Error sending message" + (process.env.NODE_ENV === "development" ? ": " + error.message : ""),
            },
            {
                headers: corsHeaders,
            }
        );
    }
    return NextResponse.json(
        {
            status: "success",
            data: null,
            message: "Message sent successfully!",
        },
        {
            headers: corsHeaders,
        }
    );
}
