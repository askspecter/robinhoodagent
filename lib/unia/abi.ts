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
