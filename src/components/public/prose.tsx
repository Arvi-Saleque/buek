export function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4 text-base leading-8 text-slate-700">
      {text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => (
          <p key={line}>{line}</p>
        ))}
    </div>
  );
}
