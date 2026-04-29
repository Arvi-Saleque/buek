"use client";

import Link from "next/link";
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
            <img
              src={slide.image.url}
              alt={slide.image.altText || slide.title}
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,65,0.94),rgba(11,35,65,0.70)_48%,rgba(15,93,80,0.36))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,154,46,0.22),transparent_32%)]" />
        </div>
      ))}

      <Container className="relative flex min-h-screen items-center pb-20 pt-[190px]">
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold uppercase tracking-[0.18em] text-university-gold backdrop-blur">
            {items[active].eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-normal md:text-6xl lg:text-7xl">
            {items[active].title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
            {items[active].subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={items[active].buttonHref || "/academic"}
              className="inline-flex items-center gap-2 rounded-md bg-university-gold px-5 py-3 text-sm font-bold text-university-navy shadow-soft transition hover:bg-white"
            >
              {items[active].buttonLabel || "Learn More"}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-university-navy"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </Container>

      {items.length > 1 ? (
        <div className="absolute bottom-8 left-0 right-0">
          <Container className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {items.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    active === index ? "w-10 bg-university-gold" : "w-2.5 bg-white/50",
                  ].join(" ")}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => go(-1)}
                className="grid h-11 w-11 place-items-center rounded-md border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-university-navy"
                aria-label="Previous slide"
              >
                <ChevronLeft size={21} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="grid h-11 w-11 place-items-center rounded-md border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-university-navy"
                aria-label="Next slide"
              >
                <ChevronRight size={21} />
              </button>
            </div>
          </Container>
        </div>
      ) : null}
    </section>
  );
}
