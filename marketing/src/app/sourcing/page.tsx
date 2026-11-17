import type { Metadata } from "next";
import { Header } from "@/components/site/chrome";
import { ChatKit, CriteriaCard, MatchKit } from "@/components/site/kit";
import { Band, Faq, FeatureRow, HeroCtas, PageHero, Shell, SiteFooter } from "@/components/site/layout";

export const metadata: Metadata = {
  title: "AI Sourcing · Lasso",
  description: "Describe the person you want to hire. Lasso turns it into criteria, searches and scores every profile, and explains each match.",
};

/** Draft answers; check before launch. */
const FAQ: [string, string][] = [
  ["Where do the candidates come from?", "Lasso searches public professional profiles and any lists you import, then scores each person against your criteria."],
  ["How long does a search take?", "Most searches return a scored shortlist in about four minutes. You can keep working while it runs."],
  ["How is the match score worked out?", "Each criterion gets a weight (must have, high or nice to have). The score shows how many of them a person meets, and you can see which ones."],
  ["Can I change the criteria after a search?", "Yes. Chat with Lasso or switch criteria on and off, and the results update without starting a new search."],
];

export default function SourcingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="AI Sourcing" title="Find candidates by describing them" sub="Write the brief the way you'd say it. Lasso searches, scores every profile and explains each match." img="/images/hills.jpg">
          <HeroCtas />
        </PageHero>

        <Shell>
          <FeatureRow eyebrow="1. Describe" title="Write the brief like you'd say it" text="Type what you need, attach a job description or start from a role. No boolean strings, no filters to learn." points={["Plain-language briefs", "Attach a job description", "Ready-made role starters"]} img="/images/valley.jpg">
            <ChatKit className="w-full max-w-[440px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow flip eyebrow="2. Refine" title="Lasso turns it into criteria you control" text="Your brief becomes clear must-haves and nice-to-haves. Switch any of them on or off, or just tell Lasso what to change." points={["Must have, high or nice to have", "Refine by chatting", "One quick follow-up question"]} img="/images/lake.jpg">
            <CriteriaCard className="w-full max-w-[400px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow eyebrow="3. Review" title="Every match is scored and explained" text="Each person gets a match score and a check for every criterion, so you know exactly why they're on the list." points={["Match score for every profile", "See which criteria each person meets", "Shortlist in one click"]} img="/images/forest.jpg">
            <MatchKit className="w-full max-w-[440px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell><Faq items={FAQ} /></Shell>
      </main>
      <SiteFooter />
    </>
  );
}
