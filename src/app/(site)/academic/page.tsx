import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Code2,
  Cpu,
  Download,
  Fish,
  GraduationCap,
  Languages,
  Leaf,
  Microscope,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/public/container";
import { PageHero } from "@/components/public/page-hero";
import { Prose } from "@/components/public/prose";
import { getAcademicPage } from "@/lib/content";
import { defaultAcademic } from "@/lib/defaults";

const academicIconMap: Record<string, LucideIcon> = {
  Microscope,
  BookOpen: BookOpenText,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  ClipboardList,
  Code2,
  Cpu,
  Fish,
  GraduationCap,
  Languages,
  Leaf,
  Shield: ShieldCheck,
  ShieldCheck,
  Sprout,
  Stethoscope,
};

const fallbackFacultyIcons: LucideIcon[] = [
  Microscope,
  BookOpenText,
  Leaf,
  BriefcaseBusiness,
];

const fallbackSubjectIcons: LucideIcon[] = [
  Code2,
  BrainCircuit,
  ShieldCheck,
  Languages,
  Sprout,
  Stethoscope,
  Fish,
  Cpu,
];

function resolveIcon(
  name: string | undefined,
  fallback: LucideIcon,
): LucideIcon {
  if (name && academicIconMap[name]) return academicIconMap[name];
  return fallback;
}

type Subject = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type Faculty = {
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
  subjects: Subject[];
};

const totalSubjectsFor = (list: Faculty[]) =>
  list.reduce((count, faculty) => count + faculty.subjects.length, 0);

export default async function AcademicPage() {
  const academic = await getAcademicPage();

  const sourceFaculties =
    academic.faculties && academic.faculties.length
      ? academic.faculties
      : defaultAcademic.faculties || [];

  const faculties: Faculty[] = sourceFaculties.map((faculty, index) => ({
    title: faculty.title,
    label: faculty.label,
    description: faculty.description,
    icon: resolveIcon(
      faculty.icon,
      fallbackFacultyIcons[index % fallbackFacultyIcons.length],
    ),
    subjects: faculty.subjects.map((subject, subjectIndex) => ({
      title: subject.title,
      body: subject.body,
      icon: resolveIcon(
        subject.icon,
        fallbackSubjectIcons[subjectIndex % fallbackSubjectIcons.length],
      ),
    })),
  }));

  const totalSubjects = totalSubjectsFor(faculties);
  const directoryEyebrow =
    academic.directoryEyebrow || defaultAcademic.directoryEyebrow || "Faculty Directory";
  const directoryTitle =
    academic.directoryTitle ||
    defaultAcademic.directoryTitle ||
    "All faculties highlighted in one academic map";
  const directoryBody =
    academic.directoryBody ||
    defaultAcademic.directoryBody ||
    "Explore each faculty, then scan the subjects offered under it.";

  return (
    <>
      <PageHero
        eyebrow={academic.heroEyebrow || defaultAcademic.heroEyebrow || "Academic"}
        title={academic.title}
        body={academic.overview}
        image={academic.heroImage?.url || defaultAcademic.heroImage?.url}
        imageAlt={academic.heroImage?.altText || defaultAcademic.heroImage?.altText || "University classroom"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Academic" }]}
      >
        <div className="grid max-w-2xl grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <p className="text-2xl font-black text-university-gold">{faculties.length}</p>
            <p className="mt-1 text-xs font-semibold text-white/75">Faculties</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <p className="text-2xl font-black text-university-gold">{totalSubjects}</p>
            <p className="mt-1 text-xs font-semibold text-white/75">Subjects</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <p className="text-2xl font-black text-university-gold">4</p>
            <p className="mt-1 text-xs font-semibold text-white/75">Streams</p>
          </div>
        </div>
      </PageHero>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {directoryEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                {directoryTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-university-text">
                {directoryBody}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {faculties.map((faculty, index) => {
                const Icon = faculty.icon;
                return (
                  <a
                    key={faculty.title}
                    href={`#faculty-${index + 1}`}
                    className="group flex items-center gap-4 rounded-lg border border-university-line bg-university-mist p-4 transition hover:-translate-y-0.5 hover:border-university-gold hover:bg-white hover:shadow-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-university-navy text-university-gold shadow-sm">
                      <Icon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.14em] text-university-gold">
                        0{index + 1}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm font-bold leading-5 text-university-navy">
                        {faculty.title}
                      </span>
                    </span>
                    <ArrowRight className="ml-auto shrink-0 text-university-green transition group-hover:translate-x-1" size={17} />
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-university-mist py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="space-y-10">
            {faculties.map((faculty, facultyIndex) => {
              const FacultyIcon = faculty.icon;
              return (
                <article
                  key={faculty.title}
                  id={`faculty-${facultyIndex + 1}`}
                  className="scroll-mt-24 overflow-hidden rounded-lg border border-university-line bg-white shadow-soft"
                >
                  <div className="relative overflow-hidden bg-university-navy p-6 text-white sm:p-8 lg:p-10">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-university-gold" />
                    <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="grid h-12 w-12 place-items-center rounded-lg bg-white text-university-green">
                            <FacultyIcon size={24} />
                          </span>
                          <span className="rounded-md border border-university-gold/60 bg-university-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-university-navy">
                            {faculty.label}
                          </span>
                        </div>
                        <h2 className="mt-5 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                          {faculty.title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                          {faculty.description}
                        </p>
                      </div>
                      <div className="grid w-full max-w-xs grid-cols-2 gap-3 lg:w-72">
                        <div className="rounded-lg border border-white/20 bg-white/10 p-4">
                          <p className="text-3xl font-black text-university-gold">{faculty.subjects.length}</p>
                          <p className="mt-1 text-xs font-semibold text-white/85">Subjects</p>
                        </div>
                        <div className="rounded-lg border border-white/20 bg-white/10 p-4">
                          <p className="text-3xl font-black text-university-gold">0{facultyIndex + 1}</p>
                          <p className="mt-1 text-xs font-semibold text-white/85">Faculty</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2 lg:p-8">
                    {faculty.subjects.map((subject, subjectIndex) => {
                      const SubjectIcon = subject.icon;
                      return (
                        <div
                          key={subject.title}
                          className="group relative min-h-[220px] overflow-hidden rounded-lg border border-university-line bg-white p-6 transition hover:-translate-y-1 hover:border-university-gold/55 hover:shadow-soft"
                        >
                          <div className="absolute right-4 top-4 text-7xl font-black leading-none text-university-navy/[0.04]">
                            {subjectIndex + 1}
                          </div>
                          <div className="relative">
                            <span className="grid h-12 w-12 place-items-center rounded-lg bg-university-navy text-university-gold shadow-sm transition group-hover:scale-105">
                              <SubjectIcon size={22} />
                            </span>
                            <h3 className="mt-5 text-xl font-bold leading-snug text-university-navy">
                              {subject.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-university-text">
                              {subject.body}
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {["Curriculum", "Faculty", "Practical Learning"].map((tag) => (
                                <span
                                  key={`${subject.title}-${tag}`}
                                  className="inline-flex items-center gap-1.5 rounded-md bg-university-mist px-2.5 py-1 text-[11px] font-bold text-university-navy"
                                >
                                  <CheckCircle2 size={12} className="text-university-green" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-lg border border-university-line bg-white p-8 shadow-soft">
              <span className="grid h-14 w-14 place-items-center rounded-lg bg-university-navy text-university-gold">
                <GraduationCap size={28} />
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight text-university-navy">
                {academic.admissionTitle}
              </h2>
              <div className="mt-4">
                <Prose text={academic.admissionBody} />
              </div>
              {academic.downloads.length ? (
                <div className="mt-7 flex flex-wrap gap-3">
                  {academic.downloads.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="btn-secondary"
                    >
                      <Download size={17} />
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Faculty-wise program guidance",
                "Subject overview and academic direction",
                "Admission office support",
                "Updated notices, calendar, and downloads",
              ].map((item, index) => (
                <div key={item} className="rounded-lg border border-university-line bg-university-mist p-6">
                  <Sparkles size={22} className="text-university-gold" />
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-university-green">
                    Step 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-university-navy">{item}</h3>
                  <p className="mt-3 text-sm leading-7 text-university-text">
                    Students can use this academic page as the starting point for choosing a faculty, comparing subjects, and preparing for admission.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
