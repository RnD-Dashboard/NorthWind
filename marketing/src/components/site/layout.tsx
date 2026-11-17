/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { Plus } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/20" />
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

/** Text on one side, a product window on a painting on the other. `flip` puts the window on the left. */
export function FeatureRow({ eyebrow, title, text, points, img, flip, children }: { eyebrow: string; title: string; text: string; points?: string[]; img: string; flip?: boolean; children: ReactNode }) {
  return (
    <div className={`${pad} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
      <div className={flip ? "lg:order-2" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <BlurText text={title} className="mt-4 max-w-[460px] text-[32px] leading-[1.1] sm:text-[40px]" />
        <p className="mt-4 max-w-[440px] text-[16px] leading-relaxed text-gray-500">{text}</p>
        {points && (
          <ul className="mt-8 space-y-3">
            {points.map((x, k) => (
              <FadeIn key={x} delay={k * 80}><li className="flex items-center gap-3 text-[15px] text-gray-700"><span className="size-1.5 rounded-[2px] bg-brand-500" />{x}</li></FadeIn>
            ))}
          </ul>
        )}
      </div>
      <div className="relative overflow-hidden rounded-[28px]">
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-white/10" />
        <div className="relative grid min-h-[400px] place-items-center px-5 py-10 sm:px-10">{children}</div>
      </div>
    </div>
  );
}

/** Heading on the left, questions that open and close on the right. */
export function Faq({ items, title = "Questions, answered" }: { items: [string, string][]; title?: string }) {
  return (
    <div className={`${pad} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
      <div>
        <Eyebrow>FAQ</Eyebrow>
        <BlurText text={title} className="mt-4 text-[32px] leading-[1.1] sm:text-[40px]" />
        <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-gray-500">Something else on your mind? Email us at <a href="mailto:hello@lasso.ai" className="text-foreground underline underline-offset-2">hello@lasso.ai</a>.</p>
      </div>
      <div className="border-t border-black/[0.08]">
        {items.map(([q, a]) => (
          <details key={q} className="group border-b border-black/[0.08]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[16px] [&::-webkit-details-marker]:hidden">
              {q}
              <Plus className="size-4 shrink-0 text-gray-500 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="-mt-1 pb-5 pr-8 text-[15px] leading-relaxed text-gray-500">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/** Two buttons under a page hero: start a trial, or book a demo. */
export function HeroCtas() {
  return (
    <FadeIn delay={900} className="mt-8 flex flex-wrap justify-center gap-2">
      <PrimaryCta>Start free trial</PrimaryCta>
      <Link href="/contact" className="fx-btn inline-flex h-11 items-center rounded-full bg-white/70 px-5 text-[14px] font-medium ring-1 ring-black/[0.06] backdrop-blur hover:bg-white">Book a demo</Link>
    </FadeIn>
  );
}

const FOOTER_LINKS: [string, [string, string][]][] = [
  ["Product", [["AI Sourcing", "/sourcing"], ["How it works", "/#how"], ["Pricing", "/pricing"]]],
  ["Resources", [["Who it's for", "/#solutions"], ["Customer stories", "/#stories"], ["Blog", "/#blog"]]],
  ["Get started", [["Start free trial", `${APP_URL}/signup`], ["Sign in", `${APP_URL}/login`], ["Book a demo", "/contact"]]],
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
