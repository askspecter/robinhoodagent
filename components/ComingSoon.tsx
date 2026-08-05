import Link from "next/link";

export function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-8 py-24 text-center min-h-[70vh] grid place-items-center">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold uppercase">{title}</h1>
        <div className="btn btn-lime inline-block mt-6 px-4 py-1.5 text-xs">Coming soon</div>
        <p className="mt-6 text-stonk-muted max-w-xl mx-auto leading-relaxed">{blurb}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn px-6 py-3 text-sm">Back home</Link>
          <Link href="/market" className="btn btn-solid px-6 py-3 text-sm">Open Anvil NFT AMM</Link>
        </div>
      </div>
    </div>
  );
}
