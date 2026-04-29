import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveSettingsAction } from "@/lib/actions";
import { getSiteSettings } from "@/lib/content";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, params] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <>
      <AdminHeading title="Site Settings" body="Edit global identity, contact, social links, and SEO defaults." />
      <StatusNote saved={params.saved} />
      <form action={saveSettingsAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Identity</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">University Name</span>
              <input name="universityName" defaultValue={settings.universityName} required className="field" />
            </label>
            <label>
              <span className="label">Tagline</span>
              <input name="tagline" defaultValue={settings.tagline} className="field" />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ImageField name="logo" label="Logo" image={settings.logo} />
            <ImageField name="favicon" label="Favicon" image={settings.favicon} />
          </div>
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Contact</h2>
          <label>
            <span className="label">Address</span>
            <input name="address" defaultValue={settings.address} required className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Phone</span>
              <input name="phone" defaultValue={settings.phone} required className="field" />
            </label>
            <label>
              <span className="label">Email</span>
              <input name="email" type="email" defaultValue={settings.email} required className="field" />
            </label>
          </div>
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Social Links</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input name="facebook" defaultValue={settings.facebook || ""} placeholder="Facebook URL" className="field" />
            <input name="youtube" defaultValue={settings.youtube || ""} placeholder="YouTube URL" className="field" />
            <input name="linkedin" defaultValue={settings.linkedin || ""} placeholder="LinkedIn URL" className="field" />
          </div>
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">SEO Defaults</h2>
          <label>
            <span className="label">SEO Title</span>
            <input name="seoTitle" defaultValue={settings.seoTitle} required className="field" />
          </label>
          <label>
            <span className="label">SEO Description</span>
            <textarea name="seoDescription" defaultValue={settings.seoDescription} rows={4} className="field" />
          </label>
        </section>
        <button className="btn-primary w-fit">Save Settings</button>
      </form>
    </>
  );
}
