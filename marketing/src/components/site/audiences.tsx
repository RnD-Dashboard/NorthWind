/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  BadgeDollarSign, Briefcase, Clock, FolderKanban, Gauge, Layers, MailCheck, Repeat, Search, Share2, Sparkles, Users,
} from "lucide-react";
import { ComposerKit, CriteriaCard, MatchKit, PipelineKit } from "@/components/site/kit";
import { cn } from "@/lib/utils";

const TABS = [
  {
    key: "Startups", title: "Startups & founders", img: "/images/startups.jpg", kit: CriteriaCard,
    d: "Run your own searches instead of paying agency fees. Describe the role and start reviewing people today.",
    points: [[BadgeDollarSign, "No agency fees"], [Sparkles, "Brief to shortlist in minutes"], [Search, "Every match explained"], [MailCheck, "Outreach from your own Gmail"]],
  },
  {
    key: "In-house teams", title: "In-house talent teams", img: "/images/hills.jpg", kit: PipelineKit,
    d: "One shared place for every open role, so the whole team sees the same pipeline and nobody emails a candidate twice.",
    points: [[FolderKanban, "A collection per role"], [Users, "Shared notes and status"], [Gauge, "Live pipeline view"], [Repeat, "Sequences that stop on reply"]],
  },
  {
    key: "Agencies", title: "Recruiting agencies", img: "/images/agencies.jpg", kit: MatchKit,
    d: "Work many client mandates at once, reuse talent pools and send shortlists clients can act on.",
    points: [[Layers, "Many roles at once"], [Repeat, "Reusable talent pools"], [Share2, "Shortlists you can share"], [Clock, "More time closing, less searching"]],
  },
  {
    key: "Hiring managers", title: "Hiring managers", img: "/images/lake.jpg", kit: ComposerKit,
    d: "Get a scored shortlist for your role without waiting on recruiting, then reach out with a message that sounds like you.",
    points: [[Briefcase, "Hire for your own team"], [Search, "Clear match scores"], [MailCheck, "Personal first messages"], [Clock, "Replies in your inbox"]],
  },
] as const;

/** Use cases: serif tabs; each shows a short pitch with four points and a product window on a painting. */
export function Audiences() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Who it's for" className="mx-auto flex w-fit max-w-full overflow-x-auto border-b border-black/[0.08]">
        {TABS.map((t, k) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={cn("relative shrink-0 whitespace-nowrap px-4 pb-3 font-display text-[18px] transition-colors sm:px-7 sm:text-[22px]", k === i ? "text-foreground" : "text-gray-400 hover:text-gray-600")}
          >
            {t.key}
            <span className={cn("absolute inset-x-0 -bottom-px h-px bg-foreground transition-opacity duration-300", k === i ? "opacity-100" : "opacity-0")} />
          </button>
        ))}
      </div>

      <div className="relative mt-12">
        {TABS.map((t, k) => {
          const Kit = t.kit;
          const on = k === i;
          return (
            <div key={t.key} role="tabpanel" aria-hidden={!on} className={cn("grid items-center gap-10 transition-all duration-500 lg:grid-cols-[1fr_1.1fr] lg:gap-14", on ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute inset-0 translate-y-2 opacity-0")}>
              <div>
                <h3 className="font-display text-[28px] leading-tight">{t.title}</h3>
                <p className="mt-3 max-w-[460px] text-[16px] leading-relaxed text-gray-500">{t.d}</p>
                <ul className="mt-10 space-y-5">
                  {t.points.map(([I, label], n) => {
                    const Icon = I as typeof Search;
                    return (
                      <li key={label as string} className={cn("flex items-center gap-3 text-[15px] text-gray-600 transition-all duration-500", on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")} style={{ transitionDelay: on ? `${150 + n * 70}ms` : "0ms" }}>
                        <Icon className="size-[18px] text-brand-500" strokeWidth={1.75} />{label as string}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-[28px]">
                <img src={t.img} alt="" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-white/10" />
                <div className="relative grid min-h-[400px] place-items-center px-5 py-10 sm:px-10">
                  {on && <Kit className="w-full max-w-[440px]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
