"use client";

import { createElement, Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** True once the element has scrolled into view (stays true). */
export function useInView<T extends Element>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

/**
 * Headline reveal: every letter fades in from a soft blur, one after another.
 * Words stay unbroken so lines wrap naturally. `muted` words render in the muted tone.
 */
export function BlurText({
  text,
  as = "h2",
  className,
  delay = 0,
  step = 22,
  by = "char",
  muted = [],
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  step?: number;
  by?: "char" | "word";
  muted?: string[];
}) {
  const [ref, inView] = useInView<HTMLElement>();
  let i = 0;
  const words = text.split(" ");
  const children = words.map((w, wi) => {
    // "\n" in the text forces a line break on larger screens.
    if (w === "\n") return <Fragment key={wi}>{" "}<br className="max-sm:hidden" /></Fragment>;
    const isMuted = muted.includes(w.replace(/[.,]/g, ""));
    const inner =
      by === "word"
        ? <span className="fx-blur" style={{ "--d": `${delay + i++ * step}ms` } as CSSProperties}>{w}</span>
        : Array.from(w).map((ch, ci) => (
            <span key={ci} className="fx-blur" style={{ "--d": `${delay + i++ * step}ms` } as CSSProperties}>{ch}</span>
          ));
    // Real spaces between words, so headings can balance their lines (no orphans).
    return (
      <Fragment key={wi}>
        <span className={cn("inline-block whitespace-nowrap", isMuted && "text-gray-400")}>{inner}</span>
        {wi < words.length - 1 && words[wi + 1] !== "\n" && " "}
      </Fragment>
    );
  });
  return createElement(as, { ref, className: cn(className, inView && "is-in"), "aria-label": text.replace(/\s*\n\s*/g, " ") }, <span aria-hidden>{children}</span>);
}

/** Simple rise + fade when the block scrolls into view. */
export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("fx-rise", inView && "is-in", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

/** Small section label: orange dot + text. */
export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[12px]", light ? "text-white/70" : "text-gray-500", className)}>
      <span className="size-1.5 rounded-[2px] bg-brand-500" />
      {children}
    </span>
  );
}
