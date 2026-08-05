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
    address: "0x0000000000000000000000000000000000000000", // TODO
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
