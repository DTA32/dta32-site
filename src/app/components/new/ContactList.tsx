import ContactItem from "./ContactItem";
import { contact } from "@prisma/client";

export default async function ContactList({ promise }: { promise: Promise<contact[]> }) {
    const contacts = await promise;
    return (
        // <div className="flex flex-wrap gap-x-12 gap-y-6 justify-center overflow-y-auto ">
        <div className="md:container w-full h-full grid grid-rows-3 grid-flow-col gap-x-8 gap-y-0 md:gap-y-16 md:gap-x-16 justify-start md:justify-center items-center overflow-y-auto pb-4 md:pb-0">
            {contacts.map((contact) => {
                return <ContactItem key={contact.id} contact={contact} />;
            })}
        </div>
    );
}
