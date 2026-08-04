/**
 * ============================================================================
 *  SITE CONFIG  —  EDIT EVERYTHING HERE
 * ----------------------------------------------------------------------------
 *  Placeholder brand. Replace the values below with your own — especially the
 *  ones marked TODO — after you launch your token on Pons.
 * ============================================================================
 */

export const site = {
  // --- Brand (placeholder — change these) --------------------------------
  name: "PROJECT_ZERO", // TODO: your project name
  ticker: "$ZERO", // TODO: your token ticker
  host: "guest@pons", // shell prompt handle, e.g. user@host
  company: "Zero Labs", // TODO: your studio / company (footer)
  tagline: "A token, launched from the terminal — on Pons.",
  description:
    "An on-chain experiment on Robinhood Chain. No brokers, no middlemen — just a fixed-supply token launched straight from the command line via Pons.",

  // --- Token (Pons) ------------------------------------------------------
  token: {
    address: "0x0000000000000000000000000000000000000000", // TODO
    ponsUrl: "https://pons.family", // TODO: your token page on Pons
    launched: false, // set true once live → "./buy" activates
    supply: "1,000,000,000",
  },

  // --- Social links ------------------------------------------------------
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

export const isPlaceholderAddr = (addr: string) => addr.startsWith("0x0000000");
