/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, MessagesSquare, Search } from "lucide-react";
import { Header } from "@/components/site/chrome";
import { ContactForm } from "@/components/site/contact-form";
import { PageHero, Shell, SiteFooter, pad } from "@/components/site/layout";
import { BlurText, Eyebrow, FadeIn } from "@/components/site/motion";
import { APP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a demo · Lasso",
  description: "See Lasso find and score candidates for one of your real roles in a 20-minute call.",
};

const EXPECT = [
  [CalendarClock, "20 minutes, on your schedule", "A short video call at a time that suits you."],
  [Search, "A live search on your real role", "Bring a role you're hiring for and watch Lasso build a scored shortlist."],
  [MessagesSquare, "Straight answers", "Pricing, team setup, data and anything else you want to know."],
] as const;

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Book a demo" title="See Lasso on one of your roles" sub="Tell us a little about your team and we'll set up a short call." img="/images/valley.jpg" />

        <Shell>
          <div className={`${pad} grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14`}>
            <div>
              <Eyebrow>What to expect</Eyebrow>
              <BlurText text="A real search, not a slideshow" className="mt-4 max-w-[420px] text-[32px] leading-[1.1] sm:text-[40px]" />
              <ul className="mt-10 space-y-6">
                {EXPECT.map(([Icon, t, d], k) => (
                  <FadeIn key={t} delay={k * 90}>
                    <li className="flex gap-4">
                      <Icon className="mt-0.5 size-[18px] shrink-0 text-brand-500" strokeWidth={1.75} />
                      <div>
                        <div className="text-[15px] font-medium">{t}</div>
                        <p className="mt-1 text-[14px] leading-relaxed text-gray-500">{d}</p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ul>
              <div className="mt-10 border-t border-black/[0.08] pt-6 text-[14px] text-gray-500">
                Prefer to try it yourself?{" "}
                <Link href={`${APP_URL}/signup`} className="inline-flex items-center gap-1 font-medium text-foreground hover:underline">Start a free trial<ArrowRight className="size-3.5" /></Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px]">
              <img src="/images/meadow.jpg" alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative grid place-items-center px-5 py-10 sm:px-10 sm:py-14">
                <ContactForm className="w-full max-w-[460px]" />
              </div>
            </div>
          </div>
        </Shell>
      </main>
      <SiteFooter />
    </>
  );
}
