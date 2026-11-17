/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowRight, FolderKanban, Gauge, Inbox, Lock, MailSearch, MessageSquareText, ShieldCheck, Sparkles, Target, UserCheck,
} from "lucide-react";
import { Header, PrimaryCta } from "@/components/site/chrome";
import { HeroBackdrop, HeroEmail, HeroProduct, TourLink } from "@/components/site/hero";
import { APP_URL } from "@/lib/site";
import { Pricing } from "@/components/site/interactive";
import { FeatureStack } from "@/components/site/features";
import { Testimonials } from "@/components/site/testimonials";
import { Audiences } from "@/components/site/audiences";
import { ComposerKit, CriteriaCard, MatchKit, NotifyCard, OrbitKit, StepMini } from "@/components/site/kit";
import { BlurText, Eyebrow, FadeIn } from "@/components/site/motion";

const LOGOS = ["boltshift", "capsule", "catalog", "cloudwatch", "codecraft", "coreos", "cubekit", "featherdev", "galileo", "hexsmith", "interlock", "layers", "lightbox", "quotient"];

/** Centered page column with the thin vertical rules the layout is built on. */
function Shell({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`mx-auto max-w-[1240px] scroll-mt-16 border-x border-black/[0.06] bg-white ${className}`}>{children}</div>;
}
const Band = () => <div className="mx-auto max-w-[1240px] border-x border-black/[0.06]"><div className="band" /></div>;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ---------------------------------------------------------- Hero */}
        <section className="relative isolate overflow-hidden pb-14">
          <HeroBackdrop />
          <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center px-5 pt-36 text-center sm:pt-40">
            <FadeIn><Eyebrow>AI sourcing for talent teams</Eyebrow></FadeIn>
            <BlurText as="h1" text="Describe the hire. Lasso finds the people worth talking to." className="mt-5 text-[44px] leading-[1.02] sm:text-[68px] lg:text-[80px] [text-wrap:balance]" step={24} />
            <BlurText as="p" by="word" delay={900} step={28} text="Write the brief the way you'd say it. Lasso searches, scores every profile against your criteria and helps you reach out from your own inbox." className="mt-6 max-w-[600px] text-[16px] leading-relaxed text-gray-700 sm:text-[18px]" />
            <FadeIn delay={1400} className="mt-9 flex w-full justify-center"><HeroEmail /></FadeIn>
            <FadeIn delay={1600} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <TourLink />
              <span className="text-[12px] text-gray-600">14-day free trial · no card needed</span>
            </FadeIn>
          </div>
          <div className="mt-14"><HeroProduct /></div>
          <div className="mx-auto mt-20 w-full max-w-[1240px] px-5">
            <p className="text-center text-[13px] text-gray-500">Trusted by talent teams that hire every week</p>
            <div className="relative mt-7 overflow-hidden [-webkit-mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
              <div className="fx-marquee items-center gap-12">
                {[...LOGOS, ...LOGOS].map((l, i) => (
                  <img key={i} src={`/logos/${l}.svg`} alt={i < LOGOS.length ? l : ""} aria-hidden={i >= LOGOS.length} className="h-8 w-auto shrink-0 opacity-40 grayscale" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- Problem */}
        <Shell id="product">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14 lg:pb-24">
            <div className="flex flex-col">
              <Eyebrow>Sourcing is slow by default</Eyebrow>
              <BlurText text="The right people are out there. Finding them takes all week." className="mt-4 max-w-[480px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" muted={["Finding", "them", "takes", "all", "week"]} />
              <ul className="mt-10 divide-y divide-black/[0.06] border-y border-black/[0.06] text-[14px] text-gray-600">
                {["Keyword filters miss people who'd be perfect.", "A job description turns into forty boolean strings.", "Shortlists live in spreadsheets nobody updates.", "Follow-ups slip, and good candidates go quiet."].map((t, i) => (
                  <FadeIn key={t} delay={i * 90}><li className="py-4">{t}</li></FadeIn>
                ))}
              </ul>
              <FadeIn className="mt-6"><p className="font-display text-[28px] leading-tight">The candidates are there.<br /><span className="text-gray-400">The time isn&apos;t.</span></p></FadeIn>
            </div>
            <FadeIn className="relative min-h-[460px] overflow-hidden rounded-3xl">
              <img src="/images/forest.jpg" alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/15 to-transparent" />
              <div className="absolute inset-0 grid place-items-center p-5"><NotifyCard /></div>
            </FadeIn>
          </div>
        </Shell>

        {/* --------------------------------------------- Wide product band */}
        <Shell>
          <div className="px-6 pb-6 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
            <FadeIn className="relative overflow-hidden rounded-3xl">
              <img src="/images/hills.jpg" alt="" className="absolute inset-0 size-full object-cover object-[50%_60%]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900/15" />
              <div className="relative grid items-center gap-6 p-5 sm:p-10 md:grid-cols-2 lg:p-14">
                <CriteriaCard />
                <MatchKit />
              </div>
            </FadeIn>
          </div>
        </Shell>
        <Band />

        {/* --------------------------------------------- Meet your sourcer */}
        <Shell>
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div>
              <Eyebrow>Meet your AI sourcer</Eyebrow>
              <BlurText text="One brief in. A shortlist you can act on, out." className="mt-4 max-w-[480px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
              <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-gray-600">Lasso reads your brief like a recruiter would, then does the slow parts for you. It keeps track of:</p>
              <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl ring-1 ring-black/[0.06] sm:grid-cols-2">
                {[
                  [Target, "Criteria", "Must-haves and nice-to-haves from your brief."],
                  [Gauge, "Match scores", "Every profile scored, with the reasons shown."],
                  [MessageSquareText, "Refinements", "Narrow it down by chatting: “only US”."],
                  [MailSearch, "Work emails", "Found for you before outreach starts."],
                  [FolderKanban, "Collections", "One shared list per role, with status."],
                  [Inbox, "Replies", "Sequences stop the moment someone answers."],
                ].map(([I, t, d], k) => {
                  const Icon = I as typeof Target;
                  return (
                    <FadeIn key={t as string} delay={k * 70} className="border-b border-black/[0.06] p-5 sm:[&:nth-child(odd)]:border-r">
                      <Icon className="size-4 text-gray-500" />
                      <div className="mt-3 text-[14px] font-medium">{t as string}</div>
                      <div className="mt-1 text-[12px] text-gray-500">{d as string}</div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
            <FadeIn className="relative grid min-h-[480px] place-items-center overflow-hidden rounded-3xl p-6">
              <img src="/images/meadow.jpg" alt="" className="absolute inset-0 size-full object-cover object-[50%_45%]" />
              <OrbitKit className="relative" />
            </FadeIn>
          </div>
        </Shell>
        <Band />

        {/* --------------------------------------------------- How it works */}
        <Shell id="how">
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>How it works</Eyebrow>
            <BlurText text="From brief to booked call in four steps" className="mt-4 max-w-[560px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
            <div className="mt-10 grid overflow-hidden rounded-2xl ring-1 ring-black/[0.06] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Describe", "Type the brief or attach a job description. Lasso turns it into criteria."],
                ["02", "Review", "Get a scored shortlist in minutes, each match explained."],
                ["03", "Shortlist", "Save the best people to a collection your team shares."],
                ["04", "Reach out", "Send a personal sequence from Gmail. Replies come to you."],
              ].map(([n, t, d], k) => (
                <FadeIn key={n} delay={k * 90} className="flex flex-col gap-3 border-b border-black/[0.06] p-5 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <span className="font-mono text-[11px] text-gray-400">{n}</span>
                  <span className="text-[16px] font-medium">{t}</span>
                  <span className="min-h-[54px] text-[13px] leading-relaxed text-gray-500">{d}</span>
                  <StepMini step={k as 0 | 1 | 2 | 3} />
                </FadeIn>
              ))}
            </div>
          </div>
        </Shell>

        {/* ------------------------------------------- Features (dark) */}
        <section className="bg-ink-900 text-white">
          <div className="mx-auto max-w-[1240px] border-x border-white/[0.08] p-6 sm:p-10 lg:p-14">
            <FeatureStack />
          </div>
        </section>

        {/* ----------------------------------------------------- Pricing */}
        <Shell id="pricing">
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="text-center"><Eyebrow>Pricing</Eyebrow></div>
            <BlurText text="Start free. Upgrade when you're hiring more." className="mx-auto mb-8 mt-4 max-w-[560px] text-center text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px] [text-wrap:balance]" />
            <Pricing />
          </div>
        </Shell>
        <Band />

        {/* ---------------------------------------- Outreach with context */}
        <Shell>
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div>
              <Eyebrow>Outreach with context</Eyebrow>
              <BlurText text="Write to every candidate like you read their whole profile" className="mt-4 max-w-[500px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
              <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-gray-600">Lasso drafts the first line from what the person has actually done. You edit it, and decide when it goes. Each draft knows:</p>
              <ul className="mt-8 divide-y divide-black/[0.06] border-y border-black/[0.06] text-[14px]">
                {[["What they've built", "12 signals"], ["Which criteria they meet", "4 of 4"], ["Where they work now", "Loom"], ["Your past messages", "None yet"], ["Your template and tone", "Intro v2"]].map(([k, v], i) => (
                  <FadeIn key={k} delay={i * 70}><li className="flex items-center justify-between py-3.5"><span>{k}</span><span className="text-[12px] text-gray-400">{v}</span></li></FadeIn>
                ))}
              </ul>
            </div>
            <FadeIn className="relative grid min-h-[460px] place-items-center overflow-hidden rounded-3xl p-5 sm:p-10">
              <img src="/images/lake.jpg" alt="" className="absolute inset-0 size-full object-cover object-[50%_40%]" />
              <div className="absolute inset-0 bg-ink-900/[0.06]" />
              <ComposerKit className="relative w-full max-w-[440px]" />
            </FadeIn>
          </div>
        </Shell>
        <Band />

        {/* -------------------------------------------------- Who it's for */}
        <Shell id="solutions">
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-[640px] text-center">
              <span className="inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-gray-500 ring-1 ring-black/[0.08]">Who it&apos;s for</span>
              <BlurText text="Built for every team that hires" className="mt-4 text-[32px] leading-[1.1] sm:text-[44px]" />
              <p className="mt-3 text-[16px] leading-relaxed text-gray-500 sm:text-[17px]">Lasso adapts to how you hire, whether you&apos;re a founder, a talent team, an agency or a hiring manager.</p>
            </div>
            <div className="mt-12"><Audiences /></div>
          </div>
        </Shell>
        <Band />

        {/* ------------------------------------------------- Testimonials */}
        <Shell id="stories">
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="text-center">
              <Eyebrow>Customer stories</Eyebrow>
              <BlurText text="Trusted by teams that hire every week" className="mx-auto mt-4 max-w-[520px] text-[32px] leading-[1.1] sm:text-[40px]" />
            </div>
            <div className="mt-10"><Testimonials /></div>
          </div>
        </Shell>
        <Band />

        {/* ---------------------------------------------------------- Blog */}
        <Shell id="blog">
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>From the blog</Eyebrow>
                <BlurText text="Guides for teams that hire on their own" className="mt-4 max-w-[520px] text-[32px] leading-[1.1] sm:text-[40px]" />
              </div>
              <a href="#blog" className="fx-btn inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-gray-700 hover:text-foreground">View all articles<ArrowRight className="size-3.5" /></a>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { img: "/images/forest.jpg", tag: "Sourcing", t: "How to write a hiring brief an AI can actually use", d: "Five things to put in every brief so your shortlist starts strong.", m: "6 min read" },
                { img: "/images/hills.jpg", tag: "Outreach", t: "The follow-up sequence that tripled our reply rate", d: "Timing, tone and the one line that gets candidates to answer.", m: "5 min read" },
                { img: "/images/meadow.jpg", tag: "Hiring", t: "Hiring your first designer without an agency", d: "A step-by-step plan for founders running their own search.", m: "8 min read" },
              ].map((p, k) => (
                <FadeIn key={p.t} delay={k * 90}>
                  <a href="#blog" className="group block overflow-hidden rounded-2xl ring-1 ring-black/[0.06] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(16,24,40,0.3)]">
                    <div className="relative h-48 overflow-hidden"><img src={p.img} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[12px] text-gray-500"><span className="rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-black/[0.05]">{p.tag}</span>{p.m}</div>
                      <div className="mt-3 font-display text-[20px] leading-snug">{p.t}</div>
                      <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{p.d}</p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </Shell>
        <Band />

        {/* ------------------------------------------------------- Trust */}
        <Shell>
          <div className="grid gap-10 p-6 sm:p-10 lg:p-14 xl:grid-cols-[0.85fr_1.15fr] xl:gap-14">
            <div className="flex min-w-0 flex-col">
              <Eyebrow>You stay in control</Eyebrow>
              <BlurText text="AI that does the legwork. You make the calls." className="mt-4 max-w-[440px] text-[32px] leading-[1.1] sm:text-[40px]" />
              <div className="mt-10 flex flex-wrap items-center gap-6 xl:mt-auto xl:pt-16">
                {[["/badges/soc-2.png", "AICPA SOC 2"], ["/badges/iso-27001.png", "ISO 27001 certified"], ["/badges/gdpr.png", "GDPR"]].map(([src, alt], k) => (
                  <FadeIn key={src} delay={k * 90}>
                    <img src={src} alt={alt} width={84} height={84} className="size-[84px] object-contain" />
                  </FadeIn>
                ))}
              </div>
            </div>
            <div className="grid min-w-0 border border-black/[0.08] md:grid-cols-3">
              {[
                [UserCheck, "You approve every message", "Nothing goes out until you've read it. Edit any draft before it sends."],
                [Sparkles, "Every score is explained", "See which criteria each person meets, so you can trust the shortlist."],
                [ShieldCheck, "Your data stays yours", "Emails send from your own Gmail. Candidate data is never sold or shared."],
              ].map(([I, t, d], k) => {
                const Icon = I as typeof Lock;
                return (
                  <FadeIn key={t as string} delay={k * 90} className="flex flex-col border-b border-black/[0.08] p-6 last:border-b-0 md:min-h-[320px] md:border-b-0 md:border-r md:last:border-r-0">
                    <Icon className="size-7 text-foreground" strokeWidth={1.5} />
                    <div className="mt-10 md:mt-auto">
                      <h3 className="font-display text-[24px] leading-[1.15] md:min-h-[2.3em]">{t as string}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-gray-500 md:min-h-[6.5em]">{d as string}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </Shell>
      </main>

      {/* ------------------------------------------- Final CTA + footer */}
      <footer id="contact" className="relative isolate overflow-hidden">
        <img src="/images/footer.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover object-[50%_70%] fade-footer" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[50%] bg-gradient-to-b from-white via-white/60 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-ink-900/30 to-transparent" />
        <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-24 sm:px-10 sm:pt-28 lg:px-14 lg:pt-32">
          <div className="grid gap-12 xl:grid-cols-[1.45fr_1fr] xl:gap-24">
            <div>
              <BlurText text={"Stop searching for candidates. \n Start talking to them."} className="text-[36px] leading-[1.08] tracking-[-0.03em] sm:text-[44px] xl:text-[46px]" />
              <FadeIn delay={300} className="mt-8"><PrimaryCta>Start free trial</PrimaryCta></FadeIn>
            </div>
            {/* Every link goes to a section on this page or to the app; no extra pages needed. */}
            <div className="grid grid-cols-3 gap-4 text-[13px] sm:gap-6 xl:max-w-none">
              {[
                ["Product", [["Overview", "#product"], ["How it works", "#how"], ["Pricing", "#pricing"]]],
                ["Resources", [["Who it's for", "#solutions"], ["Customer stories", "#stories"], ["Blog", "#blog"]]],
                ["Get started", [["Start free trial", `${APP_URL}/signup`], ["Sign in", `${APP_URL}/login`], ["Book a demo", "mailto:hello@lasso.ai"]]],
              ].map(([h, links]) => (
                <div key={h as string}>
                  <div className="text-gray-500">{h as string}</div>
                  <ul className="mt-3 space-y-2">{(links as string[][]).map(([l, href]) => <li key={l}><Link href={href} className="whitespace-nowrap text-gray-900 hover:underline">{l}</Link></li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-[22vh] text-center text-[15px] text-white/90 sm:text-[17px]">© 2026 Lasso. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
