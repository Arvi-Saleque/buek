import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/public/container";
import { getAboutPage, getCommitteeMembers } from "@/lib/content";
import type { CommitteeMember, EditableListItem } from "@/lib/types";

const responsibilityIcons = [
  BookOpenCheck,
  ClipboardCheck,
  CheckCircle2,
  Users,
  GraduationCap,
  ShieldCheck,
];

const fallbackMemberPhotos = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
];

function roleKey(member: CommitteeMember) {
  return (member.committeeRole || member.role || "").toLowerCase();
}

function isChairperson(member: CommitteeMember) {
  const role = roleKey(member);
  return role.includes("chair") || role.includes("convener");
}

function isSecretary(member: CommitteeMember) {
  return roleKey(member).includes("secretary");
}

function memberPhoto(member: CommitteeMember, index = 0) {
  return member.photo?.url || fallbackMemberPhotos[index % fallbackMemberPhotos.length];
}

function items(value?: EditableListItem[]) {
  return value?.length ? value : [];
}

function MemberContact({
  member,
  compact = false,
}: {
  member: CommitteeMember;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "grid gap-2 text-sm",
        compact ? "mt-5 text-university-text" : "mt-5 text-white/78",
      ].join(" ")}
    >
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-3 transition hover:text-university-gold"
          aria-label={`Email ${member.name}`}
        >
          <Mail size={16} className="text-university-gold" />
          {member.email}
        </a>
      ) : null}
      {member.officePhone ? (
        <span
          className="flex items-center gap-3"
          title={`Office: ${member.officePhone}`}
          aria-label={`Office phone ${member.officePhone}`}
        >
          <Phone size={16} className="text-university-gold" />
          Office: {member.officePhone}
        </span>
      ) : null}
    </div>
  );
}

function LeadershipCard({
  member,
  index,
  label,
}: {
  member: CommitteeMember;
  index: number;
  label: string;
}) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-university-gold/35 bg-university-navy shadow-soft lg:grid-cols-[0.9fr_1.35fr]">
      <div className="relative min-h-[320px] bg-university-mist">
        <Image
          src={memberPhoto(member, index)}
          alt={member.photo?.altText || member.name}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative overflow-hidden p-7 text-white sm:p-9">
        <ShieldCheck
          size={110}
          className="absolute right-7 top-8 text-white/[0.06]"
        />
        <span className="relative inline-flex rounded-md border border-university-gold px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-university-gold">
          {label}
        </span>
        <h3 className="relative mt-5 text-3xl font-bold leading-tight">
          {member.name}
        </h3>
        <p className="relative mt-2 text-base font-bold text-university-gold">
          {member.role}
        </p>
        <p className="relative mt-2 max-w-md text-sm italic leading-6 text-white/78">
          {member.department || "General"}
        </p>
        <div className="relative my-6 h-px max-w-xs bg-university-gold/55" />
        <MemberContact member={member} />
        {member.profileUrl ? (
          <Link
            href={member.profileUrl}
            className="relative mt-7 inline-flex items-center gap-4 text-sm font-bold text-university-gold transition hover:gap-5 hover:text-white"
          >
            View Profile <ArrowRight size={20} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function MemberCard({
  member,
  index,
}: {
  member: CommitteeMember;
  index: number;
}) {
  return (
    <article className="rounded-lg border border-university-gold/35 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-university-gold bg-university-mist shadow-sm">
        <Image
          src={memberPhoto(member, index)}
          alt={member.photo?.altText || member.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>
      <div className="mx-auto mt-5 h-px max-w-32 bg-university-gold/45" />
      <span className="mt-4 inline-flex rounded-md border border-university-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-university-gold">
        {member.committeeRole || "Member"}
      </span>
      <h3 className="mt-4 text-xl font-bold leading-tight text-university-navy">
        {member.name}
      </h3>
      <p className="mt-2 text-sm font-semibold text-university-gold">
        {member.role}
      </p>
      <p className="mx-auto mt-1 max-w-xs text-sm italic leading-6 text-university-text">
        {member.department || "General"}
      </p>
      {member.bio ? (
        <p className="mx-auto mt-4 line-clamp-2 max-w-sm text-sm leading-6 text-university-text">
          {member.bio}
        </p>
      ) : null}
      <div className="mx-auto max-w-xs text-left">
        <MemberContact member={member} compact />
      </div>
      {member.profileUrl ? (
        <Link
          href={member.profileUrl}
          className="mx-auto mt-6 inline-flex items-center gap-4 text-sm font-bold text-university-gold transition hover:gap-5 hover:text-university-navy"
        >
          View Profile <ArrowRight size={18} />
        </Link>
      ) : null}
    </article>
  );
}

export default async function CommitteePage() {
  const [about, members] = await Promise.all([
    getAboutPage(),
    getCommitteeMembers(true),
  ]);
  const chairperson = members.find(isChairperson);
  const secretary = members.find(isSecretary);
  const otherMembers = members.filter(
    (member) => member !== chairperson && member !== secretary,
  );
  const responsibilities = items(about.committeeResponsibilities);
  const documents = items(about.committeeDocuments);

  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-university-navy pb-14 pt-36 sm:min-h-[500px] sm:pb-16 sm:pt-40">
        <Image
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=85"
          alt="Academic committee meeting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,65,0.94),rgba(11,35,65,0.82)_50%,rgba(15,107,87,0.5))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(200,155,60,0.2),transparent_35%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-university-gold/0 via-university-gold to-university-gold/0" />
        <Container className="relative">
          <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-white/58">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <ChevronRight size={12} />
            <span className="text-university-gold">Academic Committee</span>
          </nav>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-university-gold">
            Governance &amp; Quality
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Academic Committee
          </h1>
          <div className="mt-5 h-1 w-24 bg-university-gold" />
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 sm:text-xl">
            {about.committeeSubtitle}
          </p>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Academic Oversight
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-university-navy sm:text-4xl">
              Responsible Leadership for Academic Excellence
            </h2>
            <p className="mt-5 text-base leading-8 text-university-text sm:text-lg">
              {about.committeeIntro}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Responsibilities
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              Committee Responsibilities
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {responsibilities.map((item, index) => {
              const Icon = responsibilityIcons[index % responsibilityIcons.length];

              return (
                <article
                  key={`${item.title}-${index}`}
                  className="rounded-lg border border-university-line bg-white p-6 shadow-sm"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-university-navy text-university-gold">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-5 font-bold text-university-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-university-text">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(200,155,60,0.12),transparent_32%)]" />
        <Container>
          <div className="relative mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-5 text-university-gold">
              <span className="h-px w-32 bg-university-gold/45" />
              <ShieldCheck size={34} />
              <span className="h-px w-32 bg-university-gold/45" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.42em] text-university-gold">
              {about.committeeLeadershipEyebrow || "Academic Leadership"}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-university-navy sm:text-5xl">
              {about.committeeLeadershipTitle || "Academic Leadership Board"}
            </h2>
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3 text-university-gold">
              <span className="h-px flex-1 bg-university-gold/35" />
              <span className="h-2 w-2 rotate-45 border border-university-gold" />
              <span className="h-px flex-1 bg-university-gold/35" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-university-text">
              {about.committeeLeadershipBody}
            </p>
          </div>

          <div className="relative grid gap-6 lg:grid-cols-2">
            {chairperson ? (
              <LeadershipCard
                member={chairperson}
                index={0}
                label="Chairperson"
              />
            ) : null}
            {secretary ? (
              <LeadershipCard member={secretary} index={1} label="Secretary" />
            ) : null}
          </div>

          {otherMembers.length ? (
            <div className="relative mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {otherMembers.map((member, index) => (
                <MemberCard
                  key={member._id || member.name}
                  member={member}
                  index={index + 2}
                />
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-university-mist py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-lg border border-university-line bg-white p-7 shadow-sm">
              <CalendarDays size={30} className="text-university-gold" />
              <h2 className="mt-4 text-2xl font-bold text-university-navy">
                {about.committeeMeetingTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-university-text">
                {about.committeeMeetingBody}
              </p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-university-text">
                <span>Meeting Frequency: {about.committeeMeetingFrequency}</span>
                <span>Office: {about.committeeMeetingOffice}</span>
                <span>Email: {about.committeeMeetingEmail}</span>
              </div>
            </article>

            <article className="rounded-lg border border-university-line bg-white p-7 shadow-sm">
              <FileText size={30} className="text-university-gold" />
              <h2 className="mt-4 text-2xl font-bold text-university-navy">
                Related Documents
              </h2>
              <div className="mt-5 grid gap-3">
                {documents.map((item, index) => (
                  <Link
                    key={`${item.title}-${index}`}
                    href={item.body || "#"}
                    className="flex items-center justify-between gap-3 rounded-md border border-university-line px-4 py-3 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
                  >
                    {item.title}
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="bg-university-navy py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
                Academic Affairs
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                {about.committeeCtaTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                {about.committeeCtaBody}
              </p>
            </div>
            <Link
              href={about.committeeCtaButtonHref || "/contact"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-university-gold px-7 py-3 text-sm font-bold text-university-navy transition hover:bg-white"
            >
              {about.committeeCtaButtonLabel || "Contact Academic Office"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
