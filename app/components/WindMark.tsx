export default function WindMark({
  size = 96,
  stroke = "var(--brass)",
  className,
}: {
  size?: number;
  stroke?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Pusula gülü"
      className={className}
      style={{ display: "block" }}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke={stroke} strokeOpacity="0.35" strokeWidth="0.75" />
      <circle cx="50" cy="50" r="34" fill="none" stroke={stroke} strokeOpacity="0.25" strokeWidth="0.5" />
      {/* four principal points */}
      <path d="M50 4 L55 46 L50 50 L45 46 Z" fill={stroke} fillOpacity="0.9" />
      <path d="M50 96 L45 54 L50 50 L55 54 Z" fill={stroke} fillOpacity="0.55" />
      <path d="M96 50 L54 45 L50 50 L54 55 Z" fill={stroke} fillOpacity="0.55" />
      <path d="M4 50 L46 55 L50 50 L46 45 Z" fill={stroke} fillOpacity="0.55" />
      {/* diagonal ordinals */}
      <g stroke={stroke} strokeOpacity="0.4" strokeWidth="0.5">
        <line x1="21" y1="21" x2="79" y2="79" />
        <line x1="79" y1="21" x2="21" y2="79" />
      </g>
      <circle cx="50" cy="50" r="2.4" fill={stroke} />
    </svg>
  );
}
