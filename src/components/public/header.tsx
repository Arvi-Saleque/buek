"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, Mail, Phone, ShieldCheck, X } from "lucide-react";
import { Container } from "@/components/public/container";
import type { SiteSettings } from "@/lib/types";

const aboutItems = [
  { href: "/about", label: "About" },
  { href: "/about/mission-vision", label: "Mission & Vision" },
  { href: "/about/chairman-message", label: "Chairman Message" },
  { href: "/about/committee", label: "Committee" },
];

const navAfterAbout = [
  { href: "/academic", label: "Academic" },
  { href: "/news-events", label: "News & Event" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const mobileNavItems = [
  { href: "/", label: "Home" },
  ...navAfterAbout,
];

export function Header({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const isHome = pathname === "/";
  const aboutActive = pathname.startsWith("/about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setAboutExpanded(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const topIsTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled || menuOpen
            ? "border-b border-white/30 bg-white/95 shadow-[0_18px_40px_rgba(16,32,51,0.12)] backdrop-blur-xl"
            : topIsTransparent
              ? "border-b border-white/20 bg-transparent"
              : "border-b border-university-line bg-white/95 shadow-sm backdrop-blur",
        ].join(" ")}
      >
        {/* Top info bar */}
        <div
          className={[
            "hidden transition-colors duration-300 sm:block",
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

        {/* Main nav bar */}
        <Container className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20 sm:gap-4 sm:py-3">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            {settings.logo?.url ? (
              <Image
                src={settings.logo.url}
                alt={settings.logo.altText || settings.universityName}
                width={48}
                height={48}
                className="h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12"
              />
            ) : (
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-university-navy text-university-gold shadow-sm sm:h-12 sm:w-12">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            )}
            <span className="min-w-0">
              <span
                className={[
                  "block truncate text-base font-bold leading-tight sm:text-lg md:text-xl",
                  topIsTransparent ? "text-white" : "text-university-navy",
                ].join(" ")}
              >
                {settings.universityName}
              </span>
              <span
                className={[
                  "block truncate text-xs sm:text-sm",
                  topIsTransparent ? "text-white/75" : "text-slate-600",
                ].join(" ")}
              >
                {settings.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className={[
                "relative rounded-md px-3 py-2 text-sm font-semibold transition after:absolute after:bottom-0 after:left-3 after:h-0.5 after:rounded-full after:bg-university-gold after:transition-all",
                pathname === "/" ? "after:w-[calc(100%-1.5rem)]" : "after:w-0",
                topIsTransparent
                  ? "text-white/80 hover:bg-white/10 hover:text-white"
                  : "text-ink hover:bg-university-mist hover:text-university-navy",
              ].join(" ")}
            >
              Home
            </Link>
            <div className="group relative">
              <button
                className={[
                  "relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition after:absolute after:bottom-0 after:left-3 after:h-0.5 after:rounded-full after:bg-university-gold after:transition-all",
                  aboutActive ? "after:w-[calc(100%-1.5rem)]" : "after:w-0",
                  topIsTransparent
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-ink hover:bg-university-mist hover:text-university-navy",
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
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-university-mist hover:text-university-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {navAfterAbout.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative rounded-md px-3 py-2 text-sm font-semibold transition after:absolute after:bottom-0 after:left-3 after:h-0.5 after:rounded-full after:bg-university-gold after:transition-all",
                  pathname === item.href ? "after:w-[calc(100%-1.5rem)]" : "after:w-0",
                  topIsTransparent
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-ink hover:bg-university-mist hover:text-university-navy",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button */}
          <button
            className="relative z-50 flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg transition hover:bg-university-mist lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            {/* Bar 1 */}
            <span
              className={[
                "absolute block h-[2.5px] rounded-full bg-university-navy transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                menuOpen
                  ? "w-5 translate-y-0 rotate-45"
                  : topIsTransparent
                    ? "w-6 -translate-y-[7px] bg-white"
                    : "w-6 -translate-y-[7px]",
              ].join(" ")}
            />
            {/* Bar 2 */}
            <span
              className={[
                "absolute block h-[2.5px] rounded-full bg-university-navy transition-all duration-200",
                menuOpen
                  ? "w-0 opacity-0"
                  : topIsTransparent
                    ? "w-4 bg-white opacity-100"
                    : "w-4 opacity-100",
              ].join(" ")}
            />
            {/* Bar 3 */}
            <span
              className={[
                "absolute block h-[2.5px] rounded-full bg-university-navy transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                menuOpen
                  ? "w-5 translate-y-0 -rotate-45"
                  : topIsTransparent
                    ? "w-6 translate-y-[7px] bg-white"
                    : "w-6 translate-y-[7px]",
              ].join(" ")}
            />
          </button>
        </Container>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div
        className={[
          "fixed inset-0 z-30 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className={[
            "absolute inset-0 bg-university-navy/60 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel from right */}
        <aside
          className={[
            "absolute right-0 top-0 flex h-full w-[82vw] max-w-[360px] flex-col bg-white shadow-panel transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          {/* Panel header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5 sm:h-20">
            <span className="text-xs font-bold uppercase tracking-widest text-university-navy/40">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-university-mist hover:text-university-navy"
            >
              <X size={18} />
            </button>
          </div>

          {/* Gold accent line */}
          <div className="h-1 w-full shrink-0 bg-gradient-to-r from-university-gold via-university-goldDark to-university-gold/20" />

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-4 py-5">
            {/* Home */}
            <Link
              href="/"
              style={menuOpen ? { animationDelay: "80ms" } : {}}
              className={[
                "mb-1 flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition",
                pathname === "/" ? "bg-university-navy text-white" : "text-ink hover:bg-university-mist hover:text-university-navy",
                menuOpen ? "animate-slideInRight opacity-0" : "opacity-0",
              ].join(" ")}
            >
              Home
            </Link>

            {/* About Us accordion */}
            <div className="mb-1">
              <button
                type="button"
                onClick={() => setAboutExpanded((v) => !v)}
                style={menuOpen ? { animationDelay: "140ms" } : {}}
                className={[
                  "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition",
                  aboutActive ? "bg-university-navy text-white" : "text-ink hover:bg-university-mist hover:text-university-navy",
                  menuOpen ? "animate-slideInRight opacity-0" : "opacity-0",
                ].join(" ")}
              >
                About Us
                <ChevronDown
                  size={16}
                  className={["transition-transform duration-300", aboutExpanded ? "rotate-180" : ""].join(" ")}
                />
              </button>

              {/* Accordion sub-items */}
              <div
                className={[
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  aboutExpanded ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <div className="ml-3 mt-1 border-l-2 border-university-gold/30 pl-3">
                  {aboutItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={[
                        "block rounded-lg px-3 py-2.5 text-sm transition",
                        pathname === sub.href
                          ? "font-semibold text-university-navy"
                          : "font-medium text-slate-500 hover:bg-university-mist hover:text-university-navy",
                      ].join(" ")}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Other nav items */}
            {mobileNavItems.slice(1).map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={menuOpen ? { animationDelay: `${200 + i * 60}ms` } : {}}
                className={[
                  "mb-1 flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition",
                  pathname === item.href ? "bg-university-navy text-white" : "text-ink hover:bg-university-mist hover:text-university-navy",
                  menuOpen ? "animate-slideInRight opacity-0" : "opacity-0",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}

            {/* Admin link */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <Link
                href="/admin"
                style={menuOpen ? { animationDelay: "520ms" } : {}}
                className={[
                  "flex items-center gap-3 rounded-xl bg-university-navy px-4 py-3.5 text-sm font-semibold text-university-gold transition hover:bg-university-royal",
                  menuOpen ? "animate-slideInRight opacity-0" : "opacity-0",
                ].join(" ")}
              >
                <ShieldCheck size={16} />
                Admin Panel
              </Link>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
}
