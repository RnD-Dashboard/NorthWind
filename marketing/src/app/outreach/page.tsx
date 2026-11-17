import type { Metadata } from "next";
import { Header } from "@/components/site/chrome";
import { ComposerKit, SequenceKit } from "@/components/site/kit";
import { ReplyKit } from "@/components/site/kits2";
import { Band, Faq, FeatureRow, HeroCtas, PageHero, Shell, SiteFooter } from "@/components/site/layout";

export const metadata: Metadata = {
  title: "Outreach · Lasso",
  description: "Personal first messages and follow-ups that send themselves from your own Gmail, and stop the moment someone replies.",
};

/** Draft answers; check before launch. */
const FAQ: [string, string][] = [
  ["Which email accounts can I send from?", "Lasso sends from the Gmail or Google Workspace account you connect, so emails come from you, not from a tool."],
  ["What happens when a candidate replies?", "Their sequence stops automatically and the reply lands in your normal inbox."],
  ["Can I personalise each email?", "Yes. Use variables like first name and company, start from a template and edit any email before it sends."],
  ["When do emails go out?", "Inside the send window you choose, on business days only, so messages arrive at sensible times."],
];

export default function OutreachPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Outreach" title="Outreach that sounds like you" sub="Write a personal first message, add follow-ups and let Lasso send them from your own Gmail." img="/images/lake.jpg">
          <HeroCtas />
        </PageHero>

        <Shell>
          <FeatureRow eyebrow="1. Sequence" title="Follow-ups that send themselves" text="Set up an email, a wait and a follow-up once. Lasso sends each step on time and stops the moment someone replies." points={["Email, wait, follow up", "Stops automatically on reply", "Sends only in your send window"]} img="/images/forest.jpg">
            <SequenceKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow flip eyebrow="2. Personalise" title="Every message reads like you wrote it" text="Start from a template, add variables like first name and company, and preview exactly what each candidate will see." points={["Templates and variables", "Preview as the candidate", "Edit any email before it sends"]} img="/images/valley.jpg">
            <ComposerKit className="w-full max-w-[460px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell>
          <FeatureRow eyebrow="3. Reply" title="Replies land in your own inbox" text="Emails go out from your Gmail, so replies come straight back to you. See what's working with sent, opened and replied for every step." points={["Sent from your own address", "Replies in your normal inbox", "Sent, opened and replied stats"]} img="/images/hero.jpg">
            <ReplyKit className="w-full max-w-[440px]" />
          </FeatureRow>
        </Shell>
        <Band />

        <Shell><Faq items={FAQ} /></Shell>
      </main>
      <SiteFooter />
    </>
  );
}
