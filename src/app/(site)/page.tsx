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
  const stats = home.stats?.length ? home.stats : defaultHome.stats;
  const featureCards = home.featureCards?.length
    ? home.featureCards
    : defaultHome.featureCards;

  return (
    <>
      <HomeSlider slides={slides} />

      <section className="relative z-10 -mt-12">
        <Container>
          <div className="grid overflow-hidden rounded-lg border border-white/40 bg-white shadow-soft md:grid-cols-4">
            {stats.map((item) => (
              <div key={`${item.value}-${item.label}`} className="border-b border-slate-200 p-6 md:border-b-0 md:border-r last:border-r-0">
                <p className="text-3xl font-bold text-university-green">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
                  <Icon className="text-university-green" size={32} />
                  <h2 className="mt-5 text-xl font-bold text-university-navy group-hover:text-university-green">
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

      <Container className="grid gap-8 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg bg-university-navy p-8 text-white shadow-soft">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
              Academic
            </p>
            <h2 className="text-3xl font-bold tracking-normal text-white md:text-4xl">
              {home.academicTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/75">{home.academicBody}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {academic.programs.slice(0, 4).map((program) => (
              <div key={program} className="rounded-lg border border-white/10 bg-white/10 p-5">
                <GraduationCap className="text-university-gold" size={25} />
                <h2 className="mt-3 font-bold">{program}</h2>
              </div>
            ))}
          </div>
          <Link href="/academic" className="mt-8 inline-flex items-center gap-2 font-bold text-university-gold">
            Explore all programs <ArrowRight size={18} />
          </Link>
        </section>

        <aside className="rounded-lg border border-university-line bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <Bell className="text-university-gold" size={25} />
            <h2 className="text-2xl font-bold text-university-navy">{home.noticeTitle}</h2>
          </div>
          <div className="mt-5 divide-y divide-slate-200">
            {home.notices.map((notice) => (
              <p key={notice} className="py-4 text-sm leading-6 text-slate-700">
                {notice}
              </p>
            ))}
          </div>
        </aside>
      </Container>

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
                    <CalendarDays className="text-university-green" size={34} />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-sm font-semibold text-university-green">{item.category} · {item.date}</p>
                  <h2 className="mt-3 text-xl font-bold text-university-navy group-hover:text-university-green">{item.title}</h2>
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
                  <p className="text-sm font-semibold text-university-green">{item.category}</p>
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
