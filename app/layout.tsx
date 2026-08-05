import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/config";

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  openGraph: { title: `${site.name} — ${site.tagline}`, description: site.description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${pixel.variable}`}>
      <body className="scan antialiased">
        <Providers>
          <TopNav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
