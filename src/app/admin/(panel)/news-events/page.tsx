import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { deleteNewsEventAction, saveNewsEventAction } from "@/lib/actions";
import { getNewsEventById, getNewsEvents } from "@/lib/content";

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
      <AdminHeading title="News & Events" body="Create, edit, publish, and remove university updates." />
      <StatusNote saved={params.saved} deleted={params.deleted} />
      <section className="admin-card">
        <h2 className="text-lg font-bold text-university-navy">{editing ? "Edit Update" : "Create Update"}</h2>
        <form action={saveNewsEventAction} className="mt-5 grid gap-4">
          <input type="hidden" name="id" value={editing?._id || ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Title</span>
              <input name="title" defaultValue={editing?.title || ""} required className="field" />
            </label>
            <label>
              <span className="label">Slug</span>
              <input name="slug" defaultValue={editing?.slug || ""} placeholder="auto-generated if blank" className="field" />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Date</span>
              <input name="date" type="date" defaultValue={editing?.date || new Date().toISOString().slice(0, 10)} required className="field" />
            </label>
            <label>
              <span className="label">Category</span>
              <select name="category" defaultValue={editing?.category || "News"} required className="field">
                {editing?.category && !newsEventCategories.includes(editing.category) ? (
                  <option value={editing.category}>{editing.category}</option>
                ) : null}
                {newsEventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span className="label">Excerpt</span>
            <textarea name="excerpt" defaultValue={editing?.excerpt || ""} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Body</span>
            <textarea name="body" defaultValue={editing?.body || ""} required rows={8} className="field" />
          </label>
          <ImageField name="coverImage" label="Cover Image" image={editing?.coverImage} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input name="published" type="checkbox" defaultChecked={editing?.published ?? true} />
            Published
          </label>
          <button className="btn-primary w-fit">{editing ? "Update News/Event" : "Create News/Event"}</button>
        </form>
      </section>
      <section className="admin-card mt-6">
        <h2 className="text-lg font-bold text-university-navy">All News & Events</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id || item.slug}>
                  <td className="px-3 py-3 font-semibold text-slate-800">{item.title}</td>
                  <td className="px-3 py-3">{item.date}</td>
                  <td className="px-3 py-3">{item.category}</td>
                  <td className="px-3 py-3">{item.published ? "Published" : "Draft"}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      {item._id ? <a href={`/admin/news-events?edit=${item._id}`} className="btn-secondary">Edit</a> : null}
                      {item._id ? (
                        <form action={deleteNewsEventAction}>
                          <input type="hidden" name="id" value={item._id} />
                          <button className="btn-danger">Delete</button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
