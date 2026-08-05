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
    // Deployed $UNIA token on Robinhood Chain (live on pools.trade).
    // A real address here switches on holder-detection, explorer links,
    // the Buy box and the pools.trade deep-link automatically.
    address: "0x22FAE0F9eAd728768e29b1E14ea46F409Fb06658",
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
//  Launch — $UNIA on pools.trade (Robinhood Chain)
// ---------------------------------------------------------------------------
export const LAUNCH = {
  // ISO UTC. 2026-08-05T16:00:00Z = 00:00 (UTC+8) / 23:00 WIB.
  // (moved 1h earlier — our countdown was running 1h ahead of pools.trade)
  // Change this one line if the launch time moves.
  at: "2026-08-05T16:00:00Z",
  poolsUrl: "https://pools.trade",
};

// ---------------------------------------------------------------------------
//  pools.trade — protocol contracts on Robinhood Chain
// ----------------------------------------------------------------------------
//  These are pools.trade's OWN infrastructure (not $UNIA's token). The site
//  does not need to call the launcher / fee contracts — they're kept here for
//  reference and for the explorer links in the Devs section. The one contract
//  the site can actually use is `atomicBuyRoute` (ETH → $UNIA in one tx),
//  wired through the BUY config below.
// ---------------------------------------------------------------------------
export const POOLS = {
  url: "https://pools.trade",
  liquidityLauncher: "0x7a6c474b4dcd35b72203d2b569eafe4c9b5c768e",
  feesOn: "0x3f556b542105d5efbbefe7c766a4919c76b960fb",
  feesOff: "0x36bdb859518c89f764337cd5c24762d2aa650f3c",
  atomicBuyRoute: "0x4962907c62ebc529e84de899d081a53ca9ed05dd",
  creatorFeeVault: "0xa5889cafcb1757218ea71730bee381cc2a3f2ccc",
};

// ---------------------------------------------------------------------------
//  Native "Buy $UNIA" — on-site swap through pools.trade's atomic buy route.
// ----------------------------------------------------------------------------
//  SAFETY: this stays OFF (`verified: false`) until the route's ABI is
//  confirmed against the deployed contract on the explorer. While off, the Buy
//  button simply opens pools.trade — no on-chain call is ever made with an
//  unverified signature. To turn it on:
//    1. confirm ATOMIC_BUY_ABI in lib/unia/abi.ts matches the real route,
//    2. set `functionName` / `args` shape below to match,
//    3. flip `verified` to true (needs a real $UNIA token address too).
// ---------------------------------------------------------------------------
export const BUY = {
  verified: false,            // ← flip to true once the ABI is confirmed
  functionName: "buy",        // ← candidate; set to the real route function
  slippageBps: 300,           // 3% — informational until wired
  presetsEth: ["0.01", "0.05", "0.1"],
};

// pools.trade link — deep-links to the token page once its address is live,
// otherwise the pools.trade home. (Adjust the path if pools.trade uses a
// different token-URL scheme.)
export const poolsTradeUrl = () =>
  isPlaceholderAddr(UNIA.token.address)
    ? POOLS.url
    : `${POOLS.url}/token/${UNIA.token.address}`;

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
