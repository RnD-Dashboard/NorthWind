/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/site/chrome";
import { Band, HeroCtas, Shell, SiteFooter, pad } from "@/components/site/layout";
import { Eyebrow } from "@/components/site/motion";
import { PostCard } from "@/components/site/post-card";
import { POSTS, getPost } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: `${p.t} · Lasso`, description: p.d } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const more = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <Header />
      <main className="pt-16">
        <Shell>
          <article className={`${pad} mx-auto max-w-[760px]`}>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-foreground"><ArrowLeft className="size-3.5" />All articles</Link>
            <div className="mt-8 flex items-center gap-2 text-[12px] text-gray-500">
              <span className="rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-black/[0.05]">{p.tag}</span>{p.m} · {p.date}
            </div>
            <h1 className="mt-4 text-[38px] leading-[1.08] sm:text-[52px]">{p.t}</h1>
            <p className="mt-4 text-[18px] leading-relaxed text-gray-500">{p.d}</p>
            <div className="mt-10 overflow-hidden rounded-[24px]"><img src={p.img} alt="" className="aspect-[16/9] w-full object-cover" /></div>
            <div className="mt-12 space-y-10">
              {p.body.map((s) => (
                <section key={s.h}>
                  <h2 className="text-[26px] leading-tight sm:text-[30px]">{s.h}</h2>
                  {s.p.map((x) => <p key={x} className="mt-4 text-[17px] leading-[1.75] text-gray-700">{x}</p>)}
                </section>
              ))}
            </div>
            <div className="mt-14 rounded-2xl bg-gray-25 p-6 text-center ring-1 ring-black/[0.05] sm:p-8">
              <div className="font-display text-[26px] leading-tight">Try it on your next role</div>
              <p className="mt-2 text-[15px] text-gray-500">14-day free trial. No card needed.</p>
              <HeroCtas />
            </div>
          </article>
        </Shell>
        <Band />
        <Shell>
          <div className={pad}>
            <Eyebrow>More articles</Eyebrow>
            <div className="mt-8 grid gap-4 md:grid-cols-3">{more.map((x) => <PostCard key={x.slug} p={x} />)}</div>
          </div>
        </Shell>
        <Band />
      </main>
      <SiteFooter />
    </>
  );
}
