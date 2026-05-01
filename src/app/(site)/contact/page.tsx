import {
  ArrowRight,
  Building2,
  Clock3,
  ExternalLink,
  HelpCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { PageHero } from "@/components/public/page-hero";
import { submitContactAction } from "@/lib/actions";
import { getContactPage, getSiteSettings } from "@/lib/content";
import { defaultContact } from "@/lib/defaults";
import type { DepartmentContact } from "@/lib/types";

const inquiryTypes = [
  "General Information",
  "Admission Inquiry",
  "Academic Office",
  "Registrar Office",
  "Media / Press",
  "Student Support",
  "Partnership / Collaboration",
];

function resolveDepartments(items?: DepartmentContact[]) {
  return items?.length ? items : defaultContact.departments || [];
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const [contact, settings, params] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
    searchParams,
  ]);
  const departments = resolveDepartments(contact.departments);
  const heroLabel = contact.heroLabel || "Contact the University";
  const heroTitle = contact.heroTitle || contact.title;
  const heroSubtitle = contact.heroSubtitle || contact.intro;
  const heroImage = contact.heroImage || defaultContact.heroImage;
  const mapEmbedUrl = contact.mapEmbedUrl || defaultContact.mapEmbedUrl;
  const directionUrl = contact.mapDirectionUrl || defaultContact.mapDirectionUrl || "#";

  const quickContacts = [
    {
      icon: MapPin,
      label: contact.addressLabel || defaultContact.addressLabel || "Campus Address",
      value: contact.address,
      note: contact.addressNote || "View on Google Maps",
    },
    {
      icon: Phone,
      label: contact.phoneLabel || defaultContact.phoneLabel || "Phone",
      value: contact.phone,
      note: contact.phoneNote || "Sun-Thu, 9:00 AM - 5:00 PM",
    },
    {
      icon: Mail,
      label: contact.emailLabel || defaultContact.emailLabel || "Email",
      value: contact.email,
      note: contact.emailNote || "General inquiry desk",
    },
    {
      icon: Clock3,
      label: contact.officeHoursLabel || defaultContact.officeHoursLabel || "Office Hours",
      value: contact.officeHours,
      note: contact.officeHoursNote || "Weekend offices are closed",
    },
  ];

  return (
    <div className="bg-[#F7F9F8]">
      <PageHero
        eyebrow={heroLabel}
        title={heroTitle}
        body={heroSubtitle}
        image={heroImage?.url}
        imageAlt={heroImage?.altText || "University campus"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <Container className="py-16 sm:py-20">
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickContacts.map((item) => (
            <article
              key={item.label}
              className="group rounded-[18px] border border-university-line border-t-[3px] border-t-university-gold bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(8,33,61,0.14)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-university-navy text-university-gold transition group-hover:bg-university-gold group-hover:text-university-navy">
                <item.icon size={22} />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-university-green">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-bold leading-7 text-university-navy">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.note}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[18px] border border-university-line bg-white p-6 shadow-[0_20px_50px_rgba(8,33,61,0.08)] sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-university-gold/15 text-university-gold">
                <MessageSquare size={24} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-university-gold">
                  {contact.formEyebrow || defaultContact.formEyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-normal text-university-navy sm:text-3xl">
                  {contact.formTitle || "Send Us a Message"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {contact.formBody || defaultContact.formBody}
                </p>
              </div>
            </div>

            {params.sent ? (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
                Your message has been submitted.
              </div>
            ) : null}
            {params.error ? (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                Message storage is not configured yet. Please try again after MongoDB is connected.
              </div>
            ) : null}

            <form action={submitContactAction} className="mt-7 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label>
                  <span className="label">Full Name</span>
                  <input name="name" required className="field h-12 rounded-[10px] bg-white" />
                </label>
                <label>
                  <span className="label">Email Address</span>
                  <input name="email" type="email" required className="field h-12 rounded-[10px] bg-white" />
                </label>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <label>
                  <span className="label">Phone Number</span>
                  <input name="phone" className="field h-12 rounded-[10px] bg-white" />
                </label>
                <label>
                  <span className="label">Inquiry Type</span>
                  <select name="inquiryType" className="field h-12 rounded-[10px] bg-white">
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className="label">Subject</span>
                <input name="subject" required className="field h-12 rounded-[10px] bg-white" />
              </label>
              <label>
                <span className="label">Message</span>
                <textarea name="message" required rows={6} className="field rounded-[10px] bg-white" />
              </label>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-university-navy px-5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(8,33,61,0.22)] transition hover:bg-university-gold hover:text-university-navy sm:w-fit">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          <aside className="rounded-[18px] border border-university-line bg-white p-5 shadow-[0_20px_50px_rgba(8,33,61,0.08)] sm:p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-university-gold/40 bg-university-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-university-gold">
              <MapPin size={15} />
              {contact.mapEyebrow || defaultContact.mapEyebrow}
            </div>
            <h2 className="text-2xl font-bold text-university-navy">
              {contact.mapTitle || "Visit Our Campus"}
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-university-line bg-slate-100">
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  className="h-[300px] w-full border-0 lg:h-[420px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="University map"
                />
              ) : (
                <div className="flex h-[300px] items-center justify-center bg-university-navy/5 text-center text-sm font-semibold text-slate-500 lg:h-[420px]">
                  Add a Google Map embed URL from the admin contact editor.
                </div>
              )}
            </div>
            <div className="mt-6 rounded-2xl bg-[#F7F9F8] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-university-green">
                {settings.universityName}
              </p>
              <p className="mt-3 text-lg font-bold text-university-navy">{contact.address}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {contact.mapNote || defaultContact.mapNote}
              </p>
              <a
                href={directionUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-university-gold px-5 py-3 text-sm font-bold text-university-navy transition hover:bg-university-goldDark"
              >
                {contact.mapDirectionLabel || defaultContact.mapDirectionLabel} <ExternalLink size={16} />
              </a>
            </div>
          </aside>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-university-gold">
              {contact.departmentEyebrow || defaultContact.departmentEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-university-navy sm:text-4xl">
              {contact.departmentTitle || defaultContact.departmentTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {contact.departmentBody || defaultContact.departmentBody}
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {departments.map((department) => (
              <article
                key={department.title}
                className="rounded-[18px] border border-university-line bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-university-gold/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-university-green/10 text-university-green">
                  <Building2 size={21} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-university-navy">{department.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{department.body}</p>
                <div className="mt-5 space-y-3 border-t border-university-line pt-5 text-sm text-slate-600">
                  <p className="flex items-center gap-3">
                    <Mail size={16} className="shrink-0 text-university-gold" />
                    <span>{department.email}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone size={16} className="shrink-0 text-university-gold" />
                    <span>{department.phone}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[18px] border border-university-gold/40 bg-university-navy p-6 text-white shadow-[0_20px_50px_rgba(8,33,61,0.16)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-university-gold text-university-navy">
                <HelpCircle size={23} />
              </span>
              <div>
                <h2 className="text-2xl font-bold">
                  {contact.urgentTitle || "Need urgent academic assistance?"}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                  {contact.urgentBody || defaultContact.urgentBody}
                </p>
              </div>
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-university-gold hover:text-university-gold"
            >
              {contact.urgentButtonLabel || defaultContact.urgentButtonLabel} <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
