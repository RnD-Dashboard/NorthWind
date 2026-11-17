/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Example quotes for the design; swap in real customer quotes before launch. */
const ITEMS = [
  { q: "We filled two senior design roles from our first search.", n: "Maya Chen", r: "Head of Talent, Fernway", a: "/avatars/a5.jpg", m: "2", l: "roles filled in a month", tone: "from-[#d9c9b6] via-[#c9b49c] to-[#ad9479]" },
  { q: "Sourcing used to take my whole Monday. Now it's done before coffee.", n: "Daniel Reyes", r: "Recruiter, Brightline", a: "/avatars/a2.jpg", m: "6h", l: "saved every week", tone: "from-[#b9c9e2] via-[#a2b6d6] to-[#7f97c0]" },
  { q: "The match scores mean I stop second-guessing the shortlist.", n: "Amara Okafor", r: "Talent Partner, Halcyon", a: "/avatars/a9.jpg", m: "92%", l: "shortlist accuracy", tone: "from-[#f1c9ab] via-[#e3a985] to-[#c98159]" },
  { q: "Follow-ups send themselves, and replies land right in my inbox.", n: "Kenji Tanaka", r: "Founder, Quietriver", a: "/avatars/a8.jpg", m: "3x", l: "more replies", tone: "from-[#e8b9c7] via-[#d99bae] to-[#bf7690]" },
  { q: "We stopped paying agency fees for engineering hires.", n: "Layla Hassan", r: "COO, Atlas & Co", a: "/avatars/a7.jpg", m: "$48k", l: "saved on agency fees", tone: "from-[#d6c9b9] via-[#c5b4a0] to-[#a8957f]" },
  { q: "Our whole team works from one shared list per role now.", n: "Jonas Weber", r: "People Ops, Northwind", a: "/avatars/a6.jpg", m: "1", l: "shared view per role", tone: "from-[#c3c8cd] via-[#adb3ba] to-[#8d949c]" },
  { q: "I describe the person once and Lasso does the digging.", n: "Grace Murphy", r: "Hiring Manager, Codecraft", a: "/avatars/a11.jpg", m: "4 min", l: "to a scored shortlist", tone: "from-[#b5cdbd] via-[#9cbaa6] to-[#7a9c86]" },
];

/** Card sizes follow the container: wider cards on desktop, compact on phones. */
function useSizes() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1200);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const small = w < 640;
  return { ref, small, card: small ? 150 : 210, open: small ? Math.min(w - 64, 320) : 500, gap: small ? 12 : 24, h: small ? 380 : 430 };
}

/**
 * Testimonial carousel: soft gradient cards in a row; the centred card opens up to show
 * the person's photo. Advances on its own, pauses on hover, and any card can be clicked.
 */
export function Testimonials() {
  const [i, setI] = useState(2);
  const [paused, setPaused] = useState(false);
  const { ref, small, card, open, gap, h } = useSizes();
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % ITEMS.length), 4500);
    return () => clearTimeout(t);
  }, [i, paused]);
  const offset = i * (card + gap) + open / 2;

  return (
    <div ref={ref} className="relative overflow-hidden py-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ height: h + 40 }}>
      <div className="absolute left-1/2 top-4 flex items-center transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ gap, transform: `translateX(${-offset}px)` }}>
        {ITEMS.map((t, k) => {
          const on = k === i;
          return (
            <button
              key={t.n}
              type="button"
              onClick={() => setI(k)}
              aria-label={`${t.n}: ${t.q}`}
              aria-pressed={on}
              className={cn("grain relative flex shrink-0 overflow-hidden rounded-[28px] bg-gradient-to-b text-left text-white transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]", t.tone, on ? "shadow-[0_30px_60px_-30px_rgba(16,24,40,0.45)]" : "opacity-60 hover:opacity-80")}
              style={{ width: on ? open : card, height: on ? h : h - 28 }}
            >
              {/* Photo panel on the open card */}
              <span className={cn("relative h-full shrink-0 overflow-hidden rounded-[24px] transition-all duration-700", on && !small ? "m-1.5 w-[44%] opacity-100" : "m-0 w-0 opacity-0")}>
                <img src={t.a} alt="" className="absolute inset-0 size-full object-cover" />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute bottom-4 left-4 leading-tight">
                  <span className="block text-[16px] font-medium">{t.n}</span>
                  <span className="block text-[13px] text-white/80">{t.r}</span>
                </span>
              </span>

              <span className="relative flex min-w-0 flex-1 flex-col items-center px-5 pb-5 pt-8 text-center">
                <span className={cn("font-display leading-none text-white/90", on ? "text-[44px]" : "text-[32px]")}>&rdquo;</span>
                <span className={cn("mt-2 [text-wrap:balance] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.12)]", on ? "text-[22px] leading-[1.45]" : "text-[15px] leading-snug")}>&ldquo;{t.q}&rdquo;</span>
                {on && small && (
                  <span className="mt-4 flex items-center gap-2 text-[12px]"><img src={t.a} alt="" className="size-7 rounded-full object-cover ring-2 ring-white/60" /><span className="text-left leading-tight"><span className="block font-medium">{t.n}</span><span className="block text-white/80">{t.r}</span></span></span>
                )}
                <span className="mt-auto self-end text-right leading-tight">
                  <span className={cn("block font-display text-white", on ? "text-[48px]" : "text-[32px]")}>{t.m}</span>
                  <span className={cn("block text-white/80", on ? "text-[13px]" : "text-[11px]")}>{t.l}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-white to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
