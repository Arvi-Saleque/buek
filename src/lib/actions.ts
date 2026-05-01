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
  getAcademicPage,
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
  DepartmentContact,
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

function selectedValues(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function uniqueSelectedValues(formData: FormData, key: string, limit?: number) {
  const values = Array.from(new Set(selectedValues(formData, key)));
  return typeof limit === "number" ? values.slice(0, limit) : values;
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

function quickAccessCards(formData: FormData) {
  const icons = formData.getAll("quickAccessIcon").map((item) => String(item).trim());
  const titles = formData.getAll("quickAccessTitle").map((item) => String(item).trim());
  const subtitles = formData.getAll("quickAccessSubtitle").map((item) => String(item).trim());
  const hrefs = formData.getAll("quickAccessHref").map((item) => String(item).trim());

  return titles
    .map((title, index) => ({
      icon: icons[index] || "ClipboardList",
      title,
      subtitle: subtitles[index] || "",
      href: hrefs[index] || "/",
    }))
    .filter((item) => item.title && item.href);
}

function academicCards(formData: FormData) {
  const icons = formData.getAll("academicCardIcon").map((item) => String(item).trim());
  const titles = formData.getAll("academicCardTitle").map((item) => String(item).trim());

  return titles
    .map((title, index) => ({
      icon: icons[index] || "BookOpen",
      title,
    }))
    .filter((item) => item.title);
}

function aboutWhyCards(formData: FormData) {
  const icons = formData.getAll("aboutWhyItemIcon").map((item) => String(item).trim());
  const titles = formData.getAll("aboutWhyItemTitle").map((item) => String(item).trim());

  return titles
    .map((title, index) => ({
      icon: icons[index] || "GraduationCap",
      title,
    }))
    .filter((item) => item.title);
}

function departmentContacts(formData: FormData): DepartmentContact[] {
  const titles = formData.getAll("departmentTitle").map((item) => String(item).trim());
  const bodies = formData.getAll("departmentBody").map((item) => String(item).trim());
  const emails = formData.getAll("departmentEmail").map((item) => String(item).trim());
  const phones = formData.getAll("departmentPhone").map((item) => String(item).trim());

  return titles
    .map((title, index) => ({
      title,
      body: bodies[index] || "",
      email: emails[index] || "",
      phone: phones[index] || "",
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
  const selectedMainNewsSlug = value(formData, "selectedMainNewsSlug");
  const selectedEventSlugs = selectedValues(formData, "selectedEventSlugs");
  const galleryMosaicImages = await Promise.all(
    [0, 1, 2].map(async (index) =>
      (await imageFromForm(
        formData,
        `galleryMosaicImage${index}`,
        "university/home/gallery",
      )) || current.galleryMosaicImages?.[index],
    ),
  );
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
    introEyebrow: value(formData, "introEyebrow"),
    introTitle: value(formData, "introTitle"),
    introBody: value(formData, "introBody"),
    introHighlight: value(formData, "introHighlight"),
    introImage:
      (await imageFromForm(formData, "introImage", "university/home")) ||
      current.introImage,
    introImageEyebrow: value(formData, "introImageEyebrow"),
    introImageCaption: value(formData, "introImageCaption"),
    statProgramsValue: value(formData, "statProgramsValue"),
    statProgramsLabel: value(formData, "statProgramsLabel"),
    statProgramsDetail: value(formData, "statProgramsDetail"),
    statUpdatesValue: value(formData, "statUpdatesValue"),
    statUpdatesLabel: value(formData, "statUpdatesLabel"),
    statUpdatesDetail: value(formData, "statUpdatesDetail"),
    featureTitle: value(formData, "featureTitle") || current.featureTitle,
    featureBody: value(formData, "featureBody") || current.featureBody,
    featureCards: formData.has("featureCardTitle") ? featureRows(formData) : current.featureCards,
    quickAccessCards: quickAccessCards(formData),
    academicEyebrow: value(formData, "academicEyebrow"),
    academicTitle: value(formData, "academicTitle"),
    academicBody: value(formData, "academicBody"),
    academicButtonLabel: value(formData, "academicButtonLabel"),
    academicButtonHref: value(formData, "academicButtonHref") || "/academic",
    academicCards: academicCards(formData),
    noticeTitle: value(formData, "noticeTitle"),
    noticeEyebrow: value(formData, "noticeEyebrow"),
    noticeButtonLabel: value(formData, "noticeButtonLabel"),
    noticeButtonHref: value(formData, "noticeButtonHref") || "/news-events",
    newsEyebrow: value(formData, "newsEyebrow"),
    newsTitle: value(formData, "newsTitle"),
    newsBody: value(formData, "newsBody"),
    newsButtonLabel: value(formData, "newsButtonLabel"),
    newsButtonHref: value(formData, "newsButtonHref") || "/news-events",
    newsPageEyebrow: formData.has("newsPageEyebrow")
      ? value(formData, "newsPageEyebrow")
      : current.newsPageEyebrow,
    newsPageTitle: formData.has("newsPageTitle")
      ? value(formData, "newsPageTitle")
      : current.newsPageTitle,
    newsPageBody: formData.has("newsPageBody")
      ? value(formData, "newsPageBody")
      : current.newsPageBody,
    selectedMainNewsSlug,
    selectedNewsSlugs: [selectedMainNewsSlug, ...selectedEventSlugs].filter(Boolean),
    selectedNoticeSlugs: selectedValues(formData, "selectedNoticeSlugs"),
    selectedEventSlugs,
    galleryEyebrow: value(formData, "galleryEyebrow"),
    galleryTitle: value(formData, "galleryTitle"),
    galleryBody: value(formData, "galleryBody"),
    galleryQuote: value(formData, "galleryQuote"),
    galleryPrimaryLabel: value(formData, "galleryPrimaryLabel"),
    galleryPrimaryHref: value(formData, "galleryPrimaryHref") || "/gallery",
    gallerySecondaryLabel: value(formData, "gallerySecondaryLabel"),
    gallerySecondaryHref: value(formData, "gallerySecondaryHref") || "/about",
    galleryPageEyebrow: formData.has("galleryPageEyebrow")
      ? value(formData, "galleryPageEyebrow")
      : current.galleryPageEyebrow,
    galleryPageTitle: formData.has("galleryPageTitle")
      ? value(formData, "galleryPageTitle")
      : current.galleryPageTitle,
    galleryPageBody: formData.has("galleryPageBody")
      ? value(formData, "galleryPageBody")
      : current.galleryPageBody,
    galleryMosaicImages: galleryMosaicImages.filter(
      (image): image is ImageAsset => Boolean(image?.url),
    ),
    selectedGallerySlugs: formData.has("selectedGallerySlugs")
      ? uniqueSelectedValues(formData, "selectedGallerySlugs", 3)
      : current.selectedGallerySlugs,
    notices: formData.has("noticeItemTitle") ? notices(formData) : current.notices,
    ctaEyebrow: value(formData, "ctaEyebrow"),
    ctaTitle: value(formData, "ctaTitle"),
    ctaBody: value(formData, "ctaBody"),
    ctaButtonLabel: value(formData, "ctaButtonLabel"),
    ctaHref: value(formData, "ctaHref") || "/academic",
    ctaSecondaryLabel: value(formData, "ctaSecondaryLabel"),
    ctaSecondaryHref: value(formData, "ctaSecondaryHref") || "/contact",
    ctaTrustBadges: lines(formData, "ctaTrustBadges"),
    ctaBackgroundImage:
      (await imageFromForm(formData, "ctaBackgroundImage", "university/home")) ||
      current.ctaBackgroundImage,
  };

  await savePage("home", content);
  refreshPublicContent(CONTENT_TAGS.home);
  redirect("/admin/home?saved=1");
}

export async function saveAboutAction(formData: FormData) {
  const current = await getAboutPage();
  const content: AboutPage = {
    ...current,
    aboutHeroEyebrow: value(formData, "aboutHeroEyebrow"),
    aboutHeroTitle: value(formData, "aboutHeroTitle"),
    aboutHeroBody: value(formData, "aboutHeroBody"),
    aboutIntroEyebrow: value(formData, "aboutIntroEyebrow"),
    aboutTitle: value(formData, "aboutTitle"),
    aboutBody: value(formData, "aboutBody"),
    aboutIntroExtra: value(formData, "aboutIntroExtra"),
    aboutImage: (await imageFromForm(formData, "aboutImage", "university/about")) || current.aboutImage,
    aboutImageBadgeEyebrow: value(formData, "aboutImageBadgeEyebrow"),
    aboutImageBadgeText: value(formData, "aboutImageBadgeText"),
    aboutPrimaryButtonLabel: value(formData, "aboutPrimaryButtonLabel"),
    aboutPrimaryButtonHref: value(formData, "aboutPrimaryButtonHref"),
    aboutSecondaryButtonLabel: value(formData, "aboutSecondaryButtonLabel"),
    aboutSecondaryButtonHref: value(formData, "aboutSecondaryButtonHref"),
    aboutPillarsEyebrow: value(formData, "aboutPillarsEyebrow"),
    aboutPillarsTitle: value(formData, "aboutPillarsTitle"),
    aboutPillars: listItems(formData, "aboutPillars"),
    aboutStatsEyebrow: value(formData, "aboutStatsEyebrow"),
    aboutStatsTitle: value(formData, "aboutStatsTitle"),
    aboutStats: listItems(formData, "aboutStats"),
    aboutJourneyEyebrow: value(formData, "aboutJourneyEyebrow"),
    aboutJourneyTitle: value(formData, "aboutJourneyTitle"),
    aboutJourneyBody: value(formData, "aboutJourneyBody"),
    aboutJourneyItems: listItems(formData, "aboutJourneyItems"),
    aboutWhyEyebrow: value(formData, "aboutWhyEyebrow"),
    aboutWhyTitle: value(formData, "aboutWhyTitle"),
    aboutWhyBody: value(formData, "aboutWhyBody"),
    aboutWhyItems: aboutWhyCards(formData),
    aboutCampusEyebrow: value(formData, "aboutCampusEyebrow"),
    aboutCampusTitle: value(formData, "aboutCampusTitle"),
    aboutCampusBody: value(formData, "aboutCampusBody"),
    aboutCampusFeatures: lines(formData, "aboutCampusFeatures"),
    aboutCampusMainImage:
      (await imageFromForm(formData, "aboutCampusMainImage", "university/about")) ||
      current.aboutCampusMainImage,
    aboutCampusTopImage:
      (await imageFromForm(formData, "aboutCampusTopImage", "university/about")) ||
      current.aboutCampusTopImage,
    aboutCampusBottomImage:
      (await imageFromForm(formData, "aboutCampusBottomImage", "university/about")) ||
      current.aboutCampusBottomImage,
    aboutLeadershipEyebrow: value(formData, "aboutLeadershipEyebrow"),
    aboutLeadershipTitle: value(formData, "aboutLeadershipTitle"),
    aboutLeadershipBody: value(formData, "aboutLeadershipBody"),
    aboutLeadershipPrimaryLabel: value(formData, "aboutLeadershipPrimaryLabel"),
    aboutLeadershipPrimaryHref: value(formData, "aboutLeadershipPrimaryHref"),
    aboutLeadershipSecondaryLabel: value(formData, "aboutLeadershipSecondaryLabel"),
    aboutLeadershipSecondaryHref: value(formData, "aboutLeadershipSecondaryHref"),
    aboutCtaEyebrow: value(formData, "aboutCtaEyebrow"),
    aboutCtaTitle: value(formData, "aboutCtaTitle"),
    aboutCtaBody: value(formData, "aboutCtaBody"),
    aboutCtaPrimaryLabel: value(formData, "aboutCtaPrimaryLabel"),
    aboutCtaPrimaryHref: value(formData, "aboutCtaPrimaryHref"),
    aboutCtaSecondaryLabel: value(formData, "aboutCtaSecondaryLabel"),
    aboutCtaSecondaryHref: value(formData, "aboutCtaSecondaryHref"),
    aboutCtaImage:
      (await imageFromForm(formData, "aboutCtaImage", "university/about")) ||
      current.aboutCtaImage,
  };

  await savePage("about", content);
  refreshPublicContent(CONTENT_TAGS.about);
  redirect("/admin/about?saved=1");
}

export async function saveMissionVisionAction(formData: FormData) {
  const current = await getAboutPage();
  const content: AboutPage = {
    ...current,
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
  };

  await savePage("about", content);
  refreshPublicContent(CONTENT_TAGS.about);
  redirect("/admin/mission-vision?saved=1");
}

export async function saveChairmanMessageAction(formData: FormData) {
  const current = await getAboutPage();
  const content: AboutPage = {
    ...current,
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
  };

  await savePage("about", content);
  refreshPublicContent(CONTENT_TAGS.about);
  redirect("/admin/chairman-message?saved=1");
}

export async function saveCommitteePageAction(formData: FormData) {
  const current = await getAboutPage();
  const content: AboutPage = {
    ...current,
    committeeSubtitle: value(formData, "committeeSubtitle"),
    committeeIntro: value(formData, "committeeIntro"),
    committeeResponsibilities: listItems(formData, "committeeResponsibilities"),
    committeeLeadershipEyebrow: value(formData, "committeeLeadershipEyebrow"),
    committeeLeadershipTitle: value(formData, "committeeLeadershipTitle"),
    committeeLeadershipBody: value(formData, "committeeLeadershipBody"),
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
  redirect("/admin/committee?saved=1");
}

export async function saveAcademicAction(formData: FormData) {
  const current = await getAcademicPage();
  const content: AcademicPage = {
    title: value(formData, "title"),
    overview: value(formData, "overview"),
    heroEyebrow: value(formData, "heroEyebrow"),
    heroImage:
      (await imageFromForm(formData, "heroImage", "university/academic")) ||
      current.heroImage,
    programCardBody: value(formData, "programCardBody"),
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
    heroLabel: value(formData, "heroLabel"),
    heroTitle: value(formData, "heroTitle"),
    heroSubtitle: value(formData, "heroSubtitle"),
    address: value(formData, "address"),
    addressNote: value(formData, "addressNote"),
    phone: value(formData, "phone"),
    phoneNote: value(formData, "phoneNote"),
    email: value(formData, "email"),
    emailNote: value(formData, "emailNote"),
    officeHours: value(formData, "officeHours"),
    officeHoursNote: value(formData, "officeHoursNote"),
    formTitle: value(formData, "formTitle"),
    formBody: value(formData, "formBody"),
    mapTitle: value(formData, "mapTitle"),
    mapEmbedUrl: value(formData, "mapEmbedUrl"),
    mapDirectionUrl: value(formData, "mapDirectionUrl"),
    mapNote: value(formData, "mapNote"),
    departments: departmentContacts(formData),
    urgentTitle: value(formData, "urgentTitle"),
    urgentBody: value(formData, "urgentBody"),
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
  redirect("/admin/committee?saved=1#members");
}

export async function deleteCommitteeMemberAction(formData: FormData) {
  await deleteCommitteeMember(value(formData, "id"));
  refreshPublicContent(CONTENT_TAGS.committee);
  redirect("/admin/committee?deleted=1#members");
}

export async function submitContactAction(formData: FormData) {
  try {
    await saveContactMessage({
      name: value(formData, "name"),
      email: value(formData, "email"),
      phone: value(formData, "phone"),
      inquiryType: value(formData, "inquiryType"),
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
