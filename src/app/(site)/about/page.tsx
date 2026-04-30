import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Landmark,
  LayoutGrid,
  MessageSquareQuote,
  Microscope,
  Shield,
  Users,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { getAboutPage } from "@/lib/content";

const stats = [
  { value: "10+",   label: "Years of Excellence" },
  { value: "8+",    label: "Academic Programs" },
  { value: "2000+", label: "Students Enrolled" },
  { value: "100+",  label: "Faculty Members" },
];

const whoWeAre = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    body: "Quality education built on a structured curriculum, experienced educators, and industry-relevant standards.",
  },
  {
    icon: Users,
    title: "Student Development",
    body: "Clubs, co-curricular activities, leadership training, and communication skills for holistic growth.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career Preparation",
    body: "Practical learning, industry partnerships, internship guidance, and career counselling for every student.",
  },
];

const timeline = [
  { year: "2015", event: "University foundation established by visionary academic leaders." },
  { year: "2018", event: "Academic expansion with new departments and modern facilities." },
  { year: "2021", event: "State-of-the-art laboratories and digital classrooms introduced." },
  { year: "2025", event: "New digital learning platform launched for online and blended education." },
];

const whyChooseUs = [
  { icon: GraduationCap, text: "Experienced and dedicated faculty members" },
  { icon: LayoutGrid,    text: "Modern, industry-aligned academic curriculum" },
  { icon: Microscope,    text: "Practical and career-oriented learning approach" },
  { icon: Building2,     text: "Digital classrooms, computer labs, and facilities" },
  { icon: Shield,        text: "Safe, disciplined, and inclusive campus environment" },
  { icon: Landmark,      text: "Government recognised and accredited programs" },
];

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        className="relative flex min-h-[380px] items-end pb-14 pt-32 sm:min-h-[420px] sm:pb-16 sm:pt-36"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(11,35,65,0.82)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <span className="text-university-gold">About</span>
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-university-gold">Institution Profile</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Bangladesh University of Engineering Knowledge
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            A leading institution committed to academic excellence, innovation, and career-focused education.
          </p>
        </Container>
      </section>

      {/* ── 2. Introduction ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">Who We Are</p>
              <h2 className="text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                {about.aboutTitle}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-university-text">
                <p>{about.aboutBody}</p>
                <p>
                  Our programs are designed to equip students with strong academic foundations, practical skills,
                  and the ethical values needed to contribute meaningfully to society and industry.
                </p>
                <p>
                  With a student-centered approach, experienced faculty, and modern facilities, we are dedicated
                  to shaping confident, capable graduates ready for the challenges of tomorrow.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about/mission-vision"
                  className="inline-flex items-center gap-2 rounded-lg bg-university-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-university-gold hover:text-university-navy"
                >
                  Mission &amp; Vision <ArrowRight size={16} />
                </Link>
                <Link
                  href="/about/chairman-message"
                  className="inline-flex items-center gap-2 rounded-lg border border-university-line px-6 py-3 text-sm font-bold text-university-navy transition hover:border-university-navy"
                >
                  Chairman&apos;s Message
                </Link>
              </div>
            </div>
            <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-soft lg:h-[480px]">
              {about.aboutImage?.url ? (
                <Image
                  src={about.aboutImage.url}
                  alt={about.aboutImage.altText || "University campus"}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-university-mist" />
              )}
              <div className="absolute bottom-5 left-5 rounded-xl bg-university-navy/90 px-5 py-3 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-university-gold">Est. 2015</p>
                <p className="mt-0.5 text-sm font-bold text-white">Decade of Excellence</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Three Pillars ── */}
      <section className="bg-university-mist py-16 sm:py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">Our Pillars</p>
            <h2 className="text-3xl font-bold text-university-navy sm:text-4xl">Built on Three Foundations</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {whoWeAre.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-university-line bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-university-navy text-university-gold">
                  <Icon size={26} />
                </span>
                <h3 className="text-lg font-bold text-university-navy">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-university-text">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. Statistics ── */}
      <section
        className="relative py-16 sm:py-20"
        style={{ background: "linear-gradient(160deg,#0B2341 0%,#123A63 55%,#0F6B57 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border-[48px] border-white/5" />
          <div className="absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full border-[36px] border-white/5" />
        </div>
        <Container className="relative">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">By the Numbers</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Key Highlights</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
              >
                <p className="text-4xl font-black text-university-gold sm:text-5xl">{value}</p>
                <p className="mt-2 text-sm font-medium text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Timeline ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Our Journey
              </p>
              <h2 className="text-4xl font-bold leading-tight text-university-navy sm:text-5xl">
                A Decade of Growth &amp; Progress
              </h2>
              <p className="mt-6 text-base leading-8 text-university-text">
                From a bold founding vision to a thriving academic community, our
                institution has grown steadily — expanding programs, upgrading
                facilities, and earning the trust of thousands of students.
              </p>
            </div>
            <div className="relative pt-1">
              <div className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-0.5 bg-university-gold/70" />
              {timeline.map(({ year, event }, i) => (
                <div
                  key={year}
                  className={`relative grid gap-5 pl-12 sm:grid-cols-[70px_1fr] sm:gap-8 ${
                    i < timeline.length - 1 ? "pb-10" : ""
                  }`}
                >
                  <span className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-university-gold bg-white shadow-[0_0_0_5px_rgba(200,155,60,0.1)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-university-gold" />
                  </span>
                  <p className="text-2xl font-black leading-none text-university-navy">
                    {year}
                  </p>
                  <p className="text-sm font-medium leading-7 text-university-text">
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Why Choose Us ── */}
      <section className="bg-university-mist py-16 sm:py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">Why BUEK</p>
            <h2 className="text-3xl font-bold text-university-navy sm:text-4xl">Why Choose Us</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-university-text">
              We combine academic rigour with a supportive environment to help every student thrive.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-4 rounded-xl border border-university-line bg-white p-5 shadow-sm transition hover:border-university-gold/40 hover:shadow-soft"
              >
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-university-navy text-university-gold">
                  <Icon size={18} />
                </span>
                <p className="text-sm font-semibold leading-6 text-university-navy">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. Campus / Learning Environment ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">Campus Life</p>
            <h2 className="text-3xl font-bold text-university-navy sm:text-4xl">Our Learning Environment</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-university-text">
              Modern classrooms, well-equipped labs, a rich library, and vibrant student spaces — all designed for success.
            </p>
          </div>
          <div className="grid h-[420px] grid-cols-3 grid-rows-2 gap-3 sm:h-[500px]">
            <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-university-royal">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80"
                alt="Campus"
                fill
                sizes="(min-width: 640px) 66vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p className="text-sm font-bold text-white">Academic Campus</p>
                <p className="text-xs text-white/70">Modern facilities for tomorrow&apos;s leaders</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-university-royal/70">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80"
                alt="Library"
                fill
                sizes="33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-university-green/60">
              <Image
                src="https://images.unsplash.com/photo-1581093458791-9d09d43c81f3?w=600&q=80"
                alt="Laboratory"
                fill
                sizes="33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Modern Classrooms", "Computer Labs", "Library & Resources", "Student Activity Spaces"].map((f) => (
              <div key={f} className="flex items-center gap-2 rounded-lg border border-university-line bg-university-mist px-4 py-3">
                <CheckCircle2 size={15} className="shrink-0 text-university-gold" />
                <span className="text-xs font-semibold text-university-navy">{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 8. Leadership Preview ── */}
      <section className="bg-university-mist py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">Leadership</p>
              <h2 className="text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                Leadership &amp; Governance
              </h2>
              <p className="mt-5 text-base leading-8 text-university-text">
                Our institution is guided by experienced academic leaders and administrative members who work
                together to ensure quality education, institutional integrity, and continuous growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about/chairman-message"
                  className="inline-flex items-center gap-2 rounded-lg bg-university-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-university-gold hover:text-university-navy"
                >
                  <MessageSquareQuote size={16} /> Chairman&apos;s Message
                </Link>
                <Link
                  href="/about/committee"
                  className="inline-flex items-center gap-2 rounded-lg border border-university-line bg-white px-6 py-3 text-sm font-bold text-university-navy transition hover:border-university-navy"
                >
                  View Committee <ArrowRight size={15} />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-university-line bg-white p-7 shadow-soft">
              <div className="flex items-start gap-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-university-mist">
                  {about.chairmanPhoto?.url ? (
                    <Image
                      src={about.chairmanPhoto.url}
                      alt={about.chairmanName}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-university-navy">
                      <Users size={28} className="text-university-gold" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-university-navy">{about.chairmanName}</p>
                  <p className="mt-0.5 text-xs text-university-text">{about.chairmanRole}</p>
                </div>
              </div>
              <blockquote className="mt-5 border-l-4 border-university-gold pl-4">
                <p className="line-clamp-4 text-sm italic leading-7 text-university-text">
                  &ldquo;{about.chairmanMessage}&rdquo;
                </p>
              </blockquote>
              <Link
                href="/about/chairman-message"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-university-gold transition hover:gap-2.5"
              >
                Read full message <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 9. CTA ── */}
      <section
        className="relative py-24 sm:py-28"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(11,35,65,0.88)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold/60 to-university-gold/0" />
        <Container className="relative text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-university-gold">Take the Next Step</p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Start Your Academic Journey With Us
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/75">
            Explore our academic programs and learn how BUEK can help you build a purposeful future.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/academic"
              className="inline-flex min-h-[52px] items-center gap-2.5 rounded-xl bg-university-gold px-8 py-3.5 text-base font-bold text-university-navy shadow-[0_8px_32px_rgba(200,155,60,0.4)] transition hover:bg-white"
            >
              Explore Academic Programs <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center gap-2.5 rounded-xl border-2 border-white/40 px-8 py-3.5 text-base font-bold text-white transition hover:border-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
