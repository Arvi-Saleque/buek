import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronRight,
  Images,
} from "lucide-react";
import { AlbumLightbox } from "@/components/public/album-lightbox";
import { Container } from "@/components/public/container";
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
      <section className="relative flex min-h-[460px] items-end overflow-hidden bg-university-navy pb-14 pt-36 sm:min-h-[560px] sm:pb-16 sm:pt-40">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.altText || album.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,65,0.94),rgba(11,35,65,0.78)_50%,rgba(18,58,99,0.48))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(200,155,60,0.2),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/58">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/gallery" className="transition hover:text-white">
              Gallery
            </Link>
            <ChevronRight size={12} />
            <span className="line-clamp-1 max-w-[260px] text-university-gold">
              {album.title}
            </span>
          </nav>
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold backdrop-blur">
            <Images size={15} />
            {album.category}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {album.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
            {album.description ||
              "A curated collection of campus, academic, and institutional moments."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-white/72">
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
        </Container>
      </section>

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
