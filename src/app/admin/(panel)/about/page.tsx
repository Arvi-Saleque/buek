import { AboutWhyCardEditor } from "@/components/admin/about-why-card-editor";
import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveAboutAction } from "@/lib/actions";
import { getAboutPage } from "@/lib/content";
import { defaultAbout } from "@/lib/defaults";
import { editableRows } from "@/lib/editable-rows";

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [about, params] = await Promise.all([getAboutPage(), searchParams]);
  const whyItems = about.aboutWhyItems?.length
    ? about.aboutWhyItems
    : defaultAbout.aboutWhyItems || [];

  return (
    <>
      <AdminHeading
        title="About"
        body="Manage every visible section on the public About page."
      />
      <StatusNote saved={params.saved} />

      <form action={saveAboutAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Hero Eyebrow</span>
              <input name="aboutHeroEyebrow" defaultValue={about.aboutHeroEyebrow || defaultAbout.aboutHeroEyebrow} className="field" />
            </label>
            <label>
              <span className="label">Hero Title</span>
              <input name="aboutHeroTitle" defaultValue={about.aboutHeroTitle || defaultAbout.aboutHeroTitle} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Hero Body</span>
            <textarea name="aboutHeroBody" defaultValue={about.aboutHeroBody || defaultAbout.aboutHeroBody} rows={3} className="field" />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Introduction</h2>
          <label>
            <span className="label">Section Eyebrow</span>
            <input name="aboutIntroEyebrow" defaultValue={about.aboutIntroEyebrow || defaultAbout.aboutIntroEyebrow} className="field" />
          </label>
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
          <label>
            <span className="label">Extra Paragraphs</span>
            <textarea name="aboutIntroExtra" defaultValue={about.aboutIntroExtra || defaultAbout.aboutIntroExtra} rows={5} className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Primary Button Label</span>
              <input name="aboutPrimaryButtonLabel" defaultValue={about.aboutPrimaryButtonLabel || defaultAbout.aboutPrimaryButtonLabel} className="field" />
            </label>
            <label>
              <span className="label">Primary Button Link</span>
              <input name="aboutPrimaryButtonHref" defaultValue={about.aboutPrimaryButtonHref || defaultAbout.aboutPrimaryButtonHref} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Label</span>
              <input name="aboutSecondaryButtonLabel" defaultValue={about.aboutSecondaryButtonLabel || defaultAbout.aboutSecondaryButtonLabel} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Link</span>
              <input name="aboutSecondaryButtonHref" defaultValue={about.aboutSecondaryButtonHref || defaultAbout.aboutSecondaryButtonHref} className="field" />
            </label>
            <label>
              <span className="label">Image Badge Eyebrow</span>
              <input name="aboutImageBadgeEyebrow" defaultValue={about.aboutImageBadgeEyebrow || defaultAbout.aboutImageBadgeEyebrow} className="field" />
            </label>
            <label>
              <span className="label">Image Badge Text</span>
              <input name="aboutImageBadgeText" defaultValue={about.aboutImageBadgeText || defaultAbout.aboutImageBadgeText} className="field" />
            </label>
          </div>
          <ImageField name="aboutImage" label="About Image" image={about.aboutImage} />
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Pillars, Stats & Journey</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutPillarsEyebrow" defaultValue={about.aboutPillarsEyebrow || defaultAbout.aboutPillarsEyebrow} placeholder="Pillars eyebrow" className="field" />
            <input name="aboutPillarsTitle" defaultValue={about.aboutPillarsTitle || defaultAbout.aboutPillarsTitle} placeholder="Pillars title" className="field" />
          </div>
          <label>
            <span className="label">Pillars</span>
            <textarea name="aboutPillars" defaultValue={editableRows(about.aboutPillars || defaultAbout.aboutPillars)} rows={5} placeholder="Title | Description" className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutStatsEyebrow" defaultValue={about.aboutStatsEyebrow || defaultAbout.aboutStatsEyebrow} placeholder="Stats eyebrow" className="field" />
            <input name="aboutStatsTitle" defaultValue={about.aboutStatsTitle || defaultAbout.aboutStatsTitle} placeholder="Stats title" className="field" />
          </div>
          <label>
            <span className="label">Stats</span>
            <textarea name="aboutStats" defaultValue={editableRows(about.aboutStats || defaultAbout.aboutStats)} rows={5} placeholder="Value | Label" className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutJourneyEyebrow" defaultValue={about.aboutJourneyEyebrow || defaultAbout.aboutJourneyEyebrow} placeholder="Journey eyebrow" className="field" />
            <input name="aboutJourneyTitle" defaultValue={about.aboutJourneyTitle || defaultAbout.aboutJourneyTitle} placeholder="Journey title" className="field" />
          </div>
          <textarea name="aboutJourneyBody" defaultValue={about.aboutJourneyBody || defaultAbout.aboutJourneyBody} rows={3} className="field" />
          <label>
            <span className="label">Journey Items</span>
            <textarea name="aboutJourneyItems" defaultValue={editableRows(about.aboutJourneyItems || defaultAbout.aboutJourneyItems)} rows={5} placeholder="Year | Description" className="field" />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Why Choose Us & Campus</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutWhyEyebrow" defaultValue={about.aboutWhyEyebrow || defaultAbout.aboutWhyEyebrow} placeholder="Why eyebrow" className="field" />
            <input name="aboutWhyTitle" defaultValue={about.aboutWhyTitle || defaultAbout.aboutWhyTitle} placeholder="Why title" className="field" />
          </div>
          <textarea name="aboutWhyBody" defaultValue={about.aboutWhyBody || defaultAbout.aboutWhyBody} rows={3} className="field" />
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-4">
              <h3 className="font-bold text-university-navy">Why Choose Us Cards</h3>
              <p className="mt-1 text-sm text-slate-600">
                Add or delete cards. Each card has one selected icon and one visible title.
              </p>
            </div>
            <AboutWhyCardEditor cards={whyItems} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutCampusEyebrow" defaultValue={about.aboutCampusEyebrow || defaultAbout.aboutCampusEyebrow} placeholder="Campus eyebrow" className="field" />
            <input name="aboutCampusTitle" defaultValue={about.aboutCampusTitle || defaultAbout.aboutCampusTitle} placeholder="Campus title" className="field" />
          </div>
          <textarea name="aboutCampusBody" defaultValue={about.aboutCampusBody || defaultAbout.aboutCampusBody} rows={3} className="field" />
          <textarea name="aboutCampusFeatures" defaultValue={(about.aboutCampusFeatures || defaultAbout.aboutCampusFeatures || []).join("\n")} rows={4} placeholder="One feature per line" className="field" />
          <div className="grid gap-4 lg:grid-cols-3">
            <ImageField name="aboutCampusMainImage" label="Campus Main Image" image={about.aboutCampusMainImage || defaultAbout.aboutCampusMainImage} />
            <ImageField name="aboutCampusTopImage" label="Campus Top Image" image={about.aboutCampusTopImage || defaultAbout.aboutCampusTopImage} />
            <ImageField name="aboutCampusBottomImage" label="Campus Bottom Image" image={about.aboutCampusBottomImage || defaultAbout.aboutCampusBottomImage} />
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Leadership Preview & CTA</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutLeadershipEyebrow" defaultValue={about.aboutLeadershipEyebrow || defaultAbout.aboutLeadershipEyebrow} placeholder="Leadership eyebrow" className="field" />
            <input name="aboutLeadershipTitle" defaultValue={about.aboutLeadershipTitle || defaultAbout.aboutLeadershipTitle} placeholder="Leadership title" className="field" />
          </div>
          <textarea name="aboutLeadershipBody" defaultValue={about.aboutLeadershipBody || defaultAbout.aboutLeadershipBody} rows={3} className="field" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutLeadershipPrimaryLabel" defaultValue={about.aboutLeadershipPrimaryLabel || defaultAbout.aboutLeadershipPrimaryLabel} placeholder="Primary label" className="field" />
            <input name="aboutLeadershipPrimaryHref" defaultValue={about.aboutLeadershipPrimaryHref || defaultAbout.aboutLeadershipPrimaryHref} placeholder="Primary link" className="field" />
            <input name="aboutLeadershipSecondaryLabel" defaultValue={about.aboutLeadershipSecondaryLabel || defaultAbout.aboutLeadershipSecondaryLabel} placeholder="Secondary label" className="field" />
            <input name="aboutLeadershipSecondaryHref" defaultValue={about.aboutLeadershipSecondaryHref || defaultAbout.aboutLeadershipSecondaryHref} placeholder="Secondary link" className="field" />
            <input name="aboutCtaEyebrow" defaultValue={about.aboutCtaEyebrow || defaultAbout.aboutCtaEyebrow} placeholder="CTA eyebrow" className="field" />
            <input name="aboutCtaTitle" defaultValue={about.aboutCtaTitle || defaultAbout.aboutCtaTitle} placeholder="CTA title" className="field" />
          </div>
          <textarea name="aboutCtaBody" defaultValue={about.aboutCtaBody || defaultAbout.aboutCtaBody} rows={3} className="field" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="aboutCtaPrimaryLabel" defaultValue={about.aboutCtaPrimaryLabel || defaultAbout.aboutCtaPrimaryLabel} placeholder="CTA primary label" className="field" />
            <input name="aboutCtaPrimaryHref" defaultValue={about.aboutCtaPrimaryHref || defaultAbout.aboutCtaPrimaryHref} placeholder="CTA primary link" className="field" />
            <input name="aboutCtaSecondaryLabel" defaultValue={about.aboutCtaSecondaryLabel || defaultAbout.aboutCtaSecondaryLabel} placeholder="CTA secondary label" className="field" />
            <input name="aboutCtaSecondaryHref" defaultValue={about.aboutCtaSecondaryHref || defaultAbout.aboutCtaSecondaryHref} placeholder="CTA secondary link" className="field" />
          </div>
          <ImageField name="aboutCtaImage" label="CTA Background Image" image={about.aboutCtaImage || defaultAbout.aboutCtaImage} />
        </section>

        <button className="btn-primary w-fit">Save About Page</button>
      </form>
    </>
  );
}
