export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-bold tracking-normal text-university-navy md:text-5xl">
        {title}
      </h1>
      {body ? <p className="mt-4 text-lg leading-8 text-slate-600">{body}</p> : null}
    </div>
  );
}
