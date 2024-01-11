import ContactItem from "./ContactItem";
import { contact } from "@prisma/client";

export default async function ContactList({ promise }: { promise: Promise<contact[]> }) {
    const contacts = await promise;
    return (
        // <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center overflow-y-auto ">
        <div className="container w-full h-full grid grid-rows-3 grid-flow-col gap-16 justify-center items-center overflow-y-auto">
            {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
            })}
        </div>
    );
}
