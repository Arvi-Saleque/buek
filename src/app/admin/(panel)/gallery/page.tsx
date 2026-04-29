import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { deleteGalleryItemAction, saveGalleryItemAction } from "@/lib/actions";
import { getGalleryItem, getGalleryItems } from "@/lib/content";

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

  return (
    <>
      <AdminHeading title="Gallery" body="Upload and organize public campus gallery photos." />
      <StatusNote saved={params.saved} deleted={params.deleted} />
      <section className="admin-card">
        <h2 className="text-lg font-bold text-university-navy">{editing ? "Edit Gallery Item" : "Add Gallery Item"}</h2>
        <form action={saveGalleryItemAction} className="mt-5 grid gap-4">
          <input type="hidden" name="id" value={editing?._id || ""} />
          <div className="grid gap-4 md:grid-cols-3">
            <label>
              <span className="label">Title</span>
              <input name="title" defaultValue={editing?.title || ""} required className="field" />
            </label>
            <label>
              <span className="label">Category</span>
              <input name="category" defaultValue={editing?.category || "Campus"} required className="field" />
            </label>
            <label>
              <span className="label">Order</span>
              <input name="order" type="number" defaultValue={editing?.order || 1} className="field" />
            </label>
          </div>
          <ImageField name="image" label="Gallery Image" image={editing?.image} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input name="published" type="checkbox" defaultChecked={editing?.published ?? true} />
            Published
          </label>
          <button className="btn-primary w-fit">{editing ? "Update Gallery Item" : "Add Gallery Item"}</button>
        </form>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item._id || item.title} className="admin-card">
            {item.image?.url ? <img src={item.image.url} alt={item.image.altText || item.title} className="h-48 w-full rounded-md object-cover" /> : null}
            <h2 className="mt-4 font-bold text-university-navy">{item.title}</h2>
            <p className="text-sm text-slate-600">{item.category} · Order {item.order} · {item.published ? "Published" : "Draft"}</p>
            <div className="mt-4 flex gap-2">
              {item._id ? <a href={`/admin/gallery?edit=${item._id}`} className="btn-secondary">Edit</a> : null}
              {item._id ? (
                <form action={deleteGalleryItemAction}>
                  <input type="hidden" name="id" value={item._id} />
                  <button className="btn-danger">Delete</button>
                </form>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
