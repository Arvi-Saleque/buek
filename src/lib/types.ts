export type ImageAsset = {
  url: string;
  secureUrl?: string;
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  altText?: string;
};

export type EditableListItem = {
  title: string;
  body: string;
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

export type HomeFeatureCard = {
  title: string;
  body: string;
  href: string;
};

export type HomeNotice = {
  title: string;
  body: string;
  category: string;
  date: string;
};

export type HomePage = {
  slides: HomeSlide[];
  introEyebrow?: string;
  introTitle: string;
  introBody: string;
  introHighlight?: string;
  introImage?: ImageAsset;
  introImageEyebrow?: string;
  introImageCaption?: string;
  statProgramsLabel?: string;
  statProgramsDetail?: string;
  statUpdatesLabel?: string;
  statUpdatesDetail?: string;
  featureTitle: string;
  featureBody: string;
  featureCards: HomeFeatureCard[];
  academicTitle: string;
  academicBody: string;
  academicEyebrow?: string;
  academicButtonLabel?: string;
  academicButtonHref?: string;
  noticeTitle: string;
  noticeEyebrow?: string;
  noticeButtonLabel?: string;
  noticeButtonHref?: string;
  newsTitle: string;
  newsBody: string;
  newsEyebrow?: string;
  newsButtonLabel?: string;
  newsButtonHref?: string;
  selectedNewsSlugs?: string[];
  selectedNoticeSlugs?: string[];
  galleryTitle: string;
  galleryBody: string;
  galleryEyebrow?: string;
  galleryQuote?: string;
  galleryPrimaryLabel?: string;
  galleryPrimaryHref?: string;
  gallerySecondaryLabel?: string;
  gallerySecondaryHref?: string;
  selectedGallerySlugs?: string[];
  notices: HomeNotice[];
  ctaEyebrow?: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaTrustBadges?: string[];
  ctaBackgroundImage?: ImageAsset;
};

export type AboutPage = {
  aboutTitle: string;
  aboutBody: string;
  aboutImage?: ImageAsset;
  missionIntroTitle?: string;
  missionIntroBody?: string;
  missionTitle: string;
  missionBody: string;
  missionPoints?: EditableListItem[];
  visionTitle: string;
  visionBody: string;
  coreValues?: EditableListItem[];
  strategicFocus?: EditableListItem[];
  missionQuote?: string;
  missionQuoteSource?: string;
  missionCtaTitle?: string;
  missionCtaBody?: string;
  missionCtaPrimaryLabel?: string;
  missionCtaPrimaryHref?: string;
  missionCtaSecondaryLabel?: string;
  missionCtaSecondaryHref?: string;
  chairmanName: string;
  chairmanRole: string;
  chairmanQuote?: string;
  chairmanIntro?: string;
  chairmanMessage: string;
  chairmanPhoto?: ImageAsset;
  chairmanCommitments?: EditableListItem[];
  chairmanPriorities?: EditableListItem[];
  chairmanClosingNote?: string;
  chairmanRelatedLinks?: EditableListItem[];
  committeeSubtitle?: string;
  committeeIntro?: string;
  committeeResponsibilities?: EditableListItem[];
  committeeLeadershipEyebrow?: string;
  committeeLeadershipTitle?: string;
  committeeLeadershipBody?: string;
  committeeMeetingTitle?: string;
  committeeMeetingBody?: string;
  committeeMeetingFrequency?: string;
  committeeMeetingOffice?: string;
  committeeMeetingEmail?: string;
  committeeDocuments?: EditableListItem[];
  committeeCtaTitle?: string;
  committeeCtaBody?: string;
  committeeCtaButtonLabel?: string;
  committeeCtaButtonHref?: string;
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
  heroLabel?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  address: string;
  addressNote?: string;
  phone: string;
  phoneNote?: string;
  email: string;
  emailNote?: string;
  officeHours: string;
  officeHoursNote?: string;
  formTitle?: string;
  formBody?: string;
  mapTitle?: string;
  mapEmbedUrl?: string;
  mapDirectionUrl?: string;
  mapNote?: string;
  departments?: DepartmentContact[];
  urgentTitle?: string;
  urgentBody?: string;
};

export type DepartmentContact = {
  title: string;
  body: string;
  email: string;
  phone: string;
};

export type CommitteeMember = {
  _id?: string;
  name: string;
  role: string;
  committeeRole?: string;
  department?: string;
  email?: string;
  officePhone?: string;
  profileUrl?: string;
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
  department?: string;
  excerpt: string;
  body: string;
  published: boolean;
  featured?: boolean;
  coverImage?: ImageAsset;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  organizer?: string;
  eventStatus?: "Upcoming" | "Ongoing" | "Completed";
  registrationLink?: string;
  pdfUrl?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type GalleryItem = {
  _id?: string;
  title: string;
  slug?: string;
  category: string;
  department?: string;
  year?: string;
  eventDate?: string;
  description?: string;
  order: number;
  published: boolean;
  featured?: boolean;
  image?: ImageAsset;
  coverImage?: ImageAsset;
  images?: GalleryImage[];
  mediaType?: "Photos" | "Videos";
  videoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type GalleryImage = ImageAsset & {
  title?: string;
  caption?: string;
  order?: number;
  uploadedAt?: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
};
