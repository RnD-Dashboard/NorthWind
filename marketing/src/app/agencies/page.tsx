import type { Metadata } from "next";
import { Header } from "@/components/site/chrome";
import { MatchKit } from "@/components/site/kit";
import { CollectionKit, ShareKit } from "@/components/site/kits2";
import { Band, Faq, FeatureRow, HeroCtas, PageHero, Shell, SiteFooter, pad } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Recruiting agencies · Lasso",
  description: "Source faster and place more. Work many client roles at once, reuse talent pools and send shortlists clients can act on.",
};

/** Plan numbers from Pricing; the search time is an example to confirm before launch. */
const STATS = [
  ["~4 min", "from a client brief to a scored shortlist"],
  ["500", "matches per search on the Growth plan"],
  ["10", "recruiter seats included in Growth"],
];

/** Draft answers; check before launch. */
const FAQ: [string, string][] = [
  ["Can we keep each client separate?", "Yes. Create a collection per client or role. Everyone on your team sees the same collections, statuses and notes."],
  ["How do clients see a shortlist?", "Share a collection as a view-only link. Clients see the candidates and match details without needing an account."],
  ["Can we reuse candidates for new roles?", "Yes. Past collections stay in your Library, so you can search them again when a similar role comes in."],
  ["Do you offer plans for larger agencies?", "Yes. Enterprise includes custom search volume, unlimited seats and dedicated onboarding. Talk to us to set it up."],
];

export default function AgenciesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Recruiting agencies" title="Source faster. Place more." sub="Work many client roles at once, reuse your talent pools and send shortlists clients can act on." img="/images/hills.jpg">
          <HeroCtas />
        </PageHero>

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
          <FeatureRow eyebrow="1. Source" title="A scored shortlist for every brief" text="Paste the client's brief and get ranked candidates in minutes, with a clear reason for every match." points={["Brief to shortlist in minutes", "Every match explained", "More time for calls, less searching"]} img="/images/forest.jpg">
            <MatchKit className="w-full max-w-[440px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow flip eyebrow="2. Organise" title="Every client in its own collection" text="Keep each client and role separate, find work emails and see who your team has already contacted." points={["A collection per client or role", "Shared notes and status", "Reuse past shortlists for new roles"]} img="/images/hero.jpg">
            <CollectionKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow eyebrow="3. Share" title="Shortlists clients can act on" text="Send a client a link to their shortlist and see when they've viewed it. No exports, no attachments." points={["View-only share links", "See when the client opens it", "Match details for every candidate"]} img="/images/meadow.jpg">
            <ShareKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell><Faq items={FAQ} /></Shell>
      </main>
      <SiteFooter />
    </>
  );
}
