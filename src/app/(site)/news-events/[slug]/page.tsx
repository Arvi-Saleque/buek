import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Tag,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { Prose } from "@/components/public/prose";
import { getNewsEventBySlug, getNewsEvents } from "@/lib/content";

function getCategoryBadge(cat: string): string {
  switch (cat.toLowerCase()) {
    case "news":
      return "bg-university-navy text-white";
    case "event":
    case "events":
      return "bg-university-gold text-university-navy";
    case "notice":
      return "bg-red-700 text-white";
    case "admission":
      return "bg-university-green text-white";
    case "academic":
      return "bg-blue-700 text-white";
    case "campus":
      return "bg-teal-700 text-white";
    case "seminar":
      return "bg-purple-700 text-white";
    default:
      return "bg-slate-600 text-white";
  }
}

export default async function NewsEventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item, allNews] = await Promise.all([
    getNewsEventBySlug(slug),
    getNewsEvents(true),
  ]);

  if (!item) notFound();

  const related = allNews
    .filter((n) => n.slug !== slug && n.category === item.category)
    .slice(0, 3);

  const heroBg = item.coverImage?.url
    ? item.coverImage.url
    : "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&q=80";

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex min-h-[340px] items-end pb-12 pt-28 sm:min-h-[400px] sm:pt-32"
        style={{
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(11,35,65,0.84)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/news-events" className="transition hover:text-white">
              News &amp; Events
            </Link>
            <ChevronRight size={12} />
            <span className="line-clamp-1 max-w-[220px] text-university-gold">
              {item.title}
            </span>
          </nav>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(item.category)}`}
            >
              {item.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <CalendarDays size={12} />
              {item.date}
            </span>
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            {item.excerpt}
          </p>
        </Container>
      </section>

      {/* ── Article ── */}
      <section className="bg-university-mist py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/news-events"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-university-gold transition hover:gap-3"
            >
              <ArrowLeft size={15} /> Back to News &amp; Events
            </Link>

            <div className="rounded-2xl border border-university-line bg-white p-8 shadow-soft sm:p-10">
              <Prose text={item.body} />
            </div>

            {/* Meta tags */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-university-text">
                <Tag size={12} className="text-university-gold" />
                Category:
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(item.category)}`}
              >
                {item.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-university-text">
                <CalendarDays size={12} className="text-university-gold" />
                {item.date}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <Container>
            <div className="mb-8">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                More Like This
              </p>
              <h2 className="text-2xl font-bold text-university-navy sm:text-3xl">
                Related Updates
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news-events/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-university-mist">
                    {rel.coverImage?.url ? (
                      <Image
                        src={rel.coverImage.url}
                        alt={rel.coverImage.altText || rel.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <CalendarDays
                          size={28}
                          className="text-university-navy/20"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getCategoryBadge(rel.category)}`}
                      >
                        {rel.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-university-text">
                        <CalendarDays size={10} />
                        {rel.date}
                      </span>
                    </div>
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-university-navy transition group-hover:text-university-royal">
                      {rel.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold text-university-gold transition group-hover:gap-2.5">
                      Read more <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

