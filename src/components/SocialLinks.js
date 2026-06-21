// Single source of truth for all social/profile links. Update URLs here and
// they propagate to the footer, contact page, and Organization JSON-LD.
// `label` is a temporary 2-letter placeholder — swap for real brand logos later.
export const SOCIALS = [
  { name: "Instagram", label: "IG", url: "https://www.instagram.com/zameett_" },
  { name: "TikTok", label: "TT", url: "https://www.tiktok.com/@zameet.t" },
  { name: "Pinterest", label: "Pi", url: "https://www.pinterest.com/zameett/" },
  { name: "Upwork", label: "Up", url: "https://www.upwork.com/freelancers/~0195a91e0ec99ac93c" },
  { name: "Fiverr", label: "Fv", url: "https://www.fiverr.com/zameett" },
  { name: "Reddit", label: "Re", url: "https://www.reddit.com/user/zameett/" },
];

export default function SocialLinks({ className }) {
  return (
    <>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.url}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
        >
          {s.label}
        </a>
      ))}
    </>
  );
}
