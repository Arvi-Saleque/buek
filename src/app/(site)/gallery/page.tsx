import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Images } from "lucide-react";
import { Container } from "@/components/public/container";
import { GalleryClient } from "@/components/public/gallery-client";
import { getGalleryItems } from "@/lib/content";

export default async function GalleryPage() {
  const items = await getGalleryItems(true);

  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-university-navy pb-14 pt-36 sm:min-h-[500px] sm:pb-16 sm:pt-40">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=85"
          alt="University cultural event"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,65,0.92),rgba(11,35,65,0.78)_48%,rgba(18,58,99,0.54))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(200,155,60,0.22),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-white/58">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-university-gold">Gallery</span>
          </nav>
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold backdrop-blur">
            <Images size={15} />
            Campus Moments
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Gallery
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 sm:text-xl">
            Explore moments from our campus, academic events, student
            activities, and institutional achievements.
          </p>
        </Container>
      </section>

      <GalleryClient items={items} />
    </>
  );
}
