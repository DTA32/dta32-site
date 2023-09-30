export interface techStack {
  icon: string;
  iconVar: string;
  name: string;
}

export interface PortfolioModalProps {
  title: string;
  description: string;
  image: string;
  techStack: techStack[];
  githubLink: string;
  publicLink?: string;
}
