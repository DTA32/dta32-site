import { TechStack } from "./TechStack";

export interface PortfolioModalProps {
  id: string;
  title: string;
  description: string;
  image: string[];
  techStack: TechStack[];
  githubLink: string;
  publicLink?: string;
}
