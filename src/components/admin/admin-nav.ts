import {
  GalleryHorizontal,
  GraduationCap,
  Home,
  LayoutDashboard,
  MessageSquareQuote,
  Newspaper,
  Phone,
  ServerCog,
  Settings,
  Target,
  University,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const adminNav: AdminNavItem[] = [
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
