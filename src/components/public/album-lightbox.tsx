"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/types";

export function AlbumLightbox({
  albumTitle,
  images,
}: {
  albumTitle: string;
  images: GalleryImage[];
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? current : (current + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? current : (current - 1 + images.length) % images.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [active, images.length]);

  if (!images.length) {
    return null;
  }

  const activeImage = active === null ? null : images[active];
  const activeIndex = active ?? 0;

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className="group mb-5 block w-full overflow-hidden rounded-lg border border-university-line bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-university-mist">
              <Image
                src={image.url}
                alt={image.altText || image.title || albumTitle}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-university-navy/0 transition group-hover:bg-university-navy/35" />
              <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-md bg-university-gold px-4 py-2 text-sm font-bold text-university-navy group-hover:inline-flex">
                View Photo
              </span>
            </div>
            {(image.title || image.caption) ? (
              <div className="p-4">
                {image.title ? <h3 className="font-bold text-university-navy">{image.title}</h3> : null}
                {image.caption ? <p className="mt-1 text-sm leading-6 text-university-text">{image.caption}</p> : null}
              </div>
            ) : null}
          </button>
        ))}
      </div>

      {activeImage ? (
        <div className="fixed inset-0 z-50 bg-university-navy/94 p-4 text-white backdrop-blur">
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white hover:text-university-navy"
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={() => setActive((activeIndex - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-university-gold bg-university-gold text-university-navy shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={() => setActive((activeIndex + 1) % images.length)}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-university-gold bg-university-gold text-university-navy shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center">
            <div className="relative h-[72vh] w-full overflow-hidden rounded-lg bg-black/30">
              <Image
                src={activeImage.url}
                alt={activeImage.altText || activeImage.title || albumTitle}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                  {albumTitle}
                </p>
                <h3 className="mt-1 text-2xl font-bold">
                  {activeImage.title || `Photo ${activeIndex + 1}`}
                </h3>
                {activeImage.caption ? (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{activeImage.caption}</p>
                ) : null}
              </div>
              <p className="text-sm font-semibold text-white/60">
                {activeIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
