import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { getNewsEvents } from "@/lib/content";

export default async function NewsEventsPage() {
  const news = await getNewsEvents(true);

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Campus Updates"
        title="News & Events"
        body="Read university announcements, events, academic notices, and community stories."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link key={item.slug} href={`/news-events/${item.slug}`} className="group rounded-lg border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            {item.coverImage?.url ? (
              <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={item.coverImage.url}
                  alt={item.coverImage.altText || item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-52 rounded-t-lg bg-university-mist" />
            )}
            <div className="p-5">
              <p className="text-sm font-semibold text-university-green">{item.category} · {item.date}</p>
              <h2 className="mt-3 text-xl font-bold text-university-navy group-hover:text-university-green">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-university-gold">
                Read details <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
