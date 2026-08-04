import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import WaButton from "@/components/WaButton";
import { POSTS } from "@/data/posts";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { GENERAL_ENQUIRY } from "@/lib/whatsapp";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Section pad="tight">
        <Breadcrumbs
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />
        <article className="mx-auto mt-12 max-w-3xl">
          <header>
            <time dateTime={post.date} className="text-xs font-medium text-muted">
              Updated{" "}
              {new Date(post.updated ?? post.date).toLocaleDateString("en-MY", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h1 className="display-2 mt-4 text-ink">{post.title}</h1>
          </header>
          <div className="mt-10 space-y-10">
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="display-3 text-ink">{section.heading}</h2>
                )}
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="mt-4 text-[17px] leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 space-y-3 border-l-2 border-line pl-5">
                    {section.list.map((item, j) => (
                      <li key={j} className="text-[17px] leading-relaxed text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <footer className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-8">
            <p className="text-[15px] font-semibold text-ink">
              Have a question about this guide? Our advisors reply personally.
            </p>
            <WaButton href={GENERAL_ENQUIRY}>WhatsApp us</WaButton>
          </footer>
          <p className="mt-8">
            <Link href="/blog" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
              All guides
            </Link>
          </p>
        </article>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
        }}
      />
    </>
  );
}
