"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  getAdminCredentials,
  setAdminSession,
} from "@/lib/auth";
import { uploadFormImage } from "@/lib/cloudinary";
import {
  deleteCommitteeMember,
  deleteAllNewsEvents,
  deleteAllGalleryItems,
  deleteGalleryItem,
  deleteNewsEvent,
  CONTENT_TAGS,
  getAboutPage,
  getHomePage,
  getSiteSettings,
  saveContactMessage,
  savePage,
  saveSiteSettings,
  upsertCommitteeMember,
  upsertGalleryItem,
  upsertNewsEvent,
} from "@/lib/content";
import type {
  AcademicPage,
  AboutPage,
  ContactPage,
  GalleryImage,
  HomePage,
  ImageAsset,
  NewsEvent,
  SiteSettings,
} from "@/lib/types";

export type LoginState = {
  error?: string;
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function numberValue(formData: FormData, key: string) {
  return Number(value(formData, key)) || 0;
}

function booleanValue(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function refreshPublicContent(...tags: string[]) {
  tags.forEach((tag) => revalidateTag(tag));
  revalidatePath("/", "layout");
}

function lines(formData: FormData, key: string) {
  return value(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function listItems(formData: FormData, key: string) {
  return lines(formData, key)
    .map((line) => {
      const [title = "", ...bodyParts] = line.split("|");
      return {
        title: title.trim(),
        body: bodyParts.join("|").trim(),
      };
    })
    .filter((item) => item.title && item.body);
}

function notices(formData: FormData) {
  const titles = formData.getAll("noticeItemTitle").map((item) => String(item).trim());
  const bodies = formData.getAll("noticeItemBody").map((item) => String(item).trim());
  const categories = formData.getAll("noticeItemCategory").map((item) => String(item).trim());
  const dates = formData.getAll("noticeItemDate").map((item) => String(item).trim());

  return titles
    .map((title, index) => ({
      title,
      body: bodies[index] || "",
      category: categories[index] || "Notice",
      date: dates[index] || new Date().toISOString().slice(0, 10),
    }))
    .filter((item) => item.title && item.body);
}

function downloads(formData: FormData) {
  const labels = formData.getAll("downloadLabel").map((item) => String(item).trim());
  const hrefs = formData.getAll("downloadHref").map((item) => String(item).trim());

  return labels
    .map((label, index) => ({ label, href: hrefs[index] || "" }))
    .filter((item) => item.label && item.href);
}

function featureRows(formData: FormData) {
  const titles = formData.getAll("featureCardTitle").map((item) => String(item).trim());
  const bodies = formData.getAll("featureCardBody").map((item) => String(item).trim());
  const hrefs = formData.getAll("featureCardHref").map((item) => String(item).trim());

  return titles
    .map((title, index) => ({
      title,
      body: bodies[index] || "",
      href: hrefs[index] || "#",
    }))
    .filter((item) => item.title && item.body);
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function existingImage(formData: FormData, prefix: string): ImageAsset | undefined {
  const url = value(formData, `${prefix}Url`);
  if (!url) return undefined;

  return {
    url,
    secureUrl: value(formData, `${prefix}SecureUrl`) || url,
    publicId: value(formData, `${prefix}PublicId`) || undefined,
    altText: value(formData, `${prefix}AltText`) || undefined,
    width: numberValue(formData, `${prefix}Width`) || undefined,
    height: numberValue(formData, `${prefix}Height`) || undefined,
    format: value(formData, `${prefix}Format`) || undefined,
  };
}

async function imageFromForm(formData: FormData, key: string, folder: string, altKey = `${key}AltText`) {
  const uploaded = await uploadFormImage(
    formData.get(key) as File | null,
    folder,
    value(formData, altKey),
  );

  return uploaded || existingImage(formData, key);
}

async function imagesFromForm(formData: FormData, key: string, folder: string, altText?: string) {
  const files = formData.getAll(key).filter((file): file is File => file instanceof File && file.size > 0);
  const uploaded = await Promise.all(
    files.map((file) => uploadFormImage(file, folder, altText)),
  );

  return uploaded.filter((image): image is NonNullable<typeof image> => Boolean(image));
}

function existingGalleryImages(formData: FormData): GalleryImage[] {
  const urls = formData.getAll("galleryImageUrl").map((item) => String(item).trim());
  const secureUrls = formData.getAll("galleryImageSecureUrl").map((item) => String(item).trim());
  const publicIds = formData.getAll("galleryImagePublicId").map((item) => String(item).trim());
  const widths = formData.getAll("galleryImageWidth").map((item) => Number(item) || undefined);
  const heights = formData.getAll("galleryImageHeight").map((item) => Number(item) || undefined);
  const formats = formData.getAll("galleryImageFormat").map((item) => String(item).trim());
  const altTexts = formData.getAll("galleryImageAltText").map((item) => String(item).trim());
  const titles = formData.getAll("galleryImageTitle").map((item) => String(item).trim());
  const captions = formData.getAll("galleryImageCaption").map((item) => String(item).trim());
  const orders = formData.getAll("galleryImageOrder").map((item) => Number(item) || 0);
  const uploadedAt = formData.getAll("galleryImageUploadedAt").map((item) => String(item).trim());
  const removeUrls = new Set(formData.getAll("galleryImageRemove").map((item) => String(item)));

  const images = urls
    .map((url, index) => {
      if (!url || removeUrls.has(url)) return null;

      const image: GalleryImage = {
        url,
        secureUrl: secureUrls[index] || url,
        publicId: publicIds[index] || undefined,
        width: widths[index],
        height: heights[index],
        format: formats[index] || undefined,
        altText: altTexts[index] || undefined,
        title: titles[index] || undefined,
        caption: captions[index] || undefined,
        order: orders[index] || index + 1,
        uploadedAt: uploadedAt[index] || undefined,
      };

      return image;
    })
    .filter((image): image is GalleryImage => image !== null);

  return images;
}

function selectedLibraryGalleryImages(formData: FormData): GalleryImage[] {
  const urls = formData.getAll("newLibraryImageUrl").map((item) => String(item).trim());
  const secureUrls = formData.getAll("newLibraryImageSecureUrl").map((item) => String(item).trim());
  const publicIds = formData.getAll("newLibraryImagePublicId").map((item) => String(item).trim());
  const widths = formData.getAll("newLibraryImageWidth").map((item) => Number(item) || undefined);
  const heights = formData.getAll("newLibraryImageHeight").map((item) => Number(item) || undefined);
  const formats = formData.getAll("newLibraryImageFormat").map((item) => String(item).trim());
  const altTexts = formData.getAll("newLibraryImageAltText").map((item) => String(item).trim());
  const orders = formData.getAll("newLibraryImageOrder").map((item) => Number(item) || 0);
  const title = value(formData, "newImagesTitle");
  const caption = value(formData, "newImagesCaption");

  return urls
    .map((url, index) => {
      if (!url) return null;

      const image: GalleryImage = {
        url,
        secureUrl: secureUrls[index] || url,
        publicId: publicIds[index] || undefined,
        width: widths[index],
        height: heights[index],
        format: formats[index] || undefined,
        altText: altTexts[index] || undefined,
        title: title || altTexts[index] || undefined,
        caption: caption || undefined,
        order: orders[index] || index + 1,
        uploadedAt: new Date().toISOString(),
      };

      return image;
    })
    .filter((image): image is GalleryImage => image !== null);
}

function dedupeGalleryImages(images: GalleryImage[]) {
  const seen = new Set<string>();

  return images.filter((image) => {
    const key = image.publicId || image.url;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  const credentials = getAdminCredentials();

  if (!credentials.email || !credentials.password) {
    return { error: "Admin credentials are not configured." };
  }

  if (email !== credentials.email.toLowerCase() || password !== credentials.password) {
    return { error: "Invalid email or password." };
  }

  await setAdminSession(credentials.email);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveSettingsAction(formData: FormData) {
  const current = await getSiteSettings();
  const settings: SiteSettings = {
    universityName: value(formData, "universityName"),
    tagline: value(formData, "tagline"),
    address: value(formData, "address"),
    phone: value(formData, "phone"),
    email: value(formData, "email"),
    facebook: value(formData, "facebook"),
    youtube: value(formData, "youtube"),
    linkedin: value(formData, "linkedin"),
    seoTitle: value(formData, "seoTitle"),
    seoDescription: value(formData, "seoDescription"),
    logo: (await imageFromForm(formData, "logo", "university/settings")) || current.logo,
    favicon: (await imageFromForm(formData, "favicon", "university/settings")) || current.favicon,
  };

  await saveSiteSettings(settings);
  refreshPublicContent(CONTENT_TAGS.settings);
  redirect("/admin/settings?saved=1");
}

export async function saveHomeAction(formData: FormData) {
  const current = await getHomePage();
  const slides = await Promise.all(
    [0, 1, 2].map(async (index) => ({
      eyebrow: value(formData, `slideEyebrow${index}`),
      title: value(formData, `slideTitle${index}`),
      subtitle: value(formData, `slideSubtitle${index}`),
      buttonLabel: value(formData, `slideButtonLabel${index}`),
      buttonHref: value(formData, `slideButtonHref${index}`) || "/academic",
      image:
        (await imageFromForm(formData, `slideImage${index}`, "university/home/slides")) ||
        current.slides[index]?.image,
    })),
  );

  const content: HomePage = {
    slides: slides.filter((slide) => slide.title && slide.subtitle),
    introTitle: value(formData, "introTitle"),
    introBody: value(formData, "introBody"),
    introImage:
      (await imageFromForm(formData, "introImage", "university/home")) ||
      current.introImage,
    featureTitle: value(formData, "featureTitle"),
    featureBody: value(formData, "featureBody"),
    featureCards: featureRows(formData),
    academicTitle: value(formData, "academicTitle"),
    academicBody: value(formData, "academicBody"),
    noticeTitle: value(formData, "noticeTitle"),
    newsTitle: value(formData, "newsTitle"),
    newsBody: value(formData, "newsBody"),
    galleryTitle: value(formData, "galleryTitle"),
    galleryBody: value(formData, "galleryBody"),
    notices: notices(formData),
    ctaTitle: value(formData, "ctaTitle"),
    ctaBody: value(formData, "ctaBody"),
    ctaButtonLabel: value(formData, "ctaButtonLabel"),
    ctaHref: value(formData, "ctaHref") || "/academic",
  };

  await savePage("home", content);
  refreshPublicContent(CONTENT_TAGS.home);
  redirect("/admin/home?saved=1");
}

export async function saveAboutAction(formData: FormData) {
  const current = await getAboutPage();
  const content: AboutPage = {
    aboutTitle: value(formData, "aboutTitle"),
    aboutBody: value(formData, "aboutBody"),
    aboutImage: (await imageFromForm(formData, "aboutImage", "university/about")) || current.aboutImage,
    missionIntroTitle: value(formData, "missionIntroTitle"),
    missionIntroBody: value(formData, "missionIntroBody"),
    missionTitle: value(formData, "missionTitle"),
    missionBody: value(formData, "missionBody"),
    missionPoints: listItems(formData, "missionPoints"),
    visionTitle: value(formData, "visionTitle"),
    visionBody: value(formData, "visionBody"),
    coreValues: listItems(formData, "coreValues"),
    strategicFocus: listItems(formData, "strategicFocus"),
    missionQuote: value(formData, "missionQuote"),
    missionQuoteSource: value(formData, "missionQuoteSource"),
    missionCtaTitle: value(formData, "missionCtaTitle"),
    missionCtaBody: value(formData, "missionCtaBody"),
    missionCtaPrimaryLabel: value(formData, "missionCtaPrimaryLabel"),
    missionCtaPrimaryHref: value(formData, "missionCtaPrimaryHref"),
    missionCtaSecondaryLabel: value(formData, "missionCtaSecondaryLabel"),
    missionCtaSecondaryHref: value(formData, "missionCtaSecondaryHref"),
    chairmanName: value(formData, "chairmanName"),
    chairmanRole: value(formData, "chairmanRole"),
    chairmanQuote: value(formData, "chairmanQuote"),
    chairmanIntro: value(formData, "chairmanIntro"),
    chairmanMessage: value(formData, "chairmanMessage"),
    chairmanPhoto:
      (await imageFromForm(formData, "chairmanPhoto", "university/about")) ||
      current.chairmanPhoto,
    chairmanCommitments: listItems(formData, "chairmanCommitments"),
    chairmanPriorities: listItems(formData, "chairmanPriorities"),
    chairmanClosingNote: value(formData, "chairmanClosingNote"),
    chairmanRelatedLinks: listItems(formData, "chairmanRelatedLinks"),
    committeeSubtitle: value(formData, "committeeSubtitle"),
    committeeIntro: value(formData, "committeeIntro"),
    committeeResponsibilities: listItems(formData, "committeeResponsibilities"),
    committeeMeetingTitle: value(formData, "committeeMeetingTitle"),
    committeeMeetingBody: value(formData, "committeeMeetingBody"),
    committeeMeetingFrequency: value(formData, "committeeMeetingFrequency"),
    committeeMeetingOffice: value(formData, "committeeMeetingOffice"),
    committeeMeetingEmail: value(formData, "committeeMeetingEmail"),
    committeeDocuments: listItems(formData, "committeeDocuments"),
    committeeCtaTitle: value(formData, "committeeCtaTitle"),
    committeeCtaBody: value(formData, "committeeCtaBody"),
    committeeCtaButtonLabel: value(formData, "committeeCtaButtonLabel"),
    committeeCtaButtonHref: value(formData, "committeeCtaButtonHref"),
  };

  await savePage("about", content);
  refreshPublicContent(CONTENT_TAGS.about);
  redirect("/admin/about?saved=1");
}

export async function saveAcademicAction(formData: FormData) {
  const content: AcademicPage = {
    title: value(formData, "title"),
    overview: value(formData, "overview"),
    programs: lines(formData, "programs"),
    admissionTitle: value(formData, "admissionTitle"),
    admissionBody: value(formData, "admissionBody"),
    downloads: downloads(formData),
  };

  await savePage("academic", content);
  refreshPublicContent(CONTENT_TAGS.academic);
  redirect("/admin/academic?saved=1");
}

export async function saveContactPageAction(formData: FormData) {
  const content: ContactPage = {
    title: value(formData, "title"),
    intro: value(formData, "intro"),
    address: value(formData, "address"),
    phone: value(formData, "phone"),
    email: value(formData, "email"),
    officeHours: value(formData, "officeHours"),
    mapEmbedUrl: value(formData, "mapEmbedUrl"),
  };

  await savePage("contact", content);
  refreshPublicContent(CONTENT_TAGS.contact);
  redirect("/admin/contact?saved=1");
}

export async function saveNewsEventAction(formData: FormData) {
  const title = value(formData, "title");
  const slug = value(formData, "slug") || slugify(title);
  const coverImage = await imageFromForm(formData, "coverImage", "university/news");

  const input: NewsEvent = {
    _id: value(formData, "id") || undefined,
    title,
    slug,
    date: value(formData, "date"),
    category: value(formData, "category"),
    department: value(formData, "department") || undefined,
    excerpt: value(formData, "excerpt"),
    body: value(formData, "body"),
    published: booleanValue(formData, "published"),
    featured: booleanValue(formData, "featured"),
    coverImage,
    eventDate: value(formData, "eventDate") || undefined,
    eventTime: value(formData, "eventTime") || undefined,
    eventLocation: value(formData, "eventLocation") || undefined,
    organizer: value(formData, "organizer") || undefined,
    eventStatus: (value(formData, "eventStatus") || undefined) as NewsEvent["eventStatus"],
    registrationLink: value(formData, "registrationLink") || undefined,
    pdfUrl: value(formData, "pdfUrl") || undefined,
    tags: lines(formData, "tags"),
    seoTitle: value(formData, "seoTitle") || undefined,
    seoDescription: value(formData, "seoDescription") || undefined,
  };

  await upsertNewsEvent(input);

  refreshPublicContent(CONTENT_TAGS.news);
  redirect("/admin/news-events?saved=1");
}

export async function deleteNewsEventAction(formData: FormData) {
  await deleteNewsEvent(value(formData, "id"));
  refreshPublicContent(CONTENT_TAGS.news);
  redirect("/admin/news-events?deleted=1");
}

export async function deleteAllNewsEventsAction() {
  await deleteAllNewsEvents();
  refreshPublicContent(CONTENT_TAGS.news);
  redirect("/admin/news-events?deleted=1");
}

export async function saveGalleryItemAction(formData: FormData) {
  const title = value(formData, "title");
  const slug = value(formData, "slug") || slugify(title);
  const coverImage = await imageFromForm(formData, "coverImage", "university/gallery/covers");
  const legacyImage = await imageFromForm(formData, "image", "university/gallery");
  const existingImages = existingGalleryImages(formData);
  const libraryImages = selectedLibraryGalleryImages(formData);
  const uploadedImages = await imagesFromForm(formData, "newImages", "university/gallery/albums", title);
  const newImages: GalleryImage[] = uploadedImages.map((image, index) => ({
    ...image,
    title: value(formData, "newImagesTitle") || title,
    caption: value(formData, "newImagesCaption") || undefined,
    order: existingImages.length + libraryImages.length + index + 1,
    uploadedAt: new Date().toISOString(),
  }));
  const images = dedupeGalleryImages([...existingImages, ...libraryImages, ...newImages]).sort((a, b) => (a.order || 0) - (b.order || 0));
  const resolvedCover = coverImage || legacyImage || existingImage(formData, "coverImage") || existingImage(formData, "image") || images[0];

  await upsertGalleryItem({
    _id: value(formData, "id") || undefined,
    title,
    slug,
    category: value(formData, "category"),
    department: value(formData, "department") || undefined,
    year: value(formData, "year") || undefined,
    eventDate: value(formData, "eventDate") || undefined,
    description: value(formData, "description") || undefined,
    order: numberValue(formData, "order"),
    published: booleanValue(formData, "published"),
    featured: booleanValue(formData, "featured"),
    image: resolvedCover,
    coverImage: resolvedCover,
    images,
    mediaType: (value(formData, "mediaType") || "Photos") as "Photos" | "Videos",
    videoUrl: value(formData, "videoUrl") || undefined,
    seoTitle: value(formData, "seoTitle") || undefined,
    seoDescription: value(formData, "seoDescription") || undefined,
  });

  refreshPublicContent(CONTENT_TAGS.gallery);
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryItemAction(formData: FormData) {
  await deleteGalleryItem(value(formData, "id"));
  refreshPublicContent(CONTENT_TAGS.gallery);
  redirect("/admin/gallery?deleted=1");
}

export async function deleteAllGalleryItemsAction() {
  await deleteAllGalleryItems();
  refreshPublicContent(CONTENT_TAGS.gallery);
  redirect("/admin/gallery?deleted=1");
}

export async function saveCommitteeMemberAction(formData: FormData) {
  await upsertCommitteeMember({
    _id: value(formData, "id") || undefined,
    name: value(formData, "name"),
    role: value(formData, "role"),
    committeeRole: value(formData, "committeeRole") || undefined,
    department: value(formData, "department") || undefined,
    email: value(formData, "email") || undefined,
    officePhone: value(formData, "officePhone") || undefined,
    profileUrl: value(formData, "profileUrl") || undefined,
    bio: value(formData, "bio"),
    order: numberValue(formData, "order"),
    published: booleanValue(formData, "published"),
    photo: await imageFromForm(formData, "photo", "university/committee"),
  });

  refreshPublicContent(CONTENT_TAGS.committee);
  redirect("/admin/about?saved=1#committee");
}

export async function deleteCommitteeMemberAction(formData: FormData) {
  await deleteCommitteeMember(value(formData, "id"));
  refreshPublicContent(CONTENT_TAGS.committee);
  redirect("/admin/about?deleted=1#committee");
}

export async function submitContactAction(formData: FormData) {
  try {
    await saveContactMessage({
      name: value(formData, "name"),
      email: value(formData, "email"),
      phone: value(formData, "phone"),
      subject: value(formData, "subject"),
      message: value(formData, "message"),
      createdAt: new Date().toISOString(),
      read: false,
    });
  } catch {
    redirect("/contact?error=storage");
  }

  revalidateTag(CONTENT_TAGS.messages);
  redirect("/contact?sent=1");
}
