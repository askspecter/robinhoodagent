import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "UNIA — the first agent on Uniswap",
  description: "UNIA, the first autonomous agent on Uniswap.",
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
