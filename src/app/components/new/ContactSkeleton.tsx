const ContactPlaceholder = () => {
    var contact: JSX.Element[] = [];
    for (let i = 0; i < 12; i++) {
        contact.push(<div key={i} className="w-28 h-28 bg-slate-700 rounded cursor-pointer animate-pulse"></div>);
    }
    return contact;
};

export default function ContactSkeleton() {
    return (
        <div className="container w-full h-full grid grid-rows-3 grid-flow-col gap-16 justify-center items-center">
            {ContactPlaceholder()}
        </div>
    );
}
