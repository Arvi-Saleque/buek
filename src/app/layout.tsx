import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "University Website",
  description: "A university website with public pages and a content admin panel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
