import ContactItem from "./ContactItem";
import axios from "axios";
import { contact } from "@prisma/client";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

function fetchContactList() {
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

export default async function ContactList() {
    const contacts = await fetchContactList()
        .then((res) => res)
        .catch((err) => {
            console.error(err);
            return [];
        });
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-12 overflow-auto">
            {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
            })}
        </div>
    );
}
