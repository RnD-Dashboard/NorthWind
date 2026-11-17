import type { Metadata } from "next";
import { Header } from "@/components/site/chrome";
import { ComposerKit, MatchKit } from "@/components/site/kit";
import { OpenRolesKit } from "@/components/site/kits2";
import { Band, Faq, FeatureRow, HeroCtas, PageHero, Shell, SiteFooter, pad } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Startups & in-house teams · Lasso",
  description: "Hire without an agency. Describe the role, review a scored shortlist and reach out from your own inbox.",
};

/** Example numbers for the design; confirm before launch. */
const STATS = [
  ["~20%", "of first-year salary is a typical agency fee"],
  ["~4 min", "from a written brief to a scored shortlist"],
  ["$119", "a month for the Growth plan, billed yearly"],
];

/** Draft answers; check before launch. */
const FAQ: [string, string][] = [
  ["Do I need recruiting experience?", "No. Describe the role the way you'd explain it to a friend. Lasso builds the criteria and explains every match."],
  ["How quickly can we start?", "Right away. Sign up, connect Gmail and run your first search in a few minutes. There's nothing to install."],
  ["Can several people on the team use it?", "Yes. The Growth plan includes 10 seats, with shared collections and notes."],
  ["What if we only hire a few times a year?", "Start on the free trial for your next role and upgrade only when you're hiring more."],
];

export default function StartupsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Startups & in-house teams" title="Hire without an agency" sub="Run your own searches, review scored candidates and reach out from your own inbox. No recruiter needed." img="/images/hero.jpg">
          <HeroCtas />
        </PageHero>

        {/* The math: three numbers */}
        <Shell>
          <div className={`${pad} grid gap-8 sm:grid-cols-3`}>
            {STATS.map(([n, l], k) => (
              <FadeIn key={n} delay={k * 90} className="border-l border-black/[0.08] pl-5">
                <div className="font-display text-[44px] leading-none sm:text-[52px]">{n}</div>
                <p className="mt-3 max-w-[240px] text-[14px] leading-relaxed text-gray-500">{l}</p>
              </FadeIn>
            ))}
          </div>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow eyebrow="1. Search" title="Run the whole search yourself" text="Describe the role and get a scored shortlist in minutes, with a clear reason for every person on it." points={["Brief to shortlist in minutes", "Every match explained", "No boolean searches to learn"]} img="/images/meadow.jpg">
            <MatchKit className="w-full max-w-[440px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow flip eyebrow="2. Reach out" title="Messages from you, not a recruiter" text="Send personal first messages and follow-ups from your own Gmail. Candidates hear from the person they'd work with." points={["Sent from your own address", "Follow-ups that stop on reply", "Templates for every role"]} img="/images/lake.jpg">
            <ComposerKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow eyebrow="3. Track" title="Every open role at a glance" text="See how many people are shortlisted for each role and add a new search whenever you open one." points={["One view for all open roles", "Shortlist progress per role", "Add a role in one click"]} img="/images/valley.jpg">
            <OpenRolesKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell><Faq items={FAQ} /></Shell>
      </main>
      <SiteFooter />
    </>
  );
}
