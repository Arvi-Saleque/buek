import { PageHero } from "@/components/public/page-hero";
import { GalleryClient } from "@/components/public/gallery-client";
import { getGalleryItems } from "@/lib/content";

export default async function GalleryPage() {
  const items = await getGalleryItems(true);

  return (
    <>
      <PageHero
        eyebrow="Campus Moments"
        title="Gallery"
        body="Explore moments from our campus, academic events, student activities, and institutional achievements."
        image="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=85"
        imageAlt="University cultural event"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <GalleryClient items={items} />
    </>
  );
}
