// promise me no promises~
"use client";
import axios from "axios";
import { contact } from "@prisma/client";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

export function useContactList() {
    return new Promise<contact[]>((resolve, reject) => {
        axios
            .get(`${serverURL}/api/contact`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
