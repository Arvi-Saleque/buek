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
        <section className="admin-card grid gap-4 md:grid-cols-2">
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
            <span className="label">Message</span>
            <textarea name="chairmanMessage" defaultValue={about.chairmanMessage} required rows={7} className="field" />
          </label>
          <ImageField name="chairmanPhoto" label="Chairman Photo" image={about.chairmanPhoto} />
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
              <span className="label">Role</span>
              <input name="role" defaultValue={editing?.role || ""} required className="field" />
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
                <th className="px-3 py-2">Role</th>
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
