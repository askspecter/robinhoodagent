const QA = [
  {
    q: "Apa itu proyek ini?",
    a: "Koleksi broker NFT bertema Wall Street di Robinhood Chain. Kamu mint broker, aktifkan, dan dapat reward — semua ditenagai token yang diluncurkan di Pons.",
  },
  {
    q: "Di mana token-nya diluncurkan?",
    a: "Token utama diluncurkan lewat Pons Launchpad di Robinhood Chain. Setelah live, tombol ‘Buy on Pons’ akan aktif dan mengarah langsung ke halaman token.",
  },
  {
    q: "Berapa harga mint NFT-nya?",
    a: "Mint gratis (kamu hanya bayar gas). Batas per wallet diatur di kontrak. Cek halaman Mint untuk status terbaru.",
  },
  {
    q: "Wallet apa yang didukung?",
    a: "Wallet EVM apa pun yang injected ke browser (mis. MetaMask). Website bisa menambahkan Robinhood Chain otomatis lewat tombol connect.",
  },
  {
    q: "Apakah ini berafiliasi dengan Robinhood?",
    a: "Tidak. Proyek ini berjalan di Robinhood Chain (jaringan permissionless) tetapi tidak berafiliasi dengan atau didukung oleh Robinhood Markets, Inc.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
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
