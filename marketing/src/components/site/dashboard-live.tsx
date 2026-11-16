/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Bell, BriefcaseBusiness, CalendarDays, ChevronRight, Code, FolderOpen, LayoutDashboard, Library, PenTool, Plus, Search, Send, Share2,
  Sparkles, SquarePen, TrendingUp, Upload, UserSearch,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

/** Design width of the dashboard; it is scaled to fit whatever width the window has. */
const W = 1280, H = 800;
const DAYS = [[2, 1, 0], [3, 1, 0], [1, 2, 1], [1, 1, 0], [3, 2, 1], [3, 3, 1], [2, 4, 2], [4, 3, 1], [2, 3, 1], [1, 1, 0], [1, 1, 1], [4, 4, 2], [3, 4, 2], [3, 2, 1]];
const LABELS = ["30", "31", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

/** Plays once when the window comes into view; returns 0..1 over `ms`. */
function useIntro(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, start = 0;
    const tick = (now: number) => { if (!start) start = now; const v = Math.min((now - start) / ms, 1); setT(v); if (v < 1) raf = requestAnimationFrame(tick); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { raf = requestAnimationFrame(tick); io.disconnect(); } }, { rootMargin: "0px 0px -42% 0px" });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ms]);
  return [ref, t] as const;
}

/** 0..1 for the slice of the intro between `a` and `b` (eased). */
const seg = (t: number, a: number, b: number) => { const v = Math.min(Math.max((t - a) / (b - a), 0), 1); return 1 - Math.pow(1 - v, 3); };
const fmt = (n: number) => n.toLocaleString("en-US");

function Card({ className, children, style }: { className?: string; children: React.ReactNode; style?: CSSProperties }) {
  return <div className={cn("rounded-[14px] bg-white p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] ring-1 ring-black/[0.05]", className)} style={style}>{children}</div>;
}
function Delta({ v, down }: { v: string; down?: boolean }) {
  return <span className={cn("inline-flex items-center gap-1 text-[10.5px]", down ? "text-red-500" : "text-brand-600")}><span className={cn("grid size-3.5 place-items-center rounded-full text-[8px] text-white", down ? "bg-red-500" : "bg-brand-500")}>{down ? "↘" : "↗"}</span>{v}</span>;
}

/**
 * Live replica of the Lasso dashboard for the hero window. It renders the app's real layout
 * and brings it to life once on view: counters tick, the pipeline fills day by day,
 * top matches fan in, role progress grows and a "search finished" notice slides in.
 */
export function DashboardLive() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [ref, t] = useIntro(4200);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Starts part-filled so the first view never looks empty, then counts up to the real figures.
  const c = 0.72 + 0.28 * seg(t, 0.05, 0.45);
  const active = Math.min(13, 5 + Math.floor(seg(t, 0.15, 0.7) * 9));
  const fan = 0.3 + 0.7 * seg(t, 0.45, 0.75);
  const toast = seg(t, 0.78, 0.92);

  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ height: H * scale }}>
      <div ref={ref} className="absolute left-0 top-0 flex bg-canvas text-foreground" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        {/* Sidebar */}
        <aside className="flex w-[208px] shrink-0 flex-col gap-1 border-r border-black/[0.05] bg-canvas px-2.5 py-3 text-[12.5px]">
          <div className="flex items-center gap-2 px-1.5 py-1 font-semibold"><LogoMark className="size-6" />Northwind</div>
          <div className="mt-2 flex gap-1.5">
            <span className="flex h-[28px] flex-1 items-center gap-2 rounded-md border bg-white px-2 text-gray-600"><SquarePen className="size-3.5" />New search</span>
            <span className="grid h-[28px] w-[44px] place-items-center rounded-md border bg-white text-gray-500"><Search className="size-3.5" /></span>
          </div>
          <div className="mt-2 space-y-0.5">
            {[[LayoutDashboard, "Dashboard"], [UserSearch, "Sourcing"], [Library, "Library"], [Send, "Outreach"]].map(([I, l], i) => {
              const Icon = I as typeof Library;
              return <div key={l as string} className={cn("flex h-[30px] items-center gap-2.5 rounded-full px-2.5", i === 0 ? "bg-ink-900 text-white" : "text-gray-700")}><Icon className="size-4" />{l as string}</div>;
            })}
          </div>
          <div className="mt-4 px-2 text-[11px] text-gray-500">Collections</div>
          {["Product Designers — SF", "Backend · Go", "Growth leads", "Design leadership"].map((l, i) => (
            <div key={l} className="flex h-[28px] items-center gap-2.5 px-2.5 text-gray-700"><FolderOpen className={cn("size-3.5", ["text-brand-500", "text-violet-500", "text-amber-500", "text-emerald-500"][i])} />{l}</div>
          ))}
          <div className="mt-auto rounded-xl border bg-white p-3">
            <div className="text-[11.5px] font-medium">Your Lasso trial is active</div>
            <div className="mt-1 text-[10.5px] leading-snug text-gray-500">Enjoy 7 more days of Starter benefits.</div>
            <div className="mt-2 h-1 rounded-full bg-gray-100"><div className="h-full w-[38%] rounded-full bg-brand-500" /></div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[44px] items-center justify-between border-b border-black/[0.05] px-5 text-[12.5px]">
            <span className="font-medium">Dashboard</span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] ring-1 ring-black/[0.05]"><Sparkles className="size-3 text-brand-500" /><b className="font-medium tabular-nums">{16}</b><span className="text-gray-500">searches left</span></span>
              <span className="relative"><Bell className="size-4 text-gray-600" /><span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-brand-500" /></span>
              <img src="/avatars/a12.jpg" alt="" className="size-7 rounded-full object-cover" />
            </span>
          </div>

          <div className="relative flex-1 px-6 pt-5">
            <div className="flex items-end justify-between">
              <div><div className="text-[24px] font-medium tracking-[-0.025em]">Hiring overview</div><div className="mt-0.5 text-[12px] text-gray-500">Everything Lasso found, shortlisted and sent for you this month.</div></div>
              <span className="flex items-center gap-3 text-[11px]"><span className="inline-flex items-center gap-1.5 text-gray-500"><span className="size-1.5 animate-pulse rounded-full bg-brand-500" />Live updates</span><span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-white px-3 font-medium ring-1 ring-black/[0.06]"><CalendarDays className="size-3.5" />This month</span></span>
            </div>

            <div className="mt-4 grid grid-cols-[1.05fr_0.8fr_0.8fr] gap-3">
              {/* Candidates sourced */}
              <Card className="row-span-1 bg-gradient-to-br from-white to-brand-50/60">
                <div className="flex items-center justify-between text-[12.5px] font-medium"><span>Candidates sourced</span><span className="rounded-full bg-gray-50 px-2 py-0.5 text-[10.5px] font-normal text-gray-500">4 searches</span></div>
                <div className="mt-2 text-[30px] font-medium tracking-[-0.03em] tabular-nums">{fmt(Math.round(1284 * c))}</div>
                <div className="mt-1 flex items-center gap-2 text-[10.5px] text-gray-500"><Delta v="+12.4%" /> vs last week · <b className="font-medium text-foreground tabular-nums">{Math.round(117 * c)}</b> strong matches</div>
                <div className="mt-3 grid grid-cols-3 gap-1.5 text-[11px] font-medium">
                  <span className="flex h-8 items-center justify-center gap-1.5 rounded-full bg-ink-900 text-white"><Plus className="size-3.5" />New search</span>
                  <span className="flex h-8 items-center justify-center gap-1.5 rounded-full bg-gray-50"><Upload className="size-3" />Import</span>
                  <span className="flex h-8 items-center justify-center gap-1.5 rounded-full bg-gray-50"><Share2 className="size-3" />Share</span>
                </div>
              </Card>
              <Card>
                <div className="text-[12.5px] font-medium">Shortlisted</div>
                <div className="mt-2 text-[24px] font-medium tabular-nums">{Math.round(126 * c)}</div>
                <div className="mt-1 text-[10.5px] text-gray-500"><Delta v="+8.2%" /> vs last month</div>
              </Card>
              <Card>
                <div className="text-[12.5px] font-medium">Emails sent</div>
                <div className="mt-2 text-[24px] font-medium tabular-nums">{Math.round(84 * c)}</div>
                <div className="mt-1 text-[10.5px] text-gray-500"><Delta v="-5.3%" down /> vs last month</div>
              </Card>

              {/* Pipeline */}
              <Card className="row-span-2">
                <div className="flex items-center justify-between text-[12.5px] font-medium"><span>Pipeline activity</span><span className="rounded-full px-2.5 py-0.5 text-[10.5px] font-normal text-gray-500 ring-1 ring-black/[0.06]">14 days</span></div>
                <div className="mt-1 flex items-baseline gap-2"><span className="text-[22px] font-medium tabular-nums">{Math.round(45 * c)}</span><span className="text-[10.5px] text-gray-500">contacted</span><Delta v="+8.6%" /></div>
                <div className="mt-3 flex justify-center gap-[5px]">
                  {DAYS.map(([s, co, r], i) => {
                    const cells = [...Array(r).fill("r"), ...Array(co).fill("c"), ...Array(s).fill("s")];
                    const shown = i <= active;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <div className="flex flex-col-reverse gap-[5px]">
                          {Array.from({ length: 10 }).map((_, k) => {
                            const kind = shown ? cells[k] : undefined;
                            return <span key={k} className={cn("size-[19px] rounded-[4px] transition-colors duration-300", kind === "r" ? "bg-brand-500" : kind === "c" ? "bg-ink-900" : kind === "s" ? "bg-gray-300" : "bg-gray-50 [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,.045)_0_1.5px,transparent_1.5px_5px)]")} />;
                          })}
                        </div>
                        <span className={cn("text-[9.5px] tabular-nums", i === active ? "font-medium text-foreground" : "text-gray-400")}>{LABELS[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Reply rate */}
              <Card>
                <div className="text-[12.5px] font-medium">Reply rate</div>
                <div className="mt-2 text-[24px] font-medium tabular-nums">{Math.round(18 * c)}%</div>
                <div className="mt-1 text-[10.5px] text-gray-500"><Delta v="+12.2%" /> vs last month</div>
                <div className="mt-3 flex gap-1">
                  <span className="h-1.5 rounded-full bg-brand-500" style={{ width: `${18 * c}%` }} />
                  <span className="h-1.5 rounded-full bg-ink-900" style={{ width: `${46 * c}%` }} />
                  <span className="h-1.5 flex-1 rounded-full bg-gray-100" />
                </div>
              </Card>

              {/* Top matches */}
              <div className="relative overflow-hidden rounded-[14px] bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 p-3.5 text-white">
                <div className="text-[13px] font-medium">Top matches</div><div className="text-[10.5px] text-white/70">Best of this week</div>
                <div className="relative mt-2 h-[58px]">
                  {[["a3", "Emma"], ["a2", "Daniel"], ["a5", "Maya Chen"]].map(([a, n], i) => (
                    <div key={n} className="absolute top-0 flex w-[112px] items-center gap-1.5 rounded-lg border border-white/30 bg-white/20 p-1.5 backdrop-blur-md" style={{ left: `${i * 34 * fan}%`, transform: `rotate(${(i - 1) * 6 * fan}deg)`, opacity: 0.4 + 0.6 * fan, zIndex: i }}>
                      <img src={`/avatars/${a}.jpg`} alt="" className="size-5 rounded-full object-cover" /><span className="truncate text-[10px] font-medium">{n}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/25 text-[10px]">
                  {[["Design", 38], ["Engineering", 21], ["Growth", 17]].map(([k, v]) => <div key={k as string} className="px-2 first:pl-0"><div className="text-white/70">{k}</div><div className="text-[13px] font-medium tabular-nums">{Math.round((v as number) * c)}</div></div>)}
                </div>
              </div>

              {/* Open roles */}
              <div className="col-span-2 rounded-[14px] bg-ink-900 p-3.5 text-ink-100">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-[12.5px] font-medium text-white"><span className="grid size-6 place-items-center rounded-full bg-white text-ink-900"><BriefcaseBusiness className="size-3" /></span>Open roles</span><span className="inline-flex h-6 items-center gap-1 rounded-full bg-white px-2.5 text-[10.5px] font-medium text-ink-900"><Plus className="size-3" />Add role</span></div>
                <div className="mt-2.5 space-y-1.5">
                  {[[PenTool, "Senior Product Designer", 12, 20], [Code, "Staff Backend Engineer", 9, 15], [TrendingUp, "Growth Marketing Lead", 9, 10]].map(([I, n, a, b]) => {
                    const Icon = I as typeof Code; const pct = (a as number) / (b as number);
                    return (
                      <div key={n as string} className="flex h-[38px] items-center gap-3 rounded-lg bg-white/[0.05] px-3 text-[11.5px]">
                        <Icon className="size-3.5 text-white/50" /><span className="flex-1 text-white">{n as string}</span>
                        <span className="w-8 text-right text-[10px] text-white/50 tabular-nums">{Math.round(pct * 100 * c)}%</span>
                        <span className="h-1.5 w-[90px] rounded-full bg-white/10"><span className="block h-full rounded-full bg-brand-500" style={{ width: `${pct * 100 * c}%` }} /></span>
                        <span className="w-10 text-[10.5px] tabular-nums text-white">{Math.round((a as number) * c)} / {b as number}</span>
                        <ChevronRight className="size-3.5 text-white/40" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Search finished notice */}
            <div className="absolute bottom-[150px] right-6 w-[280px] rounded-xl bg-white/95 p-3 shadow-[0_18px_40px_-18px_rgba(16,24,40,0.45)] ring-1 ring-black/[0.06] backdrop-blur" style={{ opacity: toast, transform: `translateY(${(1 - toast) * 14}px)` }}>
              <div className="flex items-center gap-2 text-[10px]"><span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700"><span className="size-1.5 rounded-full bg-brand-500" />Search finished</span><span className="text-gray-400">just now</span></div>
              <div className="mt-1.5 text-[12px] font-medium">41 strong matches for Senior Product Designer</div>
              <div className="mt-2 flex items-center gap-2"><div className="flex -space-x-1.5">{["a5", "a2", "a3"].map((a) => <img key={a} src={`/avatars/${a}.jpg`} alt="" className="size-5 rounded-full object-cover ring-2 ring-white" />)}</div><span className="text-[10.5px] text-gray-500">Maya, Daniel and 39 more</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
