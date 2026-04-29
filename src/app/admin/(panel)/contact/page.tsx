import { AdminHeading } from "@/components/admin/admin-heading";
import { StatusNote } from "@/components/admin/status-note";
import { saveContactPageAction } from "@/lib/actions";
import { getContactMessages, getContactPage } from "@/lib/content";

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [contact, messages, params] = await Promise.all([
    getContactPage(),
    getContactMessages(),
    searchParams,
  ]);

  return (
    <>
      <AdminHeading title="Contact" body="Edit contact page details and review recent contact form submissions." />
      <StatusNote saved={params.saved} />
      <form action={saveContactPageAction} className="admin-card grid gap-4">
        <label>
          <span className="label">Page Title</span>
          <input name="title" defaultValue={contact.title} required className="field" />
        </label>
        <label>
          <span className="label">Intro</span>
          <textarea name="intro" defaultValue={contact.intro} rows={3} className="field" />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="label">Address</span>
            <input name="address" defaultValue={contact.address} required className="field" />
          </label>
          <label>
            <span className="label">Phone</span>
            <input name="phone" defaultValue={contact.phone} required className="field" />
          </label>
          <label>
            <span className="label">Email</span>
            <input name="email" type="email" defaultValue={contact.email} required className="field" />
          </label>
        </div>
        <label>
          <span className="label">Office Hours</span>
          <input name="officeHours" defaultValue={contact.officeHours} className="field" />
        </label>
        <label>
          <span className="label">Google Map Embed URL</span>
          <input name="mapEmbedUrl" defaultValue={contact.mapEmbedUrl || ""} className="field" />
        </label>
        <button className="btn-primary w-fit">Save Contact Page</button>
      </form>
      <section id="messages" className="admin-card mt-6">
        <h2 className="text-lg font-bold text-university-navy">Recent Messages</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.map((message) => (
                <tr key={`${message.email}-${message.createdAt}`}>
                  <td className="px-3 py-3">{new Date(message.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3 font-semibold text-slate-800">{message.name}</td>
                  <td className="px-3 py-3">{message.email}</td>
                  <td className="px-3 py-3">{message.subject}</td>
                  <td className="px-3 py-3 text-slate-600">{message.message}</td>
                </tr>
              ))}
              {!messages.length ? (
                <tr>
                  <td className="px-3 py-6 text-slate-500" colSpan={5}>
                    No messages yet, or MongoDB is not configured.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
