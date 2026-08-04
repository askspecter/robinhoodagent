import Link from "next/link";
import { Console } from "@/components/Console";
import { HeroTitle } from "@/components/HeroTitle";
import { BuyOnPons } from "@/components/BuyOnPons";
import { ConnectButton } from "@/components/ConnectButton";
import { TerminalWindow } from "@/components/TerminalWindow";
import { site, robinhoodChain } from "@/lib/config";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="pt-16 pb-10 text-center dotgrid rounded-lg">
        <div className="text-stonk-muted text-sm mb-4">
          <span className="text-stonk-green">$</span> ./init {site.name.toLowerCase()}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight glow text-stonk-bright min-h-[2.4em] sm:min-h-[1.6em]">
          <HeroTitle text={site.tagline} />
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-stonk-muted animate-rise">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-rise">
          <BuyOnPons />
          <Link href="/token" className="btn px-5 py-3 text-sm">
            <span className="text-stonk-green">$</span> cat token.json
          </Link>
        </div>
      </section>

      {/* Interactive console */}
      <section className="py-6">
        <Console />
      </section>

      {/* Status + connect */}
      <section className="grid gap-4 md:grid-cols-3 py-8">
        <TerminalWindow title="net.status" className="md:col-span-1">
          <div className="text-sm space-y-2">
            <div><span className="text-stonk-muted">chain </span>{robinhoodChain.name}</div>
            <div><span className="text-stonk-muted">id    </span>#{robinhoodChain.id}</div>
            <div className="flex items-center gap-2">
              <span className="text-stonk-muted">link  </span>
              <span className="h-2 w-2 rounded-full bg-stonk-green animate-pulseGlow" /> online
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="token.meta" className="md:col-span-1">
          <div className="text-sm space-y-2">
            <div><span className="text-stonk-muted">tick  </span><span className="text-stonk-green">{site.ticker}</span></div>
            <div><span className="text-stonk-muted">supply</span> {site.token.supply}</div>
            <div>
              <span className="text-stonk-muted">state </span>
              {site.token.launched ? (
                <span className="text-stonk-green">LIVE · Pons</span>
              ) : (
                <span className="text-stonk-amber">pending · Pons</span>
              )}
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="auth" className="md:col-span-1">
          <p className="text-xs text-stonk-muted mb-3">connect a wallet or sign in with email.</p>
          <ConnectButton variant="block" />
        </TerminalWindow>
      </section>
    </div>
  );
}
