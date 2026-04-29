import { AdminHeading } from "@/components/admin/admin-heading";
import { StatusNote } from "@/components/admin/status-note";
import { saveAcademicAction } from "@/lib/actions";
import { getAcademicPage } from "@/lib/content";

export default async function AdminAcademicPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [academic, params] = await Promise.all([getAcademicPage(), searchParams]);
  const downloadRows = academic.downloads.length
    ? academic.downloads
    : [
        { label: "", href: "" },
        { label: "", href: "" },
      ];

  return (
    <>
      <AdminHeading title="Academic" body="Edit program overview, program list, admission text, and download links." />
      <StatusNote saved={params.saved} />
      <form action={saveAcademicAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <label>
            <span className="label">Page Title</span>
            <input name="title" defaultValue={academic.title} required className="field" />
          </label>
          <label>
            <span className="label">Overview</span>
            <textarea name="overview" defaultValue={academic.overview} required rows={5} className="field" />
          </label>
          <label>
            <span className="label">Programs, one per line</span>
            <textarea name="programs" defaultValue={academic.programs.join("\n")} rows={7} className="field" />
          </label>
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Admission</h2>
          <label>
            <span className="label">Admission Title</span>
            <input name="admissionTitle" defaultValue={academic.admissionTitle} required className="field" />
          </label>
          <label>
            <span className="label">Admission Body</span>
            <textarea name="admissionBody" defaultValue={academic.admissionBody} rows={6} className="field" />
          </label>
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Download Links</h2>
          {downloadRows.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <input name="downloadLabel" defaultValue={row.label} placeholder="Label" className="field" />
              <input name="downloadHref" defaultValue={row.href} placeholder="URL" className="field" />
            </div>
          ))}
          <div className="grid gap-3 md:grid-cols-2">
            <input name="downloadLabel" placeholder="Additional label" className="field" />
            <input name="downloadHref" placeholder="Additional URL" className="field" />
          </div>
        </section>
        <button className="btn-primary w-fit">Save Academic Content</button>
      </form>
    </>
  );
}
