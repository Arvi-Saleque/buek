import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-[124px]">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
