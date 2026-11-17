"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { KitFrame } from "@/components/site/kit";
import { cn } from "@/lib/utils";

const SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"];
const field = "h-11 w-full rounded-xl bg-white px-3.5 text-[14px] ring-1 ring-black/[0.08] outline-none transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-brand-500/50";

/**
 * Demo request form. There is no backend yet, so sending opens the visitor's email app
 * with the details filled in, addressed to hello@lasso.ai.
 */
export function ContactForm({ className }: { className?: string }) {
  const [size, setSize] = useState(SIZES[1]);
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const body = [`Name: ${get("name")}`, `Work email: ${get("email")}`, `Company: ${get("company")}`, `Team size: ${size}`, "", get("message")].join("\n");
    window.location.href = `mailto:hello@lasso.ai?subject=${encodeURIComponent(`Demo request: ${get("company") || get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className={className}>
      <KitFrame label="Book a demo" status={sent ? "Sent" : "Ready"}>
        {sent ? (
          <div className="fx-pop grid min-h-[420px] place-items-center p-8 text-center">
            <div>
              <span className="mx-auto grid size-11 place-items-center rounded-full bg-brand-500 text-white"><Check className="size-5" strokeWidth={3} /></span>
              <div className="mt-4 font-display text-[24px]">Almost done</div>
              <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-relaxed text-gray-500">Your email app opened with your details filled in. Press send and we&apos;ll reply within one working day.</p>
              <button onClick={() => setSent(false)} className="mt-5 text-[13px] text-gray-600 underline underline-offset-2 hover:text-foreground">Edit details</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3 bg-gray-25 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Full name" autoComplete="name" className={field} />
              <input name="email" type="email" required placeholder="Work email" autoComplete="email" className={field} />
            </div>
            <input name="company" required placeholder="Company" autoComplete="organization" className={field} />
            <div>
              <div className="mb-2 text-[12px] text-gray-500">Team size</div>
              <div className="flex flex-wrap gap-1.5">
                {SIZES.map((s) => (
                  <button type="button" key={s} onClick={() => setSize(s)} className={cn("h-8 rounded-full px-3 text-[12.5px] ring-1 transition-colors", size === s ? "bg-ink-900 text-white ring-ink-900" : "bg-white text-gray-600 ring-black/[0.08] hover:text-foreground")}>{s}</button>
                ))}
              </div>
            </div>
            <textarea name="message" rows={4} placeholder="Which roles are you hiring for? (optional)" className={cn(field, "h-auto resize-none py-3")} />
            <button type="submit" className="fx-btn h-11 w-full rounded-full bg-ink-900 text-[14px] font-medium text-white">Request a demo</button>
            <p className="text-center text-[11.5px] text-gray-400">We reply within one working day.</p>
          </form>
        )}
      </KitFrame>
    </div>
  );
}
