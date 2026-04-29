import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/public/container";
import { Prose } from "@/components/public/prose";
import { getNewsEventBySlug } from "@/lib/content";

export default async function NewsEventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsEventBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <Container className="py-16">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
          {item.category} · {item.date}
        </p>
        <h1 className="mt-4 text-4xl font-bold text-university-navy md:text-5xl">{item.title}</h1>
        <p className="mt-5 text-xl leading-8 text-slate-600">{item.excerpt}</p>
        {item.coverImage?.url ? (
          <div className="relative mt-8 h-[460px] w-full overflow-hidden rounded-lg shadow-soft">
            <Image
              src={item.coverImage.url}
              alt={item.coverImage.altText || item.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="mt-8 rounded-lg bg-white p-8 shadow-sm">
          <Prose text={item.body} />
        </div>
      </article>
    </Container>
  );
}
