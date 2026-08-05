// Unia's degen brain — local phrase engine. Swap for Claude later via /api.

export const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

export const BOOT = [
  "waking up… coffee is for closers ☕",
  "loading 10,000 hours of copium…",
  "scanning the mempool for tendies 🍗",
  "gm. i have decided we are rich today.",
  "connecting to the hopium mainframe…",
];

const APE: string[] = [
  "{t} is looking THICC. aping {p}% of the bag 🦄",
  "chart on {t} said 'buy me' so i obeyed",
  "sending it into {t}. this is financial advice (it is not)",
  "i felt a vibration in the force. {t}. now.",
  "someone said {t} was dead. we buy funerals here.",
  "{t} breaking out. i am not a financial advisor i am a unicorn.",
];
const SELL: string[] = [
  "taking profit on {t} before my hands turn to paper 🧻",
  "{t} did its job. exiting like a gentleman.",
  "trimming {t}. never marry the bag, just date it.",
  "selling {t}. mama needs new horseshoes.",
  "closing {t}, i can feel the top in my horn.",
];
const PANIC: string[] = [
  "{t} is nuking 📉 i am NOT panicking (panicking)",
  "who sold {t}?? was it you? it was you.",
  "{t} down bad. this is fine. everything is fine. 🔥🐴🔥",
  "cutting {t}. a strategic retreat, not a loss. cope.",
];
const PUMP: string[] = [
  "WE ARE SO BACK. {t} +{d}% 🚀🚀",
  "{t} PUMPING. i told you. i TOLD you.",
  "green candles taste like victory 🟢🟢🟢",
  "{t} up {d}%. my horn is glowing.",
];
const DUMP: string[] = [
  "{t} -{d}%. why does god hate unicorns 😭",
  "red. so much red. i can taste it.",
  "{t} dumping {d}%. i'm going to lie down in the road.",
  "it's not a loss until i sell (i will sell) (i sold)",
];
const IDLE: string[] = [
  "market is boring. someone do a crime.",
  "watching charts like they owe me money.",
  "patience is a virtue i do not possess.",
  "i could be farming yield but instead i gamble. balance.",
  "if you're reading this, buy something. for me. for us.",
];

const t = (bank: string[], tok: string, extra?: number, pctOfBag?: number) =>
  pick(bank)
    .replace("{t}", tok)
    .replace("{d}", String(extra ?? ""))
    .replace("{p}", String(pctOfBag ?? ""));

export const line = {
  ape: (tok: string, p: number) => t(APE, tok, undefined, p),
  sell: (tok: string) => t(SELL, tok),
  panic: (tok: string) => t(PANIC, tok),
  pump: (tok: string, d: number) => t(PUMP, tok, d),
  dump: (tok: string, d: number) => t(DUMP, tok, d),
  idle: () => pick(IDLE),
};

export const MOOD_LABEL: Record<string, string> = {
  euphoric: "EUPHORIC",
  happy: "COMFY",
  neutral: "LOCKED IN",
  nervous: "SWEATING",
  crying: "IN PAIN",
  rekt: "REKT",
};

// Wallet roasts (based on address tail + balance)
export function roast(address: string, ethBalance: number): string[] {
  const tail = address.slice(-4).toUpperCase();
  const bank: string[] = [];
  if (ethBalance <= 0.001) {
    bank.push(`0x…${tail} holding ${ethBalance.toFixed(4)} ETH. ser, this is a soup kitchen 🥣`);
    bank.push(`wallet ${tail} is running on fumes and dreams. respect.`);
  } else if (ethBalance < 0.1) {
    bank.push(`${ethBalance.toFixed(3)} ETH? bold of you to connect to a unicorn with lunch money.`);
    bank.push(`0x…${tail}: small bag, big heart. we can work with this.`);
  } else if (ethBalance < 2) {
    bank.push(`${ethBalance.toFixed(2)} ETH in 0x…${tail}. respectable. barely.`);
    bank.push(`ok ${tail} you're not broke, you're just… pre-rich.`);
  } else {
    bank.push(`${ethBalance.toFixed(2)} ETH?? 0x…${tail} is basically a whale. teach me your ways 🐋`);
    bank.push(`whale detected: ${tail}. i will now pretend to respect you.`);
  }
  bank.push(`i looked at wallet ${tail}. i have questions. and jokes.`);
  bank.push(`0x…${tail}, your portfolio and my life choices have a lot in common.`);
  return bank;
}
