import { Download, GraduationCap } from "lucide-react";
import { Container } from "@/components/public/container";
import { PageHero } from "@/components/public/page-hero";
import { Prose } from "@/components/public/prose";
import { getAcademicPage } from "@/lib/content";

export default async function AcademicPage() {
  const academic = await getAcademicPage();

  return (
    <>
      <PageHero
        eyebrow="Academic"
        title={academic.title}
        body={academic.overview}
        image="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1800&q=85"
        imageAlt="University classroom"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Academic" }]}
      />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {academic.programs.map((program) => (
            <article key={program} className="rounded-lg border border-university-line bg-white p-6 shadow-sm">
              <GraduationCap className="text-university-green" size={30} />
              <h2 className="mt-4 text-xl font-bold text-university-navy">{program}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Program information, departments, curriculum details, and admission requirements can be updated from the admin panel.
              </p>
            </article>
          ))}
        </div>
        <section className="mt-12 rounded-lg bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-university-navy">{academic.admissionTitle}</h2>
          <div className="mt-4">
            <Prose text={academic.admissionBody} />
          </div>
          {academic.downloads.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {academic.downloads.map((item) => (
                <a key={item.label} href={item.href} className="btn-secondary">
                  <Download size={17} />
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </section>
      </Container>
    </>
  );
}
