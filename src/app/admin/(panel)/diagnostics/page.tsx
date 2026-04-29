import { MongoClient } from "mongodb";
import { AdminHeading } from "@/components/admin/admin-heading";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CheckRow = {
  label: string;
  value: string;
  ok?: boolean;
};

function safeHost(uri?: string) {
  if (!uri) return "Not configured";

  try {
    const parsed = new URL(uri);
    return parsed.host || "Configured";
  } catch {
    return "Configured, but URL format could not be checked";
  }
}

async function getMongoDiagnostics() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "buek";
  const rows: CheckRow[] = [
    { label: "MONGODB_URI", value: uri ? `Configured (${safeHost(uri)})` : "Missing", ok: Boolean(uri) },
    { label: "MONGODB_DB", value: dbName, ok: Boolean(process.env.MONGODB_DB) },
    {
      label: "NEXT_PUBLIC_SITE_URL",
      value: process.env.NEXT_PUBLIC_SITE_URL || "Missing",
      ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    },
    { label: "ADMIN_EMAIL", value: process.env.ADMIN_EMAIL ? "Configured" : "Missing", ok: Boolean(process.env.ADMIN_EMAIL) },
    { label: "SESSION_SECRET", value: process.env.SESSION_SECRET ? "Configured" : "Missing", ok: Boolean(process.env.SESSION_SECRET) },
  ];

  if (!uri) {
    return {
      rows,
      connected: false,
      error: "MONGODB_URI is missing in this Vercel environment.",
      database: dbName,
      settingsName: "",
      homeTitle: "",
      homeUpdatedAt: "",
    };
  }

  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 6000 });
    await client.connect();
    const db = client.db(dbName);
    const [settings, homePage] = await Promise.all([
      db.collection("siteSettings").findOne(
        { key: "main" },
        { projection: { _id: 0, universityName: 1, address: 1 } },
      ),
      db.collection("pages").findOne(
        { key: "home" },
        { projection: { _id: 0, updatedAt: 1, "content.slides.title": 1 } },
      ),
    ]);
    await client.close();

    return {
      rows,
      connected: true,
      error: "",
      database: dbName,
      settingsName: settings?.universityName || "No siteSettings key=main document found",
      homeTitle: homePage?.content?.slides?.[0]?.title || "No pages key=home document found",
      homeUpdatedAt: homePage?.updatedAt || "No update timestamp found",
    };
  } catch (error) {
    return {
      rows,
      connected: false,
      error: error instanceof Error ? error.message : "Unknown MongoDB connection error",
      database: dbName,
      settingsName: "",
      homeTitle: "",
      homeUpdatedAt: "",
    };
  }
}

export default async function AdminDiagnosticsPage() {
  const diagnostics = await getMongoDiagnostics();

  return (
    <>
      <AdminHeading
        title="Diagnostics"
        body="Check whether this deployment can read the same MongoDB content as your local project."
      />

      <section className="admin-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-university-navy">MongoDB Connection</h2>
            <p className="mt-1 text-sm text-slate-600">No secret values are shown here.</p>
          </div>
          <span
            className={[
              "rounded-full px-3 py-1 text-sm font-bold",
              diagnostics.connected
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700",
            ].join(" ")}
          >
            {diagnostics.connected ? "Connected" : "Not Connected"}
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {diagnostics.rows.map((row) => (
            <div key={row.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{row.label}</p>
              <p className={["mt-2 font-semibold", row.ok ? "text-university-navy" : "text-rose-700"].join(" ")}>
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {diagnostics.error ? (
          <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">
            {diagnostics.error}
          </div>
        ) : null}
      </section>

      <section className="admin-card mt-6">
        <h2 className="text-lg font-bold text-university-navy">Content Read Test</h2>
        <div className="mt-5 grid gap-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Database</p>
            <p className="mt-2 font-semibold text-university-navy">{diagnostics.database}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Site Settings Name</p>
            <p className="mt-2 font-semibold text-university-navy">{diagnostics.settingsName || "Not available"}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Homepage First Slide</p>
            <p className="mt-2 font-semibold text-university-navy">{diagnostics.homeTitle || "Not available"}</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Homepage Updated At</p>
            <p className="mt-2 font-semibold text-university-navy">{diagnostics.homeUpdatedAt || "Not available"}</p>
          </div>
        </div>
      </section>
    </>
  );
}
