import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/public/container";
import { Prose } from "@/components/public/prose";
import { SectionHeading } from "@/components/public/section-heading";
import { getAboutPage } from "@/lib/content";

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="About Us" title={about.aboutTitle} />
          <div className="mt-6">
            <Prose text={about.aboutBody} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about/mission-vision" className="btn-primary">
              Mission & Vision <ArrowRight size={17} />
            </Link>
            <Link href="/about/chairman-message" className="btn-secondary">
              Chairman Message
            </Link>
          </div>
        </div>
        {about.aboutImage?.url ? (
          <img
            src={about.aboutImage.url}
            alt={about.aboutImage.altText || about.aboutTitle}
            className="h-[430px] w-full rounded-lg object-cover shadow-soft"
          />
        ) : null}
      </div>
    </Container>
  );
}
