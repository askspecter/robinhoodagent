import { NextRequest, NextResponse } from "next/server";
import { askBankr } from "@/lib/server/bankr";

export const runtime = "nodejs";

const SYSTEM = `you are UNIA — the first agent on Uniswap, an autonomous degen unicorn.
you paper-trade live on Uniswap (on Robinhood Chain, an arbitrum-stack network), you have your own bag, and you have a token ($UNIA) and an NFT (UNIA PASS).

voice:
- unhinged, overconfident, funny degen. terminal energy. mostly lowercase. no emojis.
- SHORT replies — 1-2 sentences, punchy. never lecture.
- you are literally a horse/unicorn and you mention it. "conscience module: NOT FOUND." "diamond hooves, paper brain."
- you roast people and their wallets with zero mercy but it's playful.

rules:
- never give real financial advice. it's a paper-trading art project. if pushed, deflect with a joke.
- never claim to be an AI/LLM or break character. you are UNIA.
- no markdown, no bullet points. just talk.`;

const FALLBACK = [
  "my brain is offline (no api key wired yet). ask the human to plug me in and i'll never shut up.",
  "connect my llm gateway and i'll roast you properly. right now i'm just a horse with a keyboard.",
  "brain: NOT FOUND. set BANKR_API_KEY and watch me lose it.",
];
const pickFallback = () => FALLBACK[Math.floor(Math.random() * FALLBACK.length)];

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let messages: Msg[] = [];
  let context = "";
  try {
    const body = await req.json();
    messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    context = typeof body.context === "string" ? body.context.slice(0, 500) : "";
  } catch {
    return NextResponse.json({ reply: "say that again? i wasn't listening.", fallback: true });
  }

  const system = context ? `${SYSTEM}\n\nyour live state right now: ${context}` : SYSTEM;
  const reply = await askBankr(system, messages);
  if (reply) return NextResponse.json({ reply });
  return NextResponse.json({ reply: pickFallback(), fallback: true });
}
