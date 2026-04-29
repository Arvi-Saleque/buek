"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-university-mist px-4 py-12">
      <section className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-university-gold">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-bold text-university-navy">
          The page could not be loaded
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Please try again. If the issue continues, the site administrator can
          check the server logs.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary" type="button">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
