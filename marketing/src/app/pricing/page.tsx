import type { Metadata } from "next";
import { Check, Minus, Plus } from "lucide-react";
import { Header } from "@/components/site/chrome";
import { Pricing } from "@/components/site/interactive";
import { Band, PageHero, Shell, SiteFooter, pad } from "@/components/site/layout";
import { BlurText, Eyebrow, FadeIn } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Pricing · Lasso",
  description: "Start with a 14-day free trial. Simple plans for teams that hire every month.",
};

/** true = included, false = not included, string = value. */
const ROWS: [string, (string | boolean)[]][] = [
  ["Searches per month", ["25", "100", "Custom"]],
  ["Matches per search", ["Top 40", "Up to 500", "Custom"]],
  ["Email lookups", ["100", "1,000", "Custom"]],
  ["Sequences", ["1", "Unlimited", "Unlimited"]],
  ["Seats", ["1", "10", "Unlimited"]],
  ["Send from your own Gmail", [true, true, true]],
  ["Shared collections and notes", [false, true, true]],
  ["SSO and admin controls", [false, false, true]],
  ["Dedicated onboarding", [false, false, true]],
  ["Support", ["Email", "Email", "Priority"]],
];

/** Draft answers; check against the final billing rules before launch. */
const FAQ = [
  ["What counts as a search?", "Each new brief you send Lasso is one search. Refining it by chatting, filtering or sorting the results doesn't use another one."],
  ["What is an email lookup?", "Finding one candidate's work email uses one lookup. If Lasso can't find an email, it isn't counted."],
  ["What happens when my trial ends?", "Pick a plan to keep going. Your searches, collections and sequences stay saved either way."],
  ["Can I change plans later?", "Yes. You can upgrade or downgrade any time from Settings in the app."],
  ["Do emails send from my own address?", "Yes. Lasso sends from the Gmail account you connect, so replies land in your normal inbox."],
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <span className="mx-auto grid size-5 place-items-center rounded-full bg-ink-900 text-white"><Check className="size-3" strokeWidth={3} /></span>;
  if (v === false) return <Minus className="mx-auto size-4 text-gray-300" />;
  return <span>{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Pricing" title="Simple plans that grow with your hiring" sub="Start with a 14-day free trial. No card needed. Upgrade when you're hiring more." />

        {/* ------------------------------------------------------- Plans */}
        <Shell>
          <div className={pad}><Pricing /></div>
        </Shell>
        <Band />

        {/* ----------------------------------------------------- Compare */}
        <Shell>
          <div className={pad}>
            <div className="text-center"><Eyebrow>Compare plans</Eyebrow></div>
            <BlurText text="Everything in each plan" className="mx-auto mt-4 text-center text-[32px] leading-[1.1] sm:text-[40px]" />
            <FadeIn className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-black/[0.08] text-left">
                    <th className="w-[40%] py-3 font-normal text-gray-500">Feature</th>
                    {["Starter", "Growth", "Enterprise"].map((p) => <th key={p} className="py-3 text-center font-medium">{p}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([label, vals]) => (
                    <tr key={label} className="border-b border-black/[0.05]">
                      <td className="py-3.5 text-gray-700">{label}</td>
                      {vals.map((v, i) => <td key={i} className="py-3.5 text-center text-gray-900"><Cell v={v} /></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeIn>
          </div>
        </Shell>
        <Band />

        {/* --------------------------------------------------------- FAQ */}
        <Shell>
          <div className={`${pad} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14`}>
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <BlurText text="Questions, answered" className="mt-4 text-[32px] leading-[1.1] sm:text-[40px]" />
              <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-gray-500">Something else on your mind? Email us at <a href="mailto:hello@lasso.ai" className="text-foreground underline underline-offset-2">hello@lasso.ai</a>.</p>
            </div>
            <div className="border-t border-black/[0.08]">
              {FAQ.map(([q, a]) => (
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
        </Shell>
      </main>
      <SiteFooter />
    </>
  );
}
