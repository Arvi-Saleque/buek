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
  UserRound,
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

function memberPhoto(member: CommitteeMember) {
  return member.photo?.url;
}

function items(value?: EditableListItem[]) {
  return value?.length ? value : [];
}

function MemberContact({
  member,
  inverse = false,
}: {
  member: CommitteeMember;
  inverse?: boolean;
}) {
  return (
    <div className={["mt-4 grid gap-2 text-sm", inverse ? "text-white/72" : "text-university-text"].join(" ")}>
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 transition hover:text-university-gold"
        >
          <Mail size={14} className="text-university-gold" />
          {member.email}
        </a>
      ) : null}
      {member.officePhone ? (
        <span className="flex items-center gap-2">
          <Phone size={14} className="text-university-gold" />
          Office: {member.officePhone}
        </span>
      ) : null}
    </div>
  );
}

function ProfilePhoto({
  member,
  featured = false,
}: {
  member: CommitteeMember;
  featured?: boolean;
}) {
  return (
    <div
      className={[
        "relative min-h-[320px] overflow-hidden bg-[#d8d9d6]",
        featured ? "lg:min-h-[420px]" : "lg:min-h-[360px]",
      ].join(" ")}
    >
      {memberPhoto(member) ? (
        <Image
          src={memberPhoto(member)!}
          alt={member.photo?.altText || member.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="grid h-full min-h-[320px] place-items-center bg-university-navy text-university-gold">
          <UserRound size={68} />
        </div>
      )}
    </div>
  );
}

function ProfileInfo({
  member,
  label,
  featured = false,
}: {
  member: CommitteeMember;
  label: string;
  featured?: boolean;
}) {
  return (
    <div
      className={[
        "flex min-h-[320px] flex-col justify-center bg-[#eef0ed] p-7 text-center sm:p-10",
        featured ? "lg:min-h-[420px]" : "lg:min-h-[360px]",
      ].join(" ")}
    >
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
        {label}
      </p>
      <h2
        className={[
          "mx-auto mt-4 max-w-xl font-bold uppercase leading-tight text-university-navy",
          featured ? "text-3xl sm:text-4xl" : "text-2xl",
        ].join(" ")}
      >
        {member.name}
      </h2>
      <p className="mt-2 text-sm font-bold lowercase text-[#9b3242]">
        {member.committeeRole || "Member"}
      </p>
      <p className="mt-4 text-sm font-semibold text-university-navy">
        {member.role}
      </p>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-university-text">
        {member.department || "General"}
      </p>
      {member.bio ? (
        <p className="mx-auto mt-5 max-w-lg text-sm italic leading-7 text-university-text">
          {member.bio}
        </p>
      ) : null}
      <div className="mx-auto">
        <MemberContact member={member} />
      </div>
      {member.profileUrl ? (
        <Link
          href={member.profileUrl}
          className="mx-auto mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-university-line bg-white px-4 py-2 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
        >
          View Profile <ArrowRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}

function SplitProfileCard({
  member,
  label,
  imagePosition = "left",
  featured = false,
}: {
  member: CommitteeMember;
  label: string;
  imagePosition?: "left" | "right";
  featured?: boolean;
}) {
  const image = <ProfilePhoto member={member} featured={featured} />;
  const info = <ProfileInfo member={member} label={label} featured={featured} />;

  return (
    <article className="grid overflow-hidden rounded-lg border border-university-line bg-white shadow-sm lg:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {image}
          {info}
        </>
      ) : (
        <>
          <div className="lg:order-2">{image}</div>
          <div className="lg:order-1">{info}</div>
        </>
      )}
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

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-university-gold">
              Committee Members
            </p>
            <h2 className="mt-2 text-3xl font-bold text-university-navy sm:text-4xl">
              Academic Decision-Makers
            </h2>
          </div>

          <div className="grid gap-6">
            {chairperson ? (
              <SplitProfileCard
                member={chairperson}
                label="Committee Chairperson"
                imagePosition="left"
                featured
              />
            ) : null}
            {secretary ? (
              <SplitProfileCard
                member={secretary}
                label="Committee Secretary"
                imagePosition="right"
                featured
              />
            ) : null}
          </div>

          {otherMembers.length ? (
            <div className="mt-10 grid gap-6">
              {otherMembers.map((member, index) => (
                <SplitProfileCard
                  key={member._id || member.name}
                  member={member}
                  label={member.committeeRole || "Committee Member"}
                  imagePosition={index % 2 === 0 ? "left" : "right"}
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
