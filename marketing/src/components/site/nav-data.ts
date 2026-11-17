import { Building2, FolderKanban, Rocket, Send, Sparkles, type LucideIcon } from "lucide-react";

/**
 * One source for the site's navigation, used by the header menus and the footer.
 * Items without `href` are pages that aren't built yet: they show a "Soon" tag and aren't clickable.
 */
export type NavItem = { label: string; text: string; icon: LucideIcon; href?: string; preview?: "sourcing" | "library" | "outreach" | "startups" | "agencies"; img?: string };
export type NavGroup = { label: string; items: NavItem[]; preview?: boolean };

export const MENU: NavGroup[] = [
  {
    label: "Product", preview: true, items: [
      { label: "AI Sourcing", text: "Describe the hire, get a scored shortlist.", icon: Sparkles, href: "/sourcing", preview: "sourcing", img: "/images/valley.jpg" },
      { label: "Library", text: "Every shortlisted candidate in one place.", icon: FolderKanban, href: "/library", preview: "library", img: "/images/hills.jpg" },
      { label: "Outreach", text: "Follow-ups sent from your own Gmail.", icon: Send, href: "/outreach", preview: "outreach", img: "/images/lake.jpg" },
    ],
  },
  {
    label: "Solutions", preview: true, items: [
      { label: "Startups & in-house", text: "Hire without paying agency fees.", icon: Rocket, href: "/startups", preview: "startups", img: "/images/startups.jpg" },
      { label: "Recruiting agencies", text: "Work many client roles at once.", icon: Building2, href: "/agencies", preview: "agencies", img: "/images/agencies.jpg" },
    ],
  },
];

export const PRICING = { label: "Pricing", href: "/pricing" };

/** Plain links in the header after the menus. Resources opens the blog. */
export const LINKS = [{ label: "Resources", href: "/blog", match: "/blog" }, { label: "Pricing", href: "/pricing", match: "/pricing" }];

/** Footer-only list for the Resources column. */
export const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Customer stories", href: "/#stories" },
  { label: "Contact", href: "/contact" },
];
