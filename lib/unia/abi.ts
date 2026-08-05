// Minimal ABIs for the on-chain reads/writes the app uses.

export const UNIA_TOKEN_ABI = [
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "a", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
] as const;

export const UNIA_PASS_ABI = [
  { type: "function", name: "mint", stateMutability: "payable", inputs: [], outputs: [] },
  { type: "function", name: "claim", stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "a", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "pendingRewards", stateMutability: "view", inputs: [{ name: "a", type: "address" }], outputs: [{ type: "uint256" }] },
  { type: "function", name: "mintPrice", stateMutability: "view", inputs: [{ name: "a", type: "address" }], outputs: [{ type: "uint256" }] },
] as const;

// pools.trade "atomic buy route" — ETH → token in one tx.
// ⚠️ CANDIDATE signature, NOT yet verified against the deployed route
// (0x4962…). The Buy box will not call this until BUY.verified === true in
// lib/config.ts. Replace inputs/name below with the real ABI from the
// explorer before enabling native buys.
//   buy(address token, uint256 amountOutMin, address to) payable
export const ATOMIC_BUY_ABI = [
  {
    type: "function",
    name: "buy",
    stateMutability: "payable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amountOutMin", type: "uint256" },
      { name: "to", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
] as const;
