import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import {
  deleteCommitteeMemberAction,
  saveAboutAction,
  saveCommitteeMemberAction,
} from "@/lib/actions";
import {
  getAboutPage,
  getCommitteeMember,
  getCommitteeMembers,
} from "@/lib/content";
import type { EditableListItem } from "@/lib/types";

function editableRows(items?: EditableListItem[]) {
  return (items || [])
    .map((item) => `${item.title} | ${item.body}`)
    .join("\n");
}

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; editCommittee?: string }>;
}) {
  const params = await searchParams;
  const [about, members, editing] = await Promise.all([
    getAboutPage(),
    getCommitteeMembers(false),
    params.editCommittee ? getCommitteeMember(params.editCommittee) : Promise.resolve(null),
  ]);

  return (
    <>
      <AdminHeading title="About Us" body="Manage about text, mission, vision, chairman message, and committee members." />
      <StatusNote saved={params.saved} deleted={params.deleted} />
      <form action={saveAboutAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">About Page</h2>
          <label>
            <span className="label">About Title</span>
            <input name="aboutTitle" defaultValue={about.aboutTitle} required className="field" />
          </label>
          <label>
            <span className="label">About Body</span>
            <textarea name="aboutBody" defaultValue={about.aboutBody} required rows={7} className="field" />
          </label>
          <ImageField name="aboutImage" label="About Image" image={about.aboutImage} />
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Mission &amp; Vision Page</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Mission Page Intro Title</span>
              <input name="missionIntroTitle" defaultValue={about.missionIntroTitle || ""} className="field" />
            </label>
            <label>
              <span className="label">Mission Quote Source</span>
              <input name="missionQuoteSource" defaultValue={about.missionQuoteSource || ""} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Mission Page Intro Body</span>
            <textarea name="missionIntroBody" defaultValue={about.missionIntroBody || ""} rows={4} className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label>
                <span className="label">Mission Title</span>
                <input name="missionTitle" defaultValue={about.missionTitle} required className="field" />
              </label>
              <label className="mt-4 block">
                <span className="label">Mission Body</span>
                <textarea name="missionBody" defaultValue={about.missionBody} required rows={5} className="field" />
              </label>
            </div>
            <div>
              <label>
                <span className="label">Vision Title</span>
                <input name="visionTitle" defaultValue={about.visionTitle} required className="field" />
              </label>
              <label className="mt-4 block">
                <span className="label">Vision Body</span>
                <textarea name="visionBody" defaultValue={about.visionBody} required rows={5} className="field" />
              </label>
            </div>
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
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
            <textarea name="missionQuote" defaultValue={about.missionQuote || ""} rows={3} className="field" />
          </label>
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
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Chairman Message</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Chairman Name</span>
              <input name="chairmanName" defaultValue={about.chairmanName} required className="field" />
            </label>
            <label>
              <span className="label">Chairman Role</span>
              <input name="chairmanRole" defaultValue={about.chairmanRole} required className="field" />
            </label>
          </div>
          <label>
            <span className="label">Short Leadership Quote</span>
            <textarea name="chairmanQuote" defaultValue={about.chairmanQuote || ""} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Profile Intro</span>
            <textarea name="chairmanIntro" defaultValue={about.chairmanIntro || ""} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Full Official Message</span>
            <textarea name="chairmanMessage" defaultValue={about.chairmanMessage} required rows={10} className="field" />
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
              <span className="label">Closing Note</span>
              <input name="chairmanClosingNote" defaultValue={about.chairmanClosingNote || ""} className="field" />
            </label>
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
          </div>
          <ImageField name="chairmanPhoto" label="Chairman Photo" image={about.chairmanPhoto} />
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Academic Committee Page</h2>
          <label>
            <span className="label">Hero Subtitle</span>
            <textarea name="committeeSubtitle" defaultValue={about.committeeSubtitle || ""} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Short Introduction</span>
            <textarea name="committeeIntro" defaultValue={about.committeeIntro || ""} rows={4} className="field" />
          </label>
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
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Leadership Section Eyebrow</span>
              <input name="committeeLeadershipEyebrow" defaultValue={about.committeeLeadershipEyebrow || ""} className="field" />
            </label>
            <label>
              <span className="label">Leadership Section Title</span>
              <input name="committeeLeadershipTitle" defaultValue={about.committeeLeadershipTitle || ""} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Leadership Section Body</span>
            <textarea name="committeeLeadershipBody" defaultValue={about.committeeLeadershipBody || ""} rows={3} className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Meeting Section Title</span>
              <input name="committeeMeetingTitle" defaultValue={about.committeeMeetingTitle || ""} className="field" />
            </label>
            <label>
              <span className="label">Meeting Frequency</span>
              <input name="committeeMeetingFrequency" defaultValue={about.committeeMeetingFrequency || ""} className="field" />
            </label>
            <label>
              <span className="label">Academic Office</span>
              <input name="committeeMeetingOffice" defaultValue={about.committeeMeetingOffice || ""} className="field" />
            </label>
            <label>
              <span className="label">Academic Office Email</span>
              <input name="committeeMeetingEmail" defaultValue={about.committeeMeetingEmail || ""} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Meeting Section Body</span>
            <textarea name="committeeMeetingBody" defaultValue={about.committeeMeetingBody || ""} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Related Documents</span>
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
              <span className="label">CTA Title</span>
              <input name="committeeCtaTitle" defaultValue={about.committeeCtaTitle || ""} className="field" />
            </label>
            <label>
              <span className="label">CTA Body</span>
              <input name="committeeCtaBody" defaultValue={about.committeeCtaBody || ""} className="field" />
            </label>
            <label>
              <span className="label">CTA Button Label</span>
              <input name="committeeCtaButtonLabel" defaultValue={about.committeeCtaButtonLabel || ""} className="field" />
            </label>
            <label>
              <span className="label">CTA Button Link</span>
              <input name="committeeCtaButtonHref" defaultValue={about.committeeCtaButtonHref || ""} className="field" />
            </label>
          </div>
        </section>
        <button className="btn-primary w-fit">Save About Content</button>
      </form>

      <section id="committee" className="admin-card mt-8">
        <h2 className="text-lg font-bold text-university-navy">Committee Members</h2>
        <form action={saveCommitteeMemberAction} className="mt-5 grid gap-4">
          <input type="hidden" name="id" value={editing?._id || ""} />
          <div className="grid gap-4 md:grid-cols-3">
            <label>
              <span className="label">Name</span>
              <input name="name" defaultValue={editing?.name || ""} required className="field" />
            </label>
            <label>
              <span className="label">Designation</span>
              <input name="role" defaultValue={editing?.role || ""} required className="field" />
            </label>
            <label>
              <span className="label">Committee Role</span>
              <input name="committeeRole" defaultValue={editing?.committeeRole || "Member"} className="field" />
            </label>
            <label>
              <span className="label">Department</span>
              <input name="department" defaultValue={editing?.department || ""} className="field" />
            </label>
            <label>
              <span className="label">Email</span>
              <input name="email" type="email" defaultValue={editing?.email || ""} className="field" />
            </label>
            <label>
              <span className="label">Office Phone</span>
              <input name="officePhone" defaultValue={editing?.officePhone || ""} className="field" />
            </label>
            <label>
              <span className="label">Profile Link</span>
              <input name="profileUrl" defaultValue={editing?.profileUrl || ""} className="field" />
            </label>
            <label>
              <span className="label">Order</span>
              <input name="order" type="number" defaultValue={editing?.order || 1} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Bio</span>
            <textarea name="bio" defaultValue={editing?.bio || ""} rows={3} className="field" />
          </label>
          <ImageField name="photo" label="Member Photo" image={editing?.photo} />
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input name="published" type="checkbox" defaultChecked={editing?.published ?? true} />
            Published
          </label>
          <button className="btn-primary w-fit">{editing ? "Update Member" : "Add Member"}</button>
        </form>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
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
                  <td className="px-3 py-3 font-semibold text-slate-800">{member.name}</td>
                  <td className="px-3 py-3">{member.role}</td>
                  <td className="px-3 py-3">{member.committeeRole || "Member"}</td>
                  <td className="px-3 py-3">{member.department || "General"}</td>
                  <td className="px-3 py-3">{member.order}</td>
                  <td className="px-3 py-3">{member.published ? "Published" : "Draft"}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      {member._id ? <a href={`/admin/about?editCommittee=${member._id}#committee`} className="btn-secondary">Edit</a> : null}
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
