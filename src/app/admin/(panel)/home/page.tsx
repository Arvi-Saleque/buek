import { BookOpen, CalendarDays, ImageIcon, Quote } from "lucide-react";
import { AdminHeading } from "@/components/admin/admin-heading";
import { ImageField } from "@/components/admin/image-field";
import { StatusNote } from "@/components/admin/status-note";
import { saveHomeAction } from "@/lib/actions";
import { getGalleryItems, getHomePage, getNewsEvents } from "@/lib/content";
import { defaultHome } from "@/lib/defaults";
import type { GalleryItem, NewsEvent } from "@/lib/types";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function gallerySlug(item: GalleryItem) {
  return item.slug || slugify(item.title);
}

function selectedSet(items?: string[]) {
  return new Set(items || []);
}

function newsOptionLabel(item: NewsEvent) {
  return `${item.title} (${item.category}, ${item.date})`;
}

function galleryOptionLabel(item: GalleryItem) {
  return `${item.title} (${item.category || "General"})`;
}

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [home, news, gallery, params] = await Promise.all([
    getHomePage(),
    getNewsEvents(false),
    getGalleryItems(false),
    searchParams,
  ]);
  const slides = home.slides?.length ? home.slides : defaultHome.slides;
  const selectedNews = selectedSet(home.selectedNewsSlugs);
  const selectedNotices = selectedSet(home.selectedNoticeSlugs);
  const selectedGallery = selectedSet(home.selectedGallerySlugs);

  return (
    <>
      <AdminHeading
        title="Homepage"
        body="Edit every visible homepage section. The quick access menu stays fixed, and News/Gallery items are selected from existing records only."
      />
      <StatusNote saved={params.saved} />
      <form action={saveHomeAction} className="grid gap-5">
        <section className="admin-card grid gap-4">
          <div>
            <h2 className="text-lg font-bold text-university-navy">Hero Slider</h2>
            <p className="mt-1 text-sm text-slate-600">Edit the three homepage slider frames.</p>
          </div>
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

        <section className="admin-card overflow-hidden p-0">
          <div className="bg-university-navy px-4 py-5 text-white sm:px-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
              Homepage Intro
            </p>
            <h2 className="mt-2 text-xl font-bold">Academic Community Section</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
              Controls the public homepage block titled &ldquo;Academic Community / Welcome to our academic community&rdquo; including copy, image badge, and metric cards.
            </p>
          </div>

          <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-university-navy text-university-gold">
                  <Quote size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-university-navy">Section Copy</h3>
                  <p className="text-xs text-slate-500">Heading, paragraph, and highlighted statement.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="label">Small Label</span>
                  <input name="introEyebrow" defaultValue={home.introEyebrow || defaultHome.introEyebrow} className="field bg-white" />
                </label>
                <label>
                  <span className="label">Section Title</span>
                  <input name="introTitle" defaultValue={home.introTitle} required className="field bg-white" />
                </label>
              </div>
              <label>
                <span className="label">Intro Body</span>
                <textarea name="introBody" defaultValue={home.introBody} required rows={5} className="field bg-white" />
              </label>
              <label>
                <span className="label">Highlighted Statement</span>
                <textarea name="introHighlight" defaultValue={home.introHighlight || defaultHome.introHighlight} rows={3} className="field bg-white" />
              </label>
            </div>

            <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-university-gold text-university-navy">
                  <ImageIcon size={18} />
                </span>
                <div>
                  <h3 className="font-bold text-university-navy">Visual & Badge</h3>
                  <p className="text-xs text-slate-500">Homepage intro image and overlay badge text.</p>
                </div>
              </div>
              <div className="grid gap-4">
                <ImageField name="introImage" label="Intro Image" image={home.introImage} />
                <label>
                  <span className="label">Image Badge Label</span>
                  <input name="introImageEyebrow" defaultValue={home.introImageEyebrow || defaultHome.introImageEyebrow} className="field bg-white" />
                </label>
                <label>
                  <span className="label">Image Badge Text</span>
                  <input name="introImageCaption" defaultValue={home.introImageCaption || defaultHome.introImageCaption} className="field bg-white" />
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
            <div className="mb-4">
              <h3 className="font-bold text-university-navy">Metric Cards</h3>
              <p className="mt-1 text-sm text-slate-600">
                Edit the two statistic cards shown below the welcome copy. Leave the display value empty to use the live website count.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-university-line bg-slate-50 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-university-navy text-university-gold">
                    <BookOpen size={21} />
                  </span>
                  <div>
                    <p className="font-bold text-university-navy">Programs Metric</p>
                    <p className="text-xs text-slate-500">First statistic card.</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <label>
                    <span className="label">Display Value</span>
                    <input name="statProgramsValue" defaultValue={home.statProgramsValue || ""} placeholder="Live count" className="field bg-white" />
                  </label>
                  <label>
                    <span className="label">Label</span>
                    <input name="statProgramsLabel" defaultValue={home.statProgramsLabel || defaultHome.statProgramsLabel} className="field bg-white" />
                  </label>
                  <label>
                    <span className="label">Detail</span>
                    <input name="statProgramsDetail" defaultValue={home.statProgramsDetail || ""} className="field bg-white" />
                  </label>
                </div>
              </div>

              <div className="rounded-lg border border-university-line bg-slate-50 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-university-navy text-university-gold">
                    <CalendarDays size={21} />
                  </span>
                  <div>
                    <p className="font-bold text-university-navy">Updates Metric</p>
                    <p className="text-xs text-slate-500">Second statistic card.</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <label>
                    <span className="label">Display Value</span>
                    <input name="statUpdatesValue" defaultValue={home.statUpdatesValue || ""} placeholder="Live count" className="field bg-white" />
                  </label>
                  <label>
                    <span className="label">Label</span>
                    <input name="statUpdatesLabel" defaultValue={home.statUpdatesLabel || defaultHome.statUpdatesLabel} className="field bg-white" />
                  </label>
                  <label>
                    <span className="label">Detail</span>
                    <input name="statUpdatesDetail" defaultValue={home.statUpdatesDetail || defaultHome.statUpdatesDetail} className="field bg-white" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Academic Programs Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Small Label</span>
              <input name="academicEyebrow" defaultValue={home.academicEyebrow || defaultHome.academicEyebrow} className="field" />
            </label>
            <label>
              <span className="label">Section Title</span>
              <input name="academicTitle" defaultValue={home.academicTitle} required className="field" />
            </label>
            <label>
              <span className="label">Button Text</span>
              <input name="academicButtonLabel" defaultValue={home.academicButtonLabel || defaultHome.academicButtonLabel} className="field" />
            </label>
            <label>
              <span className="label">Button Link</span>
              <input name="academicButtonHref" defaultValue={home.academicButtonHref || defaultHome.academicButtonHref} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Section Body</span>
            <textarea name="academicBody" defaultValue={home.academicBody} rows={3} className="field" />
          </label>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">News & Updates Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Small Label</span>
              <input name="newsEyebrow" defaultValue={home.newsEyebrow || defaultHome.newsEyebrow} className="field" />
            </label>
            <label>
              <span className="label">Section Title</span>
              <input name="newsTitle" defaultValue={home.newsTitle} required className="field" />
            </label>
            <label>
              <span className="label">Button Text</span>
              <input name="newsButtonLabel" defaultValue={home.newsButtonLabel || defaultHome.newsButtonLabel} className="field" />
            </label>
            <label>
              <span className="label">Button Link</span>
              <input name="newsButtonHref" defaultValue={home.newsButtonHref || defaultHome.newsButtonHref} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Section Body</span>
            <textarea name="newsBody" defaultValue={home.newsBody} rows={3} className="field" />
          </label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="font-bold text-slate-800">News & Events Listing Hero</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input name="newsPageEyebrow" defaultValue={home.newsPageEyebrow || defaultHome.newsPageEyebrow} placeholder="Listing hero label" className="field bg-white" />
              <input name="newsPageTitle" defaultValue={home.newsPageTitle || defaultHome.newsPageTitle} placeholder="Listing hero title" className="field bg-white" />
            </div>
            <textarea name="newsPageBody" defaultValue={home.newsPageBody || defaultHome.newsPageBody} rows={3} placeholder="Listing hero body" className="field mt-4 bg-white" />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="font-bold text-slate-800">Select Existing News / Events</p>
            <p className="mt-1 text-sm text-slate-600">Choose up to three items for the homepage featured and compact news cards.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {news.map((item) => (
                <label key={item.slug} className="flex gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm">
                  <input type="checkbox" name="selectedNewsSlugs" value={item.slug} defaultChecked={selectedNews.has(item.slug)} className="mt-1" />
                  <span>
                    <span className="block font-bold text-university-navy">{item.title}</span>
                    <span className="text-slate-500">{newsOptionLabel(item)}</span>
                  </span>
                </label>
              ))}
              {!news.length ? <p className="text-sm text-slate-500">No news/events found. Add them from News & Events first.</p> : null}
            </div>
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Notice Board Selection</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Notice Small Label</span>
              <input name="noticeEyebrow" defaultValue={home.noticeEyebrow || defaultHome.noticeEyebrow} className="field" />
            </label>
            <label>
              <span className="label">Notice Title</span>
              <input name="noticeTitle" defaultValue={home.noticeTitle} required className="field" />
            </label>
            <label>
              <span className="label">Notice Button Text</span>
              <input name="noticeButtonLabel" defaultValue={home.noticeButtonLabel || defaultHome.noticeButtonLabel} className="field" />
            </label>
            <label>
              <span className="label">Notice Button Link</span>
              <input name="noticeButtonHref" defaultValue={home.noticeButtonHref || defaultHome.noticeButtonHref} className="field" />
            </label>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="font-bold text-slate-800">Select Existing News / Notice Items</p>
            <p className="mt-1 text-sm text-slate-600">These are displayed in the homepage notice board. No new notice is created here.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {news.map((item) => (
                <label key={`notice-${item.slug}`} className="flex gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm">
                  <input type="checkbox" name="selectedNoticeSlugs" value={item.slug} defaultChecked={selectedNotices.has(item.slug)} className="mt-1" />
                  <span>
                    <span className="block font-bold text-university-navy">{item.title}</span>
                    <span className="text-slate-500">{newsOptionLabel(item)}</span>
                  </span>
                </label>
              ))}
              {!news.length ? <p className="text-sm text-slate-500">No news/notice items found.</p> : null}
            </div>
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Gallery Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Small Label</span>
              <input name="galleryEyebrow" defaultValue={home.galleryEyebrow || defaultHome.galleryEyebrow} className="field" />
            </label>
            <label>
              <span className="label">Section Title</span>
              <input name="galleryTitle" defaultValue={home.galleryTitle} required className="field" />
            </label>
            <label>
              <span className="label">Primary Button Text</span>
              <input name="galleryPrimaryLabel" defaultValue={home.galleryPrimaryLabel || defaultHome.galleryPrimaryLabel} className="field" />
            </label>
            <label>
              <span className="label">Primary Button Link</span>
              <input name="galleryPrimaryHref" defaultValue={home.galleryPrimaryHref || defaultHome.galleryPrimaryHref} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Text</span>
              <input name="gallerySecondaryLabel" defaultValue={home.gallerySecondaryLabel || defaultHome.gallerySecondaryLabel} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Link</span>
              <input name="gallerySecondaryHref" defaultValue={home.gallerySecondaryHref || defaultHome.gallerySecondaryHref} className="field" />
            </label>
          </div>
          <label>
            <span className="label">Section Body</span>
            <textarea name="galleryBody" defaultValue={home.galleryBody} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Quote</span>
            <textarea name="galleryQuote" defaultValue={home.galleryQuote || defaultHome.galleryQuote} rows={2} className="field" />
          </label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="font-bold text-slate-800">Gallery Listing Hero</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input name="galleryPageEyebrow" defaultValue={home.galleryPageEyebrow || defaultHome.galleryPageEyebrow} placeholder="Listing hero label" className="field bg-white" />
              <input name="galleryPageTitle" defaultValue={home.galleryPageTitle || defaultHome.galleryPageTitle} placeholder="Listing hero title" className="field bg-white" />
            </div>
            <textarea name="galleryPageBody" defaultValue={home.galleryPageBody || defaultHome.galleryPageBody} rows={3} placeholder="Listing hero body" className="field mt-4 bg-white" />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="font-bold text-slate-800">Select Existing Gallery Albums</p>
            <p className="mt-1 text-sm text-slate-600">Choose albums to appear in the homepage gallery mosaic. No gallery item is created here.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {gallery.map((item) => {
                const slug = gallerySlug(item);
                return (
                  <label key={slug} className="flex gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm">
                    <input type="checkbox" name="selectedGallerySlugs" value={slug} defaultChecked={selectedGallery.has(slug)} className="mt-1" />
                    <span>
                      <span className="block font-bold text-university-navy">{item.title}</span>
                      <span className="text-slate-500">{galleryOptionLabel(item)}</span>
                    </span>
                  </label>
                );
              })}
              {!gallery.length ? <p className="text-sm text-slate-500">No gallery albums found. Add them from Gallery first.</p> : null}
            </div>
          </div>
        </section>

        <section className="admin-card grid gap-4">
          <h2 className="text-lg font-bold text-university-navy">Final Call To Action</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Small Label</span>
              <input name="ctaEyebrow" defaultValue={home.ctaEyebrow || defaultHome.ctaEyebrow} className="field" />
            </label>
            <label>
              <span className="label">CTA Title</span>
              <input name="ctaTitle" defaultValue={home.ctaTitle} required className="field" />
            </label>
            <label>
              <span className="label">Primary Button Text</span>
              <input name="ctaButtonLabel" defaultValue={home.ctaButtonLabel} required className="field" />
            </label>
            <label>
              <span className="label">Primary Button Link</span>
              <input name="ctaHref" defaultValue={home.ctaHref} required className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Text</span>
              <input name="ctaSecondaryLabel" defaultValue={home.ctaSecondaryLabel || defaultHome.ctaSecondaryLabel} className="field" />
            </label>
            <label>
              <span className="label">Secondary Button Link</span>
              <input name="ctaSecondaryHref" defaultValue={home.ctaSecondaryHref || defaultHome.ctaSecondaryHref} className="field" />
            </label>
          </div>
          <label>
            <span className="label">CTA Body</span>
            <textarea name="ctaBody" defaultValue={home.ctaBody} rows={3} className="field" />
          </label>
          <label>
            <span className="label">Trust Badges</span>
            <textarea
              name="ctaTrustBadges"
              defaultValue={(home.ctaTrustBadges?.length ? home.ctaTrustBadges : defaultHome.ctaTrustBadges || []).join("\n")}
              rows={4}
              placeholder="One badge per line"
              className="field"
            />
          </label>
          <ImageField name="ctaBackgroundImage" label="CTA Background Image" image={home.ctaBackgroundImage || defaultHome.ctaBackgroundImage} />
        </section>

        <button className="btn-primary w-fit">Save Homepage</button>
      </form>
    </>
  );
}
