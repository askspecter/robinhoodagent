import { site, robinhoodChain } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-stonk-line mt-20">
      <div className="mx-auto max-w-5xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stonk-muted">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" />
          {site.name} · {robinhoodChain.name} · online
        </span>
        <span className="flex items-center gap-3">
          {site.socials.twitter && (
            <a href={site.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-stonk-green">x</a>
          )}
          {site.socials.telegram && (
            <a href={site.socials.telegram} target="_blank" rel="noreferrer" className="hover:text-stonk-green">telegram</a>
          )}
          <a href={site.socials.docs} target="_blank" rel="noreferrer" className="hover:text-stonk-green">docs</a>
        </span>
      </div>
      <div className="border-t border-stonk-line">
        <div className="mx-auto max-w-5xl px-4 py-3 text-[11px] text-stonk-muted flex flex-col sm:flex-row justify-between gap-1">
          <span>© {new Date().getFullYear()} {site.company}. token launched on Pons.</span>
          <span>not affiliated with Robinhood Markets, Inc.</span>
        </div>
      </div>
    </footer>
  );
}
