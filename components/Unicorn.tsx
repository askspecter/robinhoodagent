export function Unicorn() {
  return (
    <div className="relative w-full grid place-items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/unicorn.png"
        alt="UNIA unicorn"
        className="w-full max-w-[340px] select-none"
        style={{ filter: "drop-shadow(0 0 26px rgba(255,46,136,0.35))" }}
        draggable={false}
      />
    </div>
  );
}
