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
}: {
  member: CommitteeMember;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-university-text">
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white hover:text-university-gold"
          aria-label={`Email ${member.name}`}
        >
          <Mail size={15} />
        </a>
      ) : null}
      {member.officePhone ? (
        <span
          className="grid h-8 w-8 place-items-center rounded-full"
          title={`Office: ${member.officePhone}`}
          aria-label={`Office phone ${member.officePhone}`}
        >
          <Phone size={15} />
        </span>
      ) : null}
    </div>
  );
}

function ProfilePhotoTile({ member, index }: { member: CommitteeMember; index: number }) {
  return (
    <div className="relative aspect-square min-h-[260px] overflow-hidden bg-[#d3d4d0]">
      <Image
        src={memberPhoto(member, index)}
        alt={member.photo?.altText || member.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function ProfileInfoTile({
  member,
  label,
}: {
  member: CommitteeMember;
  label: string;
}) {
  return (
    <div className="flex aspect-square min-h-[260px] flex-col justify-center bg-[#dedfdb] p-7 text-center sm:p-9">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-university-gold">
        {label}
      </p>
      <h3 className="mx-auto mt-3 max-w-sm text-2xl font-black uppercase leading-tight text-university-navy">
        {member.name}
      </h3>
      <p className="mt-2 text-sm font-bold lowercase text-[#9b3242]">
        {member.committeeRole || "Member"}
      </p>
      <p className="mt-4 text-sm font-bold text-university-navy">
        {member.role}
      </p>
      <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-university-text">
        {member.department || "General"}
      </p>
      {member.bio ? (
        <p className="mx-auto mt-5 max-w-sm text-sm italic leading-7 text-university-text">
          {member.bio}
        </p>
      ) : null}
      <MemberContact member={member} />
      {member.profileUrl ? (
        <Link
          href={member.profileUrl}
          className="mx-auto mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-university-line bg-white px-4 py-2 text-sm font-bold text-university-navy transition hover:border-university-gold hover:text-university-gold"
        >
          View Profile <ArrowRight size={14} />
        </Link>
      ) : null}
      <span className="mx-auto mt-5 h-1 w-10 rounded-full bg-university-gold/70" />
    </div>
  );
}

function buildMosaicMembers(members: CommitteeMember[]) {
  const [first, second, third, ...rest] = members;
  const arranged = [
    first ? { member: first, type: "photo" as const, label: first.committeeRole || "Committee Member" } : null,
    first ? { member: first, type: "info" as const, label: "Committee Chairperson" } : null,
    third ? { member: third, type: "photo" as const, label: third.committeeRole || "Committee Member" } : null,
    second ? { member: second, type: "info" as const, label: second.committeeRole || "Committee Member" } : null,
    second ? { member: second, type: "photo" as const, label: second.committeeRole || "Committee Member" } : null,
    third ? { member: third, type: "info" as const, label: "Committee Secretary" } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return [
    ...arranged,
    ...rest.flatMap((member, offset) =>
      offset % 2 === 0
        ? [
            { member, type: "photo" as const, label: member.committeeRole || "Committee Member" },
            { member, type: "info" as const, label: member.committeeRole || "Committee Member" },
          ]
        : [
            { member, type: "info" as const, label: member.committeeRole || "Committee Member" },
            { member, type: "photo" as const, label: member.committeeRole || "Committee Member" },
          ],
    ),
  ];
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
  const mosaicMembers = [
    chairperson,
    otherMembers[0],
    secretary,
    ...otherMembers.slice(1),
  ].filter((member): member is CommitteeMember => Boolean(member));
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

          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-university-line bg-white shadow-soft md:grid-cols-2 lg:grid-cols-3">
            {buildMosaicMembers(mosaicMembers).map((item, index) =>
              item.type === "photo" ? (
                <ProfilePhotoTile
                  key={`${item.member.name}-${item.type}-${index}`}
                  member={item.member}
                  index={index}
                />
              ) : (
                <ProfileInfoTile
                  key={`${item.member.name}-${item.type}-${index}`}
                  member={item.member}
                  label={item.label}
                />
              ),
            )}
          </div>
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
