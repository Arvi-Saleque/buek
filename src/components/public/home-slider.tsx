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
    <section className="relative -mt-[108px] min-h-[720px] overflow-hidden bg-university-navy text-white sm:-mt-[124px] sm:min-h-screen">
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
          <div className="absolute inset-0 bg-gradient-to-r from-university-navy via-university-navy/90 to-university-royal/70" />
        </div>
      ))}

      <Container className="relative flex min-h-[720px] items-center pb-28 pt-[168px] sm:min-h-screen sm:pb-24 sm:pt-[190px]">
        <div className="max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
            {items[active].eyebrow}
          </p>
          <div className="mt-4 h-1 w-20 rounded-full bg-university-gold" />
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
            {items[active].title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
            {items[active].subtitle}
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={items[active].buttonHref || "/academic"}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-university-gold px-6 py-3 text-sm font-bold text-university-navy shadow-[0_18px_38px_rgba(200,155,60,0.28)] transition hover:-translate-y-0.5 hover:bg-university-goldDark sm:px-7 sm:py-4 sm:text-base"
            >
              {items[active].buttonLabel || "Learn More"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>

      {items.length > 1 ? (
        <div className="absolute bottom-6 left-0 right-0 sm:bottom-8">
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
