import CoverImage from "./CoverImage";

const WORK = [
  { image: "/images/03.jpeg", label: "Collection Design", title: "From direction to silhouette" },
  { image: "/images/06.jpeg", label: "Modest Wear", title: "Proportion, drape and finish" },
  { image: "/images/11.jpeg", label: "Atelier Work", title: "Details made production ready" },
  { image: "/images/19.jpeg", label: "Sampling", title: "Ideas tested as real garments" },
  { image: "/images/23.jpeg", label: "Production", title: "Quality carried through" },
  { image: "/images/24.jpeg", label: "Finished Collection", title: "Ready for your label" },
];

export default function WorkShowcase({ compact = false }) {
  return (
    <section className={`work-showcase${compact ? " compact" : ""}`}>
      <div className="inner">
        <div className="work-showcase-head reveal">
          <div>
            <p className="s-tag">Selected Zameett Work</p>
            <h2 className="s-title">See the work. <em>Then imagine your collection.</em></h2>
          </div>
          <div>
            <p>Original design, sampling and modest-wear production from our studio.</p>
            <a href="/portfolio">Explore full portfolio →</a>
          </div>
        </div>
        <div className="work-showcase-grid">
          {WORK.map((item, index) => (
            <a href="/portfolio" className="work-showcase-card reveal" key={item.image}>
              <CoverImage
                src={item.image}
                alt={`Zameett ${item.label.toLowerCase()} portfolio work`}
                sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
              />
              <span className="work-showcase-index">{String(index + 1).padStart(2, "0")}</span>
              <div><small>{item.label}</small><h3>{item.title}</h3></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}