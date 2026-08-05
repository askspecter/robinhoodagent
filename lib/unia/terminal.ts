// Character-first navigation. The star is UNIA (the live unicorn);
// the token/NFT economy lives behind one small "$UNIA · soon" hub.
export type SectionKey = "live" | "roast" | "about" | "unia";

export type MenuItem = { n: number; key: SectionKey; label: string; status: string; on: boolean };

export const MENU: MenuItem[] = [
  { n: 1, key: "live", label: "Live", status: "live", on: true },
  { n: 2, key: "roast", label: "Roast me", status: "try it", on: true },
  { n: 3, key: "about", label: "About", status: "lore", on: true },
  { n: 4, key: "unia", label: "$UNIA", status: "soon", on: false },
];
