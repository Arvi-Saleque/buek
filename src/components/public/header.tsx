"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, Mail, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/public/container";
import type { SiteSettings } from "@/lib/types";

const aboutItems = [
  { href: "/about", label: "About" },
  { href: "/about/mission-vision", label: "Mission & Vision" },
  { href: "/about/chairman-message", label: "Chairman Message" },
  { href: "/about/committee", label: "Committee" },
];

const nav = [
  { href: "/", label: "Home" },
  { href: "/academic", label: "Academic" },
  { href: "/news-events", label: "News & Event" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topIsTransparent = isHome && !scrolled;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-white/30 bg-white/75 shadow-[0_18px_40px_rgba(16,32,51,0.12)] backdrop-blur-xl"
          : topIsTransparent
            ? "border-b border-white/20 bg-transparent"
            : "border-b border-university-line bg-white/95 shadow-sm backdrop-blur",
      ].join(" ")}
    >
      <div
        className={[
          "transition-colors duration-300",
          topIsTransparent ? "bg-university-navy/28 text-white" : "bg-university-navy text-white",
        ].join(" ")}
      >
        <Container className="flex min-h-10 flex-wrap items-center justify-between gap-3 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <Phone size={15} />
              {settings.phone}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={15} />
              {settings.email}
            </span>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 font-semibold text-university-gold">
            <ShieldCheck size={15} />
            Admin Panel
          </Link>
        </Container>
      </div>
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {settings.logo?.url ? (
            <img
              src={settings.logo.url}
              alt={settings.logo.altText || settings.universityName}
              className="h-12 w-12 rounded-md object-cover"
            />
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-md bg-university-green text-white shadow-sm">
              <BookOpen size={25} />
            </span>
          )}
          <span className="min-w-0">
            <span
              className={[
                "block truncate text-lg font-bold md:text-xl",
                topIsTransparent ? "text-white" : "text-university-navy",
              ].join(" ")}
            >
              {settings.universityName}
            </span>
            <span
              className={[
                "block truncate text-sm",
                topIsTransparent ? "text-white/75" : "text-slate-600",
              ].join(" ")}
            >
              {settings.tagline}
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button
              className={[
                "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition",
                topIsTransparent
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-slate-700 hover:bg-university-mist hover:text-university-green",
              ].join(" ")}
              type="button"
            >
              About Us
              <ChevronDown size={15} className="transition group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-3 rounded-lg border border-slate-200 bg-white p-2 opacity-0 shadow-soft transition-all group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
              {aboutItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-university-mist hover:text-university-green"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "rounded-md px-3 py-2 text-sm font-semibold transition",
                topIsTransparent
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-slate-700 hover:bg-university-mist hover:text-university-green",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
        {aboutItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "shrink-0 rounded-md px-3 py-2 text-sm font-semibold",
              topIsTransparent ? "bg-white/10 text-white" : "bg-university-mist text-slate-700",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "shrink-0 rounded-md px-3 py-2 text-sm font-semibold",
              topIsTransparent ? "bg-white/10 text-white" : "bg-university-mist text-slate-700",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </Container>
    </header>
  );
}
