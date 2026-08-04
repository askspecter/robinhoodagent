# STONK BROKERS — website (tema StonkBrokers, token di Pons)

Website bergaya **StonkBrokers** (koleksi broker NFT bertema Wall Street di
**Robinhood Chain**), tetapi token utamanya **diluncurkan di Pons Launchpad**,
bukan di Stonk Launcher. Website ini berfungsi sebagai landing page + free NFT
mint + dashboard + gerbang "Buy on Pons".

Dibuat dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS + wagmi/viem**.

## Fitur

- **Landing** — hero, ticker saham, "how it works" (mint → activate → clock in →
  stock drops), tokenomics, roadmap, FAQ.
- **Free NFT Mint** (`/mint`) — connect wallet + tombol mint on-chain. Jalan dalam
  "mode demo" sampai alamat kontrak NFT diisi.
- **Dashboard** (`/dashboard`) — gaya StonkScope/Anvil AMM: stats, leaderboard
  broker, live activity (data ilustratif).
- **Connect Wallet** — injected connector (MetaMask/EVM), auto "Add/Switch to
  Robinhood Chain", tampilkan saldo.
- **Buy on Pons** — CTA yang mengarah ke halaman token kamu di Pons (aktif setelah
  token diluncurkan).

## Jalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Yang harus kamu isi — `lib/config.ts`

Semua nilai brand/token ada di **satu file**: `lib/config.ts`. Setelah kamu
meluncurkan token di Pons, ganti:

| Field | Isi dengan |
|---|---|
| `site.name`, `site.ticker`, `site.tagline` | Nama & ticker proyekmu |
| `site.token.address` | Alamat kontrak token di Robinhood Chain (`0x…`) |
| `site.token.ponsUrl` | Link halaman token kamu di Pons |
| `site.token.launched` | Set `true` agar tombol "Buy on Pons" aktif |
| `site.nft.contractAddress` | Alamat kontrak NFT (biarkan `0x0…` = mode demo) |
| `site.socials.*` | Link Twitter/Telegram/Discord/Docs |

Konfigurasi **Robinhood Chain** (chainId `4663`, RPC, explorer) sudah terisi di
`lib/config.ts` → `robinhoodChain`.

## Catatan integrasi on-chain

- **Mint**: `app/mint/page.tsx` memakai ABI ERC-721A minimal (`mint(uint256)`).
  Sesuaikan `MINT_ABI`, `value`, dan `functionName` dengan kontrak NFT-mu.
- **Dashboard**: angka masih ilustratif. Sambungkan ke indexer/subgraph atau baca
  kontrak via `viem` untuk data riil.
- **Token launch** dilakukan langsung di Pons (bukan dari website ini) — website
  hanya menautkannya lewat `site.token.ponsUrl`.

## Deploy

Optimized untuk **Vercel** (`npm run build`). Bisa juga host statis/Node lain yang
mendukung Next.js 14.

---

*Tidak berafiliasi dengan atau didukung oleh Robinhood Markets, Inc. Robinhood
Chain adalah jaringan permissionless.*
