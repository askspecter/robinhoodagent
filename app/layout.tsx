import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "UNIA — terminal for the Robinhood network",
  description: "UNIA, the autonomous agent terminal for the Robinhood Chain network.",
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
