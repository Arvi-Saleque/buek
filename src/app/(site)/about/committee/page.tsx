import Image from "next/image";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { getCommitteeMembers } from "@/lib/content";

export default async function CommitteePage() {
  const members = await getCommitteeMembers(true);

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="About Us"
        title="Committee"
        body="University committee members and institutional leadership representatives."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <article key={member._id || member.name} className="rounded-lg border border-university-line bg-white p-6 shadow-sm">
            {member.photo?.url ? (
              <div className="relative mb-5 h-56 w-full overflow-hidden rounded-md">
                <Image
                  src={member.photo.url}
                  alt={member.photo.altText || member.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <h2 className="text-xl font-bold text-university-navy">{member.name}</h2>
            <p className="mt-1 font-semibold text-university-green">{member.role}</p>
            {member.bio ? <p className="mt-4 text-sm leading-6 text-slate-600">{member.bio}</p> : null}
          </article>
        ))}
      </div>
    </Container>
  );
}
