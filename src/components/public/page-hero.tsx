import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/public/container";

type Breadcrumb = {
  label: string;
  href?: string;
};

export function PageHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs: Breadcrumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-university-navy py-20 text-white sm:py-24 lg:py-28">
      {image ? (
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.24]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-university-navy via-university-navy/90 to-university-royal/70" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
      <Container className="relative">
        <div className="max-w-4xl">
          <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/75">
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 ? <ChevronRight size={14} className="text-white/45" /> : null}
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-university-gold">
                    {item.label}
                  </Link>
                ) : (
                  <span className="line-clamp-1 max-w-[280px] text-university-gold">
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
            {eyebrow}
          </p>
          <div className="mt-4 h-1 w-20 rounded-full bg-university-gold" />
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {body ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              {body}
            </p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
