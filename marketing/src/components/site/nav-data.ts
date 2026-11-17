import { BookOpen, Building2, CalendarClock, FolderKanban, Quote, Rocket, Send, Sparkles, type LucideIcon } from "lucide-react";

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
  {
    label: "Resources", items: [
      { label: "Customer stories", text: "How teams hire with Lasso.", icon: Quote, href: "/#stories" },
      { label: "Blog", text: "Guides for teams that hire on their own.", icon: BookOpen, href: "/blog" },
      { label: "Book a demo", text: "See Lasso on one of your roles.", icon: CalendarClock, href: "/contact" },
    ],
  },
];

export const PRICING = { label: "Pricing", href: "/pricing" };
