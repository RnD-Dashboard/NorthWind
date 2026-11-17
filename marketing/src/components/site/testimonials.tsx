/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Example stories for the design; swap in real customer quotes before launch. */
const STORIES = [
  { logo: "/logos/boltshift.svg", company: "Boltshift", q: "We filled two senior design roles from our first search. Lasso found people our job posts never reached.", n: "Maya Chen", r: "Head of Talent", a: "/avatars/a5.jpg", m: 83, unit: "%", l: "Less time sourcing" },
  { logo: "/logos/capsule.svg", company: "Capsule", q: "Sourcing used to take my whole Monday. Now I review a scored shortlist before my first coffee.", n: "Daniel Reyes", r: "Senior Recruiter", a: "/avatars/a2.jpg", m: 6, unit: "h", l: "Saved every week" },
  { logo: "/logos/galileo.svg", company: "Galileo", q: "Follow-ups send themselves from my own inbox, and the replies land right where I already work.", n: "Amara Okafor", r: "Talent Partner", a: "/avatars/a9.jpg", m: 3, unit: "x", l: "More replies" },
];

/** Counts up to `to` each time `run` turns true. */
function useCount(to: number, run: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min((t - t0) / 900, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return v;
}

function Story({ s, open, onOpen }: { s: (typeof STORIES)[number]; open: boolean; onOpen: () => void }) {
  const v = useCount(s.m, open);
  return (
    <div
      onMouseEnter={onOpen}
      onClick={onOpen}
      className={cn(
        "relative flex min-h-[340px] cursor-pointer flex-col overflow-hidden rounded-xl bg-white p-6 ring-1 ring-black/[0.06] transition-[flex-grow,box-shadow] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] max-md:min-h-0",
        open ? "flex-[4] shadow-[0_18px_40px_-24px_rgba(16,24,40,0.25)]" : "flex-[1] hover:bg-gray-25",
      )}
    >
      <img src={s.logo} alt={s.company} className={cn("h-7 w-auto self-start transition-all duration-500", open ? "opacity-100" : "opacity-40 grayscale")} />

      {/* Open state */}
      <div className={cn("mt-auto transition-all duration-500 max-md:mt-5", open ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none absolute inset-x-6 bottom-6 translate-y-3 opacity-0 max-md:hidden")}>
        <img src={s.a} alt="" className="h-[72px] w-[100px] rounded-lg object-cover object-[50%_25%]" />
        <div className="mt-5 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
          <div className="max-w-[440px]">
            <p className="text-[16px] leading-relaxed text-foreground">&ldquo;{s.q}&rdquo;</p>
            <div className="mt-3 text-[13px] font-medium">{s.n}</div>
            <div className="text-[12px] text-gray-500">{s.r}, {s.company}</div>
          </div>
          <div className="shrink-0 border-l border-black/[0.08] pl-4 max-sm:border-l-0 max-sm:pl-0">
            <div className="text-[22px] font-medium tabular-nums tracking-[-0.02em]">{v}{s.unit}</div>
            <div className="text-[12px] text-gray-500">{s.l}</div>
          </div>
        </div>
      </div>

      {/* Closed state */}
      <span className={cn("mt-auto grid size-8 place-items-center rounded-lg bg-gray-50 text-gray-500 transition-opacity duration-300", open ? "pointer-events-none absolute bottom-6 left-6 opacity-0" : "opacity-100 max-md:hidden")}>
        <Plus className="size-4" />
      </span>
    </div>
  );
}

/** Customer stories: an accordion of white cards; hover or tap a card to open it. */
export function Testimonials() {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex gap-2 max-md:flex-col">
      {STORIES.map((s, i) => <Story key={s.company} s={s} open={i === open} onOpen={() => setOpen(i)} />)}
    </div>
  );
}
