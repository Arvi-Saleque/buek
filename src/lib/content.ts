import "server-only";

import { unstable_cache } from "next/cache";
import { ObjectId } from "mongodb";
import {
  defaultAbout,
  defaultAcademic,
  defaultCommittee,
  defaultContact,
  defaultGallery,
  defaultHome,
  defaultNews,
  defaultSettings,
} from "@/lib/defaults";
import { getDb } from "@/lib/db";
import type {
  AcademicPage,
  AboutPage,
  CommitteeMember,
  ContactMessage,
  ContactPage,
  GalleryItem,
  ImageAsset,
  HomePage,
  NewsEvent,
  SiteSettings,
} from "@/lib/types";

const COLLECTIONS = {
  pages: "pages",
  settings: "siteSettings",
  news: "newsEvents",
  gallery: "galleryItems",
  committee: "committeeMembers",
  contactMessages: "contactMessages",
};

const CACHE_SECONDS = 300;
export const CONTENT_TAGS = {
  settings: "site-settings",
  home: "page-home",
  about: "page-about",
  academic: "page-academic",
  contact: "page-contact",
  news: "news-events",
  gallery: "gallery-items",
  committee: "committee-members",
  messages: "contact-messages",
} as const;

function cleanDoc<T>(doc: T & { _id?: unknown }): T {
  const { _id, ...rest } = doc;
  void _id;
  return rest as T;
}

function withId<T extends object>(
  doc: T & { _id?: { toString(): string } },
): Omit<T, "_id"> & { _id?: string } {
  const { _id, ...rest } = doc;
  return { ...rest, _id: _id?.toString() };
}

function mergeContent<T extends object>(fallback: T, value?: Partial<T> | null): T {
  return { ...fallback, ...(value || {}) };
}

function repairImageUrl(url?: string) {
  if (!url) return url;
  return url
    .replace("photo-1581093458791-9d09d43c81f3", "photo-1576086213369-97a306d36557")
    .replace("photo-1523050854058-8df90110c9f1", "photo-1562774053-701939374585");
}

function normalizeImageAsset<T extends ImageAsset | undefined>(image: T): T {
  if (!image?.url) return image;
  return { ...image, url: repairImageUrl(image.url), secureUrl: repairImageUrl(image.secureUrl) } as T;
}

function yearFromEventDate(date?: string) {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : String(parsed.getFullYear());
}

function normalizeGalleryItem(item: GalleryItem): GalleryItem {
  const image = normalizeImageAsset(item.image);
  const coverImage = normalizeImageAsset(item.coverImage) || image || normalizeImageAsset(item.images?.[0]);
  const images = item.images?.length
    ? item.images.map((galleryImage) => normalizeImageAsset(galleryImage))
    : image
      ? [image]
      : [];

  return {
    ...item,
    slug: item.slug || slugify(item.title),
    department: item.department || "General",
    year: item.year || yearFromEventDate(item.eventDate),
    description: item.description || "A curated university photo album.",
    mediaType: item.mediaType || "Photos",
    image,
    coverImage,
    images,
  };
}

async function getSiteSettingsData(): Promise<SiteSettings> {
  try {
    const db = await getDb();
    if (!db) return defaultSettings;
    const doc = await db.collection<SiteSettings & { key: string }>(COLLECTIONS.settings).findOne({ key: "main" });
    return mergeContent(defaultSettings, doc ? cleanDoc(doc) : null);
  } catch {
    return defaultSettings;
  }
}

export const getSiteSettings = unstable_cache(
  getSiteSettingsData,
  ["site-settings"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.settings] },
);

export async function saveSiteSettings(data: SiteSettings) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  await db.collection(COLLECTIONS.settings).updateOne(
    { key: "main" },
    { $set: { ...data, key: "main", updatedAt: new Date().toISOString() } },
    { upsert: true },
  );
}

async function getPage<T extends object>(key: string, fallback: T): Promise<T> {
  try {
    const db = await getDb();
    if (!db) return fallback;
    const doc = await db.collection(COLLECTIONS.pages).findOne({ key });
    return mergeContent(fallback, doc?.content as Partial<T> | undefined);
  } catch {
    return fallback;
  }
}

export async function savePage<T extends object>(key: string, content: T) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  await db.collection(COLLECTIONS.pages).updateOne(
    { key },
    { $set: { key, content, updatedAt: new Date().toISOString() } },
    { upsert: true },
  );
}

export const getHomePage = unstable_cache(
  () => getPage<HomePage>("home", defaultHome),
  ["page-home"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.home] },
);
export const getAboutPage = unstable_cache(
  () => getPage<AboutPage>("about", defaultAbout),
  ["page-about"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.about] },
);
export const getAcademicPage = unstable_cache(
  () => getPage<AcademicPage>("academic", defaultAcademic),
  ["page-academic"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.academic] },
);
export const getContactPage = unstable_cache(
  () => getPage<ContactPage>("contact", defaultContact),
  ["page-contact"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.contact] },
);

async function getCommitteeMembersData(publishedOnly = true): Promise<CommitteeMember[]> {
  try {
    const db = await getDb();
    if (!db) return defaultCommittee.filter((item) => !publishedOnly || item.published);
    const query = publishedOnly ? { published: true } : {};
    const items = await db.collection(COLLECTIONS.committee).find(query).sort({ order: 1, name: 1 }).toArray();
    return items.length ? items.map((item) => withId(item as CommitteeMember & { _id?: ObjectId })) : defaultCommittee.filter((item) => !publishedOnly || item.published);
  } catch {
    return defaultCommittee.filter((item) => !publishedOnly || item.published);
  }
}

export const getCommitteeMembers = unstable_cache(
  getCommitteeMembersData,
  ["committee-members"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.committee] },
);

export async function getCommitteeMember(id: string): Promise<CommitteeMember | null> {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const item = await db.collection(COLLECTIONS.committee).findOne({ _id: new ObjectId(id) });
  return item ? withId(item as CommitteeMember & { _id?: ObjectId }) : null;
}

export async function upsertCommitteeMember(input: CommitteeMember) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  const { _id, ...data } = input;
  if (_id && ObjectId.isValid(_id)) {
    await db.collection(COLLECTIONS.committee).updateOne({ _id: new ObjectId(_id) }, { $set: data });
    return;
  }
  await db.collection(COLLECTIONS.committee).insertOne(data);
}

export async function deleteCommitteeMember(id: string) {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return;
  await db.collection(COLLECTIONS.committee).deleteOne({ _id: new ObjectId(id) });
}

async function getNewsEventsData(publishedOnly = true): Promise<NewsEvent[]> {
  try {
    const db = await getDb();
    if (!db) return defaultNews.filter((item) => !publishedOnly || item.published);
    const query = publishedOnly ? { published: true } : {};
    const items = await db.collection(COLLECTIONS.news).find(query).sort({ date: -1, title: 1 }).toArray();
    return items.length ? items.map((item) => withId(item as NewsEvent & { _id?: ObjectId })) : defaultNews.filter((item) => !publishedOnly || item.published);
  } catch {
    return defaultNews.filter((item) => !publishedOnly || item.published);
  }
}

export const getNewsEvents = unstable_cache(
  getNewsEventsData,
  ["news-events"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.news] },
);

async function getNewsEventBySlugData(slug: string): Promise<NewsEvent | null> {
  try {
    const db = await getDb();
    if (!db) return defaultNews.find((item) => item.slug === slug && item.published) || null;
    const item = await db.collection(COLLECTIONS.news).findOne({ slug, published: true });
    return item
      ? withId(item as NewsEvent & { _id?: ObjectId })
      : defaultNews.find((newsItem) => newsItem.slug === slug && newsItem.published) || null;
  } catch {
    return defaultNews.find((item) => item.slug === slug && item.published) || null;
  }
}

export const getNewsEventBySlug = unstable_cache(
  getNewsEventBySlugData,
  ["news-event-by-slug"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.news] },
);

export async function getNewsEventById(id: string): Promise<NewsEvent | null> {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const item = await db.collection(COLLECTIONS.news).findOne({ _id: new ObjectId(id) });
  return item ? withId(item as NewsEvent & { _id?: ObjectId }) : null;
}

export async function upsertNewsEvent(input: NewsEvent) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  const { _id, ...data } = input;
  if (_id && ObjectId.isValid(_id)) {
    await db.collection(COLLECTIONS.news).updateOne({ _id: new ObjectId(_id) }, { $set: data });
    return;
  }
  await db.collection(COLLECTIONS.news).insertOne(data);
}

export async function deleteNewsEvent(id: string) {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return;
  await db.collection(COLLECTIONS.news).deleteOne({ _id: new ObjectId(id) });
}

export async function deleteAllNewsEvents() {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  await db.collection(COLLECTIONS.news).deleteMany({});
}

async function getGalleryItemsData(publishedOnly = true): Promise<GalleryItem[]> {
  try {
    const db = await getDb();
    if (!db) return defaultGallery.filter((item) => !publishedOnly || item.published);
    const query = publishedOnly ? { published: true } : {};
    const items = await db.collection(COLLECTIONS.gallery).find(query).sort({ order: 1, title: 1 }).toArray();
    return items.length
      ? items.map((item) => normalizeGalleryItem(withId(item as GalleryItem & { _id?: ObjectId })))
      : defaultGallery.filter((item) => !publishedOnly || item.published).map(normalizeGalleryItem);
  } catch {
    return defaultGallery.filter((item) => !publishedOnly || item.published).map(normalizeGalleryItem);
  }
}

export const getGalleryItems = unstable_cache(
  getGalleryItemsData,
  ["gallery-items"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.gallery] },
);

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const item = await db.collection(COLLECTIONS.gallery).findOne({ _id: new ObjectId(id) });
  return item ? normalizeGalleryItem(withId(item as GalleryItem & { _id?: ObjectId })) : null;
}

async function getGalleryItemBySlugData(slug: string): Promise<GalleryItem | null> {
  try {
    const db = await getDb();
    if (!db) {
      const fallback = defaultGallery.find((item) => (item.slug || slugify(item.title)) === slug && item.published);
      return fallback ? normalizeGalleryItem(fallback) : null;
    }
    const item = await db.collection(COLLECTIONS.gallery).findOne({ slug, published: true });
    if (item) return normalizeGalleryItem(withId(item as GalleryItem & { _id?: ObjectId }));

    const publishedItems = await db.collection(COLLECTIONS.gallery).find({ published: true }).toArray();
    const slugMatchedItem = publishedItems.find((galleryItem) => {
      const typedItem = galleryItem as unknown as GalleryItem;
      return (typedItem.slug || slugify(typedItem.title)) === slug;
    });

    return slugMatchedItem
      ? normalizeGalleryItem(withId(slugMatchedItem as GalleryItem & { _id?: ObjectId }))
      : (() => {
          const fallback = defaultGallery.find((galleryItem) => (galleryItem.slug || slugify(galleryItem.title)) === slug && galleryItem.published);
          return fallback ? normalizeGalleryItem(fallback) : null;
        })();
  } catch {
    const fallback = defaultGallery.find((item) => (item.slug || slugify(item.title)) === slug && item.published);
    return fallback ? normalizeGalleryItem(fallback) : null;
  }
}

export const getGalleryItemBySlug = unstable_cache(
  getGalleryItemBySlugData,
  ["gallery-item-by-slug"],
  { revalidate: CACHE_SECONDS, tags: [CONTENT_TAGS.gallery] },
);

export async function upsertGalleryItem(input: GalleryItem) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  const { _id, ...data } = input;
  if (_id && ObjectId.isValid(_id)) {
    await db.collection(COLLECTIONS.gallery).updateOne({ _id: new ObjectId(_id) }, { $set: data });
    return;
  }
  await db.collection(COLLECTIONS.gallery).insertOne(data);
}

export async function deleteGalleryItem(id: string) {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return;
  await db.collection(COLLECTIONS.gallery).deleteOne({ _id: new ObjectId(id) });
}

export async function deleteAllGalleryItems() {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  await db.collection(COLLECTIONS.gallery).deleteMany({});
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function saveContactMessage(message: ContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  await db.collection(COLLECTIONS.contactMessages).insertOne(message);
}

async function getContactMessagesData(): Promise<ContactMessage[]> {
  try {
    const db = await getDb();
    if (!db) return [];
    const messages = await db.collection<ContactMessage>(COLLECTIONS.contactMessages).find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return messages.map(cleanDoc);
  } catch {
    return [];
  }
}

export const getContactMessages = unstable_cache(
  getContactMessagesData,
  ["contact-messages"],
  { revalidate: 60, tags: [CONTENT_TAGS.messages] },
);
