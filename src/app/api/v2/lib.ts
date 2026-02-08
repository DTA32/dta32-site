import {PrismaClient, song} from "@prisma/client";
import {ResponseTemplate, TrackItem} from "@/app/types/api";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

const fetchTopTracksDatabase: () => Promise<ResponseTemplate<song[] | null>> = async () => {
    try {
        const songs = await prisma.song.findMany({
            where: {
                active: true,
            },
        });
        return {
            status: "success",
            data: songs,
            message: null,
        };
    } catch (error: any) {
        return {
            status: "error",
            data: null,
            message:
              "Error fetching data from database" +
              (process.env.NODE_ENV === "development" ? ": " + error.message : ""),
        };
    }
};

const getTopTracksDatabase: () => Promise<ResponseTemplate<TrackItem[]>> = async () => {
    const databaseData = await fetchTopTracksDatabase();
    if (databaseData.status === "error")
        return { status: "error", data: [], message: databaseData.message };
    const dbSongs =
      databaseData.data === null
        ? []
        : databaseData.data.map((song: any) => {
            return {
                rank: 0,
                imageUrl: song.imageUrl,
                title: song.title,
                artist: song.artist,
                link: song.link,
            };
        });
    
    return { status: "success", data: dbSongs, message: null};
}

export default prisma;
export {fetchTopTracksDatabase, getTopTracksDatabase};