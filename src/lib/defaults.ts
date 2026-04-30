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
        url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1800&q=85",
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
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85",
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
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85",
    altText: "Graduates celebrating on campus",
  },
  missionIntroTitle: "Shaping the Future Through Knowledge and Values",
  missionIntroBody:
    "Bangladesh University of Engineering Knowledge is committed to building a learning environment where students gain knowledge, develop practical skills, and grow as responsible citizens. Our mission and vision guide every academic, administrative, and development activity of the university.",
  missionTitle: "Mission",
  missionBody:
    "To deliver excellent education, create useful knowledge, and develop graduates who serve with competence, integrity, and compassion.",
  missionPoints: [
    {
      title: "Quality Higher Education",
      body: "Provide modern curriculum, experienced faculty, and strong academic standards.",
    },
    {
      title: "Student Development",
      body: "Develop academic knowledge, practical skill, communication, and ethical values.",
    },
    {
      title: "Research & Innovation",
      body: "Promote discovery, applied projects, and problem-solving for society and industry.",
    },
    {
      title: "Supportive Environment",
      body: "Create an inclusive, disciplined, and student-centered learning culture.",
    },
    {
      title: "Partnerships",
      body: "Build meaningful links with industry, community, and academic institutions.",
    },
    {
      title: "Future Readiness",
      body: "Prepare graduates for leadership, employment, entrepreneurship, and lifelong learning.",
    },
  ],
  visionTitle: "Vision",
  visionBody:
    "To become a respected center of learning and research that contributes to national and global progress.",
  coreValues: [
    { title: "Academic Excellence", body: "We pursue high standards in teaching, learning, and assessment." },
    { title: "Integrity", body: "We uphold honesty, transparency, and ethical responsibility." },
    { title: "Innovation", body: "We encourage creative thinking, research, and practical solutions." },
    { title: "Inclusiveness", body: "We value respect, opportunity, and belonging for every learner." },
    { title: "Discipline", body: "We maintain a focused, responsible, and professional academic culture." },
    { title: "Social Responsibility", body: "We prepare students to serve society with purpose and care." },
    { title: "Leadership", body: "We build confidence, judgment, and the capacity to guide positive change." },
    { title: "Lifelong Learning", body: "We inspire continuous growth beyond graduation." },
  ],
  strategicFocus: [
    { title: "Student-Centered Learning", body: "Modern teaching, mentoring, advising, and academic support." },
    { title: "Research & Innovation", body: "Encouraging discovery, projects, and applied research." },
    { title: "Industry Readiness", body: "Skill development, internships, and career preparation." },
    { title: "Community Impact", body: "Social responsibility, outreach, and national development." },
  ],
  missionQuote:
    "Education is not only about earning a degree; it is about building character, confidence, and the ability to serve society.",
  missionQuoteSource: "Bangladesh University of Engineering Knowledge",
  missionCtaTitle: "Be Part of Our Academic Journey",
  missionCtaBody:
    "Explore our academic programs and discover how BUEK can help you build a meaningful future.",
  missionCtaPrimaryLabel: "Explore Academic Programs",
  missionCtaPrimaryHref: "/academic",
  missionCtaSecondaryLabel: "Contact Us",
  missionCtaSecondaryHref: "/contact",
  chairmanName: "Professor A. Rahman",
  chairmanRole: "Chairman, Board of Trustees",
  chairmanQuote:
    "Education must prepare students not only for successful careers, but also for responsible leadership and meaningful service to society.",
  chairmanIntro:
    "Under his leadership, BUEK continues to focus on academic excellence, disciplined governance, student-centered learning, and the development of future-ready graduates.",
  chairmanMessage:
    "Dear Students, Guardians, Faculty Members, and Well-Wishers,\n\nIt is my great pleasure to welcome you to Bangladesh University of Engineering Knowledge. Our university has been established with a clear commitment to quality education, ethical values, academic discipline, and the development of skilled graduates who can contribute meaningfully to society.\n\nAt BUEK, we believe that higher education should go beyond classroom learning. It should inspire students to think critically, act responsibly, communicate confidently, and solve real-world problems. Our academic programs, experienced faculty members, and student-focused environment are designed to help learners grow intellectually, professionally, and personally.\n\nWe are committed to creating an institution where knowledge, innovation, integrity, and service work together. Through modern curriculum, practical learning, research opportunities, and industry-relevant education, we aim to prepare our students for future careers, leadership roles, and lifelong learning.\n\nI invite students, guardians, educators, and partners to join us in building a university that represents excellence, responsibility, and progress. Together, we can shape a brighter future for the next generation.",
  chairmanPhoto: {
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    altText: "Chairman portrait",
  },
  chairmanCommitments: [
    { title: "Academic Excellence", body: "Quality teaching, structured curriculum, and continuous improvement." },
    { title: "Student Development", body: "Confidence, discipline, communication, leadership, and career preparation." },
    { title: "Ethical Governance", body: "Transparency, responsibility, institutional integrity, and fair administration." },
    { title: "Future-Ready Education", body: "Innovation, research, technology, industry collaboration, and employability." },
  ],
  chairmanPriorities: [
    { title: "Strengthening Academic Programs", body: "Continuous review of curriculum, teaching quality, and academic outcomes." },
    { title: "Expanding Modern Facilities", body: "Laboratories, digital classrooms, and practical learning resources." },
    { title: "Promoting Research", body: "Encouraging innovation, applied projects, and knowledge creation." },
    { title: "Building Partnerships", body: "Industry, community, and academic collaboration for student opportunity." },
    { title: "Supporting Students", body: "Mentoring, advising, career guidance, and a disciplined campus culture." },
    { title: "Ensuring Quality Governance", body: "Accreditation, accountability, and institutional integrity." },
  ],
  chairmanClosingNote:
    "Warm regards",
  chairmanRelatedLinks: [
    { title: "Mission & Vision", body: "/about/mission-vision" },
    { title: "Academic Programs", body: "/academic" },
    { title: "Committee", body: "/about/committee" },
    { title: "Contact Us", body: "/contact" },
  ],
  committeeSubtitle:
    "Meet the members responsible for academic planning, quality assurance, curriculum development, and institutional excellence.",
  committeeIntro:
    "The Academic Committee oversees curriculum development, academic policies, examination standards, faculty coordination, and student academic progress. The committee ensures that the university maintains strong educational standards and follows its academic mission effectively.",
  committeeResponsibilities: [
    { title: "Curriculum Review", body: "Planning, reviewing, and improving academic programs." },
    { title: "Academic Policy", body: "Developing policies that support quality teaching and learning." },
    { title: "Examination Monitoring", body: "Maintaining fair evaluation and examination standards." },
    { title: "Faculty Coordination", body: "Supporting collaboration among departments and faculty members." },
    { title: "Student Progress", body: "Reviewing academic progress and student support needs." },
    { title: "Quality Assurance", body: "Supporting accreditation, compliance, and institutional excellence." },
  ],
  committeeMeetingTitle: "Regular Meeting Schedule",
  committeeMeetingBody:
    "The Academic Committee meets regularly to review academic activities, curriculum progress, examination standards, and student-related academic matters.",
  committeeMeetingFrequency: "Monthly / As required",
  committeeMeetingOffice: "Academic Affairs Office",
  committeeMeetingEmail: "academic@example.edu",
  committeeDocuments: [
    { title: "Academic Committee Policy", body: "#" },
    { title: "Meeting Guidelines", body: "#" },
    { title: "Academic Calendar", body: "#" },
    { title: "Examination Policy", body: "#" },
  ],
  committeeCtaTitle: "Need Academic Committee Support?",
  committeeCtaBody:
    "For academic committee-related inquiries, please contact the Academic Affairs Office.",
  committeeCtaButtonLabel: "Contact Academic Office",
  committeeCtaButtonHref: "/contact",
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
    "Faculty of Law",
    "Faculty of Health Sciences",
    "Faculty of Education",
    "Faculty of Social Sciences",
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
    role: "Professor & Head",
    committeeRole: "Chairperson",
    department: "Department of Computer Science & Engineering",
    email: "nusrat@example.edu",
    officePhone: "+880-XXX-XXXX",
    bio: "Oversees academic standards and curriculum development.",
    order: 1,
    published: true,
  },
  {
    name: "Engr. Mahmud Hasan",
    role: "Associate Professor",
    committeeRole: "Secretary",
    department: "Department of Electrical & Electronic Engineering",
    email: "mahmud@example.edu",
    officePhone: "+880-XXX-XXXX",
    bio: "Guides campus planning and technology initiatives.",
    order: 2,
    published: true,
  },
  {
    name: "Dr. Farhana Kabir",
    role: "Assistant Professor",
    committeeRole: "Member",
    department: "Department of Business Administration",
    email: "farhana@example.edu",
    officePhone: "+880-XXX-XXXX",
    bio: "Supports policy review, academic planning, and student progress monitoring.",
    order: 3,
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
      url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=85",
      altText: "Students working in a laboratory",
    },
  },
];
