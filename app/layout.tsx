import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const pixel = Pixelify_Sans({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-pixel", display: "swap" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const TITLE = "UNIA — terminal for the Robinhood network";
const DESC = "UNIA, the autonomous agent terminal for the Robinhood Chain network.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  openGraph: { title: TITLE, description: DESC, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${pixel.variable}`}>
      <body className="antialiased">
        <div className="crt-scan" />
        <div className="crt-vig" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
