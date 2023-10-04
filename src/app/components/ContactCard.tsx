import { IconName, IconProp, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import Image from "next/image";
import { ContactCardProps } from "../types/ContactCard";

export default function ContactCard(props: ContactCardProps) {
  const icon: JSX.Element =
    props.icon.length > 0 ? (
      <FontAwesomeIcon icon={["fab", props.icon]} size="2x" />
    ) : (
      <Image
        src={`/icon/${props.platform.toLowerCase()}.svg`}
        alt="icon"
        width={32}
        height={32}
        className="mx-auto min-w-[32px] text-white"
      />
    );
  const body: JSX.Element = (
    <div className="grid grid-cols-4 items-center border border-slate-500 hover:bg-slate-800 aspect-[3/1] rounded-2xl">
      <div className="text-center">{icon}</div>
      <div className="col-span-3">
        <p className="text-gray-300">{props.platform}</p>
        <p className="text-ellipsis overflow-hidden">{props.username}</p>
      </div>
    </div>
  );

  if (props.link.length > 0) {
    return <a href={props.link}>{body}</a>;
  }
  return body;
}
