# STONK BROKERS — StonkBrokers-style site, token launched on Pons

A **StonkBrokers-styled** web app (a Wall Street–themed broker NFT project on
**Robinhood Chain**) whose core token is **launched on the Pons Launchpad** instead
of Stonk Launcher. The site is the brand hub: landing page, free NFT mint, market
dashboard, launcher, and the gateway to buy the token on Pons.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + wagmi/viem**, with
wallet + email/social login via **Privy**.

## Features

- **Left sidebar UI** with lime-on-black terminal styling (Home, Anvil NFT AMM, Mint,
  Launcher, Exchange, Options, Broker Box, Safety Deposit Box, Docs).
- **Privy auth** — "Connect Wallet" + "Email sign in" (wallet, email, Google, X).
  Falls back to a plain injected-wallet button when Privy isn't configured yet.
- **Landing** — hero, stock ticker, how-it-works, tokenomics, roadmap, FAQ.
- **Free NFT Mint** (`/mint`) — connect/sign in + on-chain mint (demo mode until the
  NFT contract address is set).
- **Anvil NFT AMM** (`/marketplace`) — StonkScope-style stats, leaderboard, activity.
- **Launcher** (`/launcher`) — how to launch the token on Pons.
- **Buy on Pons** CTA — activates once the token is live.
- **Robinhood Chain** (chainId 4663) preconfigured, with auto add/switch network.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your NEXT_PUBLIC_PRIVY_APP_ID (optional)
npm run dev                  # http://localhost:3000
npm run build                # production build
```

## Configure — `lib/config.ts`

All brand/token values live in **one file**. After launching your token on Pons:

| Field | Set to |
|---|---|
| `site.name`, `site.company`, `site.ticker`, `site.tagline` | Your brand |
| `site.token.address` | Token contract on Robinhood Chain (`0x…`) |
| `site.token.ponsUrl` | Your token page on Pons |
| `site.token.launched` | `true` to activate the "Buy on Pons" button |
| `site.nft.contractAddress` | NFT contract (`0x0…` = demo mode) |
| `site.socials.*` | Twitter / Telegram / Discord / Docs |

Robinhood Chain config (chainId `4663`, RPC, explorer) is preset in
`lib/config.ts` → `robinhoodChain`.

## Privy setup

1. Create an app at [dashboard.privy.io](https://dashboard.privy.io) and copy the App ID.
2. Set `NEXT_PUBLIC_PRIVY_APP_ID` locally (`.env.local`) and on Vercel
   (**Settings → Environment Variables**), then redeploy.
3. In the Privy dashboard, add your production domain to the allowed origins.

Without the App ID the site still runs — it uses an injected-wallet (MetaMask) connect
button so it always builds and deploys.

## Deploy on Vercel

- Framework preset: **Next.js**, Root Directory: `./`, Build Command: `next build`.
- `.npmrc` sets `legacy-peer-deps=true` so Vercel's install resolves Privy's peers.
- `next.config.mjs` stubs optional wallet-connector deps we don't use (Coinbase,
  Farcaster/Solana, Stripe onramp, etc.) so bundling passes.
- Add `NEXT_PUBLIC_PRIVY_APP_ID` in Environment Variables for full Privy login.

## Notes

- The token launch itself happens on Pons (not from this site) — the site links to it
  via `site.token.ponsUrl`.
- Marketplace figures are illustrative; wire them to an on-chain indexer for real data.

---

*Not affiliated with or endorsed by Robinhood Markets, Inc. Robinhood Chain is a
permissionless network.*
