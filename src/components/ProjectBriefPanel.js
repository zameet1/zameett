import ContactForm from "@/components/ContactForm";

export default function ProjectBriefPanel({ initialService = "", initialPackageParam = "" }) {
  return (
    <div id="project-brief" className="reveal contact-form-panel project-brief-panel" data-project-brief="three-step">
      <div className="contact-form-head">
        <span>3-Step Project Brief</span>
        <h2>Tell us what you are building.</h2>
        <p>Share what you know now. We can help define the rest together.</p>
      </div>
      <ContactForm initialService={initialService} initialPackageParam={initialPackageParam} />
    </div>
  );
}