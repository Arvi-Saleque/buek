"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/public/container";
import type { HomeSlide } from "@/lib/types";

export function HomeSlider({ slides }: { slides: HomeSlide[] }) {
  const items = useMemo(() => slides.filter((slide) => slide.title), [slides]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const go = (direction: 1 | -1) => {
    setActive((current) => (current + direction + items.length) % items.length);
  };

  return (
    <section className="relative -mt-[124px] min-h-screen overflow-hidden bg-university-navy text-white">
      {items.map((slide, index) => (
        <div
          key={`${slide.title}-${index}`}
          className={[
            "absolute inset-0 transition-opacity duration-1000",
            index === active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden={index !== active}
        >
          {slide.image?.url ? (
            <Image
              src={slide.image.url}
              alt={slide.image.altText || slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,65,0.84),rgba(11,35,65,0.72)_48%,rgba(18,58,99,0.42))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,154,46,0.22),transparent_32%)]" />
        </div>
      ))}

      <Container className="relative flex min-h-screen items-center pb-24 pt-[190px]">
        <div className="max-w-5xl">
          <p className="mb-6 inline-flex rounded-md border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.2em] text-university-gold backdrop-blur">
            {items[active].eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-bold leading-[1.04] tracking-normal md:text-7xl lg:text-8xl">
            {items[active].title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/82 md:text-2xl md:leading-9">
            {items[active].subtitle}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href={items[active].buttonHref || "/academic"}
              className="inline-flex items-center gap-3 rounded-md bg-university-gold px-7 py-4 text-base font-bold text-university-navy shadow-[0_18px_38px_rgba(200,155,60,0.28)] transition hover:-translate-y-0.5 hover:bg-university-goldDark"
            >
              {items[active].buttonLabel || "Learn More"}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-university-navy"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </Container>

      {items.length > 1 ? (
        <div className="absolute bottom-8 left-0 right-0">
          <Container className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-university-navy/20 px-3 py-2 backdrop-blur">
              {items.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={[
                    "h-3 rounded-full transition-all",
                    active === index
                      ? "w-12 bg-university-gold"
                      : "w-3 bg-white/70 hover:bg-white",
                  ].join(" ")}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid h-12 w-12 place-items-center rounded-md border border-white/35 bg-white/12 text-white shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-university-gold hover:bg-university-gold hover:text-university-navy"
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid h-12 w-12 place-items-center rounded-md border border-white/35 bg-white/12 text-white shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-university-gold hover:bg-university-gold hover:text-university-navy"
                aria-label="Next slide"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </Container>
        </div>
      ) : null}
    </section>
  );
}
