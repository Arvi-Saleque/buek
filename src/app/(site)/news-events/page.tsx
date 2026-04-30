import { getHomePage, getNewsEvents } from "@/lib/content";
import { PageHero } from "@/components/public/page-hero";
import { NewsEventsClient } from "@/components/public/news-events-client";
import { defaultHome } from "@/lib/defaults";

export default async function NewsEventsPage() {
  const [items, home] = await Promise.all([getNewsEvents(true), getHomePage()]);

  return (
    <>
      <PageHero
        eyebrow={home.newsPageEyebrow || defaultHome.newsPageEyebrow || "Campus Updates"}
        title={home.newsPageTitle || defaultHome.newsPageTitle || "News & Events"}
        body={home.newsPageBody || defaultHome.newsPageBody}
        image="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1800&q=85"
        imageAlt="University auditorium event"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "News & Events" }]}
      />

      <NewsEventsClient items={items} />
    </>
  );
}
