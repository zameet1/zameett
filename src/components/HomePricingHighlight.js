export default function HomePricingHighlight() {
  return (
    <section className="home-pricing-preview home-pricing-teaser" id="pricing" aria-labelledby="home-pricing-title">
      <div className="inner">
        <div className="home-pricing-teaser-card reveal">
          <div className="home-pricing-teaser-copy">
            <p className="s-tag">Pricing & Plans</p>
            <h2 className="s-title" id="home-pricing-title">Find the right plan for <em>your next collection.</em></h2>
            <p>Explore clear packages for fashion design, tech packs and custom textile prints. Sampling and production are quoted after project review.</p>
            <div className="home-pricing-teaser-proof" aria-label="Pricing highlights">
              <span>Plans from $60</span>
              <span>Three service routes</span>
              <span>USD pricing</span>
            </div>
          </div>
          <div className="home-pricing-teaser-action">
            <span>Compare scope, timing and deliverables</span>
            <a className="btn btn-gold" href="/pricing">View Pricing & Plans <b aria-hidden="true">→</b></a>
            <a href="#get-a-quote">Not sure? Send your brief</a>
          </div>
        </div>
      </div>
    </section>
  );
}