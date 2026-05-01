import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveChairmanMessageAction } from "@/lib/actions";
import { getAboutPage } from "@/lib/content";
import { editableRows } from "@/lib/editable-rows";

export default async function AdminChairmanMessagePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [about, params] = await Promise.all([getAboutPage(), searchParams]);

  return (
    <>
      <AdminHeading
        title="Chairman Message"
        body="Manage the chairman profile, official message, leadership commitments, priorities, signature, and related links."
      />
      <StatusNote saved={params.saved} />

      <form action={saveChairmanMessageAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Hero Eyebrow</span>
              <input
                name="chairmanHeroEyebrow"
                defaultValue={about.chairmanHeroEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Hero Title</span>
              <input
                name="chairmanHeroTitle"
                defaultValue={about.chairmanHeroTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Hero Body</span>
            <textarea
              name="chairmanHeroBody"
              defaultValue={about.chairmanHeroBody || ""}
              rows={3}
              className="field"
            />
          </label>
          <ImageField
            name="chairmanHeroImage"
            label="Hero Image"
            image={about.chairmanHeroImage}
          />
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Chairman Profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Profile Eyebrow</span>
              <input
                name="chairmanProfileEyebrow"
                defaultValue={about.chairmanProfileEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Chairman Name</span>
              <input
                name="chairmanName"
                defaultValue={about.chairmanName}
                required
                className="field"
              />
            </label>
            <label>
              <span className="label">Chairman Role</span>
              <input
                name="chairmanRole"
                defaultValue={about.chairmanRole}
                required
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Short Leadership Quote</span>
            <textarea
              name="chairmanQuote"
              defaultValue={about.chairmanQuote || ""}
              rows={3}
              className="field"
            />
          </label>
          <label>
            <span className="label">Profile Intro</span>
            <textarea
              name="chairmanIntro"
              defaultValue={about.chairmanIntro || ""}
              rows={3}
              className="field"
            />
          </label>
          <ImageField
            name="chairmanPhoto"
            label="Chairman Photo"
            image={about.chairmanPhoto}
          />
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Official Message</h2>
          <label>
            <span className="label">Message Eyebrow</span>
            <input
              name="chairmanMessageEyebrow"
              defaultValue={about.chairmanMessageEyebrow || ""}
              className="field"
            />
          </label>
          <label>
            <span className="label">Full Official Message</span>
            <textarea
              name="chairmanMessage"
              defaultValue={about.chairmanMessage}
              required
              rows={10}
              className="field"
            />
          </label>
          <label>
            <span className="label">Closing Note</span>
            <input
              name="chairmanClosingNote"
              defaultValue={about.chairmanClosingNote || ""}
              className="field"
            />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Supporting Sections</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Commitments Eyebrow</span>
              <input
                name="chairmanCommitmentsEyebrow"
                defaultValue={about.chairmanCommitmentsEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Commitments Title</span>
              <input
                name="chairmanCommitmentsTitle"
                defaultValue={about.chairmanCommitmentsTitle || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Priorities Eyebrow</span>
              <input
                name="chairmanPrioritiesEyebrow"
                defaultValue={about.chairmanPrioritiesEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Priorities Title</span>
              <input
                name="chairmanPrioritiesTitle"
                defaultValue={about.chairmanPrioritiesTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Priorities Body</span>
            <textarea
              name="chairmanPrioritiesBody"
              defaultValue={about.chairmanPrioritiesBody || ""}
              rows={3}
              className="field"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Leadership Commitments</span>
              <textarea
                name="chairmanCommitments"
                defaultValue={editableRows(about.chairmanCommitments)}
                rows={6}
                placeholder="Title | Short description"
                className="field"
              />
            </label>
            <label>
              <span className="label">Priorities for the Future</span>
              <textarea
                name="chairmanPriorities"
                defaultValue={editableRows(about.chairmanPriorities)}
                rows={6}
                placeholder="Title | Short description"
                className="field"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Related Links Eyebrow</span>
              <input
                name="chairmanRelatedEyebrow"
                defaultValue={about.chairmanRelatedEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Related Links Title</span>
              <input
                name="chairmanRelatedTitle"
                defaultValue={about.chairmanRelatedTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Related Links</span>
            <textarea
              name="chairmanRelatedLinks"
              defaultValue={editableRows(about.chairmanRelatedLinks)}
              rows={4}
              placeholder="Label | /page-url"
              className="field"
            />
          </label>
        </section>

        <button className="btn-primary w-fit">Save Chairman Message</button>
      </form>
    </>
  );
}
