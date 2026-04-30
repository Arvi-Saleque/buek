import { PageHero } from "@/components/public/page-hero";
import { GalleryClient } from "@/components/public/gallery-client";
import { getGalleryItems, getHomePage } from "@/lib/content";
import { defaultHome } from "@/lib/defaults";

export default async function GalleryPage() {
  const [items, home] = await Promise.all([getGalleryItems(true), getHomePage()]);

  return (
    <>
      <PageHero
        eyebrow={home.galleryPageEyebrow || defaultHome.galleryPageEyebrow || "Campus Moments"}
        title={home.galleryPageTitle || defaultHome.galleryPageTitle || "Gallery"}
        body={home.galleryPageBody || defaultHome.galleryPageBody}
        image="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=85"
        imageAlt="University cultural event"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <GalleryClient items={items} />
    </>
  );
}
