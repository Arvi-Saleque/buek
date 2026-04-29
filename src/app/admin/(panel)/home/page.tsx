import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveHomeAction } from "@/lib/actions";
import { getHomePage } from "@/lib/content";
import { defaultHome } from "@/lib/defaults";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [home, params] = await Promise.all([getHomePage(), searchParams]);
  const slides = home.slides?.length ? home.slides : defaultHome.slides;
  const stats = home.stats?.length ? home.stats : defaultHome.stats;
  const featureCards = home.featureCards?.length
    ? home.featureCards
    : defaultHome.featureCards;

  return (
    <>
      <AdminHeading title="Homepage" body="Edit slider, stats, featured sections, notices, gallery text, and main call to action." />
      <StatusNote saved={params.saved} />
      <form action={saveHomeAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Full Height Slider</h2>
          {slides.slice(0, 3).map((slide, index) => (
            <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-bold text-slate-800">Slide {index + 1}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label>
                  <span className="label">Small Label</span>
                  <input name={`slideEyebrow${index}`} defaultValue={slide.eyebrow} className="field bg-white" />
                </label>
                <label>
                  <span className="label">Button Text</span>
                  <input name={`slideButtonLabel${index}`} defaultValue={slide.buttonLabel} required className="field bg-white" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="label">Heading</span>
                <input name={`slideTitle${index}`} defaultValue={slide.title} required className="field bg-white" />
              </label>
              <label className="mt-4 block">
                <span className="label">Subheading</span>
                <textarea name={`slideSubtitle${index}`} defaultValue={slide.subtitle} required rows={3} className="field bg-white" />
              </label>
              <label className="mt-4 block">
                <span className="label">Button Link</span>
                <input name={`slideButtonHref${index}`} defaultValue={slide.buttonHref} required className="field bg-white" />
              </label>
              <div className="mt-4">
                <ImageField name={`slideImage${index}`} label={`Slide ${index + 1} Image`} image={slide.image} />
              </div>
            </div>
          ))}
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Stats Strip</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <input name="statValue" defaultValue={stats[index]?.value || ""} placeholder="Value, e.g. 25+" className="field bg-white" />
                <input name="statLabel" defaultValue={stats[index]?.label || ""} placeholder="Label" className="field bg-white" />
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Welcome Section</h2>
          <label>
            <span className="label">Intro Title</span>
            <input name="introTitle" defaultValue={home.introTitle} required className="field" />
          </label>
          <label>
            <span className="label">Intro Body</span>
            <textarea name="introBody" defaultValue={home.introBody} required rows={5} className="field" />
          </label>
          <ImageField name="introImage" label="Intro Image" image={home.introImage} />
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Important Information Cards</h2>
          <label>
            <span className="label">Section Title</span>
            <input name="featureTitle" defaultValue={home.featureTitle} required className="field" />
          </label>
          <label>
            <span className="label">Section Body</span>
            <textarea name="featureBody" defaultValue={home.featureBody} rows={3} className="field" />
          </label>
          <div className="grid gap-4 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <input name="featureCardTitle" defaultValue={featureCards[index]?.title || ""} placeholder="Card title" className="field bg-white" />
                <textarea name="featureCardBody" defaultValue={featureCards[index]?.body || ""} placeholder="Card body" rows={4} className="field bg-white" />
                <input name="featureCardHref" defaultValue={featureCards[index]?.href || ""} placeholder="Link" className="field bg-white" />
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Academic, Notices, News & Gallery Headings</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Academic Title</span>
              <input name="academicTitle" defaultValue={home.academicTitle} required className="field" />
            </label>
            <label>
              <span className="label">Notice Title</span>
              <input name="noticeTitle" defaultValue={home.noticeTitle} required className="field" />
            </label>
          </div>
          <label>
            <span className="label">Academic Body</span>
            <textarea name="academicBody" defaultValue={home.academicBody} rows={3} className="field" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">News Title</span>
              <input name="newsTitle" defaultValue={home.newsTitle} required className="field" />
            </label>
            <label>
              <span className="label">Gallery Title</span>
              <input name="galleryTitle" defaultValue={home.galleryTitle} required className="field" />
            </label>
          </div>
          <label>
            <span className="label">News Body</span>
            <textarea name="newsBody" defaultValue={home.newsBody} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Gallery Body</span>
            <textarea name="galleryBody" defaultValue={home.galleryBody} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Notices, one per line</span>
            <textarea name="notices" defaultValue={home.notices.join("\n")} rows={5} className="field" />
          </label>
        </section>
        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Call To Action</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">CTA Title</span>
              <input name="ctaTitle" defaultValue={home.ctaTitle} required className="field" />
            </label>
            <label>
              <span className="label">CTA Link</span>
              <input name="ctaHref" defaultValue={home.ctaHref} required className="field" />
            </label>
          </div>
          <label>
            <span className="label">CTA Button Text</span>
            <input name="ctaButtonLabel" defaultValue={home.ctaButtonLabel} required className="field" />
          </label>
          <label>
            <span className="label">CTA Body</span>
            <textarea name="ctaBody" defaultValue={home.ctaBody} rows={3} className="field" />
          </label>
        </section>
        <button className="btn-primary w-fit">Save Homepage</button>
      </form>
    </>
  );
}
