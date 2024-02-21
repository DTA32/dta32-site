"use client";
import { useState, useEffect } from "react";
import { contact } from "@prisma/client";
import Image from "next/image";
import { IconName, config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ContactItemProps = {
    contact: contact;
};

export default function ContactItem(props: ContactItemProps) {
    const [navigator, setNavigator] = useState<any>(null);
    useEffect(() => {
        setNavigator(window.navigator);
    }, []);
    const icon = props.contact.icon.startsWith("data:image") ? (
        <Image src={props.contact.icon} alt="icon" width={48} height={48} className="mx-auto min-w-[32px] invert" />
    ) : (
        <FontAwesomeIcon icon={["fab", props.contact.icon as IconName]} size="3x" />
    );
    const { toast } = useToast();
    const copyUsername = () => {
        navigator.clipboard.writeText(props.contact.username);
        toast({
            title: "Username copied to clipboard!",
        });
    };
    const classes =
        "cursor-pointer border-[1px] border-gray-400 rounded-2xl w-20 h-20 md:w-28 md:h-28 aspect-square flex justify-center items-center hover:bg-white/30 hover:backdrop-blur-md";
    const body =
        props.contact.link.length > 0 ? (
            <a target="_blank" href={props.contact.link} rel="noopener noreferrer" className={classes}>
                {icon}
            </a>
        ) : (
            <div onClick={copyUsername} className={classes}>
                {icon}
            </div>
        );
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>{body}</TooltipTrigger>
                <TooltipContent>
                    <div className="flex flex-col">
                        <p className="text-center text-lg">{props.contact.platform}</p>
                        <p className="text-center text-gray-500">{props.contact.username}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
