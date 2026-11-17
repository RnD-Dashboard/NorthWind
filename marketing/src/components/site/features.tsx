/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { ChatKit, PipelineKit, SequenceKit } from "@/components/site/kit";
import { BlurText, Eyebrow } from "@/components/site/motion";
import { cn } from "@/lib/utils";

const FEATURES = [
  { n: "1.0", t: "AI sourcing", img: "/images/valley.jpg", kit: ChatKit, title: "Describe the person. Get a scored shortlist.", d: "Write the brief the way you'd say it. Lasso turns it into criteria and explains every match." },
  { n: "1.1", t: "Library & pipeline", img: "/images/hero.jpg", kit: PipelineKit, title: "Every shortlisted candidate in one view.", d: "Collections per role, status at a glance and a live pipeline your whole team works from." },
  { n: "1.2", t: "Outreach", img: "/images/lake.jpg", kit: SequenceKit, title: "Follow-ups that send themselves.", d: "Sequences from your own Gmail that stop the moment someone replies." },
];

/**
 * Sticky-scroll features: the heading and numbered index stay pinned on the left while
 * feature cards stack up on the right. The index highlights the card in the middle of the screen.
 */
export function FeatureStack() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <Eyebrow light>Features</Eyebrow>
        <BlurText text="Everything a search needs, in one place" className="mt-4 max-w-[440px] text-[32px] leading-[1.1] sm:text-[40px]" />
        <ol className="mt-10 hidden space-y-3 lg:block">
          {FEATURES.map((f, i) => (
            <li key={f.n}>
              <button onClick={() => go(i)} className={cn("flex items-baseline gap-4 text-[15px] transition-colors duration-300", i === active ? "text-white" : "text-white/35 hover:text-white/60")}>
                <span className="w-7 font-mono text-[12px] tabular-nums">{f.n}</span>{f.t}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="min-w-0 space-y-16 lg:space-y-0">
        {FEATURES.map((f, i) => {
          const Kit = f.kit;
          return (
            <div key={f.n} ref={(el) => { refs.current[i] = el; }} data-i={i} className="bg-ink-900 lg:sticky lg:top-24 lg:pb-24" style={{ zIndex: i + 1 }}>
              <div className="relative overflow-hidden rounded-2xl">
                <img src={f.img} alt="" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-ink-900/10" />
                <div className="relative px-5 py-10 sm:px-10 sm:py-12"><Kit className="mx-auto max-w-[460px]" /></div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1.1fr_1fr] sm:gap-8">
                <h3 className="font-display text-[24px] leading-[1.15] text-white">{f.title}</h3>
                <p className="text-[14px] leading-relaxed text-white/50">{f.d}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
