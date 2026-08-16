import { SiInstagram, SiPinterest } from "react-icons/si";

const SOCIALS = [
  { name: "Instagram", Icon: SiInstagram, url: "https://www.instagram.com/zameett_" },
  { name: "Pinterest", Icon: SiPinterest, url: "https://www.pinterest.com/zameett/" },
];

export default function SocialLinks({ className, only }) {
  const allowed = only ? new Set(only) : null;
  return SOCIALS.filter((social) => !allowed || allowed.has(social.name)).map(({ name, Icon, url }) => <a key={name} className={className} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon aria-hidden="true" /></a>);
}
