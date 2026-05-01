import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminCredentials, getAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  const credentials = getAdminCredentials();
  const showDevHint = process.env.NODE_ENV !== "production" && !process.env.ADMIN_EMAIL;

  return (
    <main className="grid min-h-screen place-items-center bg-university-mist px-4 py-8 sm:py-12">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-md bg-university-navy text-university-gold">
            <BookOpen size={24} />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-university-navy sm:text-2xl">Admin Login</h1>
            <p className="text-sm text-slate-600">Manage university website content</p>
          </div>
        </div>
        {showDevHint ? (
          <div className="mb-5 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
            Dev login: {credentials.email} / {credentials.password}
          </div>
        ) : null}
        <LoginForm />
      </section>
    </main>
  );
}
