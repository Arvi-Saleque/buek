import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Quote,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { PageHero } from "@/components/public/page-hero";
import { getAboutPage, getSiteSettings } from "@/lib/content";
import { defaultAbout } from "@/lib/defaults";
import type { EditableListItem } from "@/lib/types";

const commitmentIcons = [GraduationCap, UserRound, ShieldCheck, BriefcaseBusiness];

function paragraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function list(value?: EditableListItem[]) {
  return value?.length ? value : [];
}

export default async function ChairmanMessagePage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  const messageParts = paragraphs(about.chairmanMessage);
  const commitments = list(about.chairmanCommitments);
  const priorities = list(about.chairmanPriorities);
  const relatedLinks = list(about.chairmanRelatedLinks);

  return (
    <>
      <PageHero
        eyebrow={about.chairmanHeroEyebrow || defaultAbout.chairmanHeroEyebrow || "Leadership Statement"}
        title={about.chairmanHeroTitle || defaultAbout.chairmanHeroTitle || "Chairman's Message"}
        body={about.chairmanHeroBody || defaultAbout.chairmanHeroBody}
        image={about.chairmanHeroImage?.url || defaultAbout.chairmanHeroImage?.url}
        imageAlt={about.chairmanHeroImage?.altText || defaultAbout.chairmanHeroImage?.altText || "University graduates"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Chairman's Message" },
        ]}
      />

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="rounded-lg border border-university-line bg-university-mist p-4 shadow-soft">
              <div className="relative h-[430px] overflow-hidden rounded-md bg-white">
                {about.chairmanPhoto?.url ? (
                  <Image
                    src={about.chairmanPhoto.url}
                    alt={about.chairmanPhoto.altText || about.chairmanName}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-university-navy text-university-gold">
                    <UserRound size={64} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {about.chairmanProfileEyebrow || defaultAbout.chairmanProfileEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                {about.chairmanName}
              </h2>
              <p className="mt-2 text-sm font-bold text-university-green">
                {about.chairmanRole}
              </p>
              <blockquote className="mt-7 border-l-4 border-university-gold pl-5">
                <Quote size={28} className="mb-3 text-university-gold" />
                <p className="text-xl font-semibold leading-9 text-university-navy">
                  &ldquo;{about.chairmanQuote}&rdquo;
                </p>
              </blockquote>
              <p className="mt-6 text-base leading-8 text-university-text">
                {about.chairmanIntro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl rounded-lg border border-university-line bg-white p-7 shadow-soft sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              {about.chairmanMessageEyebrow || defaultAbout.chairmanMessageEyebrow}
            </p>
            <div className="mt-6 space-y-5 text-base leading-8 text-university-text">
              {messageParts.map((part, index) => (
                <p key={index}>{part}</p>
              ))}
            </div>
            <div className="mt-8 border-t border-university-line pt-6">
              <p className="text-sm italic text-university-text">
                {about.chairmanClosingNote}
              </p>
              <p className="mt-3 text-xl font-bold text-university-navy">
                {about.chairmanName}
              </p>
              <p className="mt-1 text-sm font-semibold text-university-green">
                {about.chairmanRole}
              </p>
              <p className="mt-1 text-sm text-university-text">
                {settings.universityName}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              {about.chairmanCommitmentsEyebrow || defaultAbout.chairmanCommitmentsEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              {about.chairmanCommitmentsTitle || defaultAbout.chairmanCommitmentsTitle}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {commitments.map((item, index) => {
              const Icon = commitmentIcons[index % commitmentIcons.length];

              return (
                <article
                  key={`${item.title}-${index}`}
                  className="rounded-lg border border-university-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-university-navy text-university-gold">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-bold text-university-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-university-text">
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
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {about.chairmanPrioritiesEyebrow || defaultAbout.chairmanPrioritiesEyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                {about.chairmanPrioritiesTitle || defaultAbout.chairmanPrioritiesTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-university-text">
                {about.chairmanPrioritiesBody || defaultAbout.chairmanPrioritiesBody}
              </p>
            </div>
            <div className="grid gap-4">
              {priorities.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="grid gap-4 rounded-lg border border-university-line bg-white p-5 shadow-sm sm:grid-cols-[80px_1fr]"
                >
                  <span className="text-3xl font-black text-university-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-bold text-university-navy">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-university-text">
                      {item.body}
                    </span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              {about.chairmanRelatedEyebrow || defaultAbout.chairmanRelatedEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              {about.chairmanRelatedTitle || defaultAbout.chairmanRelatedTitle}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((item, index) => {
              const icons = [ClipboardCheck, BookOpenCheck, Award, Handshake];
              const Icon = icons[index % icons.length];

              return (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.body || "#"}
                  className="group rounded-lg border border-university-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-university-gold hover:shadow-soft"
                >
                  <Icon size={24} className="text-university-gold" />
                  <span className="mt-4 flex items-center justify-between gap-3 font-bold text-university-navy">
                    {item.title}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
