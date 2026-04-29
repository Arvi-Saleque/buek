import { Target, Telescope } from "lucide-react";
import { Container } from "@/components/public/container";
import { Prose } from "@/components/public/prose";
import { SectionHeading } from "@/components/public/section-heading";
import { getAboutPage } from "@/lib/content";

export default async function MissionVisionPage() {
  const about = await getAboutPage();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="About Us"
        title="Mission & Vision"
        body="The institutional direction that guides our teaching, research, and service."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-lg border border-university-line bg-white p-8 shadow-sm">
          <Target className="text-university-green" size={34} />
          <h2 className="mt-5 text-2xl font-bold text-university-navy">{about.missionTitle}</h2>
          <div className="mt-4">
            <Prose text={about.missionBody} />
          </div>
        </article>
        <article className="rounded-lg border border-university-line bg-white p-8 shadow-sm">
          <Telescope className="text-university-gold" size={34} />
          <h2 className="mt-5 text-2xl font-bold text-university-navy">{about.visionTitle}</h2>
          <div className="mt-4">
            <Prose text={about.visionBody} />
          </div>
        </article>
      </div>
    </Container>
  );
}
