"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Beam, Roll } from "@/components/ui/fx";
import { cn } from "@/lib/utils";
import { APP_URL } from "@/lib/site";

export { APP_URL };

const NAV = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/pricing" },
];

/** Primary call to action: dark pill with the arrow tile, border beam and text roll. */
export function PrimaryCta({ children, href = `${APP_URL}/signup`, beam = true, light, className }: { children: string; href?: string; beam?: boolean; light?: boolean; className?: string }) {
  return (
    <Link href={href} className={cn("fx-btn group inline-flex h-11 items-center gap-3 rounded-full pl-5 pr-1.5 text-[14px] font-medium", light ? "bg-white text-ink-900" : "bg-ink-900 text-white", className)}>
      {beam && <Beam />}
      <Roll>{children}</Roll>
      <span className={cn("grid size-8 place-items-center rounded-full", light ? "bg-ink-900 text-white" : "bg-white text-ink-900")}><ArrowUpRight className="size-4" /></span>
    </Link>
  );
}

export function GhostCta({ children, href, light }: { children: string; href: string; light?: boolean }) {
  return (
    <Link href={href} className={cn("fx-btn inline-flex h-11 items-center rounded-full px-5 text-[14px] font-medium", light ? "text-white hover:bg-white/10" : "text-foreground hover:bg-black/[0.04]")}>
      <Roll>{children}</Roll>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "fx-glass-bar border-b border-black/[0.05]" : "bg-transparent")}>
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 lg:px-10">
        <Link href="/" aria-label="Lasso home"><Logo /></Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="fx-btn rounded-full px-3.5 py-2 text-[13px] text-gray-700 hover:text-foreground"><Roll>{n.label}</Roll></Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href={`${APP_URL}/login`} className="fx-btn rounded-full px-3.5 py-2 text-[13px] text-gray-700 hover:text-foreground"><Roll>Sign in</Roll></Link>
          <Link href={`${APP_URL}/signup`} className="fx-btn inline-flex h-9 items-center gap-2 rounded-full bg-ink-900 pl-4 pr-1 text-[13px] font-medium text-white">
            <Roll>Start free trial</Roll><span className="grid size-7 place-items-center rounded-full bg-white text-ink-900"><ArrowUpRight className="size-3.5" /></span>
          </Link>
        </div>
        <button className="grid size-9 place-items-center rounded-full bg-white/80 md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      {open && (
        <div className="fx-glass mx-4 mb-3 rounded-2xl p-2 md:hidden">
          {NAV.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-[14px] hover:bg-black/[0.04]">{n.label}</Link>)}
          <div className="mt-1 grid grid-cols-2 gap-2 p-1">
            <Link href={`${APP_URL}/login`} className="grid h-10 place-items-center rounded-full bg-white text-[13px] ring-1 ring-black/[0.06]">Sign in</Link>
            <Link href={`${APP_URL}/signup`} className="grid h-10 place-items-center rounded-full bg-ink-900 text-[13px] text-white">Start free trial</Link>
          </div>
        </div>
      )}
    </header>
  );
}
