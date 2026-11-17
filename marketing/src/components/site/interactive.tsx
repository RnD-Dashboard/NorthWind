/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PrimaryCta } from "@/components/site/chrome";
import { APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const PLANS = [
  { name: "Starter", for: "Try Lasso on a real role", m: 0, y: 0, note: "Free during your 14-day trial", cta: "Start free trial", feats: ["25 searches a month", "Top 40 matches per search", "100 email lookups", "1 sequence", "1 seat"] },
  { name: "Growth", for: "For teams hiring every month", m: 149, y: 119, note: "per month, billed", cta: "Start free trial", hot: true, feats: ["100 searches a month", "Up to 500 matches per search", "1,000 email lookups", "Unlimited sequences and templates", "10 seats with roles"] },
  { name: "Enterprise", for: "For agencies and large teams", m: -1, y: -1, note: "Tailored to your hiring volume", cta: "Talk to sales", feats: ["Custom search volume", "Unlimited seats", "SSO and admin controls", "Dedicated onboarding", "Priority support"] },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <div>
      <div className="mx-auto mb-8 flex w-fit rounded-full bg-gray-50 p-1 ring-1 ring-black/[0.05]">
        {[["Monthly", false], ["Yearly · save 20%", true]].map(([l, v]) => (
          <button key={l as string} onClick={() => setYearly(v as boolean)} className={cn("h-8 rounded-full px-4 text-[13px] transition-all", yearly === v ? "bg-white font-medium shadow-xs ring-1 ring-black/[0.06]" : "text-gray-500")}>{l as string}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => {
          const price = p.m < 0 ? "Custom" : `$${yearly ? p.y : p.m}`;
          return (
            <div key={p.name} className={cn("relative flex flex-col overflow-hidden rounded-3xl p-6", p.hot ? "text-white" : "bg-white ring-1 ring-black/[0.06]")}>
              {p.hot && <><img src="/images/hero.jpg" alt="" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/60 to-ink-900/90" /></>}
              <div className="relative flex items-start justify-between">
                <div><div className="text-[16px] font-medium">{p.name}</div><div className={cn("text-[13px]", p.hot ? "text-white/70" : "text-gray-500")}>{p.for}</div></div>
                {p.hot && <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] backdrop-blur">Most popular</span>}
              </div>
              <div className="relative mt-8 flex items-baseline gap-1.5">
                <span className="text-[40px] font-medium leading-none tracking-[-0.03em]">{price}</span>
                {p.m > 0 && <span className={cn("text-[13px]", p.hot ? "text-white/70" : "text-gray-500")}>/ month</span>}
              </div>
              <div className={cn("relative mt-2 text-[12px]", p.hot ? "text-white/60" : "text-gray-400")}>{p.m > 0 ? `${p.note} ${yearly ? "yearly" : "monthly"}` : p.note}</div>
              <div className="relative mt-6">
                <PrimaryCta href={p.m < 0 ? "/contact" : `${APP_URL}/signup`} beam={!!p.hot} light={p.hot} className="w-full justify-between">{p.cta}</PrimaryCta>
              </div>
              <ul className={cn("relative mt-6 space-y-2.5 border-t pt-5 text-[13px]", p.hot ? "border-white/15" : "border-black/[0.06]")}>
                {p.feats.map((f) => (
                  <li key={f} className="flex items-center gap-2.5"><span className={cn("grid size-4 place-items-center rounded-full", p.hot ? "bg-white text-ink-900" : "bg-ink-900 text-white")}><Check className="size-2.5" strokeWidth={3} /></span>{f}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
