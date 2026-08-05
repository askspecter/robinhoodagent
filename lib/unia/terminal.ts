export type MenuItem = { n: number; label: string; status: string; on: boolean };

export const MENU: MenuItem[] = [
  { n: 1, label: "System Status", status: "online", on: true },
  { n: 2, label: "AI Core", status: "active", on: true },
  { n: 3, label: "Uniswap", status: "connected", on: true },
  { n: 4, label: "Modules", status: "12 loaded", on: true },
  { n: 5, label: "Explorer", status: "ready", on: true },
  { n: 6, label: "Developers", status: "online", on: true },
  { n: 7, label: "Exit", status: "logout", on: false },
];
