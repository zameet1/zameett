export default function BusinessStrength() {
  const strengths = [
    ["01", "Modest-wear specialisation", "We treat abayas, kaftans, modest dresses, bias cuts and embellished pieces as a specialist technical category, not generic apparel."],
    ["02", "Approve before bulk", "Tech packs, materials and a physical sample create an approval trail before the largest production spend begins."],
    ["03", "Flexible service options", "Start with a $14 template, commission one custom tech pack, develop a sample or combine the services your project needs."],
    ["04", "Supply-chain clarity", "Material minimums, product MOQ, revisions, quality checkpoints and exclusions are made visible for the actual project."],
  ];

  return (
    <section className="business-strength premium-section">
      <div className="inner">
        <div className="svc-head reveal">
          <div><p className="s-tag">Built for Fashion Founders</p><h2 className="s-title">Get the product details right <em>before you spend on production.</em></h2></div>
          <p className="s-body">Use Zameett for technical design, sampling or manufacturing support. Start with the service you need now and add another stage when the project is ready.</p>
        </div>
        <div className="business-strength-grid">
          {strengths.map(([number, title, text]) => (
            <article className="reveal" key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <div className="business-strength-actions reveal">
          <a href="/pricing#pricing-guide" className="btn btn-burg">View Pricing Guide →</a>
          <a href="/supply-chain#quality-process" className="btn btn-outline">Explore Supply Chain & QC</a>
          <a href="/blog" className="business-text-link">Read founder guides →</a>
        </div>
      </div>
    </section>
  );
}