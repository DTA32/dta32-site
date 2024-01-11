import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export async function GET() {
    const contacts = await prisma.contact.findMany();
    return Response.json(contacts);
}
