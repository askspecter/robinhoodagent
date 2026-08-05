export function Unicorn() {
  const c = "#4dff3a";
  return (
    <div className="relative w-full grid place-items-center" style={{ filter: `drop-shadow(0 0 18px ${c}44)` }}>
      <svg width="100%" height="100%" viewBox="0 0 300 320" className="max-w-[320px]">
        <defs>
          <radialGradient id="ug"><stop offset="0" stopColor={c} stopOpacity="0.28" /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="150" cy="165" r="140" fill="url(#ug)" />

        {/* mane (green, layered) */}
        <g fill="none" strokeLinecap="round">
          <path d="M176,86 C210,96 216,150 202,205 C196,232 208,250 214,262" stroke={c} strokeWidth="6" opacity="0.9" />
          <path d="M168,80 C206,84 222,140 214,200 C210,232 224,248 228,262" stroke={c} strokeWidth="5" opacity="0.55" />
          <path d="M184,96 C206,120 206,160 196,196" stroke={c} strokeWidth="4" opacity="0.4" />
        </g>

        {/* head + neck bust, facing left */}
        <path
          d="M52,182 C50,170 60,154 82,144 C110,122 138,108 156,96 C166,88 176,86 186,96
             C200,116 210,158 222,208 C230,236 234,254 226,266 L150,266
             C132,266 120,254 116,232 C106,214 94,206 80,202 C66,198 56,192 52,182 Z"
          fill={`${c}10`} stroke={c} strokeWidth="3.5" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 4px ${c})` }}
        />
        {/* ear */}
        <path d="M172,90 C168,60 190,52 200,74 C196,88 186,92 172,90 Z" fill={`${c}10`} stroke={c} strokeWidth="3" />
        {/* spiral horn */}
        <g stroke={c} style={{ filter: `drop-shadow(0 0 8px ${c})` }}>
          <path d="M150,96 L126,20 L166,92 Z" fill={`${c}18`} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M143,78 l16,-3 M146,66 l14,-3 M149,54 l12,-3 M151,42 l10,-3 M153,30 l7,-2" strokeWidth="2" fill="none" />
        </g>
        {/* eye + nostril */}
        <g fill={c}><circle cx="150" cy="128" r="5.5" /></g>
        <ellipse cx="70" cy="176" rx="5" ry="4" fill="none" stroke={c} strokeWidth="2.5" />
      </svg>
    </div>
  );
}
