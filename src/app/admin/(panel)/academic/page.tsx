import { AdminHeading } from "@/components/admin/admin-heading";
import { EditableListEditor } from "@/components/admin/editable-list-editor";
import { ImageField } from "@/components/admin/image-field";
import { StringListEditor } from "@/components/admin/string-list-editor";
import { StatusNote } from "@/components/admin/status-note";
import { saveAcademicAction } from "@/lib/actions";
import { getAcademicPage } from "@/lib/content";
import { defaultAcademic } from "@/lib/defaults";

export default async function AdminAcademicPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [academic, params] = await Promise.all([getAcademicPage(), searchParams]);
  const downloadRows = academic.downloads.length
    ? academic.downloads.map((item) => ({ title: item.label, body: item.href }))
    : [{ title: "", body: "" }];

  return (
    <>
      <AdminHeading title="Academic" body="Edit program overview, program list, admission text, and download links." />
      <StatusNote saved={params.saved} />
      <form action={saveAcademicAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <label>
            <span className="label">Hero Eyebrow</span>
            <input name="heroEyebrow" defaultValue={academic.heroEyebrow || defaultAcademic.heroEyebrow} className="field" />
          </label>
          <label>
            <span className="label">Page Title</span>
            <input name="title" defaultValue={academic.title} required className="field" />
          </label>
          <label>
            <span className="label">Overview</span>
            <textarea name="overview" defaultValue={academic.overview} required rows={5} className="field" />
          </label>
          <div>
            <span className="label">Programs</span>
            <StringListEditor
              fieldName="programs"
              itemLabel="Program"
              items={academic.programs}
              placeholder="Faculty of Engineering and Technology"
            />
          </div>
          <label>
            <span className="label">Program Card Body</span>
            <textarea name="programCardBody" defaultValue={academic.programCardBody || defaultAcademic.programCardBody} rows={3} className="field" />
          </label>
          <ImageField name="heroImage" label="Hero Image" image={academic.heroImage || defaultAcademic.heroImage} />
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
          <EditableListEditor
            fieldName="download"
            itemLabel="Download Link"
            items={downloadRows}
            titleLabel="Label"
            bodyLabel="URL"
            bodyAsInput
            titlePlaceholder="Academic Calendar"
            bodyPlaceholder="/download-url"
          />
        </section>
        <button className="btn-primary w-fit">Save Academic Content</button>
      </form>
    </>
  );
}
