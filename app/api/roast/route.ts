import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, formatEther, isAddress } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { askBankr } from "@/lib/server/bankr";
import { roast as localRoast } from "@/lib/unia/phrases";

export const runtime = "nodejs";

const client = createPublicClient({
  chain: mainnet,
  // fail fast: if the RPC is slow/down we fall back to a local roast rather
  // than hanging the request (a hung roast reads as "broken" to the user).
  transport: http(process.env.ETH_RPC_URL || "https://eth.llamarpc.com", {
    timeout: 4000,
    retryCount: 1,
  }),
});

const SYSTEM = `you are UNIA — the first agent on Uniswap, a savage degen unicorn who roasts wallets.
given a wallet summary, roast it in 3-4 SHORT brutal-but-playful lines, one per line.
lowercase, terminal energy, no emojis, no markdown, no financial advice. you are a horse and you know it.`;

export async function GET(req: NextRequest) {
  const input = (new URL(req.url).searchParams.get("address") || "").trim();
  if (!input) return NextResponse.json({ lines: ["give me a wallet. i can't roast air."], real: false });

  let addr = input;
  let ens: string | null = null;

  // resolve an ENS name to an address
  if (input.toLowerCase().endsWith(".eth")) {
    try {
      const resolved = await client.getEnsAddress({ name: normalize(input) });
      if (resolved) { addr = resolved; ens = input; }
    } catch { /* ignore */ }
  }
  if (!isAddress(addr)) {
    const wasEns = input.toLowerCase().endsWith(".eth");
    return NextResponse.json({
      lines: [wasEns
        ? "couldn't resolve that ENS name — drop the 0x address instead."
        : "that's not a wallet, that's a keysmash. try again."],
      real: false,
    });
  }

  let ethBal = 0, txs = 0;
  try {
    const [b, t] = await Promise.all([
      client.getBalance({ address: addr as `0x${string}` }),
      client.getTransactionCount({ address: addr as `0x${string}` }),
    ]);
    ethBal = Number(formatEther(b));
    txs = t;
    if (!ens) { try { ens = await client.getEnsName({ address: addr as `0x${string}` }); } catch { /* no ens */ } }
  } catch { /* rpc blocked/failed — roast with what we have */ }

  const who = ens || `0x..${addr.slice(-4)}`;
  const summary = `${who} holds ${ethBal.toFixed(4)} ETH with ${txs} lifetime transactions on ethereum mainnet.`;

  const reply = await askBankr(SYSTEM, [{ role: "user", content: `roast this wallet: ${summary}` }], 260);
  if (reply) {
    const lines = reply.split(/\n+/).map((s) => s.replace(/^[-*»\d.\s]+/, "").trim()).filter(Boolean);
    return NextResponse.json({ lines: lines.length ? lines : [reply], real: true, ens, ethBal, txs });
  }
  // fallback: local phrase roaster with the real balance
  return NextResponse.json({ lines: localRoast(addr, ethBal), real: false, ens, ethBal, txs });
}
