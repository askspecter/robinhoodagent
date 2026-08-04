# PROJECT_ZERO — cinematic terminal site, token launched on Pons

An original **terminal / CRT-themed** web app for a token launched on the **Pons
Launchpad** on **Robinhood Chain**. Boot sequence, scanlines, phosphor glow, a typed
hero, and an **interactive command console** — login via **Privy** (connect wallet or
email sign-in).

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + wagmi/viem + Privy**.

> Everything is placeholder branding. Change it in `lib/config.ts`.

## Features

- **Cinematic CRT terminal theme** — boot screen (once per session, skippable),
  scanlines, vignette, flicker, sweeping beam, phosphor-green glow, blinking cursors.
- **Interactive console** on the home page — type `help`, `about`, `token`, `buy`,
  `roadmap`, `socials`, `ls`, `cat <file>`, `whoami`, `clear`.
- **Privy auth** — `connect --wallet` + `auth --email` (wallet, email, Google, X).
  Falls back to an injected wallet button when Privy isn't configured yet.
- **Pages**: `/` (console), `/about`, `/token` (contract + allocation), `/roadmap`.
- **Buy on Pons** CTA — activates once the token is live.
- **Robinhood Chain** (chainId 4663) preconfigured with auto add/switch.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: add NEXT_PUBLIC_PRIVY_APP_ID
npm run dev                  # http://localhost:3000
npm run build                # production build
```

## Configure — `lib/config.ts`

| Field | Set to |
|---|---|
| `site.name`, `site.ticker`, `site.host`, `site.company`, `site.tagline` | Your brand |
| `site.token.address` | Token contract on Robinhood Chain (`0x…`) |
| `site.token.ponsUrl` | Your token page on Pons |
| `site.token.launched` | `true` to activate `./buy` and the console `buy` command |
| `site.token.supply` | Displayed supply |
| `site.socials.*` | Twitter / Telegram / Discord / Docs |

Robinhood Chain config (chainId `4663`, RPC, explorer) is preset under `robinhoodChain`.

## Privy setup

1. Create an app at [dashboard.privy.io](https://dashboard.privy.io), copy the App ID.
2. Set `NEXT_PUBLIC_PRIVY_APP_ID` locally and on Vercel (**Settings → Environment
   Variables**), then redeploy. Add your production domain to Privy allowed origins.

Without the App ID the site still builds and deploys — it uses an injected-wallet
(MetaMask) connect button instead.

## Deploy on Vercel

- Framework preset **Next.js**, Root Directory `./`, Build Command `next build`.
- `.npmrc` sets `legacy-peer-deps=true` so Privy's peers resolve.
- `next.config.mjs` stubs optional wallet-connector deps we don't use.
- Production branch is **`main`**.

---

*Not affiliated with or endorsed by Robinhood Markets, Inc. Robinhood Chain is a
permissionless network. Token is launched on Pons.*
