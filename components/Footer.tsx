import { site } from "@/lib/config";

const LINKS = [
  { icon: "𝕏", label: `Official X — @${(site.socials.twitter.split("/").pop() || "project")}`, href: site.socials.twitter },
  { icon: "✈", label: "Telegram Community", href: site.socials.telegram },
  { icon: "◎", label: `Buy ${site.ticker} on Pons`, href: site.token.ponsUrl },
  { icon: "▤", label: "Docs", href: site.socials.docs },
];

export function Footer() {
  return (
    <footer className="border-t border-stonk-line mt-4">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="text-center text-xs uppercase tracking-[0.18em] text-stonk-muted mb-5">
          Official links — {site.name}
        </div>
        <div className="space-y-3">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="box hover:bg-[rgba(79,227,127,0.08)] transition-colors block text-center py-3.5 text-sm uppercase tracking-[0.1em]"
            >
              <span className="mr-2">{l.icon}</span>{l.label}
            </a>
          ))}
        </div>

        <div className="dashed p-5 mt-6 text-center text-xs sm:text-sm uppercase tracking-[0.08em] text-stonk-muted leading-relaxed">
          These are the only official channels. We will never DM you first and we will never ask for your seed phrase.
        </div>

        <div className="text-center text-[11px] text-stonk-greenDim mt-6 uppercase tracking-[0.14em]">
          Not affiliated with Robinhood Markets, Inc. · Token on Pons.
        </div>
      </div>
    </footer>
  );
}
