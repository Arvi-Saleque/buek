import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
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
import { PageHero } from "@/components/public/page-hero";
import { getAboutPage } from "@/lib/content";
import { defaultAbout } from "@/lib/defaults";
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
      <PageHero
        eyebrow={about.missionHeroEyebrow || defaultAbout.missionHeroEyebrow || "Institutional Direction"}
        title={about.missionHeroTitle || defaultAbout.missionHeroTitle || "Mission & Vision"}
        body={about.missionHeroBody || defaultAbout.missionHeroBody}
        image={about.missionHeroImage?.url || defaultAbout.missionHeroImage?.url}
        imageAlt={about.missionHeroImage?.altText || defaultAbout.missionHeroImage?.altText || "University campus building"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Mission & Vision" },
        ]}
      />

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              {about.missionIntroEyebrow || defaultAbout.missionIntroEyebrow}
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
                  {about.missionVisionCardTitle || defaultAbout.missionVisionCardTitle}
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
              {about.missionCoreValuesEyebrow || defaultAbout.missionCoreValuesEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              {about.missionCoreValuesTitle || defaultAbout.missionCoreValuesTitle}
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
              {about.missionStrategicEyebrow || defaultAbout.missionStrategicEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              {about.missionStrategicTitle || defaultAbout.missionStrategicTitle}
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
                {about.missionCtaEyebrow || defaultAbout.missionCtaEyebrow}
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
