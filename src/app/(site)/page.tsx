import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  ClipboardList,
  Cpu,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Images,
  Landmark,
  Microscope,
  Scale,
  Sprout,
  Stethoscope,
  Users,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { HomeSlider } from "@/components/public/home-slider";
import { SectionHeading } from "@/components/public/section-heading";
import {
  getAcademicPage,
  getGalleryItems,
  getHomePage,
  getNewsEvents,
} from "@/lib/content";
import { defaultHome, defaultNews } from "@/lib/defaults";
import type { GalleryItem, HomeAcademicCard, HomeNotice, HomeQuickAccessCard, NewsEvent } from "@/lib/types";

const quickAccessIconMap: Record<string, React.ElementType> = {
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  ClipboardList,
  Cpu,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Images,
  Landmark,
  Microscope,
  Scale,
  Sprout,
  Stethoscope,
  Users,
};

function normalizeNotices(notices: unknown[]) {
  return notices
    .map((notice, index) => {
      if (typeof notice === "string") {
        return {
          title: index === 0 ? "Admission Notice" : "Campus Notice",
          body: notice,
          category: index === 0 ? "Admission" : "Notice",
          date: "2026-04-20",
        };
      }

      const item = notice as {
        title?: string;
        body?: string;
        category?: string;
        date?: string;
      };

      return {
        title: item.title || "Campus Notice",
        body: item.body || "",
        category: item.category || "Notice",
        date: item.date || "2026-04-20",
      };
    })
    .filter((notice) => notice.body);
}

function formatNoticeDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function gallerySlug(item: GalleryItem) {
  return item.slug || slugify(item.title);
}

function selectedNews(items: NewsEvent[], slugs?: string[]) {
  if (!slugs?.length) return [];
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  return slugs.map((slug) => bySlug.get(slug)).filter((item): item is NewsEvent => Boolean(item));
}

function selectedGallery(items: GalleryItem[], slugs?: string[]) {
  if (!slugs?.length) return [];
  const bySlug = new Map(items.map((item) => [gallerySlug(item), item]));
  return slugs.map((slug) => bySlug.get(slug)).filter((item): item is GalleryItem => Boolean(item));
}

function galleryCover(item?: GalleryItem) {
  return item?.coverImage || item?.image || item?.images?.[0];
}

function noticeEvents(items: NewsEvent[], slugs?: string[]): HomeNotice[] {
  return selectedNews(items, slugs).map((item) => ({
    title: item.title,
    body: item.excerpt,
    category: item.category,
    date: item.eventDate || item.date,
  }));
}

export default async function HomePage() {
  const [home, academic, news, gallery] = await Promise.all([
    getHomePage(),
    getAcademicPage(),
    getNewsEvents(true),
    getGalleryItems(true),
  ]);

  const slides = home.slides?.length ? home.slides : defaultHome.slides;
  const selectedHomeNews = selectedNews(news, home.selectedNewsSlugs);
  const selectedNoticeItems = noticeEvents(news, home.selectedNoticeSlugs);
  const notices = selectedNoticeItems.length
    ? selectedNoticeItems
    : normalizeNotices(home.notices || []);
  const visibleNews = selectedHomeNews.length
    ? selectedHomeNews
    : (news.length >= 3
        ? news
        : [
            ...news,
            ...defaultNews.filter(
              (item) => !news.some((existing) => existing.slug === item.slug),
            ),
          ]).slice(0, 3);
  const selectedHomeGallery = selectedGallery(gallery, home.selectedGallerySlugs);
  const visibleGallery = selectedHomeGallery.length ? selectedHomeGallery : gallery;
  const galleryCovers = visibleGallery.map((item) => galleryCover(item));
  const quickAccessCards: HomeQuickAccessCard[] = home.quickAccessCards?.length
    ? home.quickAccessCards
    : defaultHome.quickAccessCards || [];
  const academicCards: HomeAcademicCard[] = home.academicCards?.length
    ? home.academicCards
    : defaultHome.academicCards || [];
  const ctaBackground =
    home.ctaBackgroundImage?.url ||
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85";

  return (
    <>
      <HomeSlider slides={slides} />

      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <SectionHeading eyebrow={home.introEyebrow || "Academic Community"} title={home.introTitle} />
          <p className="mt-5 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8">{home.introBody}</p>
          <p className="mt-5 border-l-4 border-university-gold pl-4 text-lg font-bold leading-8 text-university-navy sm:pl-5 sm:text-xl">
            {home.introHighlight || defaultHome.introHighlight}
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: BookOpen,
                value: home.statProgramsValue || `${academic.programs.length}+`,
                label: home.statProgramsLabel || "Academic programs",
                detail: home.statProgramsDetail || academic.programs[0] || "Academic Programs",
              },
              {
                icon: CalendarDays,
                value: home.statUpdatesValue || `${news.length}+`,
                label: home.statUpdatesLabel || "Published updates",
                detail: home.statUpdatesDetail || "News, events, and campus notices",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-university-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-university-navy text-university-gold">
                    <item.icon size={25} />
                  </span>
                  <span className="text-3xl font-bold text-university-gold">{item.value}</span>
                </div>
                <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-university-navy">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-university-text">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          {home.introImage?.url ? (
            <div className="relative h-[320px] w-full overflow-hidden rounded-lg bg-university-mist shadow-soft sm:h-[400px] lg:h-[460px]">
              <Image
                src={home.introImage.url}
                alt={home.introImage.altText || home.introTitle}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/30 bg-white/90 p-4 shadow-soft backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-university-gold sm:text-sm">
              {home.introImageEyebrow || "Campus Focus"}
            </p>
            <p className="mt-2 text-base font-bold text-university-navy sm:text-lg">
              {home.introImageCaption || defaultHome.introImageCaption}
            </p>
          </div>
        </div>
      </Container>

      {/* ── Quick Access ── */}
      <section
        className="relative py-14 sm:py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-university-navy/75 backdrop-blur-[2px]" />

        <Container className="relative">
          {/* Label + thin gold rule */}
          <div className="mb-7 flex items-center gap-4 sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Quick Access
            </p>
            <span className="h-px flex-1 bg-university-gold/30" />
          </div>

          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,12rem),1fr))] md:gap-4">
            {quickAccessCards.map(({ href, icon, title, subtitle }, index) => {
              const Icon = quickAccessIconMap[icon] || ClipboardList;

              return (
              <Link
                key={`${title}-${href}-${index}`}
                href={href}
                className="group flex min-h-24 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm transition hover:-translate-y-1 hover:border-university-gold/60 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] sm:min-h-28 sm:px-5 md:min-h-40 md:flex-col md:items-start md:gap-3 md:px-5 md:py-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-university-gold text-university-navy transition group-hover:bg-white md:h-11 md:w-11">
                  <Icon size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-tight text-white">
                    {title}
                  </span>
                  <span className="mt-0.5 hidden text-xs text-white/60 md:block">{subtitle}</span>
                </span>
                <ArrowRight
                  size={14}
                  className="ml-auto shrink-0 text-university-gold opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 md:hidden"
                />
              </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Our Programs grid ── */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          {/* Heading */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {home.academicEyebrow || "Academics"}
              </p>
              <h2 className="text-3xl font-bold text-university-navy sm:text-4xl">{home.academicTitle}</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-university-text">
                {home.academicBody}
              </p>
            </div>
            <Link
              href={home.academicButtonHref || "/academic"}
              className="inline-flex items-center gap-2 rounded-lg border border-university-line px-5 py-2.5 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
            >
              {home.academicButtonLabel || "View all programs"} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {academicCards.map((card, index) => {
              const Icon = quickAccessIconMap[card.icon] || BookOpen;

              return (
                <div
                  key={`${card.title}-${index}`}
                  className="group flex min-h-56 flex-col items-center justify-center gap-5 border-b border-university-line px-8 py-12 text-center transition hover:-translate-y-1 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-university-line text-university-navy/40 transition group-hover:border-university-gold group-hover:text-university-gold">
                    <Icon size={32} strokeWidth={1.5} />
                  </span>
                  <span className="text-base font-semibold leading-snug text-ink transition group-hover:text-university-navy">
                    {card.title}
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>


      {/* ── Latest Updates (unified) ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          {/* Section header */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {home.newsEyebrow || "Stay Informed"}
              </p>
              <h2 className="text-3xl font-bold text-university-navy sm:text-4xl">{home.newsTitle}</h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-university-text">
                {home.newsBody}
              </p>
            </div>
            <Link
              href={home.newsButtonHref || "/news-events"}
              className="inline-flex items-center gap-2 rounded-lg border border-university-line px-5 py-2.5 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
            >
              {home.newsButtonLabel || "All news & events"} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="flex flex-col gap-5">

            {/* ── Top row: Featured news LEFT + Notice board RIGHT ── */}
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">

              {/* Featured card */}
              {visibleNews[0] && (
                <Link
                  href={`/news-events/${visibleNews[0].slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-university-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(16,32,51,0.13)]"
                >
                  {visibleNews[0].coverImage?.url ? (
                    <div className="relative h-64 w-full shrink-0 overflow-hidden bg-university-mist sm:h-72">
                      <Image
                        src={visibleNews[0].coverImage.url}
                        alt={visibleNews[0].coverImage.altText || visibleNews[0].title}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-university-navy/60 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="grid h-64 shrink-0 place-items-center rounded-t-2xl bg-university-mist sm:h-72">
                      <CalendarDays className="text-university-navy/30" size={48} />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-university-gold/15 px-3 py-1 text-xs font-bold text-university-gold">
                        {visibleNews[0].category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-university-text">
                        <CalendarDays size={12} className="shrink-0" />
                        {visibleNews[0].date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-university-navy group-hover:text-university-royal sm:text-2xl">
                      {visibleNews[0].title}
                    </h3>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-7 text-university-text">
                      {visibleNews[0].excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-university-gold transition group-hover:gap-3">
                      Read more <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              )}

              {/* Notice board — stretches to match featured card */}
              <aside className="flex flex-col overflow-hidden rounded-2xl border border-university-line">
                {/* Header */}
                <div className="flex shrink-0 items-center gap-3 border-b border-university-line bg-university-navy px-5 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-university-gold/20 text-university-gold">
                    <Bell size={17} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-university-gold/80">{home.noticeEyebrow || "Notice Board"}</p>
                    <h3 className="text-sm font-bold text-white">{home.noticeTitle}</h3>
                  </div>
                </div>

                {/* Notices — fills remaining height */}
                <div className="flex-1 divide-y divide-university-line overflow-y-auto bg-white">
                  {notices.length > 0 ? notices.map((notice, i) => (
                    <article
                      key={`${notice.title}-${notice.date}`}
                      className="flex gap-3.5 px-5 py-4 transition hover:bg-university-mist"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-university-navy text-[10px] font-black text-university-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-university-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-university-gold">
                            {notice.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-university-text">
                            <CalendarDays size={10} className="shrink-0" />
                            {formatNoticeDate(notice.date)}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold leading-snug text-university-navy">{notice.title}</h4>
                        <p className="mt-1 line-clamp-1 text-xs leading-5 text-university-text">{notice.body}</p>
                      </div>
                    </article>
                  )) : (
                    <p className="px-5 py-8 text-center text-sm text-university-text">No notices at this time.</p>
                  )}
                </div>

                {/* Footer */}
                <div className="shrink-0 border-t border-university-line bg-university-mist px-5 py-3">
                  <Link
                    href={home.noticeButtonHref || "/news-events"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-university-line bg-white px-4 py-2.5 text-xs font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
                  >
                    {home.noticeButtonLabel || "View all notices"} <ArrowRight size={13} />
                  </Link>
                </div>
              </aside>
            </div>

            {/* ── Bottom row: 2 compact news cards ── */}
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleNews.slice(1, 3).map((item) => (
                <Link
                  key={item.slug}
                  href={`/news-events/${item.slug}`}
                  className="group flex gap-4 overflow-hidden rounded-xl border border-university-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-university-gold/40 hover:shadow-soft"
                >
                  {item.coverImage?.url ? (
                    <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-xl bg-university-mist">
                      <Image
                        src={item.coverImage.url}
                        alt={item.coverImage.altText || item.title}
                        fill
                        sizes="84px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-xl bg-university-mist">
                      <CalendarDays size={22} className="text-university-navy/30" />
                    </div>
                  )}
                  <div className="min-w-0 flex flex-col justify-center">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-university-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-university-gold">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-university-text">
                        <CalendarDays size={10} className="shrink-0" />
                        {item.date}
                      </span>
                    </div>
                    <h4 className="line-clamp-2 text-sm font-bold leading-snug text-university-navy group-hover:text-university-royal">
                      {item.title}
                    </h4>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-university-gold opacity-0 transition group-hover:opacity-100">
                      Read more <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </Container>
      </section>

      {/* ── Campus Life / Gallery ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-14 lg:items-center">

            {/* Left: editorial copy */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {home.galleryEyebrow || "Campus Life"}
              </p>
              <h2 className="text-3xl font-bold leading-tight text-university-navy sm:text-4xl lg:text-5xl">
                {home.galleryTitle}
              </h2>
              <p className="mt-5 text-base leading-7 text-university-text sm:text-lg sm:leading-8">
                {home.galleryBody}
              </p>
              <blockquote className="mt-6 border-l-4 border-university-gold pl-5">
                <p className="text-base font-medium italic leading-7 text-university-text">
                  &ldquo;{home.galleryQuote || defaultHome.galleryQuote}&rdquo;
                </p>
              </blockquote>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={home.galleryPrimaryHref || "/gallery"}
                  className="inline-flex items-center gap-2 rounded-lg bg-university-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-university-gold hover:text-university-navy"
                >
                  <Images size={16} /> {home.galleryPrimaryLabel || "View Gallery"}
                </Link>
                <Link
                  href={home.gallerySecondaryHref || "/about"}
                  className="inline-flex items-center gap-2 rounded-lg border border-university-line px-6 py-3 text-sm font-bold text-university-navy transition hover:border-university-navy"
                >
                  {home.gallerySecondaryLabel || "About Campus"} <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right: fixed-height photo mosaic */}
            <div className="grid h-[340px] grid-cols-2 grid-rows-2 gap-3 sm:h-[420px] lg:h-[460px]">
              {/* Featured — tall left column */}
              <div className="group relative row-span-2 overflow-hidden rounded-2xl bg-university-royal">
                {galleryCovers[0]?.url ? (
                  <Image
                    src={galleryCovers[0].url}
                    alt={galleryCovers[0].altText || visibleGallery[0].title}
                    fill
                    sizes="(min-width: 1024px) 28vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="text-xs font-bold uppercase tracking-widest text-university-gold">
                    {visibleGallery[0]?.category ?? "Campus"}
                  </span>
                  <p className="mt-0.5 text-sm font-bold text-white">{visibleGallery[0]?.title}</p>
                </div>
              </div>

              {/* Top-right */}
              <div className="group relative overflow-hidden rounded-2xl bg-university-royal/60">
                {galleryCovers[1]?.url ? (
                  <Image
                    src={galleryCovers[1].url}
                    alt={galleryCovers[1].altText || visibleGallery[1].title}
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="text-xs font-bold text-white">{visibleGallery[1]?.title}</p>
                </div>
              </div>

              {/* Bottom-right */}
              <div className="group relative overflow-hidden rounded-2xl bg-university-green/60">
                {galleryCovers[2]?.url ? (
                  <Image
                    src={galleryCovers[2].url}
                    alt={galleryCovers[2].altText || visibleGallery[2].title}
                    fill
                    sizes="(min-width: 1024px) 18vw, 40vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center bg-university-navy/50 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-university-gold px-4 py-1.5 text-xs font-bold text-university-navy">
                    <Images size={12} /> View all
                  </span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="relative py-24 sm:py-32 lg:py-40"
        style={{
          backgroundImage: `url('${ctaBackground}')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Darker overlay for better readability */}
        <div className="absolute inset-0" style={{ background: "rgba(11,35,65,0.91)" }} />
        {/* Subtle gold vignette at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold/60 to-university-gold/0" />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-24">

            {/* Text */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-university-gold">
                {home.ctaEyebrow || "Begin Your Journey"}
              </p>
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {home.ctaTitle}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
                {home.ctaBody}
              </p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                {(home.ctaTrustBadges?.length ? home.ctaTrustBadges : defaultHome.ctaTrustBadges || []).map((b) => (
                  <span key={b} className="flex items-center gap-2 text-sm font-medium text-white/65">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-university-gold" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href={home.ctaHref}
                className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-xl bg-university-gold px-10 py-4 text-base font-bold text-university-navy shadow-[0_8px_32px_rgba(200,155,60,0.45)] transition hover:bg-white hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)]"
              >
                {home.ctaButtonLabel} <ArrowRight size={18} />
              </Link>
              <Link
                href={home.ctaSecondaryHref || "/contact"}
                className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-xl border-2 border-white/40 px-10 py-4 text-base font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                {home.ctaSecondaryLabel || "Contact Admissions"}
              </Link>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}


