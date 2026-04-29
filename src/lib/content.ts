import "server-only";

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

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const db = await getDb();
    if (!db) return defaultSettings;
    const doc = await db.collection<SiteSettings & { key: string }>(COLLECTIONS.settings).findOne({ key: "main" });
    return mergeContent(defaultSettings, doc ? cleanDoc(doc) : null);
  } catch {
    return defaultSettings;
  }
}

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

export const getHomePage = () => getPage<HomePage>("home", defaultHome);
export const getAboutPage = () => getPage<AboutPage>("about", defaultAbout);
export const getAcademicPage = () => getPage<AcademicPage>("academic", defaultAcademic);
export const getContactPage = () => getPage<ContactPage>("contact", defaultContact);

export async function getCommitteeMembers(publishedOnly = true): Promise<CommitteeMember[]> {
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

export async function getNewsEvents(publishedOnly = true): Promise<NewsEvent[]> {
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

export async function getNewsEventBySlug(slug: string): Promise<NewsEvent | null> {
  const db = await getDb();
  if (!db) return defaultNews.find((item) => item.slug === slug && item.published) || null;
  const item = await db.collection(COLLECTIONS.news).findOne({ slug, published: true });
  return item ? withId(item as NewsEvent & { _id?: ObjectId }) : null;
}

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

export async function getGalleryItems(publishedOnly = true): Promise<GalleryItem[]> {
  try {
    const db = await getDb();
    if (!db) return defaultGallery.filter((item) => !publishedOnly || item.published);
    const query = publishedOnly ? { published: true } : {};
    const items = await db.collection(COLLECTIONS.gallery).find(query).sort({ order: 1, title: 1 }).toArray();
    return items.length ? items.map((item) => withId(item as GalleryItem & { _id?: ObjectId })) : defaultGallery.filter((item) => !publishedOnly || item.published);
  } catch {
    return defaultGallery.filter((item) => !publishedOnly || item.published);
  }
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const db = await getDb();
  if (!db || !ObjectId.isValid(id)) return null;
  const item = await db.collection(COLLECTIONS.gallery).findOne({ _id: new ObjectId(id) });
  return item ? withId(item as GalleryItem & { _id?: ObjectId }) : null;
}

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

export async function saveContactMessage(message: ContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("MongoDB is not configured.");
  await db.collection(COLLECTIONS.contactMessages).insertOne(message);
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const db = await getDb();
  if (!db) return [];
  const messages = await db.collection<ContactMessage>(COLLECTIONS.contactMessages).find({}).sort({ createdAt: -1 }).limit(100).toArray();
  return messages.map(cleanDoc);
}
