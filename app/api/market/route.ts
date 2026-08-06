import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 0;

/**
 * Real DEX-ish prices for UNIA's market. Server-side (avoids CORS, can be
 * cached). Uses CoinGecko's free simple-price endpoint. Returns { ok, prices }.
 * On any failure returns { ok:false } and the client keeps the simulation.
 *
 * $UNIA is intentionally absent — it trades on Pons (Robinhood Chain), so it
 * stays simulated on the client until it has a real price feed.
 */
const IDS: Record<string, string> = {
  WETH: "weth",
  WBTC: "wrapped-bitcoin",
  UNI: "uniswap",
  ARB: "arbitrum",
  PEPE: "pepe",
};

export async function GET() {
  try {
    const ids = Object.values(IDS).join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      // cache at the edge for 30s so we don't hammer the free API
      next: { revalidate: 30 },
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 200 });
    const data = await res.json();
    const prices: Record<string, { price: number; ch24: number }> = {};
    for (const [sym, id] of Object.entries(IDS)) {
      const d = data[id];
      if (d && typeof d.usd === "number") {
        prices[sym] = { price: d.usd, ch24: typeof d.usd_24h_change === "number" ? d.usd_24h_change : 0 };
      }
    }
    return NextResponse.json({ ok: Object.keys(prices).length > 0, prices });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
