/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Check, Copy, Eye, Link2, Loader2, Mail, MailOpen, MapPin, MessageSquareReply, Plus, Share2,
} from "lucide-react";
import { useInView } from "@/components/site/motion";
import { KitFrame, Ring, mono, useCount, useTimeline } from "@/components/site/kit";
import { cn } from "@/lib/utils";

/* Kits for the "Who it's for" tabs. Each one is based on a real screen in the app. */

function Avatars({ srcs, size = 20 }: { srcs: string[]; size?: number }) {
  return (
    <span className="flex -space-x-1.5">
      {srcs.map((s) => <img key={s} src={s} alt="" className="rounded-full object-cover ring-2 ring-white" style={{ width: size, height: size }} />)}
    </span>
  );
}

/* ------------------------------------------------- Startups: open roles (dashboard) */

const ROLES = [
  { t: "Senior product designer", l: "Remote, US", n: 24, p: 82, a: ["/avatars/a3.jpg", "/avatars/a7.jpg", "/avatars/a1.jpg"] },
  { t: "Backend engineer", l: "New York", n: 17, p: 58, a: ["/avatars/a4.jpg", "/avatars/a8.jpg"] },
  { t: "Growth marketer", l: "London", n: 9, p: 34, a: ["/avatars/a10.jpg"] },
];
const ROLE_T = [900, 2400, 900, 1600, 2600];

function RoleRow({ r, on, i }: { r: (typeof ROLES)[number]; on: boolean; i: number }) {
  const n = useCount(r.n, on, 1100);
  return (
    <div className="fx-pop flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-black/[0.05]" style={{ animationDelay: `${i * 90}ms` }}>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[12px] font-medium">{r.t}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400"><MapPin className="size-2.5" />{r.l}</div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-brand-500 transition-[width] duration-[1100ms] ease-out" style={{ width: on ? `${r.p}%` : "0%" }} />
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-[13px] font-medium tabular-nums">{n}</div>
        <div className="text-[10px] text-gray-400">shortlisted</div>
      </div>
      <Avatars srcs={r.a} />
    </div>
  );
}

/** Open roles: shortlists fill up, then "Add role" adds a new search that starts sourcing. */
export function OpenRolesKit({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline(ROLE_T, inView);
  const status = ["Ready", "Sourcing", "Adding role", "Sourcing", "Ready"][s];
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Open roles" status={status}>
        <div className="bg-gray-25 p-3.5">
          <div className="mb-3 flex items-center justify-between px-0.5">
            <div>
              <div className="text-[13px] font-medium">Your searches</div>
              <div className="text-[10px] text-gray-400">{s >= 3 ? 4 : 3} open roles</div>
            </div>
            <span className={cn("inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-white transition-all duration-200", s === 2 ? "scale-95 bg-brand-600" : "bg-ink-900")}>
              <Plus className="size-3" strokeWidth={2.5} />Add role
            </span>
          </div>
          <div className="space-y-2">
            {s >= 3 && (
              <div className="fx-pop flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-brand-500/30">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium">Founding engineer</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400"><MapPin className="size-2.5" />San Francisco</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand-600">
                  {s === 3 ? <><Loader2 className="size-2.5 animate-spin" />Sourcing</> : <><Check className="size-2.5" strokeWidth={3} />12 found</>}
                </span>
              </div>
            )}
            {ROLES.slice(0, s >= 3 ? 2 : 3).map((r, i) => <RoleRow key={r.t} r={r} i={i} on={s >= 1} />)}
          </div>
        </div>
      </KitFrame>
    </div>
  );
}

/* ------------------------------------------ In-house teams: shared collection (Library) */

const PEOPLE = [
  { n: "Ava Thompson", a: "/avatars/a1.jpg", e: "ava.t@…", by: "/avatars/a6.jpg" },
  { n: "Marcus Lee", a: "/avatars/a4.jpg", e: "marcus@…", by: "/avatars/a11.jpg" },
  { n: "Sofia Alvarez", a: "/avatars/a3.jpg", e: "sofia.a@…", by: "/avatars/a6.jpg" },
  { n: "Jonah Park", a: "/avatars/a8.jpg", e: "jonah.p@…", by: "/avatars/a12.jpg" },
];
const COL_T = [1000, 900, 900, 900, 900, 1300, 1600, 2400];
const STATUS = { none: "New", sent: "Sent", replied: "Replied" } as const;

/** Shared collection: emails are found row by row, then outreach status updates for the team. */
export function CollectionKit({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline(COL_T, inView);
  const status = s === 0 ? "Ready" : s <= 4 ? "Finding emails" : s <= 6 ? "Sending" : "Synced";
  const st = (k: number): keyof typeof STATUS => (s >= 7 && k === 1 ? "replied" : s >= 6 && k <= 2 ? "sent" : s >= 5 && k === 0 ? "sent" : "none");
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Library" status={status}>
        <div className="bg-gray-25 p-3.5">
          <div className="mb-3 flex items-center justify-between px-0.5">
            <div>
              <div className="text-[13px] font-medium">Senior designers</div>
              <div className="text-[10px] text-gray-400">4 candidates · shared with your team</div>
            </div>
            <Avatars srcs={["/avatars/a6.jpg", "/avatars/a11.jpg", "/avatars/a12.jpg"]} size={22} />
          </div>
          <div className="overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.05]">
            <div className={cn(mono, "grid grid-cols-[1.4fr_1fr_0.8fr] gap-2 border-b border-black/[0.05] px-3 py-2 text-[9px] text-gray-400")}>
              <span>Candidate</span><span>Email</span><span>Status</span>
            </div>
            {PEOPLE.map((p, k) => {
              const found = s >= k + 2;
              const v = st(k);
              return (
                <div key={p.n} className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center gap-2 border-b border-black/[0.04] px-3 py-2.5 last:border-0">
                  <span className="flex min-w-0 items-center gap-2">
                    <img src={p.a} alt="" className="size-6 shrink-0 rounded-full object-cover" />
                    <span className="truncate text-[11.5px] font-medium">{p.n}</span>
                  </span>
                  <span className="min-w-0 truncate text-[11px]">
                    {found ? (
                      <span key="f" className="fx-pop inline-flex items-center gap-1 text-gray-600"><Mail className="size-3 text-brand-500" />{p.e}</span>
                    ) : s === k + 1 ? (
                      <span className="inline-flex items-center gap-1 text-gray-400"><Loader2 className="size-3 animate-spin" />Finding</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </span>
                  <span className="flex min-w-0 items-center justify-between gap-1">
                    <span key={v} className={cn("fx-pop truncate rounded-full px-2 py-0.5 text-[10px]", v === "replied" ? "bg-brand-50 text-brand-600" : v === "sent" ? "bg-gray-100 text-gray-700" : "text-gray-400")}>{STATUS[v]}</span>
                    <img src={p.by} alt="" className="size-4 shrink-0 max-sm:hidden rounded-full object-cover opacity-80" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </KitFrame>
    </div>
  );
}

/* ------------------------------------------------ Agencies: client collections + share */

const CLIENTS = [
  { c: "Acme", r: "Product designer", n: 12, a: ["/avatars/a2.jpg", "/avatars/a5.jpg", "/avatars/a9.jpg"] },
  { c: "Northbeam", r: "Staff engineer", n: 8, a: ["/avatars/a4.jpg", "/avatars/a7.jpg"] },
  { c: "Halo", r: "Growth lead", n: 15, a: ["/avatars/a10.jpg", "/avatars/a3.jpg", "/avatars/a12.jpg"] },
  { c: "Fieldwork", r: "Data analyst", n: 6, a: ["/avatars/a6.jpg", "/avatars/a11.jpg"] },
];
const SHARE_T = [1300, 1100, 1300, 900, 2600];

/** Client collections: open the share dialog, copy the link, and the shortlist is marked as shared. */
export function ShareKit({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline(SHARE_T, inView);
  const status = ["Ready", "Sharing", "Link copied", "Shared", "Client viewed"][s];
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Client shortlists" status={status}>
        <div className="relative bg-gray-25 p-3.5">
          <div className="mb-3 px-0.5">
            <div className="text-[13px] font-medium">Collections</div>
            <div className="text-[10px] text-gray-400">4 clients · 41 candidates</div>
          </div>
          <div className="space-y-2">
            {CLIENTS.map((c, i) => (
              <div key={c.c} className={cn("flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 transition-shadow duration-300", i === 0 && s >= 1 && s <= 2 ? "ring-brand-500/40" : "ring-black/[0.05]")}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gray-50 text-[12px] font-medium text-gray-600 ring-1 ring-black/[0.05]">{c.c[0]}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-medium">{c.c} · {c.r}</div>
                  <div className="text-[10px] text-gray-400">{c.n} candidates</div>
                </div>
                {i === 0 && s >= 3 ? (
                  <span key={s >= 4 ? "v" : "s"} className="fx-pop inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand-600">
                    {s >= 4 ? <><Eye className="size-2.5" />Client viewed</> : <><Check className="size-2.5" strokeWidth={3} />Shared with client</>}
                  </span>
                ) : (
                  <Avatars srcs={c.a} />
                )}
                <Share2 className={cn("size-3.5 shrink-0 transition-colors", i === 0 && s >= 1 && s <= 2 ? "text-brand-500" : "text-gray-300")} />
              </div>
            ))}
          </div>

          {s >= 1 && s <= 2 && (
            <div className="absolute inset-0 grid place-items-center bg-ink-900/10 p-5 backdrop-blur-[2px]">
              <div className="fx-pop w-full max-w-[300px] rounded-2xl bg-white p-4 shadow-[0_24px_50px_-20px_rgba(16,24,40,0.45)] ring-1 ring-black/[0.06]">
                <div className="text-[13px] font-medium">Share with Acme</div>
                <div className="mt-0.5 text-[10.5px] text-gray-500">Anyone with the link can view this shortlist.</div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2 ring-1 ring-black/[0.05]">
                  <Link2 className="size-3.5 shrink-0 text-gray-400" />
                  <span className="min-w-0 flex-1 truncate text-[11px] text-gray-600">lasso.ai/s/acme-product-designer</span>
                  <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10.5px] font-medium transition-colors", s === 2 ? "bg-brand-500 text-white" : "bg-ink-900 text-white")}>
                    {s === 2 ? <><Check className="size-3" strokeWidth={3} />Copied</> : <><Copy className="size-3" />Copy</>}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </KitFrame>
    </div>
  );
}

/* --------------------------------------------- Hiring managers: candidate profile */

const CRITERIA = ["8+ years in product design", "Shipped a design system", "B2B SaaS experience", "Based in the US"];
const ACTIVITY = [
  { I: Mail, t: "First message sent", d: "From your Gmail · Mon" },
  { I: MailOpen, t: "Opened", d: "Mon, 2:14 pm" },
  { I: MessageSquareReply, t: "Replied", d: "“Happy to chat on Thursday.”" },
];
const PROF_T = [900, 1600, 1200, 1100, 2800];

/** Candidate profile: the match score fills, criteria check off, then the activity moves from sent to replied. */
export function ProfileKit({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const s = useTimeline(PROF_T, inView);
  const score = useCount(94, s >= 1, 1000);
  const status = ["Ready", "Scoring", "Sent", "Opened", "Replied"][s];
  return (
    <div ref={ref} className={className}>
      <KitFrame label="Candidate" status={status}>
        <div className="bg-gray-25 p-3.5">
          <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 ring-1 ring-black/[0.05]">
            <img src="/avatars/a5.jpg" alt="" className="size-10 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium">Priya Shah</div>
              <div className="truncate text-[10.5px] text-gray-500">Staff product designer · Brightline</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">Match</span>
              <Ring value={score} size={38} />
            </div>
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-3 ring-1 ring-black/[0.05]">
              <div className={cn(mono, "text-[9px] text-gray-400")}>Why she matches</div>
              <ul className="mt-2 space-y-1.5">
                {CRITERIA.map((c, i) => (
                  <li key={c} className={cn("flex items-start gap-1.5 text-[10.5px] leading-snug transition-all duration-500", s >= 1 ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")} style={{ transitionDelay: s >= 1 ? `${200 + i * 160}ms` : "0ms" }}>
                    <span className="mt-px grid size-3 shrink-0 place-items-center rounded-full bg-brand-500"><Check className="size-2 text-white" strokeWidth={3.5} /></span>{c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-3 ring-1 ring-black/[0.05] max-sm:hidden">
              <div className={cn(mono, "text-[9px] text-gray-400")}>Activity</div>
              <ol className="relative mt-2 space-y-2.5">
                <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100" />
                {ACTIVITY.map((a, i) => {
                  const on = s >= i + 2;
                  return (
                    <li key={a.t} className="relative flex gap-2">
                      <span className={cn("relative grid size-[15px] shrink-0 place-items-center rounded-full ring-2 ring-white transition-colors duration-300", on ? (i === 2 ? "bg-brand-500 text-white" : "bg-ink-900 text-white") : "bg-gray-100 text-gray-300")}>
                        <a.I className="size-2" strokeWidth={2.5} />
                      </span>
                      <span className={cn("min-w-0 transition-opacity duration-300", on ? "opacity-100" : "opacity-40")}>
                        <span className="block text-[10.5px] font-medium leading-tight">{a.t}</span>
                        <span className={cn("block truncate text-[9.5px]", i === 2 && on ? "text-gray-700" : "text-gray-400")}>{a.d}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex-1 rounded-lg bg-white py-2 text-center text-[11px] font-medium text-gray-700 ring-1 ring-black/[0.06]">View profile</span>
            <span className={cn("flex-1 rounded-lg py-2 text-center text-[11px] font-medium text-white transition-colors duration-300", s >= 4 ? "bg-brand-500" : "bg-ink-900")}>{s >= 4 ? "Reply to Priya" : "Send follow-up"}</span>
          </div>
        </div>
      </KitFrame>
    </div>
  );
}
