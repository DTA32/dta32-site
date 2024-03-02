import { useContactList } from "@/app/lib/promises";
import ContactItem from "./ContactItem";

export default async function ContactList() {
    const contacts = await useContactList();
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-12 overflow-auto">
            {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
            })}
        </div>
    );
}
