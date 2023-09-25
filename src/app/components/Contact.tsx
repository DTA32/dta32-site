import ContactCard from "./ContactCard";
import ContactsJSON from "../data/contacts.json";
import { IconName } from "@fortawesome/fontawesome-svg-core";

export default function Contact() {
  return (
    <section
      className="min-h-[90vh] bg-slate-900 py-12 flex flex-col gap-12 text-white"
      id="contact"
    >
      <h1 className="text-5xl text-center">Contact</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-12 gap-x-16 gap-y-8 md:gap-y-12">
        {ContactsJSON.map((contact) => (
          <ContactCard
            key={contact.platform}
            icon={contact.icon as IconName}
            platform={contact.platform}
            username={contact.username}
            link={contact.link}
          />
        ))}
      </div>
    </section>
  );
}
