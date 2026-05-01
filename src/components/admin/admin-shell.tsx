import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { AdminMobileMenu } from "@/components/admin/admin-mobile-menu";
import { adminNav } from "@/components/admin/admin-nav";
import { logoutAction } from "@/lib/actions";
import type { SiteSettings } from "@/lib/types";

export function AdminShell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-university-navy text-white lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-university-gold text-university-navy">
            <BookOpen size={22} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">{settings.universityName}</p>
            <p className="text-sm text-white/60">Admin Panel</p>
          </div>
        </div>
        <nav className="grid gap-1 p-4">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <AdminMobileMenu universityName={settings.universityName} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-university-green">
                  Content Management
                </p>
                <p className="hidden truncate text-xs text-slate-500 sm:block">
                  Structured editor for the university site
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/"
                className="btn-secondary h-10 w-10 px-0 sm:w-auto sm:px-4"
                aria-label="View public site"
              >
                <ExternalLink size={17} />
                <span className="hidden sm:inline">View Site</span>
              </Link>
              <form action={logoutAction}>
                <button className="btn-secondary h-10 w-10 px-0 sm:w-auto sm:px-4" aria-label="Logout">
                  <LogOut size={17} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
