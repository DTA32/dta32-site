import ContactItem from "./ContactItem";
import { contact } from "@prisma/client";

export default async function ContactList({ promise }: { promise: Promise<contact[]> }) {
    const contacts = await promise;
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-8 md:gap-16 overflow-auto">
            {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
            })}
        </div>
    );
}
