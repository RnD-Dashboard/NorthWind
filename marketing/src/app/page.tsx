/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  Building2, FolderKanban, Gauge, Inbox, Lock, MailSearch, MessageSquareText, ShieldCheck, Sparkles, Target, UserCheck, Users,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { GhostCta, Header, PrimaryCta } from "@/components/site/chrome";
import { APP_URL } from "@/lib/site";
import { FeatureTabs, Pricing } from "@/components/site/interactive";
import { ComposerKit, CriteriaCard, MatchKit, NotifyCard, OrbitKit, StepMini } from "@/components/site/kit";
import { BlurText, Eyebrow, FadeIn } from "@/components/site/motion";

const AUDIENCE = ["Startup founders", "In-house talent teams", "Recruiting agencies", "Executive search firms", "Hiring managers", "People ops leads", "Technical recruiters"];
const LOGOS = ["Northwind", "Halcyon", "Brightline", "Quietriver", "Fernway", "Atlas & Co"];

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
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <img src="/images/hero.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover object-[50%_62%]" />
          <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[62%] bg-gradient-to-b from-white/75 via-white/35 to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-ink-900/35 to-transparent" />
          <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col items-center px-5 pt-36 text-center sm:pt-40">
            <FadeIn><Eyebrow>AI sourcing for talent teams</Eyebrow></FadeIn>
            <BlurText as="h1" text="Describe the hire. Lasso finds the people worth talking to." className="mt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[64px] lg:text-[76px] [text-wrap:balance]" step={24} />
            <BlurText as="p" by="word" delay={900} step={28} text="Write the brief the way you'd say it. Lasso searches, scores every profile against your criteria and helps you reach out from your own inbox." className="mt-6 max-w-[620px] text-[16px] leading-relaxed text-gray-600 sm:text-[17px]" />
            <FadeIn delay={1500} className="mt-9 flex flex-wrap items-center justify-center gap-2">
              <PrimaryCta>Start free trial</PrimaryCta>
              <GhostCta href="#how">See how it works</GhostCta>
            </FadeIn>
            <FadeIn delay={1700}><p className="mt-4 text-[12px] font-medium text-gray-600">14-day free trial · no card needed</p></FadeIn>
          </div>
          <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-8">
            <p className="text-center text-[12px] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,.35)]">Trusted by talent teams that hire every week</p>
            <div className="mt-4 grid grid-cols-3 items-center gap-y-3 sm:grid-cols-6">
              {LOGOS.map((l) => <span key={l} className="text-center text-[17px] font-semibold tracking-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,.35)]">{l}</span>)}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------- Audience marquee */}
        <Shell className="overflow-hidden border-b">
          <div className="flex items-center gap-6 px-5 py-5">
            <span className="shrink-0 text-[12px] text-gray-400">Built for people who hire</span>
            <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
              <div className="fx-marquee gap-8">
                {[...AUDIENCE, ...AUDIENCE].map((a, i) => (
                  <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] text-gray-700"><span className="size-1.5 rounded-[2px] bg-brand-500" />{a}</span>
                ))}
              </div>
            </div>
          </div>
        </Shell>

        {/* ------------------------------------------------------- Problem */}
        <Shell id="product">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div className="flex flex-col">
              <Eyebrow>Sourcing is slow by default</Eyebrow>
              <BlurText text="The right people are out there. Finding them takes all week." className="mt-4 max-w-[480px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" muted={["Finding", "them", "takes", "all", "week"]} />
              <ul className="mt-10 divide-y divide-black/[0.06] border-y border-black/[0.06] text-[14px] text-gray-600">
                {["Keyword filters miss people who'd be perfect.", "A job description turns into forty boolean strings.", "Shortlists live in spreadsheets nobody updates.", "Follow-ups slip, and good candidates go quiet."].map((t, i) => (
                  <FadeIn key={t} delay={i * 90}><li className="py-4">{t}</li></FadeIn>
                ))}
              </ul>
              <FadeIn className="mt-10"><p className="text-[26px] font-medium leading-tight tracking-[-0.02em]">The candidates are there.<br /><span className="text-gray-400">The time isn&apos;t.</span></p></FadeIn>
            </div>
            <FadeIn className="relative min-h-[460px] overflow-hidden rounded-3xl">
              <img src="/images/forest.jpg" alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
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
            <Eyebrow light>Features</Eyebrow>
            <BlurText text="Everything a search needs, in one place" className="mb-10 mt-4 max-w-[520px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
            <FeatureTabs />
          </div>
        </section>

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
              <img src="/images/lake.jpg" alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-ink-900/20" />
              <ComposerKit className="relative w-full max-w-[440px]" />
            </FadeIn>
          </div>
        </Shell>
        <Band />

        {/* -------------------------------------------------- Who it's for */}
        <Shell id="solutions">
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <BlurText text="Built for teams that hire without a big recruiting department" className="mt-4 max-w-[620px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                { i: Building2, t: "Startups & in-house teams", d: "Run searches yourself instead of paying agency fees. No setup: describe the role and start reviewing people today.", img: "/images/valley.jpg" },
                { i: Users, t: "Recruiting agencies", d: "One collection per client role, reusable talent pools and shortlists you can share. Spend your time closing, not searching.", img: "/images/hills.jpg" },
              ].map((c, k) => (
                <FadeIn key={c.t} delay={k * 100} className="group relative overflow-hidden rounded-3xl ring-1 ring-black/[0.06]">
                  <div className="relative h-48 overflow-hidden"><img src={c.img} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="p-6">
                    <c.i className="size-4 text-gray-500" />
                    <div className="mt-3 text-[18px] font-medium tracking-[-0.01em]">{c.t}</div>
                    <p className="mt-2 text-[14px] leading-relaxed text-gray-500">{c.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Shell>
        <Band />

        {/* ------------------------------------------------------- Trust */}
        <Shell>
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>You stay in control</Eyebrow>
            <BlurText text="AI that does the legwork. You make the calls." className="mt-4 max-w-[560px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
            <div className="mt-10 grid overflow-hidden rounded-2xl ring-1 ring-black/[0.06] md:grid-cols-3">
              {[
                [UserCheck, "You approve every message", "Nothing goes out until you've read it. Edit any draft before it sends."],
                [Sparkles, "Every score is explained", "See which criteria each person meets, so you can trust the shortlist."],
                [ShieldCheck, "Your data stays yours", "Emails send from your own Gmail. Candidate data is never sold or shared."],
              ].map(([I, t, d], k) => {
                const Icon = I as typeof Lock;
                return (
                  <FadeIn key={t as string} delay={k * 90} className="border-b border-black/[0.06] p-6 md:border-b-0 md:border-r md:last:border-r-0">
                    <span className="grid size-9 place-items-center rounded-xl bg-ink-900 text-white"><Icon className="size-4" /></span>
                    <div className="mt-5 text-[15px] font-medium">{t as string}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{d as string}</p>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </Shell>
        <Band />

        {/* ----------------------------------------------------- Pricing */}
        <Shell id="pricing">
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>Pricing</Eyebrow>
            <BlurText text="Start free. Upgrade when you're hiring more." className="mb-8 mt-4 max-w-[560px] text-[32px] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[40px]" />
            <Pricing />
          </div>
        </Shell>
      </main>

      {/* ------------------------------------------- Final CTA + footer */}
      <footer id="contact" className="relative isolate overflow-hidden">
        <img src="/images/hero.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover object-[50%_80%]" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-gradient-to-b from-white via-white/85 to-transparent" />
        <div className="mx-auto max-w-[1240px] px-6 pb-10 pt-16 sm:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <BlurText text="Stop searching for candidates. Start talking to them." className="max-w-[560px] text-[36px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[52px]" muted={["Start", "talking", "to", "them"]} />
              <FadeIn delay={300} className="mt-8 flex flex-wrap gap-2"><PrimaryCta>Start free trial</PrimaryCta><GhostCta href="mailto:hello@lasso.ai">Book a demo</GhostCta></FadeIn>
            </div>
            <div className="grid grid-cols-3 gap-6 text-[13px]">
              {[
                ["Product", [["AI sourcing", "#product"], ["Library", "#product"], ["Outreach", "#product"], ["Pricing", "#pricing"]]],
                ["Solutions", [["Startups", "#solutions"], ["Agencies", "#solutions"], ["How it works", "#how"]]],
                ["Company", [["Sign in", `${APP_URL}/login`], ["Start free trial", `${APP_URL}/signup`], ["Contact", "mailto:hello@lasso.ai"]]],
              ].map(([h, links]) => (
                <div key={h as string}>
                  <div className="text-gray-400">{h as string}</div>
                  <ul className="mt-3 space-y-2">{(links as string[][]).map(([l, href]) => <li key={l}><Link href={href} className="text-gray-800 hover:text-foreground hover:underline">{l}</Link></li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[22vh] flex flex-wrap items-center justify-between gap-3 text-[12px] text-white/85">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-900/40 px-3 py-1.5 backdrop-blur"><Logo className="[&_span]:text-white" /></span>
            <span className="inline-flex gap-4"><span>© 2026 Lasso</span><Link href="#" className="hover:underline">Terms</Link><Link href="#" className="hover:underline">Privacy</Link></span>
          </div>
        </div>
      </footer>
    </>
  );
}
