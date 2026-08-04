import Link from "next/link";
import { site, robinhoodChain } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-stonk-line mt-24">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold mb-3">
            <span className="grid place-items-center h-7 w-7 border-2 border-stonk-green text-stonk-green font-black">
              ×
            </span>
            <span className="font-mono tracking-widest text-sm">{site.name}</span>
          </div>
          <p className="text-sm text-stonk-muted max-w-xs">{site.description}</p>
        </div>

        <div className="text-sm">
          <div className="text-stonk-muted mb-3 uppercase text-xs tracking-widest font-mono">Navigate</div>
          <div className="space-y-2">
            <Link href="/mint" className="block hover:text-stonk-green">Mint a Broker</Link>
            <Link href="/marketplace" className="block hover:text-stonk-green">Anvil NFT AMM</Link>
            <Link href="/launcher" className="block hover:text-stonk-green">Launcher</Link>
            <a href={site.token.ponsUrl} target="_blank" rel="noreferrer" className="block hover:text-stonk-green">
              Buy {site.ticker} on Pons
            </a>
          </div>
        </div>

        <div className="text-sm">
          <div className="text-stonk-muted mb-3 uppercase text-xs tracking-widest font-mono">Community</div>
          <div className="space-y-2">
            {site.socials.twitter && (
              <a href={site.socials.twitter} target="_blank" rel="noreferrer" className="block hover:text-stonk-green">Twitter / X</a>
            )}
            {site.socials.telegram && (
              <a href={site.socials.telegram} target="_blank" rel="noreferrer" className="block hover:text-stonk-green">Telegram</a>
            )}
            {site.socials.discord && (
              <a href={site.socials.discord} target="_blank" rel="noreferrer" className="block hover:text-stonk-green">Discord</a>
            )}
            <a href={site.socials.docs} target="_blank" rel="noreferrer" className="block hover:text-stonk-green">Docs</a>
          </div>
        </div>
      </div>

      <div className="border-t border-stonk-line">
        <div className="mx-auto max-w-6xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stonk-muted">
          <span>
            © {new Date().getFullYear()} {site.company}. Built on {robinhoodChain.name} · Token on Pons.
          </span>
          <span>Not affiliated with or endorsed by Robinhood Markets, Inc.</span>
        </div>
      </div>
    </footer>
  );
}
