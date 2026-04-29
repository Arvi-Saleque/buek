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
import { defaultHome } from "@/lib/defaults";

const featureIcons = [Landmark, GraduationCap, Users];

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

  return (
    <>
      <HomeSlider slides={slides} />

      <Container className="grid gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="Welcome" title={home.introTitle} />
          <p className="mt-6 text-lg leading-8 text-slate-700">{home.introBody}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: BookOpen, label: academic.programs[0] || "Academic Programs" },
              { icon: CalendarDays, label: `${news.length} published updates` },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-university-line bg-white p-5 shadow-sm">
                <item.icon className="text-university-gold" size={25} />
                <p className="mt-3 font-bold text-university-navy">{item.label}</p>
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
                  className="group rounded-lg border border-university-line bg-university-mist p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft"
                >
                  <Icon className="text-university-navy" size={32} />
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
              {home.notices.map((notice, index) => (
                <article key={notice} className="flex gap-4 py-5">
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-university-line text-xs font-bold text-university-gold">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-university-text">{notice}</p>
                </article>
              ))}
            </div>
            <div className="mt-2 rounded-md bg-university-mist px-4 py-3 text-sm font-semibold text-university-navy">
              Latest notices are updated from the university admin office.
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
            {news.slice(0, 3).map((item) => (
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
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionHeading eyebrow="Gallery" title={home.galleryTitle} body={home.galleryBody} />
            <Link href="/gallery" className="mt-8 btn-primary">
              View Gallery <Images size={17} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {gallery.slice(0, 3).map((item) => (
              <article key={item._id || item.title} className="overflow-hidden rounded-lg bg-white shadow-sm">
                {item.image?.url ? (
                  <img src={item.image.url} alt={item.image.altText || item.title} className="h-64 w-full object-cover" />
                ) : (
                  <div className="h-64 bg-university-mist" />
                )}
                <div className="p-4">
                  <p className="text-sm font-semibold text-university-gold">{item.category}</p>
                  <h2 className="mt-1 font-bold text-university-navy">{item.title}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pb-4">
        <section className="overflow-hidden rounded-lg bg-university-green p-8 text-white shadow-soft md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">{home.ctaTitle}</h2>
              <p className="mt-4 max-w-3xl leading-8 text-white/80">{home.ctaBody}</p>
            </div>
            <Link href={home.ctaHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-university-gold px-5 py-3 text-sm font-bold text-university-navy transition hover:bg-white">
              {home.ctaButtonLabel}
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
