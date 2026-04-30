import Link from "next/link";
import {
  BookOpen,
  GalleryHorizontal,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Phone,
  ServerCog,
  Settings,
  Target,
  University,
  Users,
} from "lucide-react";
import { logoutAction } from "@/lib/actions";
import type { SiteSettings } from "@/lib/types";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/about", label: "About", icon: University },
  { href: "/admin/mission-vision", label: "Mission & Vision", icon: Target },
  { href: "/admin/chairman-message", label: "Chairman Message", icon: MessageSquareQuote },
  { href: "/admin/committee", label: "Committee", icon: Users },
  { href: "/admin/academic", label: "Academic", icon: GraduationCap },
  { href: "/admin/news-events", label: "News & Events", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/admin/contact", label: "Contact", icon: Phone },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/diagnostics", label: "Diagnostics", icon: ServerCog },
];

export function AdminShell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
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
          {nav.map((item) => (
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
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold text-university-green">Content Management</p>
              <p className="text-xs text-slate-500">Structured editor for the university site</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="btn-secondary hidden sm:inline-flex">
                View Site
              </Link>
              <form action={logoutAction}>
                <button className="btn-secondary">
                  <LogOut size={17} />
                  Logout
                </button>
              </form>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
