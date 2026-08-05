export function Unicorn() {
  return (
    <div className="relative w-full grid place-items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/unicorn.png"
        alt="UNIA unicorn"
        className="w-full max-w-[360px] select-none"
        draggable={false}
      />
    </div>
  );
}
