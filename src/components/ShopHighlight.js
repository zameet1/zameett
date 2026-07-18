import CoverImage from "./CoverImage";
import { PRODUCTS } from "@/app/shop/products";

export default function ShopHighlight() {
  return (
    <section className="featured-gigs shop-highlight" id="shop">
      <div className="inner">
        <div className="svc-head reveal">
          <div>
            <p className="s-tag">Digital Products</p>
            <h2 className="s-title">
              Editable tech pack <em>templates.</em>
            </h2>
          </div>
          <p className="s-body">
            Not ready for a custom project yet? Grab a ready-made, industry-standard tech pack
            template and build professional spec sheets yourself — instant download.
          </p>
        </div>

        <div className="gig-grid digital-product-grid reveal">
          {PRODUCTS.map((p) => (
            <a key={p.slug} href={`/shop/${p.slug}`} className="gig-card prod-card">
              <div className="gig-card-img">
                {p.badge && <span className="prod-badge">{p.badge}</span>}
                <CoverImage src={p.cover} alt={p.name} sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="gig-card-body">
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <div className="prod-foot">
                  <span className="prod-price">{p.price}</span>
                  <span className="gig-card-link">View &amp; buy →</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="sig-foot reveal" style={{ marginTop: 36 }}>
          <a href="/shop" className="btn btn-outline">Browse the Shop →</a>
        </div>
      </div>
    </section>
  );
}
