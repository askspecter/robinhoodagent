export function TerminalWindow({
  title,
  children,
  className = "",
  glow = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`win overflow-hidden ${glow ? "shadow-glow" : ""} ${className}`}>
      <div className="win-bar flex items-center gap-2 px-3 py-2">
        <span className="dot bg-stonk-red" />
        <span className="dot bg-stonk-amber" />
        <span className="dot bg-stonk-green" />
        <span className="ml-3 text-xs text-stonk-muted truncate">{title}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
