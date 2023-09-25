import PortfolioCard from "./PortfolioCard";
import PortfolioJSON from "../data/portfolio.json";

export default function Portfolio() {
  return (
    <section
      className="min-h-[90vh] bg-slate-800 py-12 flex flex-col gap-12 text-white"
      id="portfolio"
    >
      <h1 className="text-5xl text-center">Portfolio</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 sm:px-12 gap-x-16 gap-y-8 md:gap-y-12 justify-items-center">
        {PortfolioJSON.map((portfolio) => (
          <PortfolioCard
            key={portfolio.title}
            title={portfolio.title}
            description={portfolio.description}
            image={portfolio.image}
            repo={portfolio.repo}
            publiclink={portfolio.publiclink}
          />
        ))}
      </div>
    </section>
  );
}
