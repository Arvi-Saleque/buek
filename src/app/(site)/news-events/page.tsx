import { getNewsEvents } from "@/lib/content";
import { PageHero } from "@/components/public/page-hero";
import { NewsEventsClient } from "@/components/public/news-events-client";

export default async function NewsEventsPage() {
  const items = await getNewsEvents(true);

  return (
    <>
      <PageHero
        eyebrow="Campus Updates"
        title="News & Events"
        body="Stay updated with the latest academic news, campus events, notices, and institutional announcements."
        image="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1800&q=85"
        imageAlt="University auditorium event"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />

      <NewsEventsClient items={items} />
    </>
  );
}
