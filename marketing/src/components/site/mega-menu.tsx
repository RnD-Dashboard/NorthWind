/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ChatKit, SequenceKit, StillContext } from "@/components/site/kit";
import { CollectionKit, OpenRolesKit, ShareKit } from "@/components/site/kits2";
import { MENU, PRICING, type NavGroup, type NavItem } from "@/components/site/nav-data";
import { cn } from "@/lib/utils";

const PREVIEWS = { sourcing: ChatKit, library: CollectionKit, outreach: SequenceKit, startups: OpenRolesKit, agencies: ShareKit };

function Soon() {
  return <span className="rounded-full bg-gray-100 px-1.5 py-px text-[10px] font-medium uppercase tracking-[0.04em] text-gray-500">Soon</span>;
}

/** One row in a dropdown: icon tile, name and one line. Rows without a page yet aren't clickable. */
function Row({ item, active, onHover, onPick }: { item: NavItem; active: boolean; onHover: () => void; onPick: () => void }) {
  const Icon = item.icon;
  const body = (
    <>
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg ring-1 transition-colors", active ? "bg-white text-foreground ring-black/[0.08]" : "bg-gray-50 text-gray-600 ring-black/[0.05]")}><Icon className="size-4" strokeWidth={1.75} /></span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[14px] font-medium text-foreground">{item.label}{!item.href && <Soon />}</span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">{item.text}</span>
      </span>
    </>
  );
  const cls = cn("flex items-start gap-3 rounded-xl p-3 transition-colors", active && "bg-gray-50");
  return item.href
    ? <Link href={item.href} onMouseEnter={onHover} onFocus={onHover} onClick={onPick} className={cls}>{body}</Link>
    : <div onMouseEnter={onHover} aria-disabled className={cn(cls, "cursor-default")}>{body}</div>;
}

/** Dropdown panel: list on the left; for Product and Solutions, a live product preview on the right. */
function Panel({ group, onPick }: { group: NavGroup; onPick: () => void }) {
  const [i, setI] = useState(0);
  const item = group.items[i];
  const Kit = item.preview ? PREVIEWS[item.preview] : null;
  return (
    <div className={cn("fx-pop flex gap-2 rounded-2xl bg-white p-2 shadow-[0_24px_60px_-20px_rgba(16,24,40,0.3)] ring-1 ring-black/[0.06]", group.preview ? "w-[720px]" : "w-[340px]")}>
      <div className={cn("flex flex-col gap-0.5", group.preview ? "w-[300px] shrink-0" : "w-full")}>
        {group.items.map((it, k) => <Row key={it.label} item={it} active={k === i} onHover={() => setI(k)} onPick={onPick} />)}
      </div>
      {group.preview && Kit && (
        <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-xl">
          {group.items.map((it) => <img key={it.label} src={it.img} alt="" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", it === item ? "opacity-100" : "opacity-0")} />)}
          {/* A still product window tucked into the corner, cut off by the right and bottom edges. */}
          <StillContext.Provider value={true}>
            <div key={item.label} className="kit-still absolute left-7 top-7 w-[440px]"><Kit className="w-full" /></div>
          </StillContext.Provider>
        </div>
      )}
    </div>
  );
}

/** Desktop navigation: Product, Solutions and Resources open dropdowns on hover or click; Pricing is a link. */
export function MegaNav() {
  const [open, setOpen] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();

  const show = (l: string) => { if (timer.current) clearTimeout(timer.current); setOpen(l); };
  const hide = () => { timer.current = setTimeout(() => setOpen(null), 140); };

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const click = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    window.addEventListener("keydown", key); window.addEventListener("mousedown", click);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("mousedown", click); };
  }, []);

  const groupActive = (g: NavGroup) => g.items.some((it) => it.href && it.href === path);

  return (
    <nav ref={ref} className="hidden items-center gap-1 md:flex">
      {MENU.map((g) => (
        <div key={g.label} className="relative" onMouseEnter={() => show(g.label)} onMouseLeave={hide}>
          <button
            aria-expanded={open === g.label}
            onClick={() => setOpen((o) => (o === g.label ? null : g.label))}
            className={cn("inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] transition-colors", open === g.label ? "bg-black/[0.05] text-foreground" : groupActive(g) ? "text-foreground" : "text-gray-700 hover:text-foreground")}
          >
            {g.label}<ChevronDown className={cn("size-3.5 transition-transform duration-200", open === g.label && "rotate-180")} />
          </button>
          {open === g.label && (
            <div className="absolute left-0 top-full pt-2">
              <Panel group={g} onPick={() => setOpen(null)} />
            </div>
          )}
        </div>
      ))}
      <Link href={PRICING.href} className={cn("rounded-full px-3.5 py-2 text-[13px] transition-colors hover:text-foreground", path === PRICING.href ? "text-foreground" : "text-gray-700")}>{PRICING.label}</Link>
    </nav>
  );
}

/** Phone navigation: each menu becomes an expandable group inside the slide-down panel. */
export function MobileNav({ onPick }: { onPick: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      {MENU.map((g) => (
        <div key={g.label}>
          <button onClick={() => setOpen((o) => (o === g.label ? null : g.label))} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[14px] hover:bg-black/[0.04]">
            {g.label}<ChevronDown className={cn("size-4 text-gray-500 transition-transform", open === g.label && "rotate-180")} />
          </button>
          {open === g.label && (
            <div className="mb-1 ml-3 border-l border-black/[0.08] pl-2">
              {g.items.map((it) => it.href
                ? <Link key={it.label} href={it.href} onClick={onPick} className="block rounded-lg px-3 py-2 text-[13.5px] text-gray-700 hover:bg-black/[0.04]">{it.label}</Link>
                : <div key={it.label} className="flex items-center gap-2 px-3 py-2 text-[13.5px] text-gray-400">{it.label}<Soon /></div>)}
            </div>
          )}
        </div>
      ))}
      <Link href={PRICING.href} onClick={onPick} className="block rounded-xl px-3 py-2.5 text-[14px] hover:bg-black/[0.04]">{PRICING.label}</Link>
      <Link href="/contact" onClick={onPick} className="block rounded-xl px-3 py-2.5 text-[14px] hover:bg-black/[0.04]">Contact sales</Link>
    </div>
  );
}
