import about from "../data/about.json";
import TechStackPill from "./TechStackPill";

export default function AboutTechStack() {
  return (
    <div className="flex flex-col gap-2">
      <p>Tech Stack</p>
      <div className="flex flex-wrap gap-2 text-base">
        <p className="text-md sm:text-lg">Noob:</p>
        {about.noob.map((tech, index) => (
          <TechStackPill key={index} data={tech} type={2} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-base">
        <p className="text-md sm:text-lg">Beginner:</p>
        {about.beginner.map((tech, index) => (
          <TechStackPill key={index} data={tech} type={2} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-base">
        <p className="text-md sm:text-lg">Intermediate:</p>
        {about.intermediate.map((tech, index) => (
          <TechStackPill key={index} data={tech} type={2} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-base font-bold">
        <p className="text-md sm:text-lg font-normal">Advanced:</p>
        {about.advanced.map((tech, index) => (
          <TechStackPill key={index} data={tech} type={2} />
        ))}
      </div>
    </div>
  );
}
