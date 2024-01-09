type ContactItemProps = {
    loading: Boolean;
};

export default function ContactItem(props: ContactItemProps) {
    if (props.loading) {
        return <div className="w-28 h-28 bg-slate-700 rounded cursor-pointer"></div>;
    }
}
