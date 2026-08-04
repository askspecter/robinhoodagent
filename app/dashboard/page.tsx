"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BuyOnPons } from "@/components/BuyOnPons";
import { site } from "@/lib/config";

const STATS = [
  { k: "Floor price", v: "0.021 ETH", c: "+4.2%", up: true },
  { k: "Brokers activated", v: "1,204", c: "+31", up: true },
  { k: "Stock drops paid", v: "$84,120", c: "+12.6%", up: true },
  { k: `${site.ticker} price`, v: "$0.0042", c: "+69.4%", up: true },
];

const BROKERS = [
  { id: "#0420", tier: "Diamond Desk", earn: "$1,204", act: "98%" },
  { id: "#1337", tier: "Gold Floor", earn: "$842", act: "91%" },
  { id: "#0069", tier: "Gold Floor", earn: "$777", act: "88%" },
  { id: "#2100", tier: "Silver Pit", earn: "$410", act: "72%" },
  { id: "#0007", tier: "Silver Pit", earn: "$388", act: "70%" },
];

const FEED = [
  { a: "0x9f…21a", act: "activated broker #0420", t: "2m ago" },
  { a: "0x33…7bd", act: "minted 2 brokers", t: "6m ago" },
  { a: "0xa1…0ce", act: "claimed $128 in stock drops", t: "11m ago" },
  { a: "0x77…9f2", act: "bought broker #1337 on Anvil", t: "18m ago" },
  { a: "0x0d…44e", act: "clocked in overtime", t: "25m ago" },
];

export default function DashboardPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-stonk-green text-sm font-mono mb-1">// dashboard</div>
            <h1 className="text-3xl sm:text-4xl font-black">The Trading Floor</h1>
            <p className="text-stonk-muted mt-1 text-sm">
              Live-style overview of the broker ecosystem. Data ilustratif — sambungkan ke
              on-chain indexer untuk angka riil.
            </p>
          </div>
          <BuyOnPons />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map((s) => (
            <div key={s.k} className="panel p-5">
              <div className="text-xs text-stonk-muted uppercase tracking-widest">{s.k}</div>
              <div className="text-2xl font-black mt-2">{s.v}</div>
              <div className={`text-xs mt-1 ${s.up ? "text-up" : "text-down"}`}>{s.c}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3 mt-4">
          {/* Leaderboard */}
          <div className="panel p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Top Brokers</h2>
              <span className="text-xs text-stonk-muted font-mono">by lifetime earnings</span>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="text-stonk-muted text-xs uppercase tracking-widest text-left">
                    <th className="py-2 font-normal">Broker</th>
                    <th className="py-2 font-normal">Tier</th>
                    <th className="py-2 font-normal">Earned</th>
                    <th className="py-2 font-normal">Activation</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {BROKERS.map((b) => (
                    <tr key={b.id} className="border-t border-stonk-line">
                      <td className="py-3 text-white">{b.id}</td>
                      <td className="py-3 text-stonk-gold">{b.tier}</td>
                      <td className="py-3 text-up">{b.earn}</td>
                      <td className="py-3 text-stonk-muted">{b.act}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity feed */}
          <div className="panel p-5">
            <h2 className="font-bold text-lg mb-4">Live Activity</h2>
            <ul className="space-y-3">
              {FEED.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-stonk-green shrink-0 animate-pulseGlow" />
                  <div>
                    <span className="font-mono text-stonk-muted">{f.a}</span>{" "}
                    <span>{f.act}</span>
                    <div className="text-xs text-stonk-muted">{f.t}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
