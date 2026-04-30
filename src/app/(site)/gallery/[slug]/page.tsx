import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Images,
} from "lucide-react";
import { AlbumLightbox } from "@/components/public/album-lightbox";
import { Container } from "@/components/public/container";
import { PageHero } from "@/components/public/page-hero";
import { getGalleryItemBySlug } from "@/lib/content";
import type { GalleryImage } from "@/lib/types";

function formatDate(date?: string) {
  if (!date) return "Date not set";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getGalleryItemBySlug(slug);

  if (!album) notFound();

  const cover = album.coverImage || album.image || album.images?.[0];
  const images: GalleryImage[] =
    album.images?.length ? album.images : album.image ? [album.image] : [];

  return (
    <>
      <PageHero
        eyebrow={album.category}
        title={album.title}
        body={album.description || "A curated collection of campus, academic, and institutional moments."}
        image={cover?.url}
        imageAlt={cover?.altText || album.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: album.title },
        ]}
      >
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-white/75">
          <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2">
            <CalendarDays size={15} className="text-university-gold" />
            {formatDate(album.eventDate)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2">
            <Building2 size={15} className="text-university-gold" />
            {album.department || "General"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2">
            <Images size={15} className="text-university-gold" />
            {images.length} Photos
          </span>
        </div>
      </PageHero>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 rounded-md border border-university-line bg-white px-4 py-2 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
          >
            <ArrowLeft size={15} /> Back to Gallery
          </Link>

          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Album Photos
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              Photo Collection
            </h2>
          </div>

          <AlbumLightbox albumTitle={album.title} images={images} />
        </Container>
      </section>
    </>
  );
}
