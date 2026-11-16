/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";
import { Beam, Roll } from "@/components/ui/fx";
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

/**
 * The full product window under the hero copy. It starts tilted back in perspective
 * and straightens as the page scrolls, then fades into the section below.
 */
export function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      setP(Math.min(Math.max((vh - top) / (vh * 0.9), 0), 1));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  const ease = 1 - Math.pow(1 - p, 3);
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[1240px] px-4 [perspective:2000px] sm:px-8">
      <div
        className="fx-rise is-in relative origin-top overflow-hidden rounded-[18px] bg-white/60 p-1.5 shadow-[0_40px_100px_-30px_rgba(16,24,40,0.55)] ring-1 ring-white/80 backdrop-blur-xl sm:rounded-[22px] sm:p-2"
        style={{ transform: `rotateX(${(1 - ease) * 16}deg) scale(${0.94 + 0.06 * ease})`, ["--d" as string]: "1600ms" }}
      >
        <div className="flex items-center gap-1.5 px-2 pb-2 pt-1 sm:px-3">
          <span className="size-2.5 rounded-full bg-black/10" /><span className="size-2.5 rounded-full bg-black/10" /><span className="size-2.5 rounded-full bg-black/10" />
          <span className="mx-auto hidden rounded-md bg-white/70 px-3 py-0.5 text-[11px] text-gray-500 ring-1 ring-black/[0.04] sm:block">app.lasso.ai</span>
        </div>
        <img src="/images/app-dashboard.jpg" alt="The Lasso dashboard: candidates sourced, pipeline activity, reply rate, top matches and open roles" className="block w-full rounded-[12px] ring-1 ring-black/[0.06] sm:rounded-[14px]" />
      </div>
    </div>
  );
}
