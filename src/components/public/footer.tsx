import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/public/container";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-20 bg-university-navy text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-university-gold text-university-navy">
              <BookOpen size={23} />
            </span>
            <div>
              <p className="font-bold">{settings.universityName}</p>
              <p className="text-sm text-white/70">{settings.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">
            A professional university platform for academics, institutional updates,
            student information, and community engagement.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-university-gold">Quick Links</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <Link href="/about">About Us</Link>
            <Link href="/academic">Academic</Link>
            <Link href="/news-events">News & Event</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-university-gold">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/75">
            <span className="flex gap-2">
              <MapPin size={17} className="mt-0.5 shrink-0" />
              {settings.address}
            </span>
            <span className="flex gap-2">
              <Phone size={17} />
              {settings.phone}
            </span>
            <span className="flex gap-2">
              <Mail size={17} />
              {settings.email}
            </span>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {settings.universityName}. All rights reserved.
      </div>
    </footer>
  );
}
