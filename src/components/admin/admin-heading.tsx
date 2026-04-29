export function AdminHeading({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-university-navy">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}
