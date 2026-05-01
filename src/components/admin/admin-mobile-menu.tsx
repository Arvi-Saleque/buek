"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { adminNav } from "@/components/admin/admin-nav";

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminMobileMenu({ universityName }: { universityName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 items-center gap-2 rounded-md border border-university-line bg-white px-3 text-sm font-bold text-university-navy transition hover:border-university-gold lg:hidden"
        aria-expanded={open}
        aria-controls="admin-mobile-menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
        <span className="hidden sm:inline">Menu</span>
      </button>

      {open ? (
        <div id="admin-mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]"
            aria-label="Close admin menu"
            onClick={() => setOpen(false)}
          />
          <div className="relative mx-4 mt-3 max-h-[calc(100vh-5.5rem)] max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl sm:mx-6">
            <div className="flex items-center gap-3 bg-university-navy px-4 py-4 text-white">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-university-gold text-university-navy">
                <BookOpen size={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{universityName}</p>
                <p className="text-xs text-white/65">Admin Panel</p>
              </div>
            </div>
            <nav className="grid max-h-[calc(100vh-12rem)] gap-2 overflow-y-auto p-3 sm:grid-cols-2 sm:p-4">
              {adminNav.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex min-w-0 items-center gap-3 rounded-md border px-3 py-3 text-sm font-semibold transition",
                      active
                        ? "border-university-gold bg-university-gold/15 text-university-navy shadow-sm"
                        : "border-slate-100 bg-slate-50 text-slate-700 hover:border-university-gold hover:bg-university-gold/10 hover:text-university-navy",
                    ].join(" ")}
                  >
                    <item.icon
                      size={18}
                      className={active ? "shrink-0 text-university-navy" : "shrink-0 text-university-gold"}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
