/**
 * ============================================================================
 *  SITE CONFIG  —  EDIT EVERYTHING HERE
 * ----------------------------------------------------------------------------
 *  Ganti nilai-nilai di bawah setelah kamu meluncurkan token di Pons.
 *  Cari komentar "TODO" untuk hal yang wajib kamu isi nanti.
 * ============================================================================
 */

export const site = {
  // --- Brand -------------------------------------------------------------
  name: "STONK BROKERS",
  ticker: "$STONK", // TODO: ganti dengan ticker token kamu
  tagline: "Punya broker. Clock in. Dapat saham.",
  description:
    "Koleksi broker on-chain di Robinhood Chain. Mint broker-mu, aktifkan, dan biarkan dia kerja lembur — semua ditenagai token yang diluncurkan di Pons.",

  // --- Token (Pons) ------------------------------------------------------
  // Isi setelah launch di Pons Launchpad.
  token: {
    // TODO: alamat kontrak token kamu di Robinhood Chain (0x...)
    address: "0x0000000000000000000000000000000000000000",
    // TODO: link halaman token kamu di Pons (tombol "Buy on Pons" mengarah ke sini)
    ponsUrl: "https://pons.family",
    // Link explorer akan otomatis dibentuk dari address di atas.
    launched: false, // set true setelah token live → tombol jadi aktif
  },

  // --- NFT Mint ----------------------------------------------------------
  nft: {
    collectionName: "StonkBrokers",
    totalSupply: 4444,
    mintPriceLabel: "FREE", // atau "0.0042 ETH" dsb
    // TODO: alamat kontrak NFT (biarkan 0x0 kalau belum deploy → mint jadi demo)
    contractAddress: "0x0000000000000000000000000000000000000000",
    maxPerWallet: 3,
  },

  // --- Social links (ganti sesuai punyamu) -------------------------------
  socials: {
    twitter: "https://x.com/",
    telegram: "https://t.me/",
    discord: "",
    docs: "https://docs.ponsfamily.com/",
  },
};

// ---------------------------------------------------------------------------
//  Robinhood Chain (mainnet) — https://chainlist.org/chain/4663
// ---------------------------------------------------------------------------
export const robinhoodChain = {
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrl: "https://rpc.mainnet.chain.robinhood.com",
  explorerUrl: "https://robinhoodchain.blockscout.com",
};

export const explorerAddress = (addr: string) =>
  `${robinhoodChain.explorerUrl}/address/${addr}`;
export const explorerToken = (addr: string) =>
  `${robinhoodChain.explorerUrl}/token/${addr}`;
