import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveAboutAction } from "@/lib/actions";
import { getAboutPage } from "@/lib/content";

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [about, params] = await Promise.all([getAboutPage(), searchParams]);

  return (
    <>
      <AdminHeading
        title="About"
        body="Manage the main About page introduction, overview text, and supporting image."
      />
      <StatusNote saved={params.saved} />

      <form action={saveAboutAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">About Page</h2>
          <label>
            <span className="label">About Title</span>
            <input
              name="aboutTitle"
              defaultValue={about.aboutTitle}
              required
              className="field"
            />
          </label>
          <label>
            <span className="label">About Body</span>
            <textarea
              name="aboutBody"
              defaultValue={about.aboutBody}
              required
              rows={7}
              className="field"
            />
          </label>
          <ImageField name="aboutImage" label="About Image" image={about.aboutImage} />
        </section>

        <button className="btn-primary w-fit">Save About Page</button>
      </form>
    </>
  );
}
