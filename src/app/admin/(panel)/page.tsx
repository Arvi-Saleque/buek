import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  GalleryHorizontal,
  Inbox,
  Mail,
  MessageSquareText,
  Newspaper,
  Phone,
  Reply,
  Users,
} from "lucide-react";
import { AdminHeading } from "@/components/admin/admin-heading";
import {
  getCommitteeMembers,
  getContactMessages,
  getGalleryItems,
  getNewsEvents,
} from "@/lib/content";
import type { ContactMessage } from "@/lib/types";

function formatMessageDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function replyHref(message: ContactMessage) {
  const subject = encodeURIComponent(`Re: ${message.subject}`);
  const body = encodeURIComponent(
    `Dear ${message.name},\n\nThank you for contacting BUEK regarding ${message.inquiryType || "your inquiry"}.\n\n`,
  );

  return `mailto:${message.email}?subject=${subject}&body=${body}`;
}

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
  const recentMessages = messages.slice(0, 6);

  return (
    <>
      <AdminHeading
        title="Dashboard"
        body="Quick overview of editable content and recent contact submissions."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group rounded-lg border border-university-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-university-gold/60 hover:shadow-soft"
          >
            <span className="grid h-12 w-12 place-items-center rounded-md bg-university-navy text-university-gold transition group-hover:bg-university-gold group-hover:text-university-navy">
              <item.icon size={24} />
            </span>
            <p className="mt-5 text-3xl font-bold text-university-navy">{item.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">{item.label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-6 overflow-hidden rounded-lg border border-university-line bg-white shadow-sm">
        <div className="relative overflow-hidden bg-university-navy px-6 py-6 text-white">
          <div className="absolute right-6 top-5 text-white/[0.08]">
            <Inbox size={110} />
          </div>
          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
                Contact Message Center
              </p>
              <h2 className="mt-2 text-2xl font-bold">Recent University Inquiries</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Messages submitted from the public Contact Us form appear here so the admin can review and reply quickly.
              </p>
            </div>
            <Link
              href="/admin/contact#messages"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:border-university-gold hover:text-university-gold"
            >
              View All Messages <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {recentMessages.length ? (
          <div className="grid gap-4 p-5 lg:grid-cols-2">
            {recentMessages.map((message) => (
              <article
                key={`${message.email}-${message.createdAt}`}
                className="rounded-lg border border-university-line bg-university-mist p-5 transition hover:-translate-y-0.5 hover:border-university-gold/70 hover:bg-white hover:shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-university-navy text-university-gold">
                      <MessageSquareText size={21} />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-university-navy">{message.name}</h3>
                      <a
                        href={`mailto:${message.email}`}
                        className="mt-1 block text-sm font-semibold text-university-green transition hover:text-university-gold"
                      >
                        {message.email}
                      </a>
                    </div>
                  </div>
                  <span className="rounded-full bg-university-gold/15 px-3 py-1 text-xs font-bold text-university-navy">
                    {message.inquiryType || "General"}
                  </span>
                </div>
                <div className="mt-5 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <span className="flex items-center gap-2">
                    <Clock3 size={15} className="text-university-gold" />
                    {formatMessageDate(message.createdAt)}
                  </span>
                  {message.phone ? (
                    <span className="flex items-center gap-2">
                      <Phone size={15} className="text-university-gold" />
                      {message.phone}
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-4 text-lg font-bold leading-snug text-university-navy">
                  {message.subject}
                </h4>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                  {message.message}
                </p>
                <a
                  href={replyHref(message)}
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-university-gold px-4 py-2 text-sm font-bold text-university-navy transition hover:bg-university-goldDark"
                >
                  <Reply size={16} />
                  Reply by Email
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-university-gold/15 text-university-gold">
              <Inbox size={28} />
            </span>
            <h3 className="mt-4 text-lg font-bold text-university-navy">No contact messages yet</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
              New submissions from the public Contact Us page will appear here automatically after MongoDB is connected.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
