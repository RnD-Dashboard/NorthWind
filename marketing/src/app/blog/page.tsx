import type { Metadata } from "next";
import { Header } from "@/components/site/chrome";
import { Band, PageHero, Shell, SiteFooter, pad } from "@/components/site/layout";
import { FadeIn } from "@/components/site/motion";
import { PostCard } from "@/components/site/post-card";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog · Lasso",
  description: "Guides on sourcing, outreach and hiring for teams that hire on their own.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero eyebrow="Blog" title="Guides for teams that hire on their own" sub="Practical advice on sourcing, outreach and running your own search." img="/images/forest.jpg" />
        <Shell>
          <div className={`${pad} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
            {POSTS.map((p, k) => <FadeIn key={p.slug} delay={(k % 3) * 90}><PostCard p={p} /></FadeIn>)}
          </div>
        </Shell>
        <Band />
      </main>
      <SiteFooter />
    </>
  );
}
