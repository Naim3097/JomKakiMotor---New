import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  ThreadsIcon,
  WhatsAppIcon,
} from "./icons";
import { SITE_URL } from "@/data/site";

/**
 * Share row — R3 slide 7 fixes the set to Facebook, Instagram, Threads,
 * Email and WhatsApp (X removed). "full" adds Threads; "compact" is the
 * four-icon set used on shorter product pages.
 */
export default function ShareRow({
  path,
  title,
  variant,
}: {
  path: string;
  title: string;
  variant: "full" | "compact";
}) {
  const url = `${SITE_URL}${path}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(`${title} — ${url}`);

  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: <FacebookIcon />,
    },
    {
      // Instagram has no web share intent — links to the profile per client list
      label: "JomKaki Rider on Instagram",
      href: "https://www.instagram.com/jomkakimotor",
      icon: <InstagramIcon />,
    },
    ...(variant === "full"
      ? [
          {
            label: "Share on Threads",
            href: `https://www.threads.net/intent/post?text=${text}`,
            icon: <ThreadsIcon />,
          },
        ]
      : []),
    {
      label: "Share by Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${text}`,
      icon: <MailIcon />,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${text}`,
      icon: <WhatsAppIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <span className="mr-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="rounded-md p-2 text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
}
