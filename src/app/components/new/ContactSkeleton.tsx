const ContactPlaceholder = () => {
    var contact: JSX.Element[] = [];
    for (let i = 0; i < 12; i++) {
        contact.push(<div key={i} className="w-24 h-24 bg-slate-200 rounded cursor-pointer animate-pulse"></div>);
    }
    return contact;
};

export default function ContactSkeleton() {
    return <div className="grid grid-rows-3 grid-flow-col gap-12 overflow-auto">{ContactPlaceholder()}</div>;
}
