import CoverImage from "./CoverImage";

const HOME_WORK = [
  { image: "/portfolio-pdf/techpack-01.webp", label: "Tech Pack", title: "Materials, colour and construction", fit: "contain" },
  { image: "/portfolio-pdf/techpack-02.webp", label: "Product Development", title: "Factory-ready garment direction", fit: "contain" },
  { image: "/portfolio-pdf/techpack-03.webp", label: "Technical Design", title: "Every detail clearly specified", fit: "contain" },
  { image: "/portfolio-pdf/techpack-04.webp", label: "Collection Planning", title: "From concept to production file", fit: "contain" },
  { image: "/portfolio-pdf/techpack-05.webp", label: "Design System", title: "Flats, fabrics and finishing notes", fit: "contain" },
  { image: "/images/03.jpeg", label: "Finished Collection", title: "Ideas carried into real garments" },
];

const SERVICE_WORK = [
  { image: "/portfolio-pdf/flat-09.webp", label: "Technical Flat", title: "Clear silhouette development", fit: "contain" },
  { image: "/portfolio-pdf/flat-10.webp", label: "Front and Back", title: "Construction made easy to follow", fit: "contain" },
  { image: "/portfolio-pdf/flat-11.webp", label: "Design Detail", title: "Proportion before sampling", fit: "contain" },
  { image: "/portfolio-pdf/flat-12.webp", label: "Garment Development", title: "Sketches built for production", fit: "contain" },
  { image: "/portfolio-pdf/flat-13.webp", label: "Technical Design", title: "Accurate design communication", fit: "contain" },
  { image: "/portfolio-pdf/flat-14.webp", label: "Factory Handoff", title: "Details resolved before cutting", fit: "contain" },
];

export default function WorkShowcase({ compact = false }) {
  const work = compact ? SERVICE_WORK : HOME_WORK;

  return (
    <section className={`work-showcase${compact ? " compact" : ""}`}>
      <div className="inner">
        <div className="work-showcase-head reveal">
          <div>
            <p className="s-tag">Selected Zameett Work</p>
            <h2 className="s-title">See the work. <em>Then imagine your collection.</em></h2>
          </div>
          <div>
            <p>Original design, technical development and production-ready fashion work from our studio.</p>
            <a href="/portfolio">Explore full portfolio →</a>
          </div>
        </div>
        <div className="work-showcase-grid">
          {work.map((item, index) => (
            <a href="/portfolio" className={`work-showcase-card reveal${item.fit ? " technical" : ""}`} key={item.image}>
              <CoverImage
                src={item.image}
                alt={`Zameett ${item.label.toLowerCase()} portfolio work`}
                objectFit={item.fit}
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