import Link from "next/link";
import { GalleryHorizontal, Mail, Newspaper, Users } from "lucide-react";
import { AdminHeading } from "@/components/admin/admin-heading";
import {
  getCommitteeMembers,
  getContactMessages,
  getGalleryItems,
  getNewsEvents,
} from "@/lib/content";

export default async function AdminDashboardPage() {
  const [news, gallery, committee, messages] = await Promise.all([
    getNewsEvents(false),
    getGalleryItems(false),
    getCommitteeMembers(false),
    getContactMessages(),
  ]);

  const stats = [
    { label: "News & Events", value: news.length, icon: Newspaper, href: "/admin/news-events" },
    { label: "Gallery Items", value: gallery.length, icon: GalleryHorizontal, href: "/admin/gallery" },
    { label: "Committee Members", value: committee.length, icon: Users, href: "/admin/committee#members" },
    { label: "Contact Messages", value: messages.length, icon: Mail, href: "/admin/contact#messages" },
  ];

  return (
    <>
      <AdminHeading
        title="Dashboard"
        body="Quick overview of editable content and recent contact submissions."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link key={item.label} href={item.href} className="admin-card transition hover:-translate-y-1 hover:shadow-soft">
            <item.icon className="text-university-green" size={28} />
            <p className="mt-5 text-3xl font-bold text-university-navy">{item.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">{item.label}</p>
          </Link>
        ))}
      </div>
      <section className="admin-card mt-6">
        <h2 className="text-lg font-bold text-university-navy">Next Content Steps</h2>
        <div className="mt-4 grid gap-3 text-sm text-slate-700">
          <p>1. Add final university logo, contact details, and SEO defaults from Settings.</p>
          <p>2. Replace placeholder homepage/about/academic content with approved copy.</p>
          <p>3. Connect MongoDB and Cloudinary credentials in `.env.local` before production use.</p>
        </div>
      </section>
    </>
  );
}
