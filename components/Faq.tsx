const QA = [
  {
    q: "What is this project?",
    a: "A Wall Street–themed broker NFT collection on Robinhood Chain. You mint a broker, activate it, and earn rewards — all powered by a token launched on Pons.",
  },
  {
    q: "Where is the token launched?",
    a: "The core token is launched via the Pons Launchpad on Robinhood Chain. Once it's live, the “Buy on Pons” button activates and links straight to the token page.",
  },
  {
    q: "How much is the NFT mint?",
    a: "Minting is free (you only pay gas). Per-wallet limits are enforced by the contract. Check the Mint page for the latest status.",
  },
  {
    q: "Which wallets are supported?",
    a: "Sign in with email or a social account via Privy, or connect any EVM wallet. The site can add Robinhood Chain automatically.",
  },
  {
    q: "Is this affiliated with Robinhood?",
    a: "No. The project runs on Robinhood Chain (a permissionless network) but is not affiliated with or endorsed by Robinhood Markets, Inc.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-20">
      <div className="mb-10 text-center">
        <div className="text-stonk-green text-sm font-mono mb-2">// faq</div>
        <h2 className="text-3xl sm:text-4xl font-black">Questions from the floor</h2>
      </div>
      <div className="space-y-3">
        {QA.map((item) => (
          <details key={item.q} className="panel p-5 group">
            <summary className="cursor-pointer font-semibold list-none flex items-center justify-between">
              {item.q}
              <span className="text-stonk-green transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-stonk-muted leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
