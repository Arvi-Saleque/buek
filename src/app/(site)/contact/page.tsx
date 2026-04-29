import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { submitContactAction } from "@/lib/actions";
import { getContactPage } from "@/lib/content";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const [contact, params] = await Promise.all([getContactPage(), searchParams]);

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Contact Us" title={contact.title} body={contact.intro} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          {[
            { icon: MapPin, label: "Address", value: contact.address },
            { icon: Phone, label: "Phone", value: contact.phone },
            { icon: Mail, label: "Email", value: contact.email },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-university-line bg-white p-5 shadow-sm">
              <item.icon className="text-university-green" size={24} />
              <p className="mt-4 text-sm font-semibold text-slate-500">{item.label}</p>
              <p className="mt-1 font-bold text-university-navy">{item.value}</p>
            </div>
          ))}
          <div className="rounded-lg bg-university-navy p-5 text-white">
            <p className="text-sm font-semibold text-university-gold">Office Hours</p>
            <p className="mt-2">{contact.officeHours}</p>
          </div>
        </aside>
        <section className="rounded-lg border border-university-line bg-white p-6 shadow-sm">
          {params.sent ? (
            <div className="mb-5 rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-800">
              Your message has been submitted.
            </div>
          ) : null}
          {params.error ? (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
              Message storage is not configured yet. Please try again after MongoDB is connected.
            </div>
          ) : null}
          <form action={submitContactAction} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="label">Name</span>
                <input name="name" required className="field" />
              </label>
              <label>
                <span className="label">Email</span>
                <input name="email" type="email" required className="field" />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="label">Phone</span>
                <input name="phone" className="field" />
              </label>
              <label>
                <span className="label">Subject</span>
                <input name="subject" required className="field" />
              </label>
            </div>
            <label>
              <span className="label">Message</span>
              <textarea name="message" required rows={6} className="field" />
            </label>
            <button className="btn-primary w-fit">Submit Message</button>
          </form>
          {contact.mapEmbedUrl ? (
            <iframe
              src={contact.mapEmbedUrl}
              className="mt-8 h-80 w-full rounded-lg border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="University map"
            />
          ) : null}
        </section>
      </div>
    </Container>
  );
}
