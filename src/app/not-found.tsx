import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-university-mist px-4 py-12">
      <section className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-university-navy">
          Page not found
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Go Home
        </Link>
      </section>
    </main>
  );
}
