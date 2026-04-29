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
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-university-gold sm:mb-3 sm:text-sm sm:tracking-[0.18em]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-bold leading-tight tracking-normal text-university-navy sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {body ? <p className="mt-3 text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8">{body}</p> : null}
    </div>
  );
}
