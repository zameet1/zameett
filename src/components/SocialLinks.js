import {
  SiInstagram,
  SiTiktok,
  SiPinterest,
  SiUpwork,
  SiFiverr,
  SiReddit,
} from "react-icons/si";

// Single source of truth for all social/profile links. Update URLs here and
// they propagate to the footer, contact page, and Organization JSON-LD.
export const SOCIALS = [
  { name: "Instagram", Icon: SiInstagram, url: "https://www.instagram.com/zameett_" },
  { name: "TikTok", Icon: SiTiktok, url: "https://www.tiktok.com/@zameet.t" },
  { name: "Pinterest", Icon: SiPinterest, url: "https://www.pinterest.com/zameett/" },
  { name: "Upwork", Icon: SiUpwork, url: "https://www.upwork.com/freelancers/~0195a91e0ec99ac93c" },
  { name: "Fiverr", Icon: SiFiverr, url: "https://www.fiverr.com/zameett" },
  { name: "Reddit", Icon: SiReddit, url: "https://www.reddit.com/user/zameett/" },
];

export default function SocialLinks({ className }) {
  return (
    <>
      {SOCIALS.map(({ name, Icon, url }) => (
        <a
          key={name}
          href={url}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
        >
          <Icon aria-hidden="true" focusable="false" />
        </a>
      ))}
    </>
  );
}
