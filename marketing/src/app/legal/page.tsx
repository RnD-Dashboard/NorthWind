import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/site/chrome";
import { Band, PageHero, Shell, SiteFooter, pad } from "@/components/site/layout";

export const metadata: Metadata = {
  title: "Privacy & Terms · Lasso",
  description: "How Lasso handles your data, and the terms for using Lasso.",
};

/*
 * DRAFT legal copy written for the design. It is general and plain-language on purpose.
 * Have it reviewed by a lawyer and updated with the company's legal name and address before launch.
 */
const UPDATED = "17 November 2026";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[32px] leading-[1.1] sm:text-[40px]">{title}</h2>
      <p className="mt-3 text-[13px] text-gray-400">Last updated {UPDATED}</p>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

function Item({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-[17px] font-medium">{title}</h3>
      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-gray-600">{children}</div>
    </div>
  );
}

export default function LegalPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Legal" title="Privacy & Terms" sub="How we handle your data, and the rules for using Lasso, in plain language." img="/images/meadow.jpg" />

        <Shell>
          <div className={`${pad} grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16`}>
            <nav className="lg:sticky lg:top-24 lg:self-start">
              <ul className="flex gap-4 text-[14px] lg:flex-col lg:gap-2">
                <li><a href="#privacy" className="text-gray-600 hover:text-foreground">Privacy policy</a></li>
                <li><a href="#terms" className="text-gray-600 hover:text-foreground">Terms of service</a></li>
              </ul>
            </nav>

            <div className="max-w-[720px] space-y-20">
              <Section id="privacy" title="Privacy policy">
                <Item title="What we collect">
                  <p>Your account details (name, work email and company), the Google account you connect for sending email, the searches, collections, notes and sequences you create, and basic usage data such as pages visited and features used.</p>
                </Item>
                <Item title="How we use your Gmail">
                  <p>We only use your connected Gmail to send the emails you set up in Lasso and to detect replies, so sequences can stop when a candidate answers. We don&apos;t read unrelated emails, and we never use your inbox for advertising.</p>
                </Item>
                <Item title="Candidate data">
                  <p>Candidate profiles come from publicly available professional information and lists you import. You decide who to save and contact, and you can delete any candidate at any time.</p>
                </Item>
                <Item title="Who we share data with">
                  <p>We never sell personal data. We share it only with service providers that help us run Lasso, such as hosting and email delivery, under agreements that protect it.</p>
                </Item>
                <Item title="Keeping it safe">
                  <p>Data is encrypted in transit and at rest, and access is limited to the people who need it to run the service.</p>
                </Item>
                <Item title="Your rights">
                  <p>You can access, correct, export or delete your data at any time. If you&apos;re in the EU or UK, you have these rights under GDPR. Email <a href="mailto:hello@lasso.ai" className="text-foreground underline underline-offset-2">hello@lasso.ai</a> and we&apos;ll help within 30 days.</p>
                </Item>
              </Section>

              <Section id="terms" title="Terms of service">
                <Item title="Using Lasso">
                  <p>By creating an account you agree to these terms. You need to be at least 18 and using Lasso for your work.</p>
                </Item>
                <Item title="Your responsibilities">
                  <p>You&apos;re responsible for the emails you send and must follow the laws that apply to them, including anti-spam and data protection rules. Don&apos;t use Lasso to harass people or send misleading messages.</p>
                </Item>
                <Item title="Your content">
                  <p>You own the content you create in Lasso. You give us permission to store and process it only to provide the service to you.</p>
                </Item>
                <Item title="Plans, trials and billing">
                  <p>The free trial lasts 14 days. Paid plans renew automatically each month or year until you cancel. You can change or cancel your plan at any time from Settings.</p>
                </Item>
                <Item title="Availability and liability">
                  <p>We work hard to keep Lasso running and accurate, but the service is provided as is. Match scores help you decide; they don&apos;t replace your own judgement. Our liability is limited to the amount you paid us in the last 12 months.</p>
                </Item>
                <Item title="Changes and contact">
                  <p>If we change these terms in an important way, we&apos;ll tell you by email first. Questions? Email <a href="mailto:hello@lasso.ai" className="text-foreground underline underline-offset-2">hello@lasso.ai</a>.</p>
                </Item>
              </Section>
            </div>
          </div>
        </Shell>
        <Band />
      </main>
      <SiteFooter />
    </>
  );
}
