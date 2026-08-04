// Fixed CRT overlays: scanlines, vignette, flicker, sweeping beam.
export function Crt() {
  return (
    <>
      <div className="crt-beam" aria-hidden />
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-flicker" aria-hidden />
      <div className="crt-vignette" aria-hidden />
    </>
  );
}
