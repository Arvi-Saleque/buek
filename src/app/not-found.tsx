import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-university-mist px-4 py-12">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute left-[12%] top-16 h-[560px] w-28 rounded-t-full border-x-[20px] border-university-navy" />
        <div className="absolute right-[14%] top-24 h-[520px] w-28 rounded-t-full border-x-[20px] border-university-navy" />
      </div>
      <section className="relative w-full max-w-lg rounded-lg border border-university-line bg-white p-8 text-center shadow-soft">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-md bg-university-navy text-2xl font-bold text-university-gold">
          404
        </span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
          Page Not Found
        </p>
        <h1 className="mt-3 text-3xl font-bold text-university-navy">
          This university page does not exist
        </h1>
        <p className="mt-4 leading-7 text-university-text">
          The link may be incorrect, unpublished, or moved by the site admin.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Office
          </Link>
        </div>
      </section>
    </main>
  );
}
