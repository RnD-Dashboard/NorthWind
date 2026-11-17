/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Post } from "@/lib/posts";

/** Blog card used on the home page, the blog list and "More articles". */
export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(16,24,40,0.3)]">
      <div className="relative h-48 overflow-hidden"><img src={p.img} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-[12px] text-gray-500"><span className="rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-black/[0.05]">{p.tag}</span>{p.m}</div>
        <div className="mt-3 font-display text-[20px] leading-snug">{p.t}</div>
        <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{p.d}</p>
      </div>
    </Link>
  );
}
