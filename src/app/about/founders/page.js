import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Meet the Co-Founders",
  description: "Meet Ahad Mubashir and Zameet Mubashir, the Lahore-based co-founders leading Zameett's strategy, operations, fashion design and technical development.",
  path: "/about/founders",
});

const founders = [
  {
    initials: "AM",
    name: "Ahad Mubashir",
    role: "Co-Founder & Strategy / Operations Lead",
    bio: "With six years of experience across ecommerce operations, business management and digital marketplaces, Ahad oversees Zameett's commercial planning, client journey and platform operations. His work spans Fiverr, Upwork, Etsy and Google Merchant workflows, alongside the coordination that keeps projects, communication and growth priorities aligned.",
    responsibilities: ["Business strategy and service planning", "Client journey and project coordination", "Ecommerce and marketplace operations", "Growth systems and digital-platform management"],
  },
  {
    initials: "ZM",
    name: "Zameet Mubashir",
    role: "Co-Founder & Lead Fashion Designer",
    bio: "Zameet completed her fashion-design education at the Pakistan Institute of Fashion and Design in 2020 and brings six years of fashion-design experience to Zameett. She reviews project direction, guides the design team and helps translate client ideas into considered fashion concepts and technical deliverables using Adobe Illustrator and Adobe Photoshop.",
    responsibilities: ["Fashion concept and collection direction", "Technical-design and project review", "Creative-team coordination", "Adobe Illustrator and Photoshop workflows"],
  },
];

const peopleSchema = {
  "@context": "https://schema.org",
  "@graph": founders.map((founder) => ({
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
    description: founder.bio,
    worksFor: { "@id": SITE_URL + "/#organization" },
    workLocation: { "@type": "Place", name: "Lahore, Pakistan" },
    url: SITE_URL + "/about/founders#" + founder.initials.toLowerCase(),
  })),
};

export default function FoundersPage() {
  return <>
    <JsonLd data={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Co-Founders", path: "/about/founders" }])} />
    <JsonLd data={peopleSchema} />
    <header className="page-hero about-hero"><div className="inner">
      <p className="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/about">About</a> &nbsp;/&nbsp; Co-Founders</p>
      <h1>Two disciplines. <em>One clear direction.</em></h1>
      <p>Zameett is led from Lahore by two co-founders who bring business operations and fashion expertise into one accountable development process.</p>
      <div className="page-hero-proof"><span>Business strategy</span><span>Fashion expertise</span><span>Lahore, Pakistan</span></div>
    </div></header>

    <main>
      <section className="about about-premium"><div className="inner">
        <div className="reveal"><p className="s-tag">Leadership at Zameett</p><h2 className="s-title">Creative decisions supported by <em>structured project management.</em></h2><p className="s-body">Ahad shapes the commercial strategy, systems and client journey. Zameet leads fashion design, technical review and creative-team coordination. This division gives clients a clear route from the first conversation to an approved scope and professionally reviewed deliverables.</p></div>
        <div className="values">
          {founders.map((founder, index) => <article className="val" id={founder.initials.toLowerCase()} key={founder.name}>
            <p className="s-tag">0{index + 1} &nbsp; {founder.initials}</p>
            <h3>{founder.name}</h3>
            <p><strong>{founder.role}</strong></p>
            <p>{founder.bio}</p>
          </article>)}
        </div>
      </div></section>

      <section className="clients about-clients"><div className="inner">
        <div><p className="s-tag">Clear Ownership</p><h2 className="s-title">Who leads <em>what.</em></h2><p className="s-body">Each co-founder has a defined area of responsibility while important project decisions remain connected across business and creative work.</p></div>
        <div className="c-list">
          {founders.flatMap((founder) => founder.responsibilities.map((item, index) => <div className="c-item" key={founder.initials + item}><div className="c-dot">{founder.initials}</div><div><h3>{item}</h3><p>{index === 0 ? founder.name + " leads this area." : "Managed within " + founder.name + "'s core responsibilities."}</p></div></div>))}
        </div>
      </div></section>

      <section className="about-identity"><div className="inner"><div><p className="s-tag">Our Working Standard</p><h2 className="s-title">Clear ownership at <em>every stage.</em></h2></div><div><p>Deliverables, revisions and responsibilities are confirmed before work begins. Creative and technical decisions are reviewed against the agreed direction, while feedback and approvals remain organised through the project journey.</p><p><a href="/how-it-works">See how projects work →</a></p></div></div></section>

      <section className="cta page-cta"><p className="s-tag">Work With Zameett</p><h2 className="s-title">Bring us the idea.<br /><em>We will help define the path.</em></h2><p className="cta-sub">Tell us what you are developing, where the project stands and what support you need.</p><div className="cta-btns"><a href="/contact#get-in-touch" className="btn btn-gold">Start Your Project →</a><a href="/portfolio" className="btn btn-outline-ivory">View Our Work</a></div></section>
    </main>
    <Footer />
  </>;
}