import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { POSTS } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog — Motorcycle Buying Guides & Ownership Tips",
  description:
    "Practical guides for Malaysian riders: trade-in process, financing documents, model comparisons and road tax renewal — written by the JomKaki Motor team.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <Section pad="tight">
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <div className="mt-10 max-w-3xl">
        <p className="eyebrow text-brand">Guides &amp; tips</p>
        <h1 className="display-1 mt-4 text-ink">The JomKaki Blog</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Straight answers for Malaysian riders. Buying, financing, trading in
          and keeping your bike on the road.
        </p>
      </div>
      <div className="mt-16 divide-y divide-line border-y border-line">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-3 py-8 transition-colors hover:bg-surface md:grid-cols-[160px_1fr] md:gap-10 md:px-4 md:py-10"
          >
            <time dateTime={post.date} className="text-xs font-medium text-muted">
              {new Date(post.date).toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <div>
              <h2 className="display-3 max-w-2xl text-ink transition-colors group-hover:text-brand">{post.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-ink underline-offset-4 group-hover:underline">
                Read the guide
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
