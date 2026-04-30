"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  X,
} from "lucide-react";
import { Container } from "@/components/public/container";
import type { NewsEvent } from "@/lib/types";

const ITEMS_PER_PAGE = 6;

const PRESET_CATEGORIES = [
  "All",
  "News",
  "Event",
  "Notice",
  "Admission",
  "Academic",
  "Campus",
  "Seminar",
];

function getCategoryBadge(cat: string): string {
  switch (cat.toLowerCase()) {
    case "news":
      return "bg-university-navy text-white";
    case "event":
    case "events":
      return "bg-university-gold text-university-navy";
    case "notice":
      return "bg-red-700 text-white";
    case "admission":
      return "bg-university-green text-white";
    case "academic":
      return "bg-blue-700 text-white";
    case "campus":
      return "bg-teal-700 text-white";
    case "seminar":
      return "bg-purple-700 text-white";
    case "achievement":
      return "bg-amber-600 text-white";
    default:
      return "bg-slate-600 text-white";
  }
}

interface Props {
  items: NewsEvent[];
}

export function NewsEventsClient({ items }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  // Derive tabs: presets that appear in data + any extra categories
  const categories = useMemo(() => {
    const inData = new Set(items.map((i) => i.category));
    const extras = Array.from(inData).filter(
      (c) => !PRESET_CATEGORIES.includes(c)
    );
    return PRESET_CATEGORIES.filter(
      (c) => c === "All" || inData.has(c)
    ).concat(extras);
  }, [items]);

  // Apply filters
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchCat =
        activeCategory === "All" || item.category === activeCategory;
      const matchSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [items, activeCategory, search]);

  const isNoticeTab = activeCategory.toLowerCase() === "notice";

  // Cards: non-notice items (skip when on Notice tab)
  const cardItems = isNoticeTab
    ? []
    : filtered.filter((i) => i.category.toLowerCase() !== "notice");

  // Notices: shown as a list
  const noticeItems =
    activeCategory === "All"
      ? filtered.filter((i) => i.category.toLowerCase() === "notice")
      : isNoticeTab
      ? filtered
      : [];

  // Featured = first card item
  const featured = cardItems[0] ?? null;
  const gridItems = cardItems.slice(1);
  const totalPages = Math.ceil(gridItems.length / ITEMS_PER_PAGE);
  const paginatedGrid = gridItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };
  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const noResults = filtered.length === 0;

  return (
    <div className="bg-university-mist">
      {/* ── Featured card ── */}
      {featured && (
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Featured Update
            </p>
            <Link
              href={`/news-events/${featured.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-university-line bg-white shadow-soft transition hover:shadow-[0_24px_60px_rgba(16,32,51,0.14)] lg:grid-cols-[1.15fr_0.85fr]"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-university-mist sm:h-80 lg:h-auto lg:min-h-[380px]">
                {featured.coverImage?.url ? (
                  <Image
                    src={featured.coverImage.url}
                    alt={featured.coverImage.altText || featured.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-university-mist">
                    <CalendarDays
                      size={52}
                      className="text-university-navy/20"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
              {/* Content */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(featured.category)}`}
                  >
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-university-text">
                    <CalendarDays size={12} />
                    {featured.date}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-snug text-university-navy transition group-hover:text-university-royal sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-base leading-7 text-university-text">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-university-gold transition group-hover:gap-3">
                  Read full story <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* ── Filter bar ── */}
      <section className="border-b border-university-line bg-white shadow-sm">
        <Container className="py-0">
          {/* Category tabs */}
          <div className="flex gap-0.5 overflow-x-auto border-b border-university-line">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`shrink-0 border-b-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wide transition ${
                  activeCategory === cat
                    ? "border-university-gold text-university-navy"
                    : "border-transparent text-university-text hover:text-university-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search row */}
          <div className="flex items-center gap-3 py-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-university-text"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search news, events, notices…"
                className="h-10 w-full rounded-lg border border-university-line bg-university-mist pl-9 pr-9 text-sm text-university-navy placeholder:text-university-text/60 focus:border-university-gold focus:outline-none focus:ring-1 focus:ring-university-gold"
              />
              {search && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-university-text hover:text-university-navy"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <p className="shrink-0 text-xs text-university-text">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>
          </div>
        </Container>
      </section>

      {/* ── No results ── */}
      {noResults && (
        <section className="py-24">
          <Container>
            <div className="text-center">
              <CalendarDays
                size={48}
                className="mx-auto mb-4 text-university-navy/20"
              />
              <p className="text-lg font-bold text-university-navy">
                No results found
              </p>
              <p className="mt-2 text-sm text-university-text">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  handleCategory("All");
                  handleSearch("");
                }}
                className="mt-5 text-sm font-bold text-university-gold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          </Container>
        </section>
      )}

      {/* ── Card grid ── */}
      {gridItems.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedGrid.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news-events/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative h-52 w-full shrink-0 overflow-hidden bg-university-mist">
                    {item.coverImage?.url ? (
                      <Image
                        src={item.coverImage.url}
                        alt={item.coverImage.altText || item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <CalendarDays
                          size={32}
                          className="text-university-navy/20"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getCategoryBadge(item.category)}`}
                      >
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-university-text">
                        <CalendarDays size={10} />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-university-navy transition group-hover:text-university-royal">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-university-text">
                      {item.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-university-gold transition group-hover:gap-2.5">
                      Read more <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-university-line bg-white text-university-navy transition hover:border-university-gold hover:text-university-gold disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`h-9 min-w-[36px] rounded-lg border px-3 text-xs font-bold transition ${
                        page === n
                          ? "border-university-gold bg-university-gold text-university-navy"
                          : "border-university-line bg-white text-university-navy hover:border-university-gold"
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-university-line bg-white text-university-navy transition hover:border-university-gold hover:text-university-gold disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* ── Official Notices list ── */}
      {noticeItems.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container>
            <div className="mb-8">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                {isNoticeTab ? "Notices" : "Official Notices"}
              </p>
              <h2 className="text-2xl font-bold text-university-navy sm:text-3xl">
                {isNoticeTab ? "All Notices" : "Official Notice Board"}
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-university-line">
              <table className="w-full">
                <thead>
                  <tr className="bg-university-navy text-left">
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-university-gold">
                      #
                    </th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-university-gold">
                      Date
                    </th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-university-gold">
                      Title
                    </th>
                    <th className="hidden px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-university-gold sm:table-cell">
                      Category
                    </th>
                    <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-university-gold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-university-line bg-white">
                  {noticeItems.map((item, i) => (
                    <tr
                      key={item.slug}
                      className="transition hover:bg-university-mist"
                    >
                      <td className="px-5 py-4 text-xs font-black text-university-gold">
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-xs text-university-text">
                          <CalendarDays size={11} className="shrink-0" />
                          {item.date}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-university-navy">
                          {item.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-university-text">
                          {item.excerpt}
                        </p>
                      </td>
                      <td className="hidden px-5 py-4 sm:table-cell">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getCategoryBadge(item.category)}`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/news-events/${item.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-university-line px-3 py-1.5 text-xs font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
                        >
                          <FileText size={12} /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-university-navy py-14 sm:py-16">
        <Container className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
            Stay Connected
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Have questions about an announcement?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/65">
            Reach out to the administration office for any clarification about
            notices, events, or academic updates.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-university-gold px-7 py-3.5 text-sm font-bold text-university-navy transition hover:bg-white"
            >
              Contact Administration <ArrowRight size={16} />
            </Link>
            <Link
              href="/academic"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Explore Programs
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
