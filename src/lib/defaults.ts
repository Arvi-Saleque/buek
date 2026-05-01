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
  introEyebrow: "Academic Community",
  introTitle: "Welcome to our academic community",
  introBody:
    "We prepare students with practical knowledge, ethical judgment, and the confidence to serve society through meaningful work.",
  introHighlight:
    "A modern academic environment focused on practical knowledge, discipline, research, and professional growth.",
  introImage: {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85",
    altText: "Graduates celebrating on campus",
  },
  introImageEyebrow: "Campus Focus",
  introImageCaption:
    "Quality education, disciplined learning, and practical growth.",
  statProgramsValue: "",
  statProgramsLabel: "Academic programs",
  statProgramsDetail: "Academic Programs",
  statUpdatesValue: "",
  statUpdatesLabel: "Published updates",
  statUpdatesDetail: "News, events, and campus notices",
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
  quickAccessCards: [
    { icon: "ClipboardList", title: "Admissions", subtitle: "How to apply", href: "/contact" },
    { icon: "GraduationCap", title: "Academic Programs", subtitle: "Courses & faculty", href: "/academic" },
    { icon: "HeartHandshake", title: "Student Support", subtitle: "Guidance & welfare", href: "/contact" },
    { icon: "Bell", title: "Notice Board", subtitle: "Latest notices", href: "/news-events" },
    { icon: "FileText", title: "Apply Now", subtitle: "Start your journey", href: "/contact" },
  ],
  academicEyebrow: "Academics",
  academicTitle: "Academic Excellence With Purpose",
  academicBody:
    "Programs are organized to build strong foundations, professional skill, ethical judgment, and leadership capacity.",
  academicButtonLabel: "View all programs",
  academicButtonHref: "/academic",
  academicCards: [
    { icon: "Cpu", title: "Engineering" },
    { icon: "Briefcase", title: "Business Administration" },
    { icon: "Microscope", title: "Science & Research" },
    { icon: "Scale", title: "Law & Governance" },
    { icon: "Stethoscope", title: "Health Sciences" },
    { icon: "Sprout", title: "Agriculture" },
    { icon: "BookOpen", title: "Education" },
    { icon: "Landmark", title: "Humanities" },
  ],
  noticeTitle: "Important Notices",
  noticeEyebrow: "Notice Board",
  noticeButtonLabel: "View all notices",
  noticeButtonHref: "/news-events",
  newsEyebrow: "Stay Informed",
  newsTitle: "Latest News & Events",
  newsBody:
    "Stay connected with university announcements, academic updates, events, and campus stories.",
  newsButtonLabel: "All news & events",
  newsButtonHref: "/news-events",
  newsPageEyebrow: "Campus Updates",
  newsPageTitle: "News & Events",
  newsPageBody:
    "Stay updated with the latest academic news, campus events, notices, and institutional announcements.",
  selectedMainNewsSlug: "",
  selectedNewsSlugs: [],
  selectedNoticeSlugs: [],
  selectedEventSlugs: [],
  galleryEyebrow: "Campus Life",
  galleryTitle: "Life On Campus",
  galleryBody:
    "A glimpse of learning spaces, student life, ceremonies, and institutional moments.",
  galleryQuote:
    "A vibrant campus where students grow beyond the classroom - through culture, sport, research and community.",
  galleryPrimaryLabel: "View Gallery",
  galleryPrimaryHref: "/gallery",
  gallerySecondaryLabel: "About Campus",
  gallerySecondaryHref: "/about",
  galleryPageEyebrow: "Campus Moments",
  galleryPageTitle: "Gallery",
  galleryPageBody:
    "Explore moments from our campus, academic events, student activities, and institutional achievements.",
  selectedGallerySlugs: [],
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
  ctaEyebrow: "Begin Your Journey",
  ctaTitle: "Begin your academic journey",
  ctaBody:
    "Learn about programs, admission steps, and the support available to every student.",
  ctaButtonLabel: "Contact Admission Office",
  ctaHref: "/academic",
  ctaSecondaryLabel: "Contact Admissions",
  ctaSecondaryHref: "/contact",
  ctaTrustBadges: [
    "Government Recognised",
    "Accredited Programs",
    "Expert Faculty",
    "Career Support",
  ],
  ctaBackgroundImage: {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85",
    altText: "Students on campus",
  },
};

export const defaultAbout: AboutPage = {
  aboutHeroEyebrow: "Institution Profile",
  aboutHeroTitle: "Bangladesh University of Engineering Knowledge",
  aboutHeroBody:
    "A leading institution committed to academic excellence, innovation, and career-focused education.",
  aboutIntroEyebrow: "Who We Are",
  aboutTitle: "About the University",
  aboutBody:
    "Our university combines rigorous academic standards with a supportive environment for students, faculty, and the wider community. We value research, innovation, cultural understanding, and public service.",
  aboutIntroExtra:
    "Our programs are designed to equip students with strong academic foundations, practical skills, and the ethical values needed to contribute meaningfully to society and industry.\n\nWith a student-centered approach, experienced faculty, and modern facilities, we are dedicated to shaping confident, capable graduates ready for the challenges of tomorrow.",
  aboutImage: {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=85",
    altText: "Graduates celebrating on campus",
  },
  aboutImageBadgeEyebrow: "Est. 2015",
  aboutImageBadgeText: "Decade of Excellence",
  aboutPrimaryButtonLabel: "Mission & Vision",
  aboutPrimaryButtonHref: "/about/mission-vision",
  aboutSecondaryButtonLabel: "Chairman's Message",
  aboutSecondaryButtonHref: "/about/chairman-message",
  aboutPillarsEyebrow: "Our Pillars",
  aboutPillarsTitle: "Built on Three Foundations",
  aboutPillars: [
    { icon: "BookOpen", title: "Academic Excellence", body: "Quality education built on a structured curriculum, experienced educators, and industry-relevant standards." },
    { icon: "Users", title: "Student Development", body: "Clubs, co-curricular activities, leadership training, and communication skills for holistic growth." },
    { icon: "BriefcaseBusiness", title: "Career Preparation", body: "Practical learning, industry partnerships, internship guidance, and career counselling for every student." },
  ],
  aboutStatsEyebrow: "By the Numbers",
  aboutStatsTitle: "Key Highlights",
  aboutStats: [
    { title: "10+", body: "Years of Excellence" },
    { title: "8+", body: "Academic Programs" },
    { title: "2000+", body: "Students Enrolled" },
    { title: "100+", body: "Faculty Members" },
  ],
  aboutJourneyEyebrow: "Our Journey",
  aboutJourneyTitle: "A Decade of Growth & Progress",
  aboutJourneyBody:
    "From a bold founding vision to a thriving academic community, our institution has grown steadily - expanding programs, upgrading facilities, and earning the trust of thousands of students.",
  aboutJourneyItems: [
    { title: "2015", body: "University foundation established by visionary academic leaders." },
    { title: "2018", body: "Academic expansion with new departments and modern facilities." },
    { title: "2021", body: "State-of-the-art laboratories and digital classrooms introduced." },
    { title: "2025", body: "New digital learning platform launched for online and blended education." },
  ],
  aboutWhyEyebrow: "Why BUEK",
  aboutWhyTitle: "Why Choose Us",
  aboutWhyBody:
    "We combine academic rigour with a supportive environment to help every student thrive.",
  aboutWhyItems: [
    { icon: "GraduationCap", title: "Experienced and dedicated faculty members" },
    { icon: "LayoutGrid", title: "Modern, industry-aligned academic curriculum" },
    { icon: "Microscope", title: "Practical and career-oriented learning approach" },
    { icon: "Building2", title: "Digital classrooms, computer labs, and facilities" },
    { icon: "Shield", title: "Safe, disciplined, and inclusive campus environment" },
    { icon: "Landmark", title: "Government recognised and accredited programs" },
  ],
  aboutCampusEyebrow: "Campus Life",
  aboutCampusTitle: "Our Learning Environment",
  aboutCampusBody:
    "Modern classrooms, well-equipped labs, a rich library, and vibrant student spaces - all designed for success.",
  aboutCampusFeatures: [
    "Modern Classrooms",
    "Computer Labs",
    "Library & Resources",
    "Student Activity Spaces",
  ],
  aboutCampusMainImage: {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    altText: "Campus",
  },
  aboutCampusTopImage: {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    altText: "Library",
  },
  aboutCampusBottomImage: {
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    altText: "Laboratory",
  },
  aboutLeadershipEyebrow: "Leadership",
  aboutLeadershipTitle: "Leadership & Governance",
  aboutLeadershipBody:
    "Our institution is guided by experienced academic leaders and administrative members who work together to ensure quality education, institutional integrity, and continuous growth.",
  aboutLeadershipPrimaryLabel: "Chairman's Message",
  aboutLeadershipPrimaryHref: "/about/chairman-message",
  aboutLeadershipSecondaryLabel: "View Committee",
  aboutLeadershipSecondaryHref: "/about/committee",
  aboutCtaEyebrow: "Take the Next Step",
  aboutCtaTitle: "Start Your Academic Journey With Us",
  aboutCtaBody:
    "Explore our academic programs and learn how BUEK can help you build a purposeful future.",
  aboutCtaPrimaryLabel: "Explore Academic Programs",
  aboutCtaPrimaryHref: "/academic",
  aboutCtaSecondaryLabel: "Contact Us",
  aboutCtaSecondaryHref: "/contact",
  aboutCtaImage: {
    url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    altText: "Students celebrating graduation",
  },
  missionIntroTitle: "Shaping the Future Through Knowledge and Values",
  missionIntroBody:
    "Bangladesh University of Engineering Knowledge is committed to building a learning environment where students gain knowledge, develop practical skills, and grow as responsible citizens. Our mission and vision guide every academic, administrative, and development activity of the university.",
  missionHeroEyebrow: "Institutional Direction",
  missionHeroTitle: "Mission & Vision",
  missionHeroBody:
    "Guiding our commitment to academic excellence, innovation, ethical leadership, and student success.",
  missionHeroImage: {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85",
    altText: "University campus building",
  },
  missionIntroEyebrow: "Purpose With Discipline",
  missionTitle: "Mission",
  missionBody:
    "To deliver excellent education, create useful knowledge, and develop graduates who serve with competence, integrity, and compassion.",
  missionPoints: [
    {
      icon: "GraduationCap",
      title: "Quality Higher Education",
      body: "Provide modern curriculum, experienced faculty, and strong academic standards.",
    },
    {
      icon: "Users",
      title: "Student Development",
      body: "Develop academic knowledge, practical skill, communication, and ethical values.",
    },
    {
      icon: "Lightbulb",
      title: "Research & Innovation",
      body: "Promote discovery, applied projects, and problem-solving for society and industry.",
    },
    {
      icon: "Shield",
      title: "Supportive Environment",
      body: "Create an inclusive, disciplined, and student-centered learning culture.",
    },
    {
      icon: "HeartHandshake",
      title: "Partnerships",
      body: "Build meaningful links with industry, community, and academic institutions.",
    },
    {
      icon: "Target",
      title: "Future Readiness",
      body: "Prepare graduates for leadership, employment, entrepreneurship, and lifelong learning.",
    },
  ],
  visionTitle: "Vision",
  visionBody:
    "To become a respected center of learning and research that contributes to national and global progress.",
  missionVisionCardTitle: "Our Direction for the Future",
  missionCoreValuesEyebrow: "Core Values",
  missionCoreValuesTitle: "Principles That Shape Our Academic Culture",
  coreValues: [
    { icon: "BookOpen", title: "Academic Excellence", body: "We pursue high standards in teaching, learning, and assessment." },
    { icon: "Shield", title: "Integrity", body: "We uphold honesty, transparency, and ethical responsibility." },
    { icon: "Lightbulb", title: "Innovation", body: "We encourage creative thinking, research, and practical solutions." },
    { icon: "Users", title: "Inclusiveness", body: "We value respect, opportunity, and belonging for every learner." },
    { icon: "ClipboardList", title: "Discipline", body: "We maintain a focused, responsible, and professional academic culture." },
    { icon: "HeartHandshake", title: "Social Responsibility", body: "We prepare students to serve society with purpose and care." },
    { icon: "Target", title: "Leadership", body: "We build confidence, judgment, and the capacity to guide positive change." },
    { icon: "GraduationCap", title: "Lifelong Learning", body: "We inspire continuous growth beyond graduation." },
  ],
  missionStrategicEyebrow: "Strategic Focus",
  missionStrategicTitle: "Where We Invest Our Energy",
  strategicFocus: [
    { title: "Student-Centered Learning", body: "Modern teaching, mentoring, advising, and academic support." },
    { title: "Research & Innovation", body: "Encouraging discovery, projects, and applied research." },
    { title: "Industry Readiness", body: "Skill development, internships, and career preparation." },
    { title: "Community Impact", body: "Social responsibility, outreach, and national development." },
  ],
  missionQuote:
    "Education is not only about earning a degree; it is about building character, confidence, and the ability to serve society.",
  missionQuoteSource: "Bangladesh University of Engineering Knowledge",
  missionCtaEyebrow: "Academic Journey",
  missionCtaTitle: "Be Part of Our Academic Journey",
  missionCtaBody:
    "Explore our academic programs and discover how BUEK can help you build a meaningful future.",
  missionCtaPrimaryLabel: "Explore Academic Programs",
  missionCtaPrimaryHref: "/academic",
  missionCtaSecondaryLabel: "Contact Us",
  missionCtaSecondaryHref: "/contact",
  chairmanName: "Professor A. Rahman",
  chairmanRole: "Chairman, Board of Trustees",
  chairmanHeroEyebrow: "Leadership Statement",
  chairmanHeroTitle: "Chairman's Message",
  chairmanHeroBody:
    "A message from the leadership of Bangladesh University of Engineering Knowledge.",
  chairmanHeroImage: {
    url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=85",
    altText: "University graduates",
  },
  chairmanProfileEyebrow: "Leadership Message",
  chairmanQuote:
    "Education must prepare students not only for successful careers, but also for responsible leadership and meaningful service to society.",
  chairmanIntro:
    "Under his leadership, BUEK continues to focus on academic excellence, disciplined governance, student-centered learning, and the development of future-ready graduates.",
  chairmanMessageEyebrow: "Official Message",
  chairmanMessage:
    "Dear Students, Guardians, Faculty Members, and Well-Wishers,\n\nIt is my great pleasure to welcome you to Bangladesh University of Engineering Knowledge. Our university has been established with a clear commitment to quality education, ethical values, academic discipline, and the development of skilled graduates who can contribute meaningfully to society.\n\nAt BUEK, we believe that higher education should go beyond classroom learning. It should inspire students to think critically, act responsibly, communicate confidently, and solve real-world problems. Our academic programs, experienced faculty members, and student-focused environment are designed to help learners grow intellectually, professionally, and personally.\n\nWe are committed to creating an institution where knowledge, innovation, integrity, and service work together. Through modern curriculum, practical learning, research opportunities, and industry-relevant education, we aim to prepare our students for future careers, leadership roles, and lifelong learning.\n\nI invite students, guardians, educators, and partners to join us in building a university that represents excellence, responsibility, and progress. Together, we can shape a brighter future for the next generation.",
  chairmanPhoto: {
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    altText: "Chairman portrait",
  },
  chairmanCommitmentsEyebrow: "Leadership Commitments",
  chairmanCommitmentsTitle: "What Our Leadership Emphasizes",
  chairmanCommitments: [
    { icon: "GraduationCap", title: "Academic Excellence", body: "Quality teaching, structured curriculum, and continuous improvement." },
    { icon: "Users", title: "Student Development", body: "Confidence, discipline, communication, leadership, and career preparation." },
    { icon: "Shield", title: "Ethical Governance", body: "Transparency, responsibility, institutional integrity, and fair administration." },
    { icon: "BriefcaseBusiness", title: "Future-Ready Education", body: "Innovation, research, technology, industry collaboration, and employability." },
  ],
  chairmanPrioritiesEyebrow: "Future Priorities",
  chairmanPrioritiesTitle: "Priorities for the Future",
  chairmanPrioritiesBody:
    "The chairman's message is connected to practical goals that support academic quality, institutional discipline, and student success.",
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
  chairmanRelatedEyebrow: "Continue Exploring",
  chairmanRelatedTitle: "Explore More About BUEK",
  chairmanRelatedLinks: [
    { icon: "ClipboardList", title: "Mission & Vision", body: "/about/mission-vision" },
    { icon: "BookOpen", title: "Academic Programs", body: "/academic" },
    { icon: "Users", title: "Committee", body: "/about/committee" },
    { icon: "HeartHandshake", title: "Contact Us", body: "/contact" },
  ],
  committeeSubtitle:
    "Meet the members responsible for academic planning, quality assurance, curriculum development, and institutional excellence.",
  committeeHeroEyebrow: "Governance & Quality",
  committeeHeroTitle: "Academic Committee",
  committeeHeroImage: {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=85",
    altText: "Academic committee meeting",
  },
  committeeIntroEyebrow: "Academic Oversight",
  committeeIntroTitle: "Responsible Leadership for Academic Excellence",
  committeeIntro:
    "The Academic Committee oversees curriculum development, academic policies, examination standards, faculty coordination, and student academic progress. The committee ensures that the university maintains strong educational standards and follows its academic mission effectively.",
  committeeResponsibilitiesEyebrow: "Responsibilities",
  committeeResponsibilitiesTitle: "Committee Responsibilities",
  committeeResponsibilities: [
    { icon: "BookOpen", title: "Curriculum Review", body: "Planning, reviewing, and improving academic programs." },
    { icon: "ClipboardList", title: "Academic Policy", body: "Developing policies that support quality teaching and learning." },
    { icon: "CheckCircle2", title: "Examination Monitoring", body: "Maintaining fair evaluation and examination standards." },
    { icon: "Users", title: "Faculty Coordination", body: "Supporting collaboration among departments and faculty members." },
    { icon: "GraduationCap", title: "Student Progress", body: "Reviewing academic progress and student support needs." },
    { icon: "Shield", title: "Quality Assurance", body: "Supporting accreditation, compliance, and institutional excellence." },
  ],
  committeeLeadershipEyebrow: "Academic Leadership",
  committeeLeadershipTitle: "Academic Leadership Board",
  committeeLeadershipBody:
    "Guiding academic excellence through visionary leadership, collaboration, and a commitment to institutional growth and innovation.",
  committeeMeetingTitle: "Regular Meeting Schedule",
  committeeMeetingBody:
    "The Academic Committee meets regularly to review academic activities, curriculum progress, examination standards, and student-related academic matters.",
  committeeMeetingFrequency: "Monthly / As required",
  committeeMeetingOffice: "Academic Affairs Office",
  committeeMeetingEmail: "academic@example.edu",
  committeeDocumentsTitle: "Related Documents",
  committeeDocuments: [
    { title: "Academic Committee Policy", body: "#" },
    { title: "Meeting Guidelines", body: "#" },
    { title: "Academic Calendar", body: "#" },
    { title: "Examination Policy", body: "#" },
  ],
  committeeCtaEyebrow: "Academic Affairs",
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
  heroEyebrow: "Academic",
  heroImage: {
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1800&q=85",
    altText: "University classroom",
  },
  programCardBody:
    "Program information, departments, curriculum details, and admission requirements can be updated from the admin panel.",
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
  heroLabel: "Contact the University",
  heroTitle: "Get in Touch with BUEK",
  heroSubtitle:
    "Reach the right office for admissions, academic support, media inquiries, and general information.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85",
    altText: "University campus",
  },
  addressLabel: "Campus Address",
  address: defaultSettings.address,
  addressNote: "View on Google Maps",
  phoneLabel: "Phone",
  phone: defaultSettings.phone,
  phoneNote: "Sun-Thu, 9:00 AM - 5:00 PM",
  emailLabel: "Email",
  email: defaultSettings.email,
  emailNote: "General inquiry desk",
  officeHoursLabel: "Office Hours",
  officeHours: "Sunday to Thursday, 9:00 AM - 5:00 PM",
  officeHoursNote: "Weekend offices are closed",
  formEyebrow: "Contact Form",
  formTitle: "Send Us a Message",
  formBody:
    "Share your question with the university office. The right team will review your message and respond during official hours.",
  mapEyebrow: "Location",
  mapTitle: "Visit Our Campus",
  mapEmbedUrl: "https://www.google.com/maps?q=Khulna%2C%20Bangladesh&output=embed",
  mapDirectionUrl: "https://www.google.com/maps/search/?api=1&query=Khulna%2C%20Bangladesh",
  mapDirectionLabel: "Get Direction",
  mapNote: "Visitors are encouraged to contact the office before arriving for admission or administrative support.",
  departmentEyebrow: "Department Contacts",
  departmentTitle: "Contact the Right Office",
  departmentBody:
    "Choose the office that matches your inquiry so your message reaches the right university team.",
  departments: [
    {
      title: "Admission Office",
      body: "For admission, eligibility, application, and result-related queries.",
      email: "admission@example.edu",
      phone: "+880 1700-000001",
    },
    {
      title: "Registrar Office",
      body: "For certificates, records, academic documents, and official notices.",
      email: "registrar@example.edu",
      phone: "+880 1700-000002",
    },
    {
      title: "Academic Office",
      body: "For class routine, exam schedule, academic programs, and faculty support.",
      email: "academic@example.edu",
      phone: "+880 1700-000003",
    },
    {
      title: "Media & Communication",
      body: "For press, events, publications, and institutional communication.",
      email: "media@example.edu",
      phone: "+880 1700-000004",
    },
  ],
  urgentTitle: "Need urgent academic assistance?",
  urgentBody:
    "For urgent academic or administrative matters, please contact the university office during official hours.",
  urgentButtonLabel: "Call Office",
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
    photo: {
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
      altText: "Academic committee chairperson",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      altText: "Academic committee secretary",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
      altText: "Academic committee member",
    },
  },
  {
    name: "Dr. Md. Ashraful Islam",
    role: "Associate Professor",
    committeeRole: "Member",
    department: "Department of Civil Engineering",
    email: "ashraful@example.edu",
    officePhone: "+880-XXX-XXXX",
    bio: "Contributes to academic quality review, examination standards, and curriculum planning.",
    order: 4,
    published: true,
    photo: {
      url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
      altText: "Academic committee member",
    },
  },
  {
    name: "Dr. Sultana Rima",
    role: "Assistant Professor",
    committeeRole: "Member",
    department: "Department of English",
    email: "sultana@example.edu",
    officePhone: "+880-XXX-XXXX",
    bio: "Supports student academic progress review and faculty coordination.",
    order: 5,
    published: true,
    photo: {
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
      altText: "Academic committee member",
    },
  },
  {
    name: "Dr. Ayesha Noor",
    role: "Associate Professor",
    committeeRole: "Member",
    department: "Department of Mathematics",
    email: "ayesha@example.edu",
    officePhone: "+880-XXX-XXXX",
    bio: "Works on quality assurance, accreditation support, and academic policy development.",
    order: 6,
    published: true,
    photo: {
      url: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=900&q=85",
      altText: "Academic committee member",
    },
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
