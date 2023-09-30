"use client";
import { PortfolioModalProps } from "../types/PortfolioModal";
import { useEffect } from "react";
import Image from "next/image";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function PortfolioModal(props: {
  data: PortfolioModalProps;
  closeFunc: () => void;
}) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") props.closeFunc();
    });
    return () => {
      document.body.style.overflowY = "scroll";
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") props.closeFunc();
      });
    };
  }, [props]);

  return (
    <div className="relative w-full h-full z-30">
      <div className="fixed inset-0 my-auto mx-auto z-40 w-3/4 h-[95vh] md:h-3/4 bg-slate-700 rounded-xl flex flex-col md:flex-row text-white overflow-y-auto">
        <div className="md:hidden text-right px-4 py-2">
          <FontAwesomeIcon
            icon={faXmark}
            size="2x"
            onClick={props.closeFunc}
            className="cursor-pointer"
            color="lightgray"
          />
        </div>
        <div className="bg-slate-500 rounded-none md:rounded-l-xl flex place-center h-1/2 md:h-full w-full md:w-4/5">
          <Image
            src={`/portfolio/${props.data.image}`}
            alt={props.data.title}
            width={480}
            height={480}
            className="object-contain h-full w-full"
          />
        </div>
        <div className="p-8 gap-10 w-full h-full flex flex-col">
          <div className="flex justify-between">
            <h3 className="text-4xl">{props.data.title}</h3>
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              onClick={props.closeFunc}
              className="cursor-pointer opacity-0 md:opacity-100"
              color="lightgray"
            />
          </div>
          <div>
            <p className="text-xl pe-12 min-h-[120px] md:min-h-[160px]">
              {props.data.description}
            </p>
          </div>
          {props.data.techStack.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-lg">Tech Stack</p>
              <div className="flex gap-6">
                {props.data.techStack.map((tech) => (
                  <div
                    key={tech.icon}
                    className="px-3 py-1 border rounded-full flex flex-row gap-2 min-w-[100px] w-max max-h-[33px]"
                  >
                    <Image
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-${tech.iconVar}.svg`}
                      alt={`${tech.name} icon`}
                      width={24}
                      height={24}
                      unoptimized={true}
                      className="brightness-0 invert"
                    />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-row gap-8 text-lg">
            {props.data.githubLink && (
              <a
                href={props.data.githubLink}
                className="underline underline-offset-4 after:content-['_↗']"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span className="ps-1">Repository</span>
              </a>
            )}
            {props.data.publicLink && (
              <a
                href={props.data.publicLink}
                className="underline underline-offset-4 after:content-['_↗']"
              >
                <FontAwesomeIcon icon={faLink} />
                <span className="ps-1">Public Link</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-full h-full fixed inset-0 z-20 bg-black opacity-80"
        onClick={props.closeFunc}
      ></div>
    </div>
  );
}
