import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronRight,
  Compass,
  GraduationCap,
  Handshake,
  Lightbulb,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  Users,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { getAboutPage } from "@/lib/content";
import type { EditableListItem } from "@/lib/types";

const missionIcons = [GraduationCap, Users, Lightbulb, ShieldCheck, Handshake, Target];
const valueIcons = [BookOpenCheck, ShieldCheck, Sparkles, Users, Compass, Handshake, Target, Lightbulb];

function items(value?: EditableListItem[]) {
  return value?.length ? value : [];
}

export default async function MissionVisionPage() {
  const about = await getAboutPage();
  const missionPoints = items(about.missionPoints);
  const coreValues = items(about.coreValues);
  const strategicFocus = items(about.strategicFocus);

  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-university-navy pb-14 pt-36 sm:min-h-[500px] sm:pb-16 sm:pt-40">
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85"
          alt="University campus building"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,65,0.94),rgba(11,35,65,0.8)_50%,rgba(18,58,99,0.5))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(200,155,60,0.22),transparent_35%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-white/58">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <ChevronRight size={12} />
            <span className="text-university-gold">Mission &amp; Vision</span>
          </nav>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-university-gold">
            Institutional Direction
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Mission &amp; Vision
          </h1>
          <div className="mt-5 h-1 w-24 bg-university-gold" />
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 sm:text-xl">
            Guiding our commitment to academic excellence, innovation, ethical
            leadership, and student success.
          </p>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Purpose With Discipline
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
              {about.missionIntroTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-university-text sm:text-lg">
              {about.missionIntroBody}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <article className="relative overflow-hidden rounded-lg bg-university-navy p-8 text-white shadow-soft sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-md bg-university-gold text-university-navy">
                  <Telescope size={28} />
                </span>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                  {about.visionTitle}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  Our Direction for the Future
                </h2>
                <p className="mt-5 text-lg leading-9 text-white/78">
                  {about.visionBody}
                </p>
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {missionPoints.map((item, index) => {
                const Icon = missionIcons[index % missionIcons.length];

                return (
                  <article
                    key={`${item.title}-${index}`}
                    className="rounded-lg border border-university-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-university-navy text-university-gold">
                      <Icon size={21} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-university-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-university-text">
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Core Values
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              Principles That Shape Our Academic Culture
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((item, index) => {
              const Icon = valueIcons[index % valueIcons.length];

              return (
                <article
                  key={`${item.title}-${index}`}
                  className="rounded-lg border border-university-line bg-white p-5 shadow-sm"
                >
                  <Icon size={24} className="text-university-gold" />
                  <h3 className="mt-4 font-bold text-university-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-university-text">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Strategic Focus
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              Where We Invest Our Energy
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {strategicFocus.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="rounded-lg border border-university-line bg-white p-6 shadow-sm"
              >
                <span className="text-4xl font-black text-university-gold/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold text-university-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-university-text">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl rounded-lg border border-university-line bg-university-mist p-8 text-center shadow-sm sm:p-10">
            <Quote size={34} className="mx-auto text-university-gold" />
            <blockquote className="mt-5 text-2xl font-bold leading-10 text-university-navy">
              &ldquo;{about.missionQuote}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-university-text">
              {about.missionQuoteSource}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-university-navy py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Academic Journey
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                {about.missionCtaTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                {about.missionCtaBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={about.missionCtaPrimaryHref || "/academic"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-university-gold px-7 py-3 text-sm font-bold text-university-navy transition hover:bg-white"
              >
                {about.missionCtaPrimaryLabel || "Explore Academic Programs"}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={about.missionCtaSecondaryHref || "/contact"}
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 px-7 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                {about.missionCtaSecondaryLabel || "Contact Us"}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
