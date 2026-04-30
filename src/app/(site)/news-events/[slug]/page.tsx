import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Facebook,
  Link as LinkIcon,
  MapPin,
  Tag,
  Twitter,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { PageHero } from "@/components/public/page-hero";
import { Prose } from "@/components/public/prose";
import { getNewsEventBySlug, getNewsEvents } from "@/lib/content";
import type { NewsEvent } from "@/lib/types";

type NewsEventDetail = NewsEvent & {
  department?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  organizer?: string;
  eventStatus?: "Upcoming" | "Ongoing" | "Completed";
  registrationLink?: string;
};

function categoryLabel(category: string) {
  const normalized = category.toLowerCase();
  if (normalized === "event") return "Events";
  if (normalized === "campus") return "Campus Life";
  if (normalized === "notices") return "Notice";
  return category;
}

function getCategoryBadge(category: string): string {
  switch (categoryLabel(category).toLowerCase()) {
    case "news":
      return "bg-university-navy text-white";
    case "events":
      return "bg-university-gold text-university-navy";
    case "notice":
      return "bg-[#7A1E2C] text-white";
    case "admission":
      return "bg-university-green text-white";
    case "academic":
      return "bg-[#315C8D] text-white";
    case "seminar":
      return "bg-[#5A4A82] text-white";
    case "workshop":
      return "bg-[#B46A32] text-white";
    case "achievement":
      return "bg-[#8B6A1D] text-white";
    case "campus life":
      return "bg-[#22685F] text-white";
    default:
      return "bg-slate-600 text-white";
  }
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getEventDate(item: NewsEventDetail) {
  return item.eventDate || item.date;
}

function getDepartment(item: NewsEventDetail) {
  return item.department?.trim() || "General";
}

function isEventLike(item: NewsEventDetail) {
  return ["event", "events", "seminar", "workshop", "campus", "campus life"].includes(
    item.category.toLowerCase(),
  );
}

function getEventStatus(item: NewsEventDetail) {
  if (item.eventStatus) return item.eventStatus;
  const date = new Date(getEventDate(item));
  if (Number.isNaN(date.getTime())) return "Completed";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date.getTime() > today.getTime()) return "Upcoming";
  if (date.getTime() === today.getTime()) return "Ongoing";
  return "Completed";
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-university-line py-4 last:border-b-0">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-university-mist text-university-gold">
        <Icon size={18} />
      </span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-university-text">
          {label}
        </span>
        <span className="mt-1 block font-bold text-university-navy">{value}</span>
      </span>
    </div>
  );
}

export default async function NewsEventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [rawItem, allNews] = await Promise.all([
    getNewsEventBySlug(slug),
    getNewsEvents(true),
  ]);

  if (!rawItem) notFound();

  const item = rawItem as NewsEventDetail;
  const related = (allNews as NewsEventDetail[])
    .filter((newsItem) => newsItem.slug !== slug && newsItem.category === item.category)
    .slice(0, 3);
  const heroImage =
    item.coverImage?.url ||
    "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1800&q=85";
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/news-events/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(item.title);

  return (
    <>
      <PageHero
        eyebrow={categoryLabel(item.category)}
        title={item.title}
        body={item.excerpt}
        image={heroImage}
        imageAlt={item.coverImage?.altText || item.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/news-events" },
          { label: item.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(item.category)}`}
          >
            {categoryLabel(item.category)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white/75">
            <CalendarDays size={15} className="text-university-gold" />
            {formatDate(getEventDate(item))}
          </span>
        </div>
      </PageHero>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <Link
            href="/news-events"
            className="mb-8 inline-flex items-center gap-2 rounded-md border border-university-line bg-white px-4 py-2 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
          >
            <ArrowLeft size={15} /> Back to News &amp; Events
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <article className="overflow-hidden rounded-lg border border-university-line bg-white shadow-sm">
              {item.coverImage?.url ? (
                <div className="relative h-[260px] bg-university-mist sm:h-[420px]">
                  <Image
                    src={item.coverImage.url}
                    alt={item.coverImage.altText || item.title}
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="p-6 sm:p-9 lg:p-10">
                <div className="mb-7 border-l-4 border-university-gold pl-5">
                  <p className="text-lg font-bold leading-8 text-university-navy">
                    {item.excerpt}
                  </p>
                </div>
                <Prose text={item.body} />
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-lg border border-university-line bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
                  Update Details
                </p>
                <div className="mt-4">
                  <DetailRow icon={CalendarDays} label="Date" value={formatDate(getEventDate(item))} />
                  <DetailRow icon={Tag} label="Category" value={categoryLabel(item.category)} />
                  <DetailRow icon={Building2} label="Department" value={getDepartment(item)} />
                  {isEventLike(item) ? (
                    <>
                      <DetailRow icon={Clock3} label="Time" value={item.eventTime || "Time to be announced"} />
                      <DetailRow icon={MapPin} label="Venue" value={item.eventLocation || "Campus"} />
                      <DetailRow icon={UserRound} label="Organizer" value={item.organizer || "University Office"} />
                      <DetailRow icon={CalendarDays} label="Status" value={getEventStatus(item)} />
                    </>
                  ) : null}
                </div>
                {isEventLike(item) && item.registrationLink ? (
                  <Link
                    href={item.registrationLink}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-university-gold px-5 py-3 text-sm font-bold text-university-navy transition hover:bg-university-navy hover:text-white"
                  >
                    Register for Event <ArrowRight size={15} />
                  </Link>
                ) : null}
              </div>

              <div className="rounded-lg border border-university-line bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
                  Share
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    className="grid h-11 place-items-center rounded-md border border-university-line text-university-navy transition hover:border-university-gold hover:text-university-gold"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </Link>
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    className="grid h-11 place-items-center rounded-md border border-university-line text-university-navy transition hover:border-university-gold hover:text-university-gold"
                    aria-label="Share on X"
                  >
                    <Twitter size={18} />
                  </Link>
                  <Link
                    href={articleUrl}
                    className="grid h-11 place-items-center rounded-md border border-university-line text-university-navy transition hover:border-university-gold hover:text-university-gold"
                    aria-label="Open article link"
                  >
                    <LinkIcon size={18} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Related Updates
              </p>
              <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
                More From {categoryLabel(item.category)}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedItem) => (
                <Link
                  key={relatedItem.slug}
                  href={`/news-events/${relatedItem.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative h-52 bg-university-mist">
                    {relatedItem.coverImage?.url ? (
                      <Image
                        src={relatedItem.coverImage.url}
                        alt={relatedItem.coverImage.altText || relatedItem.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <CalendarDays size={32} className="text-university-navy/20" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold text-university-gold">
                      {categoryLabel(relatedItem.category)} - {formatDate(getEventDate(relatedItem))}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-university-navy transition group-hover:text-university-royal">
                      {relatedItem.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-university-gold">
                      Read More <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
