/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";
import { Beam, Roll } from "@/components/ui/fx";
import { DashboardLive } from "@/components/site/dashboard-live";
import { APP_URL } from "@/lib/site";

/** Hero sign-up: work email field and the trial button in one pill. */
export function HeroEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`${APP_URL}/signup${email ? `?email=${encodeURIComponent(email)}` : ""}`);
  };
  return (
    <form onSubmit={submit} className="flex w-full max-w-[460px] items-center gap-2 rounded-full bg-white/70 p-1.5 pl-5 shadow-[0_12px_32px_-16px_rgba(16,24,40,0.45)] ring-1 ring-white backdrop-blur-xl backdrop-saturate-150">
      <label htmlFor="hero-email" className="sr-only">Work email</label>
      <input id="hero-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-gray-500" />
      <button type="submit" className="fx-btn group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink-900 px-5 text-[14px] font-medium text-white">
        <Beam /><Roll>Start free trial</Roll><ArrowRight className="size-4" />
      </button>
    </form>
  );
}

export function TourLink() {
  return (
    <a href="#how" className="fx-btn inline-flex items-center gap-2 text-[14px] text-gray-700 hover:text-foreground">
      <Play className="size-3.5" /><Roll>See how it works</Roll>
    </a>
  );
}

/** Scroll progress over the first `range` pixels of the page (0..1). */
function useScrollProgress(range: number) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setP(Math.min(Math.max(window.scrollY / range, 0), 1))); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [range]);
  return p;
}

/** Hero painting that slowly zooms in as the page scrolls (100% to 112%). */
export function HeroBackdrop() {
  const p = useScrollProgress(900);
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-[82%] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_50%,rgba(0,0,0,0.55)_72%,transparent_100%)]">
      <img src="/images/hero.jpg" alt="" className="size-full origin-top object-cover object-[50%_62%] will-change-transform" style={{ transform: `scale(${1 + 0.12 * p})` }} />
      <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-white/75 via-white/35 to-transparent" />
    </div>
  );
}

/**
 * The full product window under the hero copy, with the live dashboard inside.
 * It starts tilted back 16 degrees at 93% size and straightens to 104% over the
 * first 600px of scroll, then scrolls with the page. Its bottom fades into the page.
 */
export function HeroProduct() {
  const p = useScrollProgress(600);
  const e = p * p * (3 - 2 * p);
  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-4 [perspective:1600px] sm:px-8">
      <div
        className="relative origin-top overflow-hidden rounded-[18px] bg-white/60 p-1.5 shadow-[0_40px_100px_-30px_rgba(16,24,40,0.55)] ring-1 ring-white/80 backdrop-blur-xl will-change-transform sm:rounded-[22px] sm:p-2"
        style={{ transform: `rotateX(${(1 - e) * 16}deg) scale(${0.93 + 0.11 * e})` }}
      >
        <div className="flex items-center gap-1.5 px-2 pb-2 pt-1 sm:px-3">
          <span className="size-2.5 rounded-full bg-black/10" /><span className="size-2.5 rounded-full bg-black/10" /><span className="size-2.5 rounded-full bg-black/10" />
          <span className="mx-auto hidden rounded-md bg-white/70 px-3 py-0.5 text-[11px] text-gray-500 ring-1 ring-black/[0.04] sm:block">app.lasso.ai</span>
        </div>
        <div className="overflow-hidden rounded-[12px] ring-1 ring-black/[0.06] [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] sm:rounded-[14px]">
          <DashboardLive />
        </div>
      </div>
    </div>
  );
}
