import { AdminHeading } from "@/components/admin/admin-heading";
import { StatusNote } from "@/components/admin/status-note";
import { saveContactPageAction } from "@/lib/actions";
import { getContactMessages, getContactPage } from "@/lib/content";
import { defaultContact } from "@/lib/defaults";
import type { DepartmentContact } from "@/lib/types";

function contactDepartments(items?: DepartmentContact[]) {
  const departments = items?.length ? items : defaultContact.departments || [];
  return departments.length ? departments : defaultContact.departments || [];
}

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
  const departments = contactDepartments(contact.departments);

  return (
    <>
      <AdminHeading title="Contact" body="Edit contact page details and review recent contact form submissions." />
      <StatusNote saved={params.saved} />
      <form action={saveContactPageAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Hero & Page Intro</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Small Label</span>
              <input name="heroLabel" defaultValue={contact.heroLabel || defaultContact.heroLabel} className="field" />
            </label>
            <label>
              <span className="label">Hero Heading</span>
              <input name="heroTitle" defaultValue={contact.heroTitle || contact.title} required className="field" />
            </label>
          </div>
          <label>
            <span className="label">Hero Subtitle</span>
            <textarea name="heroSubtitle" defaultValue={contact.heroSubtitle || contact.intro} rows={3} className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Browser/Admin Page Title</span>
              <input name="title" defaultValue={contact.title} required className="field" />
            </label>
            <label>
              <span className="label">Short Intro Fallback</span>
              <input name="intro" defaultValue={contact.intro} className="field" />
            </label>
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Quick Contact Cards</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Campus Address</span>
              <input name="address" defaultValue={contact.address} required className="field" />
            </label>
            <label>
              <span className="label">Address Note</span>
              <input name="addressNote" defaultValue={contact.addressNote || ""} className="field" />
            </label>
            <label>
              <span className="label">Phone</span>
              <input name="phone" defaultValue={contact.phone} required className="field" />
            </label>
            <label>
              <span className="label">Phone Note</span>
              <input name="phoneNote" defaultValue={contact.phoneNote || ""} className="field" />
            </label>
            <label>
              <span className="label">Email</span>
              <input name="email" type="email" defaultValue={contact.email} required className="field" />
            </label>
            <label>
              <span className="label">Email Note</span>
              <input name="emailNote" defaultValue={contact.emailNote || ""} className="field" />
            </label>
            <label>
              <span className="label">Office Hours</span>
              <input name="officeHours" defaultValue={contact.officeHours} className="field" />
            </label>
            <label>
              <span className="label">Office Hours Note</span>
              <input name="officeHoursNote" defaultValue={contact.officeHoursNote || ""} className="field" />
            </label>
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Form & Map</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Form Title</span>
              <input name="formTitle" defaultValue={contact.formTitle || ""} className="field" />
            </label>
            <label>
              <span className="label">Map Title</span>
              <input name="mapTitle" defaultValue={contact.mapTitle || ""} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Form Body</span>
            <textarea name="formBody" defaultValue={contact.formBody || ""} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Google Map Embed URL</span>
            <input name="mapEmbedUrl" defaultValue={contact.mapEmbedUrl || defaultContact.mapEmbedUrl || ""} className="field" />
          </label>
          <label>
            <span className="label">Direction Button URL</span>
            <input name="mapDirectionUrl" defaultValue={contact.mapDirectionUrl || ""} className="field" />
          </label>
          <label>
            <span className="label">Map Location Note</span>
            <textarea name="mapNote" defaultValue={contact.mapNote || ""} rows={3} className="field" />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Department Contacts</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {[0, 1, 2, 3].map((index) => {
              const department = departments[index] || defaultContact.departments?.[index];
              return (
                <div key={index} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-bold text-slate-800">Office {index + 1}</h3>
                  <input name="departmentTitle" defaultValue={department?.title || ""} placeholder="Office name" className="field bg-white" />
                  <textarea name="departmentBody" defaultValue={department?.body || ""} placeholder="Office responsibility" rows={3} className="field bg-white" />
                  <div className="grid gap-3 md:grid-cols-2">
                    <input name="departmentEmail" defaultValue={department?.email || ""} placeholder="Email" className="field bg-white" />
                    <input name="departmentPhone" defaultValue={department?.phone || ""} placeholder="Phone" className="field bg-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Important Notice</h2>
          <label>
            <span className="label">Notice Title</span>
            <input name="urgentTitle" defaultValue={contact.urgentTitle || ""} className="field" />
          </label>
          <label>
            <span className="label">Notice Body</span>
            <textarea name="urgentBody" defaultValue={contact.urgentBody || ""} rows={3} className="field" />
          </label>
        </section>

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
                <th className="px-3 py-2">Inquiry</th>
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
                  <td className="px-3 py-3">{message.inquiryType || "General"}</td>
                  <td className="px-3 py-3">{message.subject}</td>
                  <td className="px-3 py-3 text-slate-600">{message.message}</td>
                </tr>
              ))}
              {!messages.length ? (
                <tr>
                  <td className="px-3 py-6 text-slate-500" colSpan={6}>
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
