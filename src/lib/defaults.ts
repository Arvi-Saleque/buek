import type {
  AcademicPage,
  AboutPage,
  CommitteeMember,
  ContactPage,
  GalleryItem,
  HomePage,
  NewsEvent,
  SiteSettings,
} from "@/lib/types";

export const defaultSettings: SiteSettings = {
  universityName: "Bangladesh University of Engineering Knowledge",
  tagline: "Educating leaders for a changing world",
  address: "Khulna, Bangladesh",
  phone: "+880 1700-000000",
  email: "info@example.edu",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "https://linkedin.com",
  seoTitle: "Bangladesh University of Engineering Knowledge",
  seoDescription:
    "A modern university website with academic programs, news, events, gallery, and contact information.",
};

export const defaultHome: HomePage = {
  slides: [
    {
      eyebrow: "Admission Open",
      title: "A university built for knowledge, character, and leadership",
      subtitle:
        "Explore a forward-looking academic community where teaching, research, and service come together.",
      buttonLabel: "Explore Academic",
      buttonHref: "/academic",
      image: {
        url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85",
        altText: "University campus building",
      },
    },
    {
      eyebrow: "Research & Innovation",
      title: "Where practical learning meets real-world ambition",
      subtitle:
        "Students work with dedicated faculty, active labs, and a campus culture shaped by curiosity and discipline.",
      buttonLabel: "View Programs",
      buttonHref: "/academic",
      image: {
        url: "https://images.unsplash.com/photo-1581093458791-9d09d43c81f3?auto=format&fit=crop&w=1800&q=85",
        altText: "Students working in a laboratory",
      },
    },
    {
      eyebrow: "Campus Life",
      title: "A vibrant academic home for the next generation",
      subtitle:
        "From classrooms to clubs, every part of the campus experience is designed to help students grow.",
      buttonLabel: "Visit Gallery",
      buttonHref: "/gallery",
      image: {
        url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=85",
        altText: "Students celebrating graduation",
      },
    },
  ],
  introTitle: "Welcome to our academic community",
  introBody:
    "We prepare students with practical knowledge, ethical judgment, and the confidence to serve society through meaningful work.",
  introImage: {
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=85",
    altText: "Graduates celebrating on campus",
  },
  featureTitle: "Important Campus Information",
  featureBody:
    "Quick access to the areas students, guardians, and visitors need most.",
  featureCards: [
    {
      title: "Admissions",
      body: "Eligibility, application guidance, deadlines, and admission office support.",
      href: "/academic",
    },
    {
      title: "Academic Programs",
      body: "Faculty information, program overview, curriculum direction, and resources.",
      href: "/academic",
    },
    {
      title: "Student Support",
      body: "Campus services, academic advising, office hours, and contact information.",
      href: "/contact",
    },
  ],
  academicTitle: "Academic Excellence With Purpose",
  academicBody:
    "Programs are organized to build strong foundations, professional skill, ethical judgment, and leadership capacity.",
  noticeTitle: "Important Notices",
  newsTitle: "Latest News & Events",
  newsBody:
    "Stay connected with university announcements, academic updates, events, and campus stories.",
  galleryTitle: "Life On Campus",
  galleryBody:
    "A glimpse of learning spaces, student life, ceremonies, and institutional moments.",
  notices: [
    {
      title: "Admission Notice",
      body: "Spring semester admission information will be published soon.",
      category: "Admission",
      date: "2026-04-20",
    },
    {
      title: "Academic Calendar",
      body: "Academic calendar and class schedules are available from the registrar office.",
      category: "Academic",
      date: "2026-04-18",
    },
    {
      title: "Research Assistant Positions",
      body: "Applications are open for research assistant positions.",
      category: "Research",
      date: "2026-04-12",
    },
  ],
  ctaTitle: "Begin your academic journey",
  ctaBody:
    "Learn about programs, admission steps, and the support available to every student.",
  ctaButtonLabel: "Contact Admission Office",
  ctaHref: "/academic",
};

export const defaultAbout: AboutPage = {
  aboutTitle: "About the University",
  aboutBody:
    "Our university combines rigorous academic standards with a supportive environment for students, faculty, and the wider community. We value research, innovation, cultural understanding, and public service.",
  aboutImage: {
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=85",
    altText: "Graduates celebrating on campus",
  },
  missionTitle: "Mission",
  missionBody:
    "To deliver excellent education, create useful knowledge, and develop graduates who serve with competence, integrity, and compassion.",
  visionTitle: "Vision",
  visionBody:
    "To become a respected center of learning and research that contributes to national and global progress.",
  chairmanName: "Professor A. Rahman",
  chairmanRole: "Chairman, Board of Trustees",
  chairmanMessage:
    "Education is one of the most meaningful investments a society can make. Our commitment is to build an institution where students learn deeply, think independently, and act responsibly.",
  chairmanPhoto: {
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    altText: "Chairman portrait",
  },
};

export const defaultAcademic: AcademicPage = {
  title: "Academic Programs",
  overview:
    "Our academic programs are designed around strong foundations, practical learning, and opportunities for research and industry engagement.",
  programs: [
    "Faculty of Engineering and Technology",
    "Faculty of Business and Economics",
    "Faculty of Arts and Social Sciences",
    "Faculty of Science",
  ],
  admissionTitle: "Admission Process",
  admissionBody:
    "Admission details, eligibility, deadlines, and required documents are published by the admission office before each intake.",
  downloads: [
    { label: "Academic Calendar", href: "#" },
    { label: "Admission Guide", href: "#" },
  ],
};

export const defaultContact: ContactPage = {
  title: "Contact Us",
  intro:
    "Reach the university office for admission, academic, media, and general inquiries.",
  address: defaultSettings.address,
  phone: defaultSettings.phone,
  email: defaultSettings.email,
  officeHours: "Sunday to Thursday, 9:00 AM - 5:00 PM",
  mapEmbedUrl: "",
};

export const defaultCommittee: CommitteeMember[] = [
  {
    name: "Dr. Nusrat Jahan",
    role: "Academic Council Member",
    bio: "Oversees academic standards and curriculum development.",
    order: 1,
    published: true,
  },
  {
    name: "Engr. Mahmud Hasan",
    role: "Infrastructure Committee Member",
    bio: "Guides campus planning and technology initiatives.",
    order: 2,
    published: true,
  },
];

export const defaultNews: NewsEvent[] = [
  {
    title: "Orientation program welcomes the new intake",
    slug: "orientation-program-welcomes-new-intake",
    date: "2026-04-15",
    category: "Event",
    excerpt:
      "New students joined faculty members and university leaders for the semester orientation program.",
    body: "The university welcomed its newest students through a full-day orientation program featuring academic briefings, student support sessions, and campus tours.",
    published: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1400&q=85",
      altText: "Students attending an event",
    },
  },
  {
    title: "Research seminar series announced",
    slug: "research-seminar-series-announced",
    date: "2026-04-03",
    category: "News",
    excerpt:
      "Faculty researchers will present ongoing work in engineering, business, science, and social impact.",
    body: "The seminar series is open to students and faculty. Each session will include a presentation and moderated discussion.",
    published: true,
  },
  {
    title: "Cultural week celebrates student creativity",
    slug: "cultural-week-celebrates-student-creativity",
    date: "2026-03-28",
    category: "Campus",
    excerpt:
      "Students presented music, debate, theatre, and academic exhibitions during the annual cultural week.",
    body: "The annual cultural week brought together students, faculty, and guests for a series of programs celebrating creativity, leadership, and campus collaboration.",
    published: true,
    coverImage: {
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
      altText: "University cultural event",
    },
  },
];

export const defaultGallery: GalleryItem[] = [
  {
    title: "Campus central library",
    category: "Campus",
    order: 1,
    published: true,
    image: {
      url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=85",
      altText: "University library",
    },
  },
  {
    title: "Convocation ceremony",
    category: "Events",
    order: 2,
    published: true,
    image: {
      url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=85",
      altText: "Students at graduation",
    },
  },
  {
    title: "Laboratory learning",
    category: "Academic",
    order: 3,
    published: true,
    image: {
      url: "https://images.unsplash.com/photo-1581093458791-9d09d43c81f3?auto=format&fit=crop&w=1400&q=85",
      altText: "Students working in a laboratory",
    },
  },
];
