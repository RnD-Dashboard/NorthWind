/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { GoogleMark } from "@/components/auth/google-mark";
import { MatchRing } from "@/components/search/match-ring";
import { candidates } from "@/lib/search-mock";

export default function LoginPage() {
  const picks = candidates.slice(0, 3);
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Form */}
      <div className="flex flex-col px-6 py-6 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-10">
          <h1 className="text-[28px] font-medium leading-tight tracking-[-0.025em]">Sign in to Lasso</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Find, score and reach the right candidates in minutes.</p>

          <Link href="/onboarding" className="mt-7 inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-black/[0.08] bg-white text-[13px] font-medium shadow-xs transition-colors hover:bg-gray-25">
            <GoogleMark />Continue with Google
          </Link>
          <p className="mt-2 text-center text-[11px] text-gray-400">Also connects Gmail so outreach is sent from your own inbox.</p>

          <div className="my-6 flex items-center gap-3 text-[11px] text-gray-400">
            <span className="h-px flex-1 bg-black/[0.08]" />or sign in with email<span className="h-px flex-1 bg-black/[0.08]" />
          </div>

          <form className="space-y-3" action="/">
            <label className="block">
              <span className="text-xs text-gray-600">Work email</span>
              <input id="login-email" type="email" defaultValue="alex@northwind.com" className="mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-white px-3.5 text-[13px] outline-none focus:border-gray-300 focus:ring-4 focus:ring-black/[0.04]" />
            </label>
            <label className="block">
              <span className="flex items-baseline justify-between text-xs text-gray-600">Password<Link href="/forgot-password" className="text-[11px] text-gray-500 hover:text-foreground hover:underline">Forgot password?</Link></span>
              <input id="login-pass" type="password" defaultValue="lassodemo" className="mt-1 h-10 w-full rounded-xl border border-black/[0.08] bg-white px-3.5 text-[13px] outline-none focus:border-gray-300 focus:ring-4 focus:ring-black/[0.04]" />
            </label>
            <Link href="/" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink-900 text-[13px] font-medium text-white hover:bg-ink-800">
              Sign in<ArrowRight className="size-4" />
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New to Lasso? <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">Start a free 14-day trial</Link>
          </p>
        </div>
        <p className="text-[11px] text-gray-400">By continuing you agree to the Terms and Privacy Policy.</p>
      </div>

      {/* Showcase */}
      <div className="hidden p-3 lg:block">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-ink-900 p-10 text-white">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-500/25 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(200deg,black,transparent_70%)]" />
          <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-ink-100">
            <Sparkles className="size-3.5 text-brand-400" />Search finished in 4 minutes
          </span>
          <h2 className="relative mt-5 max-w-md text-[30px] font-medium leading-[1.15] tracking-[-0.025em]">
            Describe the hire.<br />Lasso brings back the people worth talking to.
          </h2>

          <div className="relative mt-auto space-y-2.5">
            {picks.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-foreground shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]" style={{ marginLeft: i * 28, marginRight: (2 - i) * 28 }}>
                <img src={c.avatar} alt="" className="size-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[13px] font-medium">{c.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{c.title} · {c.company}</div>
                </div>
                <MatchRing value={c.match} size={40} />
              </div>
            ))}
            <p className="pt-4 text-xs text-ink-300">“We filled two senior design roles from our first search.” — Head of Talent, Series B SaaS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
