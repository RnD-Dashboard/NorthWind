import type { Metadata } from "next";
import { Header } from "@/components/site/chrome";
import { PipelineKit } from "@/components/site/kit";
import { CollectionKit, ProfileKit } from "@/components/site/kits2";
import { Band, Faq, FeatureRow, HeroCtas, PageHero, Shell, SiteFooter } from "@/components/site/layout";

export const metadata: Metadata = {
  title: "Library · Lasso",
  description: "Keep every shortlisted candidate in one shared place: a collection per role, status at a glance, work emails and team notes.",
};

/** Draft answers; check before launch. */
const FAQ: [string, string][] = [
  ["What is a collection?", "A shared list of candidates, usually one per role or client. Save people to it straight from your search results."],
  ["How does finding emails work?", "Select candidates and click Find emails. Lasso looks up their work email and uses one lookup per email found."],
  ["Can my whole team use the same collections?", "Yes. Everyone on your workspace sees the same collections, statuses and notes, so nobody contacts a candidate twice."],
  ["Can I export my candidates?", "Yes. Export any collection to CSV whenever you need it."],
];

export default function LibraryPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Library" title="Every shortlisted candidate in one place" sub="A collection for every role, the status of every person and the notes your team adds, all in one shared view." img="/images/meadow.jpg">
          <HeroCtas />
        </PageHero>

        <Shell>
          <FeatureRow eyebrow="1. Organise" title="A collection for every role" text="Save people from any search into a collection. Find their work emails and see who you've already contacted." points={["One collection per role or client", "Find work emails in one click", "Shared with your whole team"]} img="/images/hills.jpg">
            <CollectionKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow flip eyebrow="2. Track" title="Status at a glance" text="Every candidate moves from shortlisted to contacted to replied, so you always know where each role stands." points={["Not contacted, emailed, opened, replied", "A live pipeline for every role", "Nobody gets emailed twice"]} img="/images/agencies.jpg">
            <PipelineKit className="w-full max-w-[440px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow eyebrow="3. Decide" title="Everything about a candidate on one page" text="Open any profile to see why they match, every email you've sent them and the notes your team has left." points={["Match score and criteria", "Full activity timeline", "Team notes on every profile"]} img="/images/startups.jpg">
            <ProfileKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell><Faq items={FAQ} /></Shell>
      </main>
      <SiteFooter />
    </>
  );
}
