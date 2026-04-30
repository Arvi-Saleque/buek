import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Edit3,
  Images,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminHeading } from "@/components/admin/admin-heading";
import { ConfirmDangerButton } from "@/components/admin/confirm-danger-button";
import { ImageField } from "@/components/admin/image-field";
import { MultiMediaPicker } from "@/components/admin/media-library-picker";
import { StatusNote } from "@/components/admin/status-note";
import {
  deleteAllGalleryItemsAction,
  deleteGalleryItemAction,
  saveGalleryItemAction,
} from "@/lib/actions";
import { getGalleryItem, getGalleryItems } from "@/lib/content";

const galleryCategories = [
  "Campus",
  "Events",
  "Academic",
  "Seminar",
  "Workshop",
  "Sports",
  "Cultural",
  "Convocation",
  "Clubs",
  "Student Life",
  "Laboratory",
  "Library",
  "Official Visit",
  "Achievement",
  "Orientation",
  "Industrial Visit",
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
  "Administration",
];

const years = ["2026", "2025", "2024", "2023", "2022", "2021"];

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function optionList(options: string[], current?: string) {
  return (
    <>
      {current && !options.includes(current) ? <option value={current}>{current}</option> : null}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  );
}

function coverFor(item: Awaited<ReturnType<typeof getGalleryItems>>[number]) {
  return item.coverImage || item.image || item.images?.[0];
}

function photoCount(item: Awaited<ReturnType<typeof getGalleryItems>>[number]) {
  return item.images?.length || (item.image ? 1 : 0);
}

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; edit?: string }>;
}) {
  const params = await searchParams;
  const [items, editing] = await Promise.all([
    getGalleryItems(false),
    params.edit ? getGalleryItem(params.edit) : Promise.resolve(null),
  ]);
  const editingSlug = editing?.slug || (editing?.title ? slugify(editing.title) : "");

  return (
    <>
      <AdminHeading
        title="Gallery"
        body="Create album-based gallery content, upload multiple photos, and manage public campus moments."
      />
      <StatusNote saved={params.saved} deleted={params.deleted} />

      <section className="admin-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-university-gold">
              {editing ? "Edit Album" : "Create Album"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-university-navy">
              {editing ? editing.title : "Add Gallery Album"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Albums control the public Gallery page, album detail page, filters,
              cover image, and lightbox photo carousel.
            </p>
          </div>
          {editing ? (
            <Link href="/admin/gallery" className="btn-secondary">
              <Plus size={16} /> Create New
            </Link>
          ) : null}
        </div>

        <form action={saveGalleryItemAction} className="mt-6 grid gap-6">
          <input type="hidden" name="id" value={editing?._id || ""} />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-bold text-university-navy">Album Information</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <label>
                <span className="label">Album Title</span>
                <input name="title" defaultValue={editing?.title || ""} required className="field bg-white" />
              </label>
              <label>
                <span className="label">Slug</span>
                <input name="slug" defaultValue={editingSlug} placeholder="auto-generated if blank" className="field bg-white" />
              </label>
              <label>
                <span className="label">Category</span>
                <select name="category" defaultValue={editing?.category || "Campus"} required className="field bg-white">
                  {optionList(galleryCategories, editing?.category)}
                </select>
              </label>
              <label>
                <span className="label">Department</span>
                <select name="department" defaultValue={editing?.department || "General"} className="field bg-white">
                  {optionList(departments, editing?.department)}
                </select>
              </label>
              <label>
                <span className="label">Year</span>
                <select name="year" defaultValue={editing?.year || new Date().getFullYear()} className="field bg-white">
                  {optionList(years, editing?.year)}
                </select>
              </label>
              <label>
                <span className="label">Event Date</span>
                <input name="eventDate" type="date" defaultValue={editing?.eventDate || ""} className="field bg-white" />
              </label>
              <label>
                <span className="label">Sort Order</span>
                <input name="order" type="number" defaultValue={editing?.order || 1} className="field bg-white" />
              </label>
              <label>
                <span className="label">Media Type</span>
                <select name="mediaType" defaultValue={editing?.mediaType || "Photos"} className="field bg-white">
                  <option>Photos</option>
                  <option>Videos</option>
                </select>
              </label>
              <label>
                <span className="label">Video URL</span>
                <input name="videoUrl" defaultValue={editing?.videoUrl || ""} placeholder="Optional YouTube/video link" className="field bg-white" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="label">Short Description</span>
              <textarea name="description" defaultValue={editing?.description || ""} rows={4} className="field bg-white" />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <ImageField name="coverImage" label="Album Cover Image" image={editing?.coverImage || editing?.image} />

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-bold text-university-navy">Upload Album Photos</h3>
              <p className="mt-1 text-xs text-slate-500">
                Upload multiple photos at once. They will be stored in Cloudinary
                and shown in the album lightbox.
              </p>
              <MultiMediaPicker
                inputName="newImages"
                titleName="newImagesTitle"
                captionName="newImagesCaption"
              />
            </div>
          </div>

          {editing?.images?.length ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-bold text-university-navy">Existing Album Photos</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {editing.images.map((image, index) => (
                  <div key={`${image.url}-${index}`} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="relative h-36 overflow-hidden rounded-md bg-slate-100">
                      <Image
                        src={image.url}
                        alt={image.altText || image.title || editing.title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <input type="hidden" name="galleryImageUrl" value={image.url} />
                    <input type="hidden" name="galleryImageSecureUrl" value={image.secureUrl || image.url} />
                    <input type="hidden" name="galleryImagePublicId" value={image.publicId || ""} />
                    <input type="hidden" name="galleryImageWidth" value={image.width || ""} />
                    <input type="hidden" name="galleryImageHeight" value={image.height || ""} />
                    <input type="hidden" name="galleryImageFormat" value={image.format || ""} />
                    <input type="hidden" name="galleryImageUploadedAt" value={image.uploadedAt || ""} />
                    <div className="mt-3 grid gap-2">
                      <input name="galleryImageTitle" defaultValue={image.title || ""} placeholder="Image title" className="field bg-white" />
                      <input name="galleryImageCaption" defaultValue={image.caption || ""} placeholder="Caption" className="field bg-white" />
                      <input name="galleryImageAltText" defaultValue={image.altText || ""} placeholder="Alt text" className="field bg-white" />
                      <input name="galleryImageOrder" type="number" defaultValue={image.order || index + 1} className="field bg-white" />
                      <label className="flex items-center gap-2 text-sm font-semibold text-red-600">
                        <input name="galleryImageRemove" type="checkbox" value={image.url} />
                        Remove this photo
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-bold text-university-navy">SEO</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label>
                <span className="label">SEO Title</span>
                <input name="seoTitle" defaultValue={editing?.seoTitle || ""} className="field bg-white" />
              </label>
              <label>
                <span className="label">SEO Description</span>
                <input name="seoDescription" defaultValue={editing?.seoDescription || ""} className="field bg-white" />
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
                Featured album
              </label>
            </div>
            <button className="btn-primary">
              {editing ? "Update Gallery Album" : "Create Gallery Album"}
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
              Gallery Albums
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cards below reflect how albums are presented on the public gallery.
            </p>
          </div>
          {items.length ? (
            <form action={deleteAllGalleryItemsAction}>
              <ConfirmDangerButton
                firstMessage="Delete all gallery albums and photo metadata?"
                secondMessage="This cannot be undone. Are you absolutely sure?"
              >
                <Trash2 size={15} /> Delete All
              </ConfirmDangerButton>
            </form>
          ) : null}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const cover = coverFor(item);
            const slug = item.slug || slugify(item.title);

            return (
              <article key={item._id || item.title} className="flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="relative h-48 bg-slate-100">
                  {cover?.url ? (
                    <Image
                      src={cover.url}
                      alt={cover.altText || item.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-slate-300">
                      <Images size={34} />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-university-navy px-3 py-1 text-xs font-bold text-white">
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
                      {item.eventDate || "No date"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-university-gold" />
                      {item.department || "General"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-university-navy">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                    {item.description || "No description added yet."}
                  </p>
                  <p className="mt-3 text-sm font-bold text-university-gold">
                    {photoCount(item)} Photos - {item.published ? "Published" : "Draft"}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                    <Link href={`/gallery/${slug}`} target="_blank" className="btn-secondary">
                      View
                    </Link>
                    {item._id ? (
                      <Link href={`/admin/gallery?edit=${item._id}`} className="btn-secondary">
                        <Edit3 size={15} /> Edit
                      </Link>
                    ) : null}
                    {item._id ? (
                      <form action={deleteGalleryItemAction}>
                        <input type="hidden" name="id" value={item._id} />
                        <button className="btn-danger">
                          <Trash2 size={15} /> Delete
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
