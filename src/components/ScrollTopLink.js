"use client";

export default function ScrollTopLink({ children, className }) {
  return (
    <a
      href="#top"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </a>
  );
}
