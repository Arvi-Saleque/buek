"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  getAdminCredentials,
  setAdminSession,
} from "@/lib/auth";
import { uploadFormImage } from "@/lib/cloudinary";
import {
  deleteCommitteeMember,
  deleteGalleryItem,
  deleteNewsEvent,
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
  HomePage,
  ImageAsset,
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

function lines(formData: FormData, key: string) {
  return value(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
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
  revalidatePath("/", "layout");
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
    notices: lines(formData, "notices"),
    ctaTitle: value(formData, "ctaTitle"),
    ctaBody: value(formData, "ctaBody"),
    ctaButtonLabel: value(formData, "ctaButtonLabel"),
    ctaHref: value(formData, "ctaHref") || "/academic",
  };

  await savePage("home", content);
  revalidatePath("/");
  redirect("/admin/home?saved=1");
}

export async function saveAboutAction(formData: FormData) {
  const current = await getAboutPage();
  const content: AboutPage = {
    aboutTitle: value(formData, "aboutTitle"),
    aboutBody: value(formData, "aboutBody"),
    aboutImage: (await imageFromForm(formData, "aboutImage", "university/about")) || current.aboutImage,
    missionTitle: value(formData, "missionTitle"),
    missionBody: value(formData, "missionBody"),
    visionTitle: value(formData, "visionTitle"),
    visionBody: value(formData, "visionBody"),
    chairmanName: value(formData, "chairmanName"),
    chairmanRole: value(formData, "chairmanRole"),
    chairmanMessage: value(formData, "chairmanMessage"),
    chairmanPhoto:
      (await imageFromForm(formData, "chairmanPhoto", "university/about")) ||
      current.chairmanPhoto,
  };

  await savePage("about", content);
  revalidatePath("/about", "layout");
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
  revalidatePath("/academic");
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
  revalidatePath("/contact");
  redirect("/admin/contact?saved=1");
}

export async function saveNewsEventAction(formData: FormData) {
  const title = value(formData, "title");
  const slug = value(formData, "slug") || slugify(title);
  const coverImage = await imageFromForm(formData, "coverImage", "university/news");

  await upsertNewsEvent({
    _id: value(formData, "id") || undefined,
    title,
    slug,
    date: value(formData, "date"),
    category: value(formData, "category"),
    excerpt: value(formData, "excerpt"),
    body: value(formData, "body"),
    published: booleanValue(formData, "published"),
    coverImage,
  });

  revalidatePath("/news-events", "layout");
  redirect("/admin/news-events?saved=1");
}

export async function deleteNewsEventAction(formData: FormData) {
  await deleteNewsEvent(value(formData, "id"));
  revalidatePath("/news-events", "layout");
  redirect("/admin/news-events?deleted=1");
}

export async function saveGalleryItemAction(formData: FormData) {
  await upsertGalleryItem({
    _id: value(formData, "id") || undefined,
    title: value(formData, "title"),
    category: value(formData, "category"),
    order: numberValue(formData, "order"),
    published: booleanValue(formData, "published"),
    image: await imageFromForm(formData, "image", "university/gallery"),
  });

  revalidatePath("/gallery");
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryItemAction(formData: FormData) {
  await deleteGalleryItem(value(formData, "id"));
  revalidatePath("/gallery");
  redirect("/admin/gallery?deleted=1");
}

export async function saveCommitteeMemberAction(formData: FormData) {
  await upsertCommitteeMember({
    _id: value(formData, "id") || undefined,
    name: value(formData, "name"),
    role: value(formData, "role"),
    bio: value(formData, "bio"),
    order: numberValue(formData, "order"),
    published: booleanValue(formData, "published"),
    photo: await imageFromForm(formData, "photo", "university/committee"),
  });

  revalidatePath("/about/committee");
  redirect("/admin/about?saved=1#committee");
}

export async function deleteCommitteeMemberAction(formData: FormData) {
  await deleteCommitteeMember(value(formData, "id"));
  revalidatePath("/about/committee");
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

  redirect("/contact?sent=1");
}
