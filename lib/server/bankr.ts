// Server-only helper for UNIA's brain (Bankr LLM Gateway, OpenAI-compatible).
// Only imported by route handlers, so the API key never leaves the server.

const BASE = (process.env.BANKR_BASE_URL || "https://llm.bankr.bot/v1").replace(/\/$/, "");
const MODEL = process.env.BANKR_MODEL || "gpt-4o-mini";
const KEY = process.env.BANKR_API_KEY || "";

export const bankrConfigured = () => KEY.length > 0;

export type LlmMsg = { role: "system" | "user" | "assistant"; content: string };

/** Returns the assistant text, or null when unconfigured / on failure. */
export async function askBankr(system: string, messages: LlmMsg[], maxTokens = 220): Promise<string | null> {
  if (!KEY) return null;
  try {
    const res = await fetch(`${BASE}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": KEY },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        temperature: 1.05,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    return typeof reply === "string" && reply.trim() ? reply.trim() : null;
  } catch {
    return null;
  }
}
