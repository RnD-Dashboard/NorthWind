/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { PrimaryCta } from "@/components/site/chrome";
import { BlurText, Eyebrow, FadeIn } from "@/components/site/motion";
import { APP_URL } from "@/lib/site";

/* Shared page pieces. The home page is the style guide; every page is built from these. */

/** Centered 1360px page column with the thin vertical rules the layout is built on. */
export function Shell({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`mx-auto max-w-[1360px] scroll-mt-16 border-x border-black/[0.06] bg-white ${className}`}>{children}</div>;
}

/** Hatched separator between sections. */
export const Band = () => <div className="mx-auto max-w-[1360px] border-x border-black/[0.06]"><div className="band" /></div>;

/** Section padding: 40px sides on desktop, so content is 1280px wide. */
export const pad = "p-6 sm:p-10 lg:px-10 lg:py-14";

/** Short page hero for inner pages: painting fading into white, eyebrow, serif title and one line. */
export function PageHero({ eyebrow, title, sub, img = "/images/hero.jpg", children }: { eyebrow: string; title: string; sub: string; img?: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-20 fade-hero">
        <img src={img} alt="" className="size-full object-cover object-[50%_62%]" />
        <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
      </div>
      <div className="mx-auto flex max-w-[860px] flex-col items-center px-5 pb-20 pt-36 text-center sm:pb-24 sm:pt-40">
        <FadeIn><Eyebrow>{eyebrow}</Eyebrow></FadeIn>
        <BlurText as="h1" text={title} className="mt-5 text-[40px] leading-[1.05] sm:text-[56px] lg:text-[64px]" step={20} />
        <BlurText as="p" by="word" delay={600} step={24} text={sub} className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-gray-700 sm:text-[18px]" />
        {children}
      </div>
    </section>
  );
}

const FOOTER_LINKS: [string, [string, string][]][] = [
  ["Product", [["Overview", "/#product"], ["How it works", "/#how"], ["Pricing", "/pricing"]]],
  ["Resources", [["Who it's for", "/#solutions"], ["Customer stories", "/#stories"], ["Blog", "/#blog"]]],
  ["Get started", [["Start free trial", `${APP_URL}/signup`], ["Sign in", `${APP_URL}/login`], ["Book a demo", "mailto:hello@lasso.ai"]]],
];

/** Final call to action and footer over the meadow painting. */
export function SiteFooter() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden">
      <img src="/images/footer.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover object-[50%_70%] fade-footer" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[50%] bg-gradient-to-b from-white via-white/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-ink-900/30 to-transparent" />
      <div className="mx-auto max-w-[1360px] px-6 pb-10 pt-24 sm:px-10 sm:pt-28 lg:px-10 lg:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <div>
            <BlurText text={"Stop searching. \n Start talking."} className="text-[40px] leading-[1.05] tracking-[-0.03em] sm:text-[52px]" />
            <FadeIn delay={300} className="mt-8"><PrimaryCta>Start free trial</PrimaryCta></FadeIn>
          </div>
          <div className="grid grid-cols-3 gap-4 text-[13px] sm:gap-10">
            {FOOTER_LINKS.map(([h, links]) => (
              <div key={h}>
                <div className="text-gray-500">{h}</div>
                <ul className="mt-3 space-y-2">{links.map(([l, href]) => <li key={l}><Link href={href} className="whitespace-nowrap text-gray-900 hover:underline">{l}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-[22vh] text-center text-[15px] text-white/90 sm:text-[17px]">© 2026 Lasso. All rights reserved.</p>
      </div>
    </footer>
  );
}
