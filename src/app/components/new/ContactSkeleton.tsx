const ContactPlaceholder = () => {
    var contact: JSX.Element[] = [];
    for (let i = 0; i < 12; i++) {
        contact.push(
            <div key={i} className="w-20 h-20 md:w-28 md:h-28 bg-slate-200 rounded cursor-pointer animate-pulse"></div>
        );
    }
    return contact;
};

export default function ContactSkeleton() {
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-8 md:gap-16 overflow-auto pb-4 md:pb-0">
            {ContactPlaceholder()}
        </div>
    );
}
