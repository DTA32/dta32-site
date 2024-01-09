import ContactItem from "./ContactItem";

const ContactPlaceholder = () => {
    var contact: JSX.Element[] = [];
    for (let i = 0; i < 24; i++) {
        contact.push(<ContactItem key={i} loading={true} />);
    }
    return contact;
};

export default function Contact() {
    return (
        <div className="container flex flex-col mx-auto items-center gap-8 h-full py-8 md:py-16 px-4 md:px-0">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-4xl">Contact</h1>
                <h2>and links</h2>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6 animate-pulse justify-center overflow-y-auto md:mx-32">
                {ContactPlaceholder()}
            </div>
        </div>
    );
}
