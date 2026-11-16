/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowUp, Briefcase, Check, CircleCheck, Clock, FolderPlus, Mail, MapPin, MessageSquareReply, Paperclip, Send, Sparkles, Star, UserRound,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { useInView } from "@/components/site/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ helpers */

/** Steps through a looping timeline while `active`; returns the current step index. */
function useTimeline(durations: number[], active: boolean) {
  const [i, setI] = useState(0);
  const key = durations.join(",");
  useEffect(() => {
    if (!active) return;
    const d = key.split(",").map(Number);
    const t = setTimeout(() => setI((n) => (n + 1) % d.length), d[i]);
    return () => clearTimeout(t);
  }, [i, active, key]);
  return i;
}

/** Types `text` out while `on`; resets when `on` turns false. */
function useTyped(text: string, on: boolean, speed = 34) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { const r = setTimeout(() => setN(0), 0); return () => clearTimeout(r); }
    if (n >= text.length) return;
    const t = setTimeout(() => setN((x) => x + 1), speed);
    return () => clearTimeout(t);
  }, [n, on, text, speed]);
  return text.slice(0, n);
}

/** Counts from 0 to `to` while `on`. */
function useCount(to: number, on: boolean, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) { const r = setTimeout(() => setV(0), 0); return () => clearTimeout(r); }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min((t - t0) / ms, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, on, ms]);
  return v;
}

const mono = "font-mono text-[10px] uppercase tracking-[0.08em]";

/** Window chrome shared by every kit: mono label on the left, live status on the right. */
export function KitFrame({ label, status, dark, children, className }: { label: string; status: string; dark?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl text-left", dark ? "bg-ink-900/90 text-white ring-1 ring-white/10 backdrop-blur-xl" : "bg-white/90 text-foreground ring-1 ring-white backdrop-blur-xl backdrop-saturate-150", "shadow-[0_24px_60px_-24px_rgba(16,24,40,0.35)]", className)}>
      <div className={cn("flex items-center justify-between border-b px-4 py-2.5", dark ? "border-white/10" : "border-black/[0.05]")}>
        <span className={cn(mono, dark ? "text-white/45" : "text-gray-400")}>{label}</span>
        <span className={cn(mono, "inline-flex items-center gap-1.5", dark ? "text-white/70" : "text-gray-600")}>
          <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" /><span className="relative size-1.5 rounded-full bg-brand-500" /></span>
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}

function Ring({ value, size = 34, dark }: { value: number; size?: number; dark?: boolean }) {
  const r = (size - 5) / 2, c = 2 * Math.PI * r;
  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? "rgba(255,255,255,.12)" : "#ececec"} strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={value >= 90 ? "var(--brand-500)" : dark ? "#fff" : "var(--ink-900)"} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} style={{ transition: "stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)" }} />
      </svg>
      <span className="absolute text-[10px] font-medium tabular-nums">{value}</span>
    </span>
  );
}

/* --------------------------------------------------------- 1. AI sourcing chat */

const BRIEF = "Senior product designer, B2B SaaS, strong in Figma, based in the US";
const ANSWER = "41 strong matches from 260 profiles. 12 have shipped a design system.";
const CHAT_T = [900, 2600, 700, 1300, 3200, 1800];

/** Sourcing assistant: the brief types itself, sends, Lasso thinks, then streams the answer and criteria. */
export function ChatKit({ className, dark }: { className?: string; dark?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline(CHAT_T, inView);
  const typed = useTyped(BRIEF, s === 1, 30);
  const answer = useTyped(ANSWER, s >= 4, 18);
  const status = ["Ready", "Typing", "Sent", "Thinking", "Answering", "Ready"][s];
  const crit = ["Senior level", "B2B SaaS", "Figma", "United States"];
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Sourcing assistant" status={status} dark={dark}>
        <div className={cn("flex h-[268px] flex-col justify-end gap-3 p-4", dark ? "bg-white/[0.02]" : "bg-gray-25")}>
          {s >= 2 && (
            <div className="fx-pop ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-ink-900 px-3.5 py-2 text-[12px] leading-snug text-white ring-1 ring-white/10">{BRIEF}</div>
          )}
          {s >= 3 && (
            <div className="fx-pop flex items-start gap-2">
              <LogoMark className="size-6 shrink-0" />
              <div className={cn("min-w-0 rounded-2xl rounded-tl-md px-3.5 py-2.5 text-[12px] leading-snug", dark ? "bg-white/[0.07]" : "bg-white ring-1 ring-black/[0.05]")}>
                {s === 3 ? (
                  <span className="flex gap-1 py-1">{[0, 1, 2].map((d) => <span key={d} className="size-1.5 animate-bounce rounded-full bg-current opacity-50" style={{ animationDelay: `${d * 120}ms` }} />)}</span>
                ) : (
                  <>
                    <p>{answer}<span className={cn("ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-current", answer.length === ANSWER.length && "opacity-0")} /></p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {crit.map((c, i) => (
                        <span key={c} className={cn("fx-pop inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]", dark ? "bg-white/10" : "bg-gray-50 ring-1 ring-black/[0.05]")} style={{ animationDelay: `${300 + i * 110}ms` }}>
                          <Check className="size-2.5 text-brand-500" strokeWidth={3} />{c}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={cn("flex items-center gap-2 border-t px-3 py-2.5", dark ? "border-white/10" : "border-black/[0.05]")}>
          <Paperclip className={cn("size-3.5 shrink-0", dark ? "text-white/40" : "text-gray-400")} />
          <span className={cn("min-w-0 flex-1 truncate text-[12px]", s === 1 ? "" : dark ? "text-white/35" : "text-gray-400")}>
            {s === 1 ? <>{typed}<span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-current" /></> : "Describe who you're hiring…"}
          </span>
          <span className={cn("grid size-6 shrink-0 place-items-center rounded-full transition-transform", s === 1 && typed.length === BRIEF.length ? "scale-110 bg-brand-500" : dark ? "bg-white text-ink-900" : "bg-ink-900 text-white")}>
            <ArrowUp className="size-3" strokeWidth={2.5} />
          </span>
        </div>
      </KitFrame>
    </div>
  );
}

/* ------------------------------------------------------------ 2. Match list */

const MATCHES = [
  { name: "Maya Chen", role: "Senior Product Designer · Loom", a: "/avatars/a5.jpg", m: 97, checks: 4 },
  { name: "Daniel Reyes", role: "Senior UX Designer · Intercom", a: "/avatars/a2.jpg", m: 95, checks: 4 },
  { name: "Emma Larsen", role: "Design Lead · Mixpanel", a: "/avatars/a3.jpg", m: 93, checks: 3 },
];

/** Scored matches: rows slide in, rings fill and criteria tick one by one. */
export function MatchKit({ className, dark }: { className?: string; dark?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline([700, 4200, 1600], inView);
  const on = s >= 1;
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Top matches" status={s === 1 ? "Scoring" : "Ready"} dark={dark}>
        <ul className="space-y-1.5 p-3">
          {MATCHES.map((c, i) => (
            <li key={c.name} className={cn("flex items-center gap-3 rounded-xl p-2.5 transition-all duration-500", dark ? "bg-white/[0.05]" : "bg-gray-25 ring-1 ring-black/[0.04]", inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")} style={{ transitionDelay: `${i * 160}ms` }}>
              <img src={c.a} alt="" className="size-8 rounded-full object-cover" />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[12px] font-medium">{c.name}</div>
                <div className={cn("truncate text-[10px]", dark ? "text-white/50" : "text-gray-500")}>{c.role}</div>
                <div className="mt-1.5 flex gap-1">
                  {[0, 1, 2, 3].map((k) => (
                    <span key={k} className={cn("grid size-3.5 place-items-center rounded-full transition-all duration-300", k < c.checks ? (on ? "scale-100 bg-ink-900 text-white" : "scale-50 opacity-0") : dark ? "bg-white/10" : "bg-gray-100")} style={{ transitionDelay: on ? `${500 + i * 160 + k * 120}ms` : "0ms", ...(dark && k < c.checks ? { background: "#fff", color: "var(--ink-900)" } : {}) }}>
                      {k < c.checks && <Check className="size-2" strokeWidth={4} />}
                    </span>
                  ))}
                </div>
              </div>
              <Ring value={on ? c.m : 0} dark={dark} />
            </li>
          ))}
        </ul>
      </KitFrame>
    </div>
  );
}

/* ------------------------------------------------------- 3. Pipeline (squares) */

const DAYS = [[2, 1, 0], [3, 1, 0], [1, 2, 1], [1, 1, 0], [3, 2, 1], [3, 3, 1], [2, 4, 2], [4, 3, 1], [2, 3, 1], [1, 1, 0], [1, 1, 1], [4, 4, 2], [3, 4, 2], [3, 2, 1]];

/** Live pipeline: the square grid fills column by column and the totals tick up. */
export function PipelineKit({ className, dark }: { className?: string; dark?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline([400, 4200, 1200], inView);
  const on = s >= 1;
  const contacted = useCount(45, on, 1600);
  const replied = useCount(18, on, 1600);
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Pipeline activity" status="Live" dark={dark}>
        <div className="grid grid-cols-3 gap-px border-b border-black/[0.05] bg-black/[0.04]" style={dark ? { background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.1)" } : undefined}>
          {[["Contacted", contacted, "+8.6%"], ["Reply rate", `${replied}%`, "+12.2%"], ["Shortlisted", Math.round(contacted * 2.8), "+8.2%"]].map(([k, v, d]) => (
            <div key={k as string} className={cn("px-4 py-3", dark ? "bg-ink-900" : "bg-white")}>
              <div className={cn(mono, dark ? "text-white/40" : "text-gray-400")}>{k}</div>
              <div className="mt-1 flex items-baseline gap-1.5"><span className="text-[18px] font-medium tabular-nums">{v}</span><span className="text-[10px] text-brand-600">{d}</span></div>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-center gap-[5px] px-4 pb-4 pt-5">
          {DAYS.map(([sh, co, re], i) => {
            const cells = [...Array(re).fill("r"), ...Array(co).fill("c"), ...Array(sh).fill("s")];
            return (
              <div key={i} className="flex flex-col-reverse gap-[5px]">
                {Array.from({ length: 8 }).map((_, r) => {
                  const k = cells[r];
                  const filled = on && k;
                  return (
                    <span key={r} className={cn("size-[13px] rounded-[3px] transition-all duration-300", !k ? (dark ? "bg-white/[0.05]" : "bg-gray-50") : filled ? (k === "r" ? "bg-brand-500" : k === "c" ? (dark ? "bg-white" : "bg-ink-900") : dark ? "bg-white/30" : "bg-gray-300") : dark ? "bg-white/[0.05]" : "bg-gray-50")} style={{ transitionDelay: on ? `${i * 70 + r * 40}ms` : "0ms" }} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </KitFrame>
    </div>
  );
}

/* ---------------------------------------------------------- 4. Sequence flow */

/** Outreach sequence: badges travel along the steps as emails go out, open and get replies. */
export function SequenceKit({ className, dark }: { className?: string; dark?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const nodes = [
    { icon: Mail, t: "Intro email", d: "Day 1" },
    { icon: Clock, t: "Wait 3 days", d: "If no reply" },
    { icon: MessageSquareReply, t: "Follow-up", d: "Day 4" },
    { icon: CircleCheck, t: "Replied", d: "Stops sequence" },
  ];
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Sequence · Product designers" status="Running" dark={dark}>
        <div className="relative px-4 py-6">
          <div className="relative grid grid-cols-4 gap-3">
            <div aria-hidden className={cn("absolute left-[12%] right-[12%] top-[22px] h-px", dark ? "bg-white/15" : "bg-black/[0.08]")}>
              {inView && [0, 1, 2].map((k) => (
                <span key={k} className="fx-travel absolute -top-[9px] rounded-full bg-ink-900 px-1.5 py-0.5 text-[9px] font-medium text-white ring-2 ring-white" style={{ animationDelay: `${k * 1.1}s`, ...(k === 2 ? { background: "var(--brand-500)" } : {}) } as CSSProperties}>
                  {["Sent", "Opened", "Reply"][k]}
                </span>
              ))}
            </div>
            {nodes.map((n, i) => (
              <div key={n.t} className="relative flex flex-col items-center text-center">
                <span className={cn("grid size-11 place-items-center rounded-xl ring-1", i === 3 ? "bg-brand-500 text-white ring-brand-500" : dark ? "bg-ink-850 ring-white/10" : "bg-white ring-black/[0.06] shadow-xs")}>
                  <n.icon className="size-4" />
                </span>
                <span className="mt-2 text-[11px] font-medium">{n.t}</span>
                <span className={cn("text-[10px]", dark ? "text-white/45" : "text-gray-400")}>{n.d}</span>
              </div>
            ))}
          </div>
          <div className={cn("mt-6 grid grid-cols-3 divide-x rounded-xl text-center", dark ? "divide-white/10 bg-white/[0.04]" : "divide-black/[0.05] bg-gray-25 ring-1 ring-black/[0.04]")}>
            {[["Sent", "120"], ["Opened", "64%"], ["Replied", "18%"]].map(([k, v]) => (
              <div key={k} className="py-2.5"><div className="text-[14px] font-medium tabular-nums">{v}</div><div className={cn(mono, dark ? "text-white/40" : "text-gray-400")}>{k}</div></div>
            ))}
          </div>
        </div>
      </KitFrame>
    </div>
  );
}

/* --------------------------------------------------------------- 5. Orbit */

const ORBIT = [
  { t: "Criteria", i: Sparkles }, { t: "Match score", i: Star }, { t: "Work email", i: Mail },
  { t: "Library", i: FolderPlus }, { t: "Sequence", i: Send }, { t: "Profile", i: UserRound },
];

/** Lasso in the middle, the pieces of a search circling around it. */
export function OrbitKit({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full max-w-[420px]", className)}>
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-dashed border-ink-900/25" />
      <div aria-hidden className="absolute inset-[24%] rounded-full border border-white/80 bg-white/30 backdrop-blur-[3px]" />
      <div className="fx-orbit absolute inset-0">
        {ORBIT.map((o, k) => {
          const a = (k / ORBIT.length) * Math.PI * 2;
          return (
            <span key={o.t} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + 44 * Math.cos(a)}%`, top: `${50 + 44 * Math.sin(a)}%` }}>
              <span className="fx-orbit-rev inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] ring-1 ring-white backdrop-blur-md">
                <o.i className="size-3 text-brand-600" />{o.t}
              </span>
            </span>
          );
        })}
      </div>
      <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-2">
        <span className="grid size-16 place-items-center rounded-2xl bg-ink-900 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] ring-4 ring-white/40"><LogoMark className="size-10" /></span>
        <span className={cn(mono, "rounded-md bg-white/90 px-2 py-1 text-gray-600 shadow-xs ring-1 ring-white backdrop-blur")}>AI sourcer</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 6. Composer */

const EMAIL = "I saw the design system you shipped at Loom. We're building our product team at a Series B in SF and that's exactly the problem we're solving. Open to a 20-minute call this week?";

/** Personalised email drafting itself, with the candidate signals it was written from. */
export function ComposerKit({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline([700, 6200, 2200], inView);
  const body = useTyped(EMAIL, s >= 1, 22);
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Draft · Step 1 of 2" status={s === 1 ? "Writing" : s === 2 ? "Ready to send" : "Ready"}>
        <div className="space-y-3 p-4 text-[12px]">
          <div className="flex items-center gap-2">
            <img src="/avatars/a5.jpg" alt="" className="size-7 rounded-full object-cover" />
            <div className="leading-tight"><div className="font-medium">Maya Chen</div><div className="text-[10px] text-gray-500">maya.chen@hey.com · Loom</div></div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700"><Sparkles className="size-3" />97% match</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Design system", "B2B SaaS", "Figma"].map((t, i) => (
              <span key={t} className={cn("rounded-md bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600 ring-1 ring-black/[0.05] transition-opacity duration-500", s >= 1 ? "opacity-100" : "opacity-0")} style={{ transitionDelay: `${i * 150}ms` }}>{t}</span>
            ))}
          </div>
          <div className="min-h-[92px] rounded-xl bg-gray-25 p-3 leading-relaxed text-gray-700 ring-1 ring-black/[0.04]">
            <span className="text-foreground">Hi <span className="rounded bg-brand-50 px-1 text-brand-700">Maya</span>,</span><br />
            {body}<span className={cn("ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-foreground", body.length === EMAIL.length ? "opacity-0" : "animate-pulse")} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span>Sends from alex@northwind.com</span>
            <span className={cn("inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-medium transition-colors", s === 2 ? "bg-ink-900 text-white" : "bg-gray-50 text-gray-500 ring-1 ring-black/[0.05]")}><Send className="size-3" />Send</span>
          </div>
        </div>
      </KitFrame>
    </div>
  );
}

/* ------------------------------------------------------- 7. Glass notification */

export function NotifyCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-[min(100%,360px)] rounded-2xl bg-white/85 p-4 text-foreground shadow-[0_24px_60px_-20px_rgba(16,24,40,0.45)] ring-1 ring-white backdrop-blur-xl backdrop-saturate-150", className)}>
      <div className="flex items-center gap-2 text-[10px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700"><span className="size-1.5 rounded-full bg-brand-500" />Search finished</span>
        <span className="rounded-full bg-gray-50 px-2 py-0.5 text-gray-500 ring-1 ring-black/[0.05]">4 min</span>
      </div>
      <div className="mt-3 text-[14px] font-medium">41 strong matches for Senior Product Designer</div>
      <p className="mt-1 text-[12px] leading-relaxed text-gray-500">Lasso reviewed 260 profiles against your 6 criteria. 12 have shipped a design system.</p>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-2">{["a5", "a2", "a3", "a6"].map((a) => <img key={a} src={`/avatars/${a}.jpg`} alt="" className="size-6 rounded-full object-cover ring-2 ring-white" />)}</div>
        <span className="text-[11px] text-gray-500">Maya, Daniel and 39 more</span>
      </div>
      <div className="mt-4 flex gap-2">
        <span className="inline-flex h-8 items-center rounded-full bg-ink-900 px-3.5 text-[12px] font-medium text-white">Review matches</span>
        <span className="inline-flex h-8 items-center rounded-full bg-white px-3.5 text-[12px] ring-1 ring-black/[0.08]">Save all</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------- 8. Criteria card (light) */

export function CriteriaCard({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const rows = [
    ["Must have", "5+ years in product design"],
    ["Must have", "B2B SaaS experience"],
    ["Nice to have", "Shipped a design system"],
    ["Nice to have", "Based in the US"],
  ];
  return (
    <div ref={ref} className={cn("rounded-2xl bg-white/90 p-4 text-foreground shadow-[0_24px_60px_-20px_rgba(16,24,40,0.4)] ring-1 ring-white backdrop-blur-xl", className)}>
      <div className="flex items-center justify-between">
        <span className={cn(mono, "text-gray-400")}>Your brief, as criteria</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700"><Sparkles className="size-3" />AI</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map(([lvl, t], i) => (
          <li key={t} className={cn("flex items-center gap-2.5 rounded-xl bg-gray-25 px-3 py-2 text-[12px] ring-1 ring-black/[0.04] transition-all duration-500", inView ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0")} style={{ transitionDelay: `${200 + i * 140}ms` }}>
            <span className={cn("size-2 rounded-full", lvl === "Must have" ? "bg-ink-900" : "bg-gray-300")} />
            <span className="flex-1">{t}</span>
            <span className="text-[10px] text-gray-400">{lvl}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-ink-900 px-3 py-2 text-[12px] text-white">
        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-white/60" />About 260 profiles match</span>
        <span className="inline-flex items-center gap-1 font-medium">Find candidates<ArrowUp className="size-3 rotate-45" /></span>
      </div>
    </div>
  );
}

/* ------------------------------------------------ 9. Mini step illustrations */

export function StepMini({ step }: { step: 0 | 1 | 2 | 3 }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline([3000, 1200], inView);
  const typed = useTyped("Senior designer, Figma, US", inView && s === 0, 45);
  return (
    <div ref={ref} className="grid h-[132px] place-items-center rounded-xl bg-gray-25 p-3 ring-1 ring-inset ring-black/[0.04]">
      {step === 0 && (
        <div className="w-full rounded-xl bg-white p-2.5 text-[11px] shadow-xs ring-1 ring-black/[0.05]">
          <div className="min-h-4">{typed}<span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-current" /></div>
          <div className="mt-2 flex items-center justify-between"><Paperclip className="size-3 text-gray-400" /><span className="grid size-5 place-items-center rounded-full bg-ink-900 text-white"><ArrowUp className="size-2.5" /></span></div>
        </div>
      )}
      {step === 1 && (
        <div className="w-full space-y-1.5">
          {[97, 93, 88].map((m, i) => (
            <div key={m} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-xs ring-1 ring-black/[0.05]">
              <img src={`/avatars/${["a5", "a3", "a6"][i]}.jpg`} alt="" className="size-5 rounded-full object-cover" />
              <span className="h-1.5 flex-1 rounded-full bg-gray-100"><span className="block h-full rounded-full bg-ink-900 transition-all duration-700" style={{ width: inView && s === 0 ? `${m}%` : "0%", transitionDelay: `${i * 150}ms`, ...(m >= 90 ? { background: "var(--brand-500)" } : {}) }} /></span>
              <span className="w-6 text-right text-[10px] tabular-nums">{m}</span>
            </div>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="relative w-full">
          <div className="rounded-lg bg-white px-2.5 py-2 text-[11px] shadow-xs ring-1 ring-black/[0.05]"><span className="inline-flex items-center gap-1.5 font-medium"><FolderPlus className="size-3.5 text-brand-600" />Product Designers · SF</span><div className="mt-1 text-[10px] text-gray-400">{inView && s === 0 ? 8 : 7} candidates</div></div>
          <div className={cn("absolute inset-x-3 top-[58px] flex items-center gap-2 rounded-lg bg-ink-900 px-2.5 py-1.5 text-[10px] text-white shadow-lg transition-all duration-700", inView && s === 0 ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100")}>
            <img src="/avatars/a5.jpg" alt="" className="size-4 rounded-full object-cover" />Maya Chen<Briefcase className="ml-auto size-3 text-white/50" />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="w-full space-y-1.5">
          {["Sent", "Opened", "Replied"].map((t, i) => (
            <div key={t} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[11px] shadow-xs ring-1 ring-black/[0.05]">
              <span className={cn("grid size-4 place-items-center rounded-full transition-all duration-300", inView && s === 0 ? (i === 2 ? "bg-brand-500 text-white" : "bg-ink-900 text-white") : "bg-gray-100 text-transparent")} style={{ transitionDelay: `${i * 450}ms` }}><Check className="size-2.5" strokeWidth={3} /></span>
              {t}<span className="ml-auto text-[10px] text-gray-400">{["Day 1", "Day 1", "Day 4"][i]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
