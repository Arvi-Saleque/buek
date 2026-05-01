import { AdminHeading } from "@/components/admin/admin-heading";
import { EditableListEditor } from "@/components/admin/editable-list-editor";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveMissionVisionAction } from "@/lib/actions";
import { getAboutPage } from "@/lib/content";

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
          <h2 className="text-lg font-bold text-university-navy">Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Hero Eyebrow</span>
              <input
                name="missionHeroEyebrow"
                defaultValue={about.missionHeroEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Hero Title</span>
              <input
                name="missionHeroTitle"
                defaultValue={about.missionHeroTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Hero Body</span>
            <textarea
              name="missionHeroBody"
              defaultValue={about.missionHeroBody || ""}
              rows={3}
              className="field"
            />
          </label>
          <ImageField
            name="missionHeroImage"
            label="Hero Image"
            image={about.missionHeroImage}
          />
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Page Introduction</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Intro Eyebrow</span>
              <input
                name="missionIntroEyebrow"
                defaultValue={about.missionIntroEyebrow || ""}
                className="field"
              />
            </label>
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
            <label>
              <span className="label">Vision Card Display Title</span>
              <input
                name="missionVisionCardTitle"
                defaultValue={about.missionVisionCardTitle || ""}
                className="field"
              />
            </label>
          </div>
          <EditableListEditor
            fieldName="missionPoints"
            itemLabel="Mission Point"
            items={about.missionPoints}
            withIcon
            defaultIcon="GraduationCap"
            titlePlaceholder="Quality Higher Education"
            bodyPlaceholder="Provide modern curriculum, experienced faculty..."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Core Values Eyebrow</span>
              <input
                name="missionCoreValuesEyebrow"
                defaultValue={about.missionCoreValuesEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Core Values Title</span>
              <input
                name="missionCoreValuesTitle"
                defaultValue={about.missionCoreValuesTitle || ""}
                className="field"
              />
            </label>
          </div>
          <EditableListEditor
            fieldName="coreValues"
            itemLabel="Core Value"
            items={about.coreValues}
            withIcon
            defaultIcon="BookOpen"
            titlePlaceholder="Academic Excellence"
            bodyPlaceholder="We pursue high standards in teaching..."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Strategic Focus Eyebrow</span>
              <input
                name="missionStrategicEyebrow"
                defaultValue={about.missionStrategicEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Strategic Focus Title</span>
              <input
                name="missionStrategicTitle"
                defaultValue={about.missionStrategicTitle || ""}
                className="field"
              />
            </label>
          </div>
          <EditableListEditor
            fieldName="strategicFocus"
            itemLabel="Strategic Focus"
            items={about.strategicFocus}
            titlePlaceholder="Student-Centered Learning"
            bodyPlaceholder="Modern teaching, mentoring, advising..."
          />
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
              <span className="label">CTA Eyebrow</span>
              <input name="missionCtaEyebrow" defaultValue={about.missionCtaEyebrow || ""} className="field" />
            </label>
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
