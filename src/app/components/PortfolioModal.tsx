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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import TechStackPill from "./TechStackPill";

export default function PortfolioModal(props: {
  data: PortfolioModalProps;
  closeFunc: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.closeFunc();
    };
    document.body.style.overflowY = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflowY = "scroll";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <div className="relative w-full h-full z-30">
      <div className="fixed inset-0 my-auto mx-auto z-40 w-full w-11/12 lg:w-3/4 h-5/6 lg:h-3/4 bg-slate-700 rounded-xl flex flex-col lg:flex-row text-white">
        <div className="lg:hidden text-right px-4 py-2">
          <FontAwesomeIcon
            icon={faXmark}
            size="2x"
            onClick={props.closeFunc}
            className="cursor-pointer"
            color="lightgray"
          />
        </div>
        <div className="bg-neutral-700 rounded-none lg:rounded-l-xl flex place-center h-2/6 md:h-1/2 lg:h-full w-full lg:w-[45%]">
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={5}
            keyboard={{ enabled: true }}
          >
            {props.data.image.map((image) => (
              <SwiperSlide key={image} className="only:w-[516px]">
                <Image
                  src={`/portfolio/${props.data.id}/${image}`}
                  alt={props.data.title}
                  width={480}
                  height={480}
                  className="object-contain w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="p-8 gap-10 w-full h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between">
            <h3 className="text-4xl">{props.data.title}</h3>
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              onClick={props.closeFunc}
              className="cursor-pointer opacity-0 lg:opacity-100"
              color="lightgray"
            />
          </div>
          <div>
            <p className="text-xl lg:me-8 min-h-[120px] lg:min-h-[160px]">
              {props.data.description}
            </p>
          </div>
          {props.data.techStack.length > 0 && (
            <div className="flex flex-col lg:me-6">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {props.data.techStack.map((tech) => (
                  <TechStackPill key={tech.name} data={tech} type={1} />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-row gap-8 text-lg">
            {props.data.githubLink && (
              <a
                href={props.data.githubLink}
                className="underline underline-offset-2 hover:underline-offset-4 duration-300 after:content-['_↗']"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span className="ps-1">Repository</span>
              </a>
            )}
            {props.data.publicLink && (
              <a
                href={props.data.publicLink}
                className="underline underline-offset-2 hover:underline-offset-4 duration-300 after:content-['_↗']"
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
