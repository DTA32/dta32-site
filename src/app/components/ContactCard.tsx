import { IconName, IconProp, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
library.add(fab);

interface ContactCardProps {
  icon: IconName;
  platform: string;
  username: string;
  link: string;
}

export default function ContactCard(props: ContactCardProps) {
  const iconAtt: IconProp =
    props.icon.length > 0 ? ["fab", props.icon] : faQuestion;
  const body: JSX.Element = (
    <div className="grid grid-cols-4 items-center border border-slate-500 hover:bg-slate-800 aspect-[3/1] rounded-2xl">
      <div className="text-center">
        <FontAwesomeIcon icon={iconAtt} size="2x" />
      </div>
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
