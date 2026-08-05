import { site } from "@/lib/config";

export function TopNav() {
  return (
    <header>
      {/* Links row */}
      <div className="border-b border-stonk-line">
        <div className="mx-auto max-w-3xl px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs uppercase tracking-[0.1em] text-stonk-muted">
          <a href={site.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-stonk-bright">𝕏 Official X</a>
          <a href={site.socials.telegram} target="_blank" rel="noreferrer" className="hover:text-stonk-bright">✈ Telegram</a>
          <a href={site.token.ponsUrl} target="_blank" rel="noreferrer" className="hover:text-stonk-bright">⌁ Buy {site.ticker}</a>
          <a href={site.socials.docs} target="_blank" rel="noreferrer" className="hover:text-stonk-bright">▤ Docs</a>
        </div>
      </div>

      {/* Green announcement */}
      <div className="border-b border-stonk-line bg-[#0a1a0e]">
        <div className="mx-auto max-w-3xl px-4 py-2.5 text-center text-xs sm:text-sm uppercase tracking-[0.1em] text-stonk-green">
          <span className="inline-block h-2 w-2 rounded-full bg-stonk-green mr-2 align-middle" />
          The factory is open — {site.ticker} is live. clock in.
        </div>
      </div>

      {/* Blue secondary */}
      <div className="border-b border-stonk-line bg-[#0a0e1e]">
        <div className="mx-auto max-w-3xl px-4 py-2.5 text-center text-xs sm:text-sm uppercase tracking-[0.1em] text-stonk-blue">
          <span className="inline-block h-2 w-2 rounded-full bg-stonk-blue mr-2 align-middle" />
          {site.token.launched ? "Live on pons" : "Coming soon on pons"} — robinhood chain.{" "}
          <a href={site.token.ponsUrl} target="_blank" rel="noreferrer" className="link-blue">Buy on Pons →</a>
        </div>
      </div>
    </header>
  );
}
