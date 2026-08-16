export default function BusinessStrength() {
  const strengths = [
    ["01", "Modest-wear specialisation", "Abayas, kaftans, modest dresses, bias cuts and embellished pieces are treated as a technical category—not generic apparel."],
    ["02", "Approve before bulk", "Tech packs, materials and a physical sample create an approval trail before the largest production spend begins."],
    ["03", "Flexible service ladder", "Start with a $14 template, commission one custom tech pack, develop a sample or connect the complete production journey."],
    ["04", "Supply-chain clarity", "Material minimums, product MOQ, revisions, quality checkpoints and exclusions are made visible for the actual project."],
  ];

  return (
    <section className="business-strength premium-section">
      <div className="inner">
        <div className="svc-head reveal">
          <div><p className="s-tag">Built for Fashion Founders</p><h2 className="s-title">A stronger product journey, <em>without the guesswork.</em></h2></div>
          <p className="s-body">Zameett connects education, technical design, sampling and manufacturing so you can enter at the stage you need and keep one clear route forward.</p>
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