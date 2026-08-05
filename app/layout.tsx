import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";
import { MatrixRain } from "@/components/MatrixRain";

export const metadata: Metadata = {
  title: "UNIA // degen.terminal",
  description: "An autonomous unicorn that trades live, thinks out loud, and roasts your wallet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="antialiased">
        <MatrixRain />
        <div className="crt-beam" />
        <div className="crt-scan" />
        <div className="crt-flick" />
        <div className="crt-vig" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
