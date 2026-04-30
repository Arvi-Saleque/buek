import { AdminHeading } from "@/components/admin/admin-heading";
import { StatusNote } from "@/components/admin/status-note";
import { saveMissionVisionAction } from "@/lib/actions";
import { getAboutPage } from "@/lib/content";
import { editableRows } from "@/lib/editable-rows";

export default async function AdminMissionVisionPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [about, params] = await Promise.all([getAboutPage(), searchParams]);

  return (
    <>
      <AdminHeading
        title="Mission & Vision"
        body="Manage the Mission & Vision page intro, mission cards, vision text, values, strategic focus, quote, and CTA."
      />
      <StatusNote saved={params.saved} />

      <form action={saveMissionVisionAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Page Introduction</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Intro Title</span>
              <input
                name="missionIntroTitle"
                defaultValue={about.missionIntroTitle || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Quote Source</span>
              <input
                name="missionQuoteSource"
                defaultValue={about.missionQuoteSource || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Intro Body</span>
            <textarea
              name="missionIntroBody"
              defaultValue={about.missionIntroBody || ""}
              rows={4}
              className="field"
            />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Mission & Vision Content</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label>
                <span className="label">Mission Title</span>
                <input
                  name="missionTitle"
                  defaultValue={about.missionTitle}
                  required
                  className="field"
                />
              </label>
              <label className="mt-4 block">
                <span className="label">Mission Body</span>
                <textarea
                  name="missionBody"
                  defaultValue={about.missionBody}
                  required
                  rows={5}
                  className="field"
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label">Vision Title</span>
                <input
                  name="visionTitle"
                  defaultValue={about.visionTitle}
                  required
                  className="field"
                />
              </label>
              <label className="mt-4 block">
                <span className="label">Vision Body</span>
                <textarea
                  name="visionBody"
                  defaultValue={about.visionBody}
                  required
                  rows={5}
                  className="field"
                />
              </label>
            </div>
          </div>
          <label>
            <span className="label">Mission Points</span>
            <textarea
              name="missionPoints"
              defaultValue={editableRows(about.missionPoints)}
              rows={7}
              placeholder="Title | Short description"
              className="field"
            />
          </label>
          <label>
            <span className="label">Core Values</span>
            <textarea
              name="coreValues"
              defaultValue={editableRows(about.coreValues)}
              rows={8}
              placeholder="Title | One-line explanation"
              className="field"
            />
          </label>
          <label>
            <span className="label">Strategic Focus</span>
            <textarea
              name="strategicFocus"
              defaultValue={editableRows(about.strategicFocus)}
              rows={5}
              placeholder="Title | Short description"
              className="field"
            />
          </label>
          <label>
            <span className="label">Institutional Quote</span>
            <textarea
              name="missionQuote"
              defaultValue={about.missionQuote || ""}
              rows={3}
              className="field"
            />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Call To Action</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">CTA Title</span>
              <input name="missionCtaTitle" defaultValue={about.missionCtaTitle || ""} className="field" />
            </label>
            <label>
              <span className="label">CTA Body</span>
              <input name="missionCtaBody" defaultValue={about.missionCtaBody || ""} className="field" />
            </label>
            <label>
              <span className="label">Primary Button Label</span>
              <input name="missionCtaPrimaryLabel" defaultValue={about.missionCtaPrimaryLabel || ""} className="field" />
            </label>
            <label>
              <span className="label">Primary Button Link</span>
              <input name="missionCtaPrimaryHref" defaultValue={about.missionCtaPrimaryHref || ""} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Label</span>
              <input name="missionCtaSecondaryLabel" defaultValue={about.missionCtaSecondaryLabel || ""} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Link</span>
              <input name="missionCtaSecondaryHref" defaultValue={about.missionCtaSecondaryHref || ""} className="field" />
            </label>
          </div>
        </section>

        <button className="btn-primary w-fit">Save Mission & Vision</button>
      </form>
    </>
  );
}
