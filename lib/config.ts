/**
 * ============================================================================
 *  UNIA — SITE CONFIG
 * ----------------------------------------------------------------------------
 *  UNIA, the first agent on Uniswap, living on Robinhood Chain.
 *  Placeholder contract addresses (0x000…) — swap for the real ones on deploy.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
//  Robinhood Chain (mainnet, chainId 4663)
// ---------------------------------------------------------------------------
export const robinhoodChain = {
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrl: "https://rpc.mainnet.chain.robinhood.com",
  explorerUrl: "https://robinhoodchain.blockscout.com",
};

// ---------------------------------------------------------------------------
//  $UNIA token + UNIA PASS (NFT) — mint + utility rules
// ---------------------------------------------------------------------------
export const UNIA = {
  token: {
    symbol: "$UNIA",
    // Deployed $UNIA token on Robinhood Chain (live on Pons).
    // A real address here switches on holder-detection, explorer links,
    // and the Pons deep-link automatically.
    address: "0x3Db7a7c26Bfe4D050Aa55020971F001a60Dcc924",
    // hold at least this much $UNIA to mint the Pass for free
    freeMintHold: 5_000_000,
  },
  pass: {
    name: "UNIA PASS",
    address: "0x0000000000000000000000000000000000000000", // TODO
    supply: 10_000,
    publicPriceEth: 0.005, // paid on Robinhood Chain when you don't hold 5M $UNIA
    rewardPerDay: 420, // $UNIA streamed per Pass per day (paper)
  },
};

// ---------------------------------------------------------------------------
//  Pons — the launchpad $UNIA lives on (Robinhood Chain)
// ---------------------------------------------------------------------------
export const PONS = {
  url: "https://pons.sc",
};

// ---------------------------------------------------------------------------
//  Launch — $UNIA on Pons (Robinhood Chain)
// ---------------------------------------------------------------------------
export const LAUNCH = {
  // ISO UTC. 2026-08-05T16:00:00Z = 00:00 (UTC+8) / 23:00 WIB.
  // Change this one line if the launch time moves.
  at: "2026-08-05T16:00:00Z",
  ponsUrl: PONS.url,
};

// Pons link — deep-links to the token page once its address is live, otherwise
// the Pons home. (Adjust the path if Pons uses a different token-URL scheme.)
export const ponsUrl = () =>
  isPlaceholderAddr(UNIA.token.address)
    ? PONS.url
    : `${PONS.url}/token/${UNIA.token.address}`;

// ---------------------------------------------------------------------------
//  Socials
// ---------------------------------------------------------------------------
export const SOCIALS = {
  x: "https://x.com/uniadotsh",
  telegram: "https://t.me/uniash",
};

export const explorerAddress = (addr: string) =>
  `${robinhoodChain.explorerUrl}/address/${addr}`;
export const explorerTx = (hash: string) =>
  `${robinhoodChain.explorerUrl}/tx/${hash}`;
export const explorerToken = (addr: string) =>
  `${robinhoodChain.explorerUrl}/token/${addr}`;

export const isPlaceholderAddr = (addr: string) => addr.startsWith("0x0000000");
