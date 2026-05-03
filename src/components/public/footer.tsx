import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight, ExternalLink, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, Twitter, Youtube } from "lucide-react";
import { Container } from "@/components/public/container";
import type { SiteSettings } from "@/lib/types";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/about/mission-vision", label: "Mission & Vision" },
  { href: "/about/chairman-message", label: "Chairman's Message" },
  { href: "/academic", label: "Academic Programs" },
  { href: "/gallery", label: "Campus Gallery" },
];

const resourceLinks = [
  { href: "/news-events", label: "News & Events" },
  { href: "/contact", label: "Admissions" },
  { href: "/contact", label: "Student Support" },
  { href: "/contact", label: "Contact Us" },
  { href: "/admin", label: "Admin Portal" },
];

const socials = [
  { href: "#", icon: Facebook,  label: "Facebook" },
  { href: "#", icon: Twitter,   label: "Twitter / X" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Youtube,   label: "YouTube" },
  { href: "#", icon: Linkedin,  label: "LinkedIn" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-[#071829] text-white">
      {/* Gold top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />

      <Container className="grid gap-12 py-16 md:grid-cols-[1.8fr_1fr_1fr] lg:gap-16 lg:py-20">

        {/* ── Brand column ── */}
        <div>
          <Link href="/" className="flex items-center gap-4">
            {settings.logo?.url ? (
              <Image
                src={settings.logo.url}
                alt={settings.logo.altText || settings.universityName}
                width={56}
                height={56}
                className="h-14 w-14 rounded-xl object-cover"
              />
            ) : (
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-university-gold text-university-navy">
                <BookOpen size={26} />
              </span>
            )}
            <div>
              <p className="text-lg font-bold leading-tight text-white">{settings.universityName}</p>
              <p className="mt-0.5 text-sm text-white/50">{settings.tagline}</p>
            </div>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
            A government-recognised institution committed to academic excellence,
            practical knowledge, and shaping leaders for a changing world.
          </p>

          {/* Contact details */}
          <ul className="mt-7 space-y-3">
            {settings.address && (
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-university-gold" />
                {settings.address}
              </li>
            )}
            {settings.phone && (
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="shrink-0 text-university-gold" />
                <a href={`tel:${settings.phone}`} className="transition hover:text-white">{settings.phone}</a>
              </li>
            )}
            {settings.email && (
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-university-gold" />
                <a href={`mailto:${settings.email}`} className="transition hover:text-white">{settings.email}</a>
              </li>
            )}
          </ul>

          {/* Socials */}
          <div className="mt-8 flex gap-2">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/50 transition hover:border-university-gold/50 hover:bg-university-gold/10 hover:text-university-gold"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-university-gold">Quick Links</h3>
          <ul className="space-y-1">
            {quickLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
                >
                  <ChevronRight size={13} className="shrink-0 text-university-gold/40 transition duration-200 group-hover:translate-x-0.5 group-hover:text-university-gold" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Resources ── */}
        <div>
          <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-university-gold">Resources</h3>
          <ul className="space-y-1">
            {resourceLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
                >
                  <ChevronRight size={13} className="shrink-0 text-university-gold/40 transition duration-200 group-hover:translate-x-0.5 group-hover:text-university-gold" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Accreditation badge */}
          <div className="mt-7 rounded-xl border border-university-gold/20 bg-university-gold/5 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <ShieldCheck size={15} className="shrink-0 text-university-gold" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-university-gold">Accreditation</p>
            </div>
            <p className="text-xs leading-5 text-white/50">
              Government recognised &amp; accredited university offering undergraduate and postgraduate programs.
            </p>
          </div>
        </div>

      </Container>

      {/* Bottom bar */}
      <div className="border-t border-yellow-500  ">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {settings.universityName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            Designed &amp; developed by{" "}
            <a
              href="https://effytechbd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-university-gold transition hover:text-white"
            >
              Effy Tech <ExternalLink size={11} />
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
