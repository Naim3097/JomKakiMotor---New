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
            className="group grid gap-5 py-8 transition-colors hover:bg-surface md:grid-cols-[240px_1fr] md:gap-10 md:px-4 md:py-10"
          >
            {/* Thumbnail per R2 slide 25 — placeholder frame until the
                client supplies article imagery */}
            <div>
              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="aspect-4/3 w-full rounded-lg object-cover"
                />
              ) : (
                <div
                  className="flex aspect-4/3 w-full items-center justify-center rounded-lg bg-[#ececea] text-[#d3d3cf]"
                  role="img"
                  aria-label="Article image coming soon"
                >
                  <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="10" y="14" width="44" height="36" rx="3" />
                    <circle cx="24" cy="27" r="4" />
                    <path d="M10 44l14-12 10 8 8-6 12 10" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <time dateTime={post.date} className="mt-2 block text-xs font-medium text-muted">
                {new Date(post.date).toLocaleDateString("en-MY", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
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
