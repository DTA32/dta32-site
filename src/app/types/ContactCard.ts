import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface ContactCardProps {
  icon: IconName;
  platform: string;
  username: string;
  link: string;
}
