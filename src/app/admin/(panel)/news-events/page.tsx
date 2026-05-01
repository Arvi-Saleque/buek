import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Edit3,
  FileText,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminHeading } from "@/components/admin/admin-heading";
import { ConfirmDangerButton } from "@/components/admin/confirm-danger-button";
import { ImageField } from "@/components/admin/image-field";
import { StringListEditor } from "@/components/admin/string-list-editor";
import { StatusNote } from "@/components/admin/status-note";
import {
  deleteAllNewsEventsAction,
  deleteNewsEventAction,
  saveNewsEventAction,
} from "@/lib/actions";
import { getNewsEventById, getNewsEvents } from "@/lib/content";
import type { NewsEvent } from "@/lib/types";

const newsEventCategories = [
  "News",
  "Events",
  "Notice",
  "Admission",
  "Academic",
  "Seminar",
  "Workshop",
  "Achievement",
  "Campus Life",
  "Research",
  "Examination",
  "Result",
  "Scholarship",
  "Career",
  "Alumni",
  "Sports",
  "Cultural",
  "Club",
  "Conference",
  "Convocation",
  "Orientation",
  "Training",
  "Holiday",
  "Tender",
  "Press Release",
];

const departments = [
  "General",
  "CSE",
  "EEE",
  "Civil",
  "Mechanical",
  "BBA",
  "English",
  "Law",
  "Architecture",
  "Textile",
  "Pharmacy",
  "Public Health",
  "Economics",
  "Administration",
  "Library",
  "Exam Office",
  "Admission Office",
];

const eventStatuses: NonNullable<NewsEvent["eventStatus"]>[] = [
  "Upcoming",
  "Ongoing",
  "Completed",
];

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function categoryClass(category: string) {
  switch (category.toLowerCase()) {
    case "events":
    case "event":
      return "bg-university-gold text-university-navy";
    case "notice":
      return "bg-red-700 text-white";
    case "admission":
      return "bg-university-green text-white";
    case "academic":
      return "bg-blue-700 text-white";
    case "seminar":
      return "bg-purple-700 text-white";
    case "workshop":
      return "bg-orange-700 text-white";
    case "achievement":
      return "bg-amber-700 text-white";
    case "campus life":
      return "bg-teal-700 text-white";
    default:
      return "bg-university-navy text-white";
  }
}

function optionList(options: string[], current?: string) {
  const hasCurrent = current && options.includes(current);
  return (
    <>
      {current && !hasCurrent ? <option value={current}>{current}</option> : null}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  );
}

export default async function AdminNewsEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; edit?: string }>;
}) {
  const params = await searchParams;
  const [items, editing] = await Promise.all([
    getNewsEvents(false),
    params.edit ? getNewsEventById(params.edit) : Promise.resolve(null),
  ]);

  return (
    <>
      <AdminHeading
        title="News & Events"
        body="Create full news, notices, events, seminars, workshops, and admission updates for the public website."
      />
      <StatusNote saved={params.saved} deleted={params.deleted} />

      <section className="admin-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-university-gold">
              {editing ? "Edit Content" : "Create Content"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-university-navy">
              {editing ? editing.title : "Add News / Event / Notice"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              These fields control the listing card, filters, detail page, event
              info panel, SEO text, and public publish status.
            </p>
          </div>
          {editing ? (
            <Link href="/admin/news-events" className="btn-secondary">
              <Plus size={16} /> Create New
            </Link>
          ) : null}
        </div>

        <form action={saveNewsEventAction} className="mt-6 grid gap-6">
          <input type="hidden" name="id" value={editing?._id || ""} />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-bold text-university-navy">Main Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label>
                <span className="label">Title</span>
                <input
                  name="title"
                  defaultValue={editing?.title || ""}
                  required
                  className="field bg-white"
                />
              </label>
              <label>
                <span className="label">Slug</span>
                <input
                  name="slug"
                  defaultValue={editing?.slug || ""}
                  placeholder="auto-generated if blank"
                  className="field bg-white"
                />
              </label>
              <label>
                <span className="label">Publish Date</span>
                <input
                  name="date"
                  type="date"
                  defaultValue={editing?.date || new Date().toISOString().slice(0, 10)}
                  required
                  className="field bg-white"
                />
              </label>
              <label>
                <span className="label">Category</span>
                <select
                  name="category"
                  defaultValue={editing?.category || "News"}
                  required
                  className="field bg-white"
                >
                  {optionList(newsEventCategories, editing?.category)}
                </select>
              </label>
              <label>
                <span className="label">Department / Office</span>
                <select
                  name="department"
                  defaultValue={editing?.department || "General"}
                  className="field bg-white"
                >
                  {optionList(departments, editing?.department)}
                </select>
              </label>
              <div>
                <span className="label">Tags</span>
                <StringListEditor
                  fieldName="tags"
                  itemLabel="Tag"
                  items={editing?.tags?.length ? editing.tags : [""]}
                  placeholder="Admission"
                />
              </div>
            </div>
            <label className="mt-4 block">
              <span className="label">Short Description / Excerpt</span>
              <textarea
                name="excerpt"
                defaultValue={editing?.excerpt || ""}
                rows={3}
                required
                className="field bg-white"
              />
            </label>
            <label className="mt-4 block">
              <span className="label">Full Description / Body</span>
              <textarea
                name="body"
                defaultValue={editing?.body || ""}
                required
                rows={9}
                className="field bg-white"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <ImageField name="coverImage" label="Cover Image" image={editing?.coverImage} />

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-bold text-university-navy">Event Details</h3>
              <p className="mt-1 text-xs text-slate-500">
                Used on event detail cards. Leave blank for normal news/notices.
              </p>
              <div className="mt-4 grid gap-4">
                <label>
                  <span className="label">Event Date</span>
                  <input
                    name="eventDate"
                    type="date"
                    defaultValue={editing?.eventDate || ""}
                    className="field bg-white"
                  />
                </label>
                <label>
                  <span className="label">Event Time</span>
                  <input
                    name="eventTime"
                    defaultValue={editing?.eventTime || ""}
                    placeholder="10:00 AM - 2:00 PM"
                    className="field bg-white"
                  />
                </label>
                <label>
                  <span className="label">Venue / Location</span>
                  <input
                    name="eventLocation"
                    defaultValue={editing?.eventLocation || ""}
                    placeholder="Central Auditorium"
                    className="field bg-white"
                  />
                </label>
                <label>
                  <span className="label">Organizer</span>
                  <input
                    name="organizer"
                    defaultValue={editing?.organizer || ""}
                    placeholder="Department of CSE"
                    className="field bg-white"
                  />
                </label>
                <label>
                  <span className="label">Event Status</span>
                  <select
                    name="eventStatus"
                    defaultValue={editing?.eventStatus || "Upcoming"}
                    className="field bg-white"
                  >
                    {eventStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-bold text-university-navy">Links, PDF & SEO</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label>
                <span className="label">Registration Link</span>
                <input
                  name="registrationLink"
                  defaultValue={editing?.registrationLink || ""}
                  placeholder="https://..."
                  className="field bg-white"
                />
              </label>
              <label>
                <span className="label">PDF / Attachment URL</span>
                <input
                  name="pdfUrl"
                  defaultValue={editing?.pdfUrl || ""}
                  placeholder="https://... or #"
                  className="field bg-white"
                />
              </label>
              <label>
                <span className="label">SEO Title</span>
                <input
                  name="seoTitle"
                  defaultValue={editing?.seoTitle || ""}
                  className="field bg-white"
                />
              </label>
              <label>
                <span className="label">SEO Description</span>
                <input
                  name="seoDescription"
                  defaultValue={editing?.seoDescription || ""}
                  className="field bg-white"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input name="published" type="checkbox" defaultChecked={editing?.published ?? true} />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input name="featured" type="checkbox" defaultChecked={editing?.featured ?? false} />
                Featured update
              </label>
            </div>
            <button className="btn-primary">
              {editing ? "Update News/Event" : "Create News/Event"}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-card mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-university-gold">
              Frontend Preview
            </p>
            <h2 className="mt-1 text-xl font-bold text-university-navy">
              All News & Events
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              These cards use the same content fields that appear on the public
              News & Events page.
            </p>
          </div>
          {items.length ? (
            <form action={deleteAllNewsEventsAction}>
              <ConfirmDangerButton
                firstMessage="Delete all news, events, notices, and related update records?"
                secondMessage="This cannot be undone. Are you absolutely sure?"
              >
                <Trash2 size={15} /> Delete All
              </ConfirmDangerButton>
            </form>
          ) : null}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item._id || item.slug}
              className="flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-48 bg-slate-100">
                {item.coverImage?.url ? (
                  <Image
                    src={item.coverImage.url}
                    alt={item.coverImage.altText || item.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-slate-300">
                    <CalendarDays size={34} />
                  </div>
                )}
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${categoryClass(item.category)}`}
                >
                  {item.category}
                </span>
                {item.featured ? (
                  <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-university-navy shadow-sm">
                    Featured
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-university-gold" />
                    {formatDate(item.eventDate || item.date)}
                  </span>
                  <span>{item.department || "General"}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-university-navy">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                  {item.excerpt}
                </p>
                <div className="mt-4 grid gap-2 text-xs text-slate-500">
                  {item.eventTime ? (
                    <span className="flex items-center gap-2">
                      <CalendarDays size={13} className="text-university-gold" />
                      {item.eventTime}
                    </span>
                  ) : null}
                  {item.eventLocation ? (
                    <span className="flex items-center gap-2">
                      <MapPin size={13} className="text-university-gold" />
                      {item.eventLocation}
                    </span>
                  ) : null}
                  {item.pdfUrl ? (
                    <span className="flex items-center gap-2">
                      <FileText size={13} className="text-university-gold" />
                      PDF attached
                    </span>
                  ) : null}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                  <Link
                    href={`/news-events/${item.slug}`}
                    target="_blank"
                    className="btn-secondary"
                  >
                    View
                  </Link>
                  {item._id ? (
                    <Link href={`/admin/news-events?edit=${item._id}`} className="btn-secondary">
                      <Edit3 size={15} /> Edit
                    </Link>
                  ) : null}
                  {item._id ? (
                    <form action={deleteNewsEventAction}>
                      <input type="hidden" name="id" value={item._id} />
                      <button className="btn-danger">
                        <Trash2 size={15} /> Delete
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
