import Image from "next/image";
import { Container } from "@/components/public/container";
import { Prose } from "@/components/public/prose";
import { SectionHeading } from "@/components/public/section-heading";
import { getAboutPage } from "@/lib/content";

export default async function ChairmanMessagePage() {
  const about = await getAboutPage();

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <aside>
          {about.chairmanPhoto?.url ? (
            <div className="relative h-[420px] w-full overflow-hidden rounded-lg shadow-soft">
              <Image
                src={about.chairmanPhoto.url}
                alt={about.chairmanPhoto.altText || about.chairmanName}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="mt-5 rounded-lg bg-university-navy p-5 text-white">
            <h2 className="text-xl font-bold">{about.chairmanName}</h2>
            <p className="mt-1 text-sm text-university-gold">{about.chairmanRole}</p>
          </div>
        </aside>
        <section>
          <SectionHeading eyebrow="About Us" title="Chairman Message" />
          <div className="mt-8 rounded-lg border border-university-line bg-white p-8 shadow-sm">
            <Prose text={about.chairmanMessage} />
          </div>
        </section>
      </div>
    </Container>
  );
}
