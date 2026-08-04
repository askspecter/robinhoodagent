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
  company: "Your Labs LLC", // TODO: your company / studio name (footer)
  ticker: "$STONK", // TODO: your token ticker
  tagline: "Own a broker. Clock in. Get stonks.",
  description:
    "An on-chain broker collection on Robinhood Chain. Mint your broker, activate it, and let it work overtime — all powered by a token launched on Pons.",

  // --- Token (Pons) ------------------------------------------------------
  // Fill in after you launch on the Pons Launchpad.
  token: {
    // TODO: your token contract address on Robinhood Chain (0x...)
    address: "0x0000000000000000000000000000000000000000",
    // TODO: your token page on Pons ("Buy on Pons" button points here)
    ponsUrl: "https://pons.family",
    // Explorer link is derived from the address above.
    launched: false, // set true once the token is live → button activates
  },

  // --- NFT Mint ----------------------------------------------------------
  nft: {
    collectionName: "StonkBrokers",
    totalSupply: 4444,
    mintPriceLabel: "FREE", // e.g. "0.0042 ETH"
    // TODO: NFT contract address (leave 0x0 until deployed → demo mode)
    contractAddress: "0x0000000000000000000000000000000000000000",
    maxPerWallet: 3,
  },

  // --- Social links (replace with your own) ------------------------------
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
