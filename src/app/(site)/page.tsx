import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Images,
  Landmark,
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

const featureIcons = [Landmark, GraduationCap, Users];

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

export default async function HomePage() {
  const [home, academic, news, gallery] = await Promise.all([
    getHomePage(),
    getAcademicPage(),
    getNewsEvents(true),
    getGalleryItems(true),
  ]);

  const slides = home.slides?.length ? home.slides : defaultHome.slides;
  const featureCards = home.featureCards?.length
    ? home.featureCards
    : defaultHome.featureCards;
  const notices = normalizeNotices(home.notices || []);
  const visibleNews =
    news.length >= 3
      ? news
      : [
          ...news,
          ...defaultNews.filter(
            (item) => !news.some((existing) => existing.slug === item.slug),
          ),
        ].slice(0, 3);

  return (
    <>
      <HomeSlider slides={slides} />

      <Container className="grid gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="Academic Community" title={home.introTitle} />
          <p className="mt-6 text-lg leading-8 text-slate-700">{home.introBody}</p>
          <p className="mt-5 border-l-4 border-university-gold pl-5 text-xl font-bold leading-8 text-university-navy">
            A modern academic environment focused on practical knowledge,
            discipline, research, and professional growth.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: BookOpen,
                value: `${academic.programs.length}+`,
                label: "Academic programs",
                detail: academic.programs[0] || "Academic Programs",
              },
              {
                icon: CalendarDays,
                value: `${news.length}+`,
                label: "Published updates",
                detail: "News, events, and campus notices",
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
            <img
              src={home.introImage.url}
              alt={home.introImage.altText || home.introTitle}
              className="h-[460px] w-full rounded-lg object-cover shadow-soft"
            />
          ) : null}
          <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/30 bg-white/90 p-5 shadow-soft backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-university-gold">
              Campus Focus
            </p>
            <p className="mt-2 text-lg font-bold text-university-navy">
              Quality education, disciplined learning, and practical growth.
            </p>
          </div>
        </div>
      </Container>

      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHeading eyebrow="Explore" title={home.featureTitle} body={home.featureBody} />
            <Link href="/contact" className="btn-secondary">
              Need Help <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featureCards.map((card, index) => {
              const Icon = featureIcons[index] || Landmark;
              return (
                <Link
                  key={card.title}
                  href={card.href || "#"}
                  className="group min-h-72 rounded-lg border border-university-line bg-university-mist p-8 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-university-navy text-university-gold">
                    <Icon size={26} />
                  </span>
                  <h2 className="mt-5 text-xl font-bold text-university-navy group-hover:text-university-royal">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-university-gold">
                    View Details <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div className="absolute left-[8%] top-10 h-[520px] w-24 rounded-t-full border-x-[18px] border-university-navy" />
          <div className="absolute left-[24%] top-20 h-[480px] w-24 rounded-t-full border-x-[18px] border-university-navy" />
          <div className="absolute right-[16%] top-0 h-[560px] w-28 rounded-t-full border-x-[20px] border-university-navy" />
        </div>
        <Container className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-university-line bg-university-mist p-8 shadow-soft">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
                Academic
              </p>
              <h2 className="text-3xl font-bold tracking-normal text-university-navy md:text-4xl">
                {home.academicTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-university-text">{home.academicBody}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {academic.programs.slice(0, 4).map((program) => (
                <Link
                  key={program}
                  href="/academic"
                  className="group flex min-h-28 items-start justify-between gap-4 rounded-lg border border-university-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-university-gold hover:shadow-soft"
                >
                  <span>
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-university-navy text-university-gold">
                      <GraduationCap size={22} />
                    </span>
                    <h2 className="mt-4 font-bold leading-6 text-university-navy">{program}</h2>
                  </span>
                  <ArrowRight className="mt-2 shrink-0 text-university-gold transition group-hover:translate-x-1" size={18} />
                </Link>
              ))}
            </div>
            <Link href="/academic" className="mt-8 inline-flex items-center gap-2 font-bold text-university-navy">
              Explore all programs <ArrowRight className="text-university-gold" size={18} />
            </Link>
          </section>

          <aside className="rounded-lg border border-university-line bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-university-line pb-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-university-mist text-university-gold">
                  <Bell size={23} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-university-gold">
                    Notice Board
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-university-navy">{home.noticeTitle}</h2>
                </div>
              </div>
            </div>
            <div className="divide-y divide-university-line">
              {notices.map((notice) => (
                <article key={`${notice.title}-${notice.date}`} className="py-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-university-mist px-3 py-1 text-xs font-bold text-university-gold">
                      {notice.category}
                    </span>
                    <span className="text-xs font-semibold text-university-text">
                      {formatNoticeDate(notice.date)}
                    </span>
                  </div>
                  <h3 className="font-bold text-university-navy">{notice.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-university-text">{notice.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-md bg-university-mist px-4 py-3">
              <p className="text-sm font-semibold text-university-navy">
                Latest notices are updated from the university admin office.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-university-gold">
                View all notices <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHeading eyebrow="Latest" title={home.newsTitle} body={home.newsBody} />
            <Link href="/news-events" className="btn-secondary">
              View all <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {visibleNews.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/news-events/${item.slug}`} className="group rounded-lg border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                {item.coverImage?.url ? (
                  <img src={item.coverImage.url} alt={item.coverImage.altText || item.title} className="h-52 w-full rounded-t-lg object-cover" />
                ) : (
                  <div className="grid h-52 place-items-center rounded-t-lg bg-university-mist">
                    <CalendarDays className="text-university-navy" size={34} />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-sm font-semibold text-university-gold">{item.category} · {item.date}</p>
                  <h2 className="mt-3 text-xl font-bold text-university-navy group-hover:text-university-royal">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-20">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <SectionHeading eyebrow="Gallery" title={home.galleryTitle} body={home.galleryBody} />
            <Link href="/gallery" className="mt-8 btn-primary">
              View Gallery <Images size={17} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            {gallery[0] ? (
              <article className="group overflow-hidden rounded-lg bg-white shadow-sm">
                {gallery[0].image?.url ? (
                  <img src={gallery[0].image.url} alt={gallery[0].image.altText || gallery[0].title} className="h-[440px] w-full object-cover transition duration-300 group-hover:scale-105" />
                ) : (
                  <div className="h-[440px] bg-university-mist" />
                )}
                <div className="p-5">
                  <p className="text-sm font-semibold text-university-gold">{gallery[0].category}</p>
                  <h2 className="mt-1 text-xl font-bold text-university-navy">{gallery[0].title}</h2>
                </div>
              </article>
            ) : null}
            <div className="grid gap-4">
              {gallery.slice(1, 3).map((item) => (
                <article key={item._id || item.title} className="group overflow-hidden rounded-lg bg-white shadow-sm">
                  {item.image?.url ? (
                    <img src={item.image.url} alt={item.image.altText || item.title} className="h-[190px] w-full object-cover transition duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="h-[190px] bg-university-mist" />
                  )}
                  <div className="p-4">
                    <p className="text-sm font-semibold text-university-gold">{item.category}</p>
                    <h2 className="mt-1 font-bold text-university-navy">{item.title}</h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-4">
        <section className="relative min-h-72 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#0F6B57,#0B2341)] p-9 text-white shadow-soft md:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[34px] border-white" />
            <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full border-[34px] border-white" />
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">{home.ctaTitle}</h2>
              <p className="mt-4 max-w-3xl leading-8 text-white/80">{home.ctaBody}</p>
            </div>
            <Link href={home.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-university-gold px-7 py-4 text-base font-bold text-university-navy transition hover:bg-white">
              {home.ctaButtonLabel}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
