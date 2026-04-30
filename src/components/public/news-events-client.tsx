"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Grid3X3,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Container } from "@/components/public/container";
import type { NewsEvent } from "@/lib/types";

type NewsEventView = NewsEvent & {
  department?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  organizer?: string;
  eventStatus?: "Upcoming" | "Ongoing" | "Completed";
  pdfUrl?: string;
  featured?: boolean;
};

const ITEMS_PER_PAGE = 6;

const CATEGORY_TABS = [
  "All",
  "News",
  "Events",
  "Notice",
  "Admission",
  "Academic",
  "Seminar",
  "Workshop",
  "Achievement",
  "Campus Life",
];

const DEPARTMENT_OPTIONS = [
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

const DATE_OPTIONS = [
  "All Time",
  "Today",
  "This Week",
  "This Month",
  "Upcoming Events",
  "Past Events",
];

function categoryLabel(category: string) {
  const normalized = category.toLowerCase();
  if (normalized === "event") return "Events";
  if (normalized === "campus") return "Campus Life";
  if (normalized === "notices") return "Notice";
  return category;
}

function categoryMatches(itemCategory: string, selected: string) {
  if (selected === "All") return true;
  return categoryLabel(itemCategory).toLowerCase() === selected.toLowerCase();
}

function getDepartment(item: NewsEventView) {
  return item.department?.trim() || "General";
}

function getEventDate(item: NewsEventView) {
  return item.eventDate || item.date;
}

function parseDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(date: string) {
  const parsed = parseDate(date);
  if (!parsed) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getYear(item: NewsEventView) {
  const parsed = parseDate(getEventDate(item));
  return parsed ? String(parsed.getFullYear()) : "";
}

function isEventLike(item: NewsEventView) {
  return ["event", "events", "seminar", "workshop", "campus", "campus life"].includes(
    item.category.toLowerCase(),
  );
}

function isNoticeLike(item: NewsEventView) {
  return ["notice", "notices", "admission", "academic"].includes(
    item.category.toLowerCase(),
  );
}

function getEventStatus(item: NewsEventView) {
  if (item.eventStatus) return item.eventStatus;
  const eventDate = parseDate(getEventDate(item));
  if (!eventDate) return "Completed";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  if (eventDate.getTime() > today.getTime()) return "Upcoming";
  if (eventDate.getTime() === today.getTime()) return "Ongoing";
  return "Completed";
}

function passesDateFilter(item: NewsEventView, selected: string) {
  if (selected === "All Time") return true;

  const date = parseDate(getEventDate(item));
  if (!date) return false;

  const today = new Date();
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  const itemDate = new Date(date);
  itemDate.setHours(0, 0, 0, 0);

  if (selected === "Today") return itemDate.getTime() === start.getTime();

  if (selected === "This Week") {
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return itemDate >= start && itemDate <= end;
  }

  if (selected === "This Month") {
    return (
      itemDate.getMonth() === start.getMonth() &&
      itemDate.getFullYear() === start.getFullYear()
    );
  }

  if (selected === "Upcoming Events") {
    return isEventLike(item) && itemDate >= start;
  }

  if (selected === "Past Events") {
    return isEventLike(item) && itemDate < start;
  }

  return true;
}

function getCategoryBadge(category: string): string {
  switch (categoryLabel(category).toLowerCase()) {
    case "news":
      return "bg-university-navy text-white";
    case "events":
      return "bg-university-gold text-university-navy";
    case "notice":
      return "bg-[#7A1E2C] text-white";
    case "admission":
      return "bg-university-green text-white";
    case "academic":
      return "bg-[#315C8D] text-white";
    case "seminar":
      return "bg-[#5A4A82] text-white";
    case "workshop":
      return "bg-[#B46A32] text-white";
    case "achievement":
      return "bg-[#8B6A1D] text-white";
    case "campus life":
      return "bg-[#22685F] text-white";
    default:
      return "bg-slate-600 text-white";
  }
}

function useYears(items: NewsEventView[]) {
  return useMemo(() => {
    const years = new Set(items.map(getYear).filter(Boolean));
    ["2026", "2025", "2024", "2023"].forEach((year) => years.add(year));
    return ["All Years", ...Array.from(years).sort((a, b) => Number(b) - Number(a))];
  }, [items]);
}

export function NewsEventsClient({ items }: { items: NewsEvent[] }) {
  const normalizedItems = items as NewsEventView[];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [year, setYear] = useState("All Years");
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const [page, setPage] = useState(1);

  const years = useYears(normalizedItems);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return normalizedItems.filter((item) => {
      const haystack = [
        item.title,
        item.excerpt,
        item.body,
        item.category,
        getDepartment(item),
        item.organizer,
        item.eventLocation,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        categoryMatches(item.category, activeCategory) &&
        (!query || haystack.includes(query)) &&
        (department === "All Departments" || getDepartment(item) === department) &&
        (year === "All Years" || getYear(item) === year) &&
        passesDateFilter(item, dateFilter)
      );
    });
  }, [activeCategory, dateFilter, department, normalizedItems, search, year]);

  const featured = useMemo(() => {
    return (
      filtered.find((item) => item.featured) ||
      filtered.find((item) => item.category.toLowerCase() === "admission") ||
      filtered.find((item) => !isNoticeLike(item)) ||
      filtered[0] ||
      null
    );
  }, [filtered]);

  const cardItems = filtered.filter(
    (item) => item.slug !== featured?.slug && !isNoticeLike(item),
  );
  const noticeItems = filtered.filter(isNoticeLike);
  const eventItems = filtered.filter(isEventLike);
  const totalPages = Math.max(1, Math.ceil(cardItems.length / ITEMS_PER_PAGE));
  const paginatedCards = cardItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setActiveCategory("All");
    setSearch("");
    setDepartment("All Departments");
    setDateFilter("All Time");
    setYear("All Years");
    setPage(1);
  };

  const updateCategory = (category: string) => {
    setActiveCategory(category);
    setPage(1);
  };

  return (
    <div className="flex flex-col bg-university-mist">
      {featured ? (
        <section className="order-2 bg-white py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                  Featured Update
                </p>
                <h2 className="mt-2 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
                  Featured News / Event
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-university-text">
                The most important announcement is highlighted first for quick
                access by students, guardians, faculty, and visitors.
              </p>
            </div>

            <Link
              href={`/news-events/${featured.slug}`}
              className="group grid overflow-hidden rounded-lg border border-university-line bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(16,32,51,0.15)] lg:grid-cols-[1.08fr_0.92fr]"
            >
              <div className="relative min-h-[280px] overflow-hidden bg-university-mist sm:min-h-[360px] lg:min-h-[440px]">
                {featured.coverImage?.url ? (
                  <Image
                    src={featured.coverImage.url}
                    alt={featured.coverImage.altText || featured.title}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full min-h-[280px] place-items-center bg-university-mist">
                    <CalendarRange size={58} className="text-university-navy/20" />
                  </div>
                )}
                <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-university-navy shadow-sm backdrop-blur">
                  Featured News
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(featured.category)}`}
                  >
                    {categoryLabel(featured.category)}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-university-text">
                    <CalendarDays size={15} className="text-university-gold" />
                    {formatDate(getEventDate(featured))}
                  </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-university-navy transition group-hover:text-university-royal sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-university-text">
                  {featured.excerpt}
                </p>
                <div className="mt-7 grid gap-3 text-sm text-university-text sm:grid-cols-2">
                  <span className="flex items-center gap-2">
                    <Building2 size={16} className="text-university-gold" />
                    {getDepartment(featured)}
                  </span>
                  {isEventLike(featured) ? (
                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-university-gold" />
                      {featured.eventLocation || "Campus Auditorium"}
                    </span>
                  ) : null}
                </div>
                <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-university-navy px-6 py-3 text-sm font-bold text-white transition group-hover:bg-university-gold group-hover:text-university-navy">
                  Read More <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      <section className="order-1 border-y border-university-line bg-white/95 shadow-sm backdrop-blur mt-10">
        <Container>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto border-b border-university-line py-3">
            {CATEGORY_TABS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => updateCategory(category)}
                className={[
                  "shrink-0 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition",
                  activeCategory === category
                    ? "bg-university-navy text-white shadow-sm"
                    : "bg-university-mist text-university-text hover:bg-university-gold hover:text-university-navy",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-3 py-4 lg:grid-cols-[1.4fr_0.8fr_0.75fr_0.65fr_auto]">
            <label className="relative">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-university-text"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search news, events, notices..."
                className="h-11 w-full rounded-md border border-university-line bg-university-mist pl-10 pr-10 text-sm text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-university-text hover:text-university-navy"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              ) : null}
            </label>

            <select
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value);
                setPage(1);
              }}
              className="h-11 rounded-md border border-university-line bg-university-mist px-3 text-sm font-semibold text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20"
            >
              {DEPARTMENT_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(event) => {
                setDateFilter(event.target.value);
                setPage(1);
              }}
              className="h-11 rounded-md border border-university-line bg-university-mist px-3 text-sm font-semibold text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20"
            >
              {DATE_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(event) => {
                setYear(event.target.value);
                setPage(1);
              }}
              className="h-11 rounded-md border border-university-line bg-university-mist px-3 text-sm font-semibold text-university-navy outline-none transition focus:border-university-gold focus:bg-white focus:ring-2 focus:ring-university-gold/20"
            >
              {years.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={[
                  "inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition",
                  view === "grid"
                    ? "border-university-navy bg-university-navy text-white"
                    : "border-university-line bg-white text-university-navy hover:border-university-gold",
                ].join(" ")}
              >
                <Grid3X3 size={16} /> Grid
              </button>
              <button
                type="button"
                onClick={() => setView("calendar")}
                className={[
                  "inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-bold transition",
                  view === "calendar"
                    ? "border-university-navy bg-university-navy text-white"
                    : "border-university-line bg-white text-university-navy hover:border-university-gold",
                ].join(" ")}
              >
                <CalendarRange size={16} /> Calendar
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-university-line py-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-university-text">
              <SlidersHorizontal size={16} className="text-university-gold" />
              Showing {filtered.length} update{filtered.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-bold text-university-gold transition hover:text-university-navy"
            >
              Reset filters
            </button>
          </div>
        </Container>
      </section>

      {filtered.length === 0 ? (
        <section className="order-3 py-20">
          <Container>
            <div className="rounded-lg border border-university-line bg-white p-10 text-center shadow-sm">
              <CalendarDays size={44} className="mx-auto text-university-navy/20" />
              <h2 className="mt-4 text-2xl font-bold text-university-navy">
                No updates found
              </h2>
              <p className="mt-2 text-sm text-university-text">
                Try changing the category, department, date, year, or search term.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-md bg-university-gold px-5 py-3 text-sm font-bold text-university-navy"
              >
                Clear all filters
              </button>
            </div>
          </Container>
        </section>
      ) : null}

      {view === "grid" && cardItems.length > 0 ? (
        <section className="order-3 py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                  Latest Updates
                </p>
                <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
                  Latest News & Events
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-university-text">
                Browse institutional news, academic updates, seminars, workshops,
                achievements, and campus events.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedCards.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news-events/${item.slug}`}
                  className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-university-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative h-56 overflow-hidden bg-university-mist">
                    {item.coverImage?.url ? (
                      <Image
                        src={item.coverImage.url}
                        alt={item.coverImage.altText || item.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <CalendarDays size={36} className="text-university-navy/20" />
                      </div>
                    )}
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${getCategoryBadge(item.category)}`}
                    >
                      {categoryLabel(item.category)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-university-text">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} className="text-university-gold" />
                        {formatDate(getEventDate(item))}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building2 size={13} className="text-university-gold" />
                        {getDepartment(item)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-university-navy transition group-hover:text-university-royal">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-university-text">
                      {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 border-t border-university-line pt-5 text-sm font-bold text-university-gold transition group-hover:gap-3">
                      Read More <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="grid h-10 w-10 place-items-center rounded-md border border-university-line bg-white text-university-navy transition hover:border-university-gold disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={17} />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={[
                        "h-10 min-w-10 rounded-md border px-3 text-sm font-bold transition",
                        page === pageNumber
                          ? "border-university-gold bg-university-gold text-university-navy"
                          : "border-university-line bg-white text-university-navy hover:border-university-gold",
                      ].join(" ")}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={page === totalPages}
                  className="grid h-10 w-10 place-items-center rounded-md border border-university-line bg-white text-university-navy transition hover:border-university-gold disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {view === "calendar" ? (
        <section className="order-3 py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Calendar View
              </p>
              <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
                Event Schedule
              </h2>
            </div>
            <div className="grid gap-4">
              {(eventItems.length ? eventItems : filtered).map((item) => (
                <Link
                  key={item.slug}
                  href={`/news-events/${item.slug}`}
                  className="group grid gap-5 rounded-lg border border-university-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft md:grid-cols-[110px_1fr_auto]"
                >
                  <div className="grid h-24 w-24 place-items-center rounded-md bg-university-navy text-center text-white">
                    <span>
                      <span className="block text-3xl font-black text-university-gold">
                        {formatDate(getEventDate(item)).split(" ")[0]}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">
                        {formatDate(getEventDate(item)).split(" ")[1] || "Date"}
                      </span>
                    </span>
                  </div>
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(item.category)}`}
                      >
                        {categoryLabel(item.category)}
                      </span>
                      <span className="rounded-full bg-university-mist px-3 py-1 text-xs font-bold text-university-navy">
                        {getEventStatus(item)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-university-navy transition group-hover:text-university-royal">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-university-text">
                      {item.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-university-text">
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={13} className="text-university-gold" />
                        {item.eventTime || "Time to be announced"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-university-gold" />
                        {item.eventLocation || "Campus"}
                      </span>
                    </div>
                  </div>
                  <span className="self-center text-sm font-bold text-university-gold">
                    View Details
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {noticeItems.length > 0 ? (
        <section className="order-3 bg-white py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                  Official Notices
                </p>
                <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
                  Official Notice Board
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-university-text">
                Important academic and admission notices are presented in a
                compact official format for quick access.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-university-line bg-white shadow-sm">
              <div className="hidden grid-cols-[130px_1fr_140px_130px] bg-university-navy px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-university-gold md:grid">
                <span>Date</span>
                <span>Title</span>
                <span>Type</span>
                <span>Action</span>
              </div>
              <div className="divide-y divide-university-line">
                {noticeItems.map((item) => (
                  <article
                    key={item.slug}
                    className="grid gap-4 px-5 py-5 transition hover:bg-university-mist md:grid-cols-[130px_1fr_140px_130px] md:items-center"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-university-text">
                      <CalendarDays size={14} className="text-university-gold" />
                      {formatDate(getEventDate(item))}
                    </span>
                    <div>
                      <h3 className="font-bold text-university-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-university-text">
                        {item.excerpt}
                      </p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${getCategoryBadge(item.category)}`}
                    >
                      {categoryLabel(item.category)}
                    </span>
                    <Link
                      href={item.pdfUrl || `/news-events/${item.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-md border border-university-line px-4 py-2 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
                    >
                      <FileText size={14} />
                      {item.pdfUrl ? "View PDF" : "View"}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {eventItems.length > 0 ? (
        <section className="order-3 py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Upcoming Events
              </p>
              <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
                Event Highlights
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {eventItems.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  href={`/news-events/${item.slug}`}
                  className="group flex gap-4 rounded-lg border border-university-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-md bg-university-navy text-center text-white">
                    <span>
                      <span className="block text-2xl font-black text-university-gold">
                        {formatDate(getEventDate(item)).split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em]">
                        {formatDate(getEventDate(item)).split(" ")[1] || "Date"}
                      </span>
                    </span>
                  </span>
                  <span>
                    <span className="text-xs font-bold text-university-gold">
                      {getEventStatus(item)}
                    </span>
                    <span className="mt-1 block font-bold leading-6 text-university-navy transition group-hover:text-university-royal">
                      {item.title}
                    </span>
                    <span className="mt-2 flex items-center gap-1.5 text-xs text-university-text">
                      <MapPin size={12} className="text-university-gold" />
                      {item.eventLocation || "Campus"}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="order-3 bg-university-navy py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Need Assistance?
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Have questions? Contact the administration office.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                Get official clarification about notices, admission circulars,
                event schedules, and academic announcements.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-university-gold px-7 py-3 text-sm font-bold text-university-navy transition hover:bg-white"
            >
              Contact Administration <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
