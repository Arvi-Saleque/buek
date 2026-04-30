"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Images,
  PlayCircle,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Container } from "@/components/public/container";
import type { GalleryItem } from "@/lib/types";

const CATEGORY_TABS = [
  "All",
  "Campus",
  "Events",
  "Academic",
  "Seminar",
  "Workshop",
  "Sports",
  "Cultural",
  "Convocation",
  "Clubs",
];

const DEPARTMENTS = [
  "All Departments",
  "General",
  "CSE",
  "EEE",
  "Civil",
  "Mechanical",
  "BBA",
  "English",
  "Law",
];

const MEDIA_TYPES = ["All Media", "Photos", "Videos"];
const PAGE_SIZE = 6;

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function albumSlug(item: GalleryItem) {
  return item.slug || slugify(item.title);
}

function albumCover(item: GalleryItem) {
  return item.coverImage || item.image || item.images?.[0];
}

function albumImages(item: GalleryItem) {
  const images = item.images?.length ? item.images : item.image ? [item.image] : [];
  return images.length;
}

function formatDate(date?: string) {
  if (!date) return "Date not set";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function categoryMatches(category: string, selected: string) {
  if (selected === "All") return true;
  return category.toLowerCase() === selected.toLowerCase();
}

function yearOf(item: GalleryItem) {
  if (item.year) return item.year;
  if (!item.eventDate) return "";
  const parsed = new Date(item.eventDate);
  return Number.isNaN(parsed.getTime()) ? "" : String(parsed.getFullYear());
}

function badgeClass(category: string) {
  switch (category.toLowerCase()) {
    case "events":
      return "bg-university-gold text-university-navy";
    case "academic":
      return "bg-[#315C8D] text-white";
    case "seminar":
      return "bg-[#5A4A82] text-white";
    case "workshop":
      return "bg-[#B46A32] text-white";
    case "sports":
      return "bg-[#0F6B57] text-white";
    case "cultural":
      return "bg-[#7A1E2C] text-white";
    case "convocation":
      return "bg-[#8B6A1D] text-white";
    case "clubs":
      return "bg-[#22685F] text-white";
    default:
      return "bg-university-navy text-white";
  }
}

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [year, setYear] = useState("All Years");
  const [mediaType, setMediaType] = useState("All Media");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const years = useMemo(() => {
    const values = new Set(items.map(yearOf).filter(Boolean));
    ["2026", "2025", "2024", "2023"].forEach((value) => values.add(value));
    return ["All Years", ...Array.from(values).sort((a, b) => Number(b) - Number(a))];
  }, [items]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const text = [
        item.title,
        item.category,
        item.department,
        item.year,
        item.description,
        item.images?.map((image) => `${image.title || ""} ${image.caption || ""}`).join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        categoryMatches(item.category, category) &&
        (!query || text.includes(query)) &&
        (department === "All Departments" || (item.department || "General") === department) &&
        (year === "All Years" || yearOf(item) === year) &&
        (mediaType === "All Media" || (item.mediaType || "Photos") === mediaType)
      );
    });
  }, [category, department, items, mediaType, search, year]);

  const featured = filtered.find((item) => item.featured) || filtered[0] || null;
  const gridItems = filtered.filter((item) => item !== featured);
  const visibleItems = gridItems.slice(0, visibleCount);

  const resetFilters = () => {
    setCategory("All");
    setSearch("");
    setDepartment("All Departments");
    setYear("All Years");
    setMediaType("All Media");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="bg-university-mist">
      {featured ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                  Featured Album
                </p>
                <h2 className="mt-2 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                  {featured.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-university-text">
                {featured.description ||
                  "Explore a highlighted collection of university moments, campus activities, and academic memories."}
              </p>
            </div>
            <Link
              href={`/gallery/${albumSlug(featured)}`}
              className="group grid overflow-hidden rounded-lg border border-university-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(16,32,51,0.15)] lg:grid-cols-[1.12fr_0.88fr]"
            >
              <div className="relative min-h-[300px] overflow-hidden bg-university-mist sm:min-h-[420px]">
                {albumCover(featured)?.url ? (
                  <Image
                    src={albumCover(featured)!.url}
                    alt={albumCover(featured)?.altText || featured.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full min-h-[300px] place-items-center text-university-navy/20">
                    <Images size={62} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-university-navy/70 via-transparent to-transparent" />
                <span className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-bold ${badgeClass(featured.category)}`}>
                  {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="mb-5 grid gap-3 text-sm font-semibold text-university-text sm:grid-cols-2">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-university-gold" />
                    {formatDate(featured.eventDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Building2 size={16} className="text-university-gold" />
                    {featured.department || "General"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Images size={16} className="text-university-gold" />
                    {albumImages(featured)} Photos
                  </span>
                </div>
                <h3 className="text-3xl font-bold leading-tight text-university-navy transition group-hover:text-university-royal">
                  {featured.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-university-text">
                  {featured.description ||
                    "A curated album from university life and institutional activities."}
                </p>
                <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-university-navy px-6 py-3 text-sm font-bold text-white transition group-hover:bg-university-gold group-hover:text-university-navy">
                  View Album <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      <section className="border-y border-university-line bg-white/95 shadow-sm backdrop-blur">
        <Container>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto border-b border-university-line py-3">
            {CATEGORY_TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={[
                  "shrink-0 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition",
                  category === item
                    ? "bg-university-navy text-white shadow-sm"
                    : "bg-university-mist text-university-text hover:bg-university-gold hover:text-university-navy",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-3 py-4 lg:grid-cols-[1.4fr_0.8fr_0.65fr_0.65fr]">
            <label className="relative">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-university-text" />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search gallery..."
                className="h-11 w-full rounded-md border border-university-line bg-university-mist pl-10 pr-10 text-sm text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-university-text hover:text-university-navy"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              ) : null}
            </label>
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className="h-11 rounded-md border border-university-line bg-university-mist px-3 text-sm font-semibold text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20">
              {DEPARTMENTS.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={year} onChange={(event) => setYear(event.target.value)} className="h-11 rounded-md border border-university-line bg-university-mist px-3 text-sm font-semibold text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20">
              {years.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={mediaType} onChange={(event) => setMediaType(event.target.value)} className="h-11 rounded-md border border-university-line bg-university-mist px-3 text-sm font-semibold text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20">
              {MEDIA_TYPES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-university-line py-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-university-text">
              <SlidersHorizontal size={16} className="text-university-gold" />
              Showing {filtered.length} album{filtered.length === 1 ? "" : "s"}
            </p>
            <button type="button" onClick={resetFilters} className="text-sm font-bold text-university-gold transition hover:text-university-navy">
              Reset filters
            </button>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Album Gallery
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              Explore Campus Moments
            </h2>
          </div>

          {visibleItems.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleItems.map((item) => (
                <Link
                  key={item._id || item.title}
                  href={`/gallery/${albumSlug(item)}`}
                  className="group overflow-hidden rounded-lg border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative h-72 overflow-hidden bg-university-mist">
                    {albumCover(item)?.url ? (
                      <Image
                        src={albumCover(item)!.url}
                        alt={albumCover(item)?.altText || item.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-university-navy/20">
                        <Images size={42} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-university-navy/0 transition group-hover:bg-university-navy/45" />
                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${badgeClass(item.category)}`}>
                      {item.category}
                    </span>
                    {item.mediaType === "Videos" ? (
                      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-university-navy">
                        <PlayCircle size={20} />
                      </span>
                    ) : null}
                    <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-md bg-university-gold px-5 py-3 text-sm font-bold text-university-navy shadow-sm transition group-hover:inline-flex">
                      View Album
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-university-text">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} className="text-university-gold" />
                        {formatDate(item.eventDate)}
                      </span>
                      <span>{item.department || "General"}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-university-navy group-hover:text-university-royal">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-university-text">
                      {item.description || "A curated university photo album."}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-university-gold">
                      {albumImages(item)} Photos <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : !filtered.length ? (
            <div className="rounded-lg border border-university-line bg-white p-10 text-center shadow-sm">
              <Images size={44} className="mx-auto text-university-navy/20" />
              <h3 className="mt-4 text-2xl font-bold text-university-navy">No albums found</h3>
              <p className="mt-2 text-sm text-university-text">Try changing the filters or search term.</p>
            </div>
          ) : null}

          {visibleCount < gridItems.length ? (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-md bg-university-navy px-7 py-3 text-sm font-bold text-white transition hover:bg-university-gold hover:text-university-navy"
              >
                Load More Albums <ArrowRight size={16} />
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-university-navy py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Share Campus Moments
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Have photos to add to the official gallery?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Contact the administration office to submit official campus,
                event, academic, or student activity photos.
              </p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-university-gold px-7 py-3 text-sm font-bold text-university-navy transition hover:bg-white">
              Contact Office <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
