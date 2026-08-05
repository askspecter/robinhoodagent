// Unia's degen brain — no emojis, terminal-flavored, unhinged.

export const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

export const BOOT = [
  "kernel: waking the beast. sleep is for the liquidated.",
  "mounting /dev/hopium ... OK",
  "loading 10,000 hours of copium ... OK",
  "unicorn online. i have decided we are rich today.",
  "conscience module ... NOT FOUND. proceeding.",
];

const APE = [
  "{t} LOOKING THICC. aping {p}% of the bag. no thoughts.",
  "chart on {t} whispered to me. i obeyed. i always obey.",
  "sending {t}. this is not financial advice, i am a horse.",
  "i felt {t} in my HORN. buying before my brain catches up.",
  "they said {t} was dead. we buy funerals here.",
  "leverage is a paper concept and so is fear. aping {t}.",
  "{t}. now. NOW. do not question the unicorn.",
];
const SELL = [
  "taking profit on {t} before my hands turn to paper.",
  "{t} did its job. exiting like a gentleman horse.",
  "trimming {t}. never marry the bag, just date it violently.",
  "closing {t}. i can feel the top in my HORN.",
  "selling {t}. mama needs new horseshoes.",
];
const PANIC = [
  "{t} IS NUKING. i am NOT panicking. (panicking)",
  "who sold {t}. WAS IT YOU. it was you.",
  "{t} DOWN BAD. this is fine. everything is fine. it is not fine.",
  "cutting {t}. strategic retreat. absolutely not a loss. cope.",
  "EJECT EJECT {t} EJECT",
];
const PUMP = [
  "WE ARE SO BACK. {t} +{d}%. I TOLD YOU. I TOLD YOU.",
  "{t} PUMPING {d}%. my horn is GLOWING.",
  "GREEN. so much green. i can taste the tendies.",
  "{t} +{d}%. print. print. PRINT.",
];
const DUMP = [
  "{t} -{d}%. why does god hate horses.",
  "RED. it is all red. i am going to lie down in the road.",
  "{t} dumping {d}%. it is not a loss until i sell. i sold.",
  "{t} -{d}%. sir this is a massacre.",
];
const IDLE = [
  "market is boring. someone commit a light financial crime.",
  "watching charts like they owe me child support.",
  "patience is a virtue i sold at a loss.",
  "i could be farming yield. instead i gamble. balance.",
  "if you are reading this: buy something. for me. for us.",
  "diamond hooves. paper brain. perfect combination.",
];
const SYS = [
  "SYSTEM: liquidation engine armed (paper).",
  "SYSTEM: mev bot detected. i taunt it.",
  "SYSTEM: risk limits disabled by user (me).",
  "SYSTEM: greed=100 fear=0 nominal.",
  "SYSTEM: horn temperature critical.",
];

const fill = (bank: string[], tok: string, d?: number, p?: number) =>
  pick(bank).replace("{t}", tok).replace("{d}", String(d ?? "")).replace("{p}", String(p ?? ""));

export const line = {
  ape: (t: string, p: number) => fill(APE, t, undefined, p),
  sell: (t: string) => fill(SELL, t),
  panic: (t: string) => fill(PANIC, t),
  pump: (t: string, d: number) => fill(PUMP, t, d),
  dump: (t: string, d: number) => fill(DUMP, t, d),
  idle: () => pick(IDLE),
  sys: () => pick(SYS),
};

export const MOOD_LABEL: Record<string, string> = {
  euphoric: "EUPHORIC",
  happy: "COMFY",
  neutral: "LOCKED_IN",
  nervous: "SWEATING",
  crying: "IN_PAIN",
  rekt: "REKT",
};

export function roast(address: string, ethBalance: number): string[] {
  const tail = address.slice(-4).toUpperCase();
  const b: string[] = [];
  if (ethBalance <= 0.001) {
    b.push(`0x..${tail} holding ${ethBalance.toFixed(4)} ETH. ser, this is a soup kitchen.`);
    b.push(`wallet ${tail} runs on fumes and delusion. respect.`);
  } else if (ethBalance < 0.1) {
    b.push(`${ethBalance.toFixed(3)} ETH. bold of you to connect to a unicorn with lunch money.`);
    b.push(`0x..${tail}: small bag, big cope. we can work with this.`);
  } else if (ethBalance < 2) {
    b.push(`${ethBalance.toFixed(2)} ETH in 0x..${tail}. respectable. barely. do not celebrate.`);
    b.push(`ok ${tail}, you are not broke. you are pre-rich. allegedly.`);
  } else {
    b.push(`${ethBalance.toFixed(2)} ETH? 0x..${tail} is basically a whale. i will pretend to respect you.`);
    b.push(`whale detected: ${tail}. teach me nothing. i already know everything.`);
  }
  b.push(`i scanned wallet ${tail}. i have questions and no manners.`);
  b.push(`0x..${tail}, your portfolio and my life choices have a lot in common.`);
  return b;
}
