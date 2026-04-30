import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/public/container";
import { getNewsEvents } from "@/lib/content";
import { NewsEventsClient } from "@/components/public/news-events-client";

export default async function NewsEventsPage() {
  const items = await getNewsEvents(true);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex min-h-[320px] items-end pb-12 pt-28 sm:min-h-[360px] sm:pt-32"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(11,35,65,0.82)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-university-gold">News &amp; Events</span>
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-university-gold">
            Campus Updates
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            News &amp; Events
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Stay updated with the latest academic news, campus events, notices,
            and institutional announcements.
          </p>
        </Container>
      </section>

      <NewsEventsClient items={items} />
    </>
  );
}


