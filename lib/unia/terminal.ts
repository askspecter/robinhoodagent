export type SectionKey = "terminal" | "nft" | "rewards" | "docs" | "network" | "devs" | "exit";

export type MenuItem = { n: number; key: SectionKey; label: string; status: string; on: boolean };

export const MENU: MenuItem[] = [
  { n: 1, key: "terminal", label: "Terminal", status: "live", on: true },
  { n: 2, key: "nft", label: "NFT Pass", status: "mint open", on: true },
  { n: 3, key: "rewards", label: "Rewards", status: "premium", on: true },
  { n: 4, key: "docs", label: "Docs", status: "read", on: true },
  { n: 5, key: "network", label: "Network", status: "#4663", on: true },
  { n: 6, key: "devs", label: "Developers", status: "API", on: true },
  { n: 7, key: "exit", label: "Exit", status: "logout", on: false },
];
