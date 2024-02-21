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
        <div className="container overflow-y-hidden w-full h-full grid grid-rows-3 grid-flow-col gap-x-8 gap-y-0 md:gap-y-16 md:gap-x-16 justify-start md:justify-center items-center">
            {ContactPlaceholder()}
        </div>
    );
}
