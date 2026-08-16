import CoverImage from "./CoverImage";
import { GIGS } from "@/app/services/gigs";

export default function FeaturedGigs() {
  return (
    <section className="featured-gigs" id="featured">
      <div className="inner">
        <div className="svc-head reveal">
          <div>
            <p className="s-tag">Featured Services</p>
            <h2 className="s-title">
              Our most-requested <em>specialities.</em>
            </h2>
          </div>
          <p className="s-body">
            Two services brands often ask us for are tech packs built for modest wear and
            custom seamless textile prints. Compare both, then send your enquiry.
          </p>
        </div>

        <div className="gig-grid reveal">
          {GIGS.map((gig) => (
            <a key={gig.slug} href={`/services/${gig.slug}#service-details`} className="gig-card">
              <div className="gig-card-img">
                <CoverImage src={gig.cover} alt={gig.title} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="gig-card-body">
                <h3>{gig.title}</h3>
                <p>{gig.tagline}</p>
                <span className="gig-card-link">View details &amp; inquire →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
