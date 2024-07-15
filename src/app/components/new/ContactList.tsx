import ContactItem from "./ContactItem";
import axios from "axios";
import { contact } from "@prisma/client";
import { use } from "react";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

async function fetchContactList() {
    return new Promise<contact[]>(async (resolve, reject) => {
        await axios
            .get(`${serverURL}/api/v2/contact`)
            .then((res) => {
                if (res.data.status === "error") reject(new Error(res.data.message));
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(new Error(err));
            });
    });
}

const promise = fetchContactList();

export default function ContactList() {
    const contacts = use(promise);
    // NOTE: temporary error handling
    if (contacts.length === 0) return <div className="text-2xl text-center">Whoops, contacts data not found</div>;
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-12 overflow-auto">
            {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
            })}
        </div>
    );
}
