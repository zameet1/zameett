"use client";

export default function ScrollTopLink({ children, className, targetId }) {
  return (
    <a
      href={targetId ? `#${targetId}` : "#top"}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        const el = targetId ? document.getElementById(targetId) : null;
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
