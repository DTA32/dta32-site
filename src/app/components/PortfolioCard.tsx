import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  description: string; // for card modal
  image: string;
  repo?: string; // for card modal
  publiclink?: string; // for card modal
}

export default function PortfolioCard(props: PortfolioCardProps) {
  return (
    <div className="group aspect-square w-3/4 relative hover:scale-105 ease-in-out duration-300 bg-slate-900">
      <a href={props.repo}>
        <Image
          src={`/portfolio/${props.image}`}
          alt={`${props.title} preview`}
          width={480}
          height={480}
          className="object-cover group-hover:blur-[2px] group-hover:brightness-50 h-full"
        />
        <div className="flex opacity-0 group-hover:opacity-100 absolute inset-0 h-full w-full">
          <p className="my-auto mx-auto text-center py-1 px-2 select-none text-xl">
            {props.title}
          </p>
        </div>
      </a>
    </div>
  );
}
