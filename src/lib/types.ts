export type ImageAsset = {
  url: string;
  secureUrl?: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  altText?: string;
};

export type SiteSettings = {
  universityName: string;
  tagline: string;
  logo?: ImageAsset;
  favicon?: ImageAsset;
  address: string;
  phone: string;
  email: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  seoTitle: string;
  seoDescription: string;
};

export type HomeSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
  image?: ImageAsset;
};

export type HomeStat = {
  value: string;
  label: string;
};

export type HomeFeatureCard = {
  title: string;
  body: string;
  href: string;
};

export type HomePage = {
  slides: HomeSlide[];
  stats: HomeStat[];
  introTitle: string;
  introBody: string;
  introImage?: ImageAsset;
  featureTitle: string;
  featureBody: string;
  featureCards: HomeFeatureCard[];
  academicTitle: string;
  academicBody: string;
  noticeTitle: string;
  newsTitle: string;
  newsBody: string;
  galleryTitle: string;
  galleryBody: string;
  notices: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
};

export type AboutPage = {
  aboutTitle: string;
  aboutBody: string;
  aboutImage?: ImageAsset;
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
  chairmanName: string;
  chairmanRole: string;
  chairmanMessage: string;
  chairmanPhoto?: ImageAsset;
};

export type AcademicPage = {
  title: string;
  overview: string;
  programs: string[];
  admissionTitle: string;
  admissionBody: string;
  downloads: { label: string; href: string }[];
};

export type ContactPage = {
  title: string;
  intro: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string;
  mapEmbedUrl?: string;
};

export type CommitteeMember = {
  _id?: string;
  name: string;
  role: string;
  bio?: string;
  order: number;
  published: boolean;
  photo?: ImageAsset;
};

export type NewsEvent = {
  _id?: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
  published: boolean;
  coverImage?: ImageAsset;
};

export type GalleryItem = {
  _id?: string;
  title: string;
  category: string;
  order: number;
  published: boolean;
  image?: ImageAsset;
};

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
};
