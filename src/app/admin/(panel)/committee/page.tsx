import Image from "next/image";
import {
  deleteCommitteeMemberAction,
  saveCommitteeMemberAction,
  saveCommitteePageAction,
} from "@/lib/actions";
import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import {
  getAboutPage,
  getCommitteeMember,
  getCommitteeMembers,
} from "@/lib/content";
import { editableRows } from "@/lib/editable-rows";

export default async function AdminCommitteePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; editCommittee?: string }>;
}) {
  const params = await searchParams;
  const [about, members, editing] = await Promise.all([
    getAboutPage(),
    getCommitteeMembers(false),
    params.editCommittee
      ? getCommitteeMember(params.editCommittee)
      : Promise.resolve(null),
  ]);

  return (
    <>
      <AdminHeading
        title="Academic Committee"
        body="Manage the committee page content, leadership board section, and individual committee members."
      />
      <StatusNote saved={params.saved} deleted={params.deleted} />

      <form action={saveCommitteePageAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Hero</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Hero Eyebrow</span>
              <input
                name="committeeHeroEyebrow"
                defaultValue={about.committeeHeroEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Hero Title</span>
              <input
                name="committeeHeroTitle"
                defaultValue={about.committeeHeroTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Hero Subtitle</span>
            <textarea
              name="committeeSubtitle"
              defaultValue={about.committeeSubtitle || ""}
              rows={3}
              className="field"
            />
          </label>
          <ImageField
            name="committeeHeroImage"
            label="Hero Image"
            image={about.committeeHeroImage}
          />
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Committee Page</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Intro Eyebrow</span>
              <input
                name="committeeIntroEyebrow"
                defaultValue={about.committeeIntroEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Intro Title</span>
              <input
                name="committeeIntroTitle"
                defaultValue={about.committeeIntroTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Short Introduction</span>
            <textarea
              name="committeeIntro"
              defaultValue={about.committeeIntro || ""}
              rows={4}
              className="field"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Responsibilities Eyebrow</span>
              <input
                name="committeeResponsibilitiesEyebrow"
                defaultValue={about.committeeResponsibilitiesEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Responsibilities Title</span>
              <input
                name="committeeResponsibilitiesTitle"
                defaultValue={about.committeeResponsibilitiesTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Committee Responsibilities</span>
            <textarea
              name="committeeResponsibilities"
              defaultValue={editableRows(about.committeeResponsibilities)}
              rows={6}
              placeholder="Title | Short description"
              className="field"
            />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Leadership Board Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Section Eyebrow</span>
              <input
                name="committeeLeadershipEyebrow"
                defaultValue={about.committeeLeadershipEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Section Title</span>
              <input
                name="committeeLeadershipTitle"
                defaultValue={about.committeeLeadershipTitle || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Section Body</span>
            <textarea
              name="committeeLeadershipBody"
              defaultValue={about.committeeLeadershipBody || ""}
              rows={3}
              className="field"
            />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Meeting, Documents & CTA</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Meeting Section Title</span>
              <input
                name="committeeMeetingTitle"
                defaultValue={about.committeeMeetingTitle || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Meeting Frequency</span>
              <input
                name="committeeMeetingFrequency"
                defaultValue={about.committeeMeetingFrequency || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Academic Office</span>
              <input
                name="committeeMeetingOffice"
                defaultValue={about.committeeMeetingOffice || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Academic Office Email</span>
              <input
                name="committeeMeetingEmail"
                defaultValue={about.committeeMeetingEmail || ""}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Meeting Section Body</span>
            <textarea
              name="committeeMeetingBody"
              defaultValue={about.committeeMeetingBody || ""}
              rows={3}
              className="field"
            />
          </label>
          <label>
            <span className="label">Related Documents</span>
            <input
              name="committeeDocumentsTitle"
              defaultValue={about.committeeDocumentsTitle || ""}
              placeholder="Related Documents"
              className="field mb-3"
            />
            <textarea
              name="committeeDocuments"
              defaultValue={editableRows(about.committeeDocuments)}
              rows={4}
              placeholder="Document label | /download-url"
              className="field"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">CTA Eyebrow</span>
              <input
                name="committeeCtaEyebrow"
                defaultValue={about.committeeCtaEyebrow || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">CTA Title</span>
              <input
                name="committeeCtaTitle"
                defaultValue={about.committeeCtaTitle || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">CTA Body</span>
              <input
                name="committeeCtaBody"
                defaultValue={about.committeeCtaBody || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">CTA Button Label</span>
              <input
                name="committeeCtaButtonLabel"
                defaultValue={about.committeeCtaButtonLabel || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">CTA Button Link</span>
              <input
                name="committeeCtaButtonHref"
                defaultValue={about.committeeCtaButtonHref || ""}
                className="field"
              />
            </label>
          </div>
        </section>

        <button className="btn-primary w-fit">Save Committee Page</button>
      </form>

      <section id="members" className="admin-card mt-8">
        <h2 className="text-lg font-bold text-university-navy">Committee Members</h2>
        <form action={saveCommitteeMemberAction} className="mt-5 grid gap-4">
          <input type="hidden" name="id" value={editing?._id || ""} />
          <div className="grid gap-4 md:grid-cols-3">
            <label>
              <span className="label">Name</span>
              <input
                name="name"
                defaultValue={editing?.name || ""}
                required
                className="field"
              />
            </label>
            <label>
              <span className="label">Designation</span>
              <input
                name="role"
                defaultValue={editing?.role || ""}
                required
                className="field"
              />
            </label>
            <label>
              <span className="label">Committee Role</span>
              <input
                name="committeeRole"
                defaultValue={editing?.committeeRole || "Member"}
                className="field"
              />
            </label>
            <label>
              <span className="label">Department</span>
              <input
                name="department"
                defaultValue={editing?.department || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Email</span>
              <input
                name="email"
                type="email"
                defaultValue={editing?.email || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Office Phone</span>
              <input
                name="officePhone"
                defaultValue={editing?.officePhone || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Profile Link</span>
              <input
                name="profileUrl"
                defaultValue={editing?.profileUrl || ""}
                className="field"
              />
            </label>
            <label>
              <span className="label">Order</span>
              <input
                name="order"
                type="number"
                defaultValue={editing?.order || 1}
                className="field"
              />
            </label>
          </div>
          <label>
            <span className="label">Bio</span>
            <textarea
              name="bio"
              defaultValue={editing?.bio || ""}
              rows={3}
              className="field"
            />
          </label>
          <ImageField name="photo" label="Member Photo" image={editing?.photo} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              name="published"
              type="checkbox"
              defaultChecked={editing?.published ?? true}
            />
            Published
          </label>
          <button className="btn-primary w-fit">
            {editing ? "Update Member" : "Add Member"}
          </button>
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-3 py-2">Photo</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Designation</th>
                <th className="px-3 py-2">Committee Role</th>
                <th className="px-3 py-2">Department</th>
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member) => (
                <tr key={member._id || member.name}>
                  <td className="px-3 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md bg-slate-100">
                      {member.photo?.url ? (
                        <Image
                          src={member.photo.url}
                          alt={member.photo.altText || member.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-xs font-bold text-slate-400">
                          No
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-800">
                    {member.name}
                  </td>
                  <td className="px-3 py-3">{member.role}</td>
                  <td className="px-3 py-3">{member.committeeRole || "Member"}</td>
                  <td className="px-3 py-3">{member.department || "General"}</td>
                  <td className="px-3 py-3">{member.order}</td>
                  <td className="px-3 py-3">
                    {member.published ? "Published" : "Draft"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      {member._id ? (
                        <a
                          href={`/admin/committee?editCommittee=${member._id}#members`}
                          className="btn-secondary"
                        >
                          Edit
                        </a>
                      ) : null}
                      {member._id ? (
                        <form action={deleteCommitteeMemberAction}>
                          <input type="hidden" name="id" value={member._id} />
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
