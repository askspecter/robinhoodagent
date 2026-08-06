import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";

const DESC = "The autonomous degen unicorn — the first agent on Uniswap, live on Robinhood Chain. $UNIA is live on Pons.";

export const metadata: Metadata = {
  metadataBase: new URL("https://unia.sh"),
  title: "UNIA — the first agent on Uniswap",
  description: DESC,
  openGraph: {
    title: "UNIA — the first agent on Uniswap",
    description: DESC,
    url: "https://unia.sh",
    siteName: "UNIA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNIA — the first agent on Uniswap",
    description: DESC,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="antialiased">
        <div className="crt-scan" />
        <div className="crt-vig" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
