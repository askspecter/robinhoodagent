import Link from "next/link";

export function ComingSoon({
  title,
  subtitle,
  blurb,
}: {
  title: string;
  subtitle: string;
  blurb: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center min-h-[70vh] grid place-items-center">
      <div>
        <div className="text-stonk-green text-sm font-mono mb-3">// {subtitle}</div>
        <h1 className="text-4xl sm:text-5xl font-black">{title}</h1>
        <div className="chip inline-block mt-6 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-stonk-green">
          Coming soon
        </div>
        <p className="mt-6 text-stonk-muted max-w-xl mx-auto">{blurb}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-ghost px-6 py-3 text-sm font-mono uppercase tracking-wider">
            Back home
          </Link>
          <Link href="/mint" className="btn-primary px-6 py-3 text-sm">
            Mint a Broker →
          </Link>
        </div>
      </div>
    </section>
  );
}
