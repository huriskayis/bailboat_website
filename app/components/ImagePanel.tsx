import Image from "next/image";

export default function ImagePanel({
  label,
  tall = false,
  src,
}: {
  label: string;
  tall?: boolean;
  src?: string;
}) {
  if (src) {
    return (
      <div className={`imgpanel ${tall ? "imgpanel--tall" : ""}`}>
        <Image src={src} alt={label} fill style={{ objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <div className={`imgpanel ${tall ? "imgpanel--tall" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="imgpanel__svg">
        {/* horizon */}
        <line x1="0" y1="150" x2="400" y2="150" stroke="var(--brass)" strokeOpacity="0.18" strokeWidth="1" />
        {/* mast + sail silhouette */}
        <g stroke="var(--brass)" strokeOpacity="0.5" fill="none" strokeWidth="1.1">
          <line x1="205" y1="34" x2="205" y2="150" />
          <path d="M205 44 C 168 78, 158 120, 176 150 L205 150 Z" fill="var(--brass)" fillOpacity="0.08" />
          <path d="M209 52 C 236 82, 244 122, 232 150 L209 150 Z" fill="var(--brass)" fillOpacity="0.05" />
          {/* hull */}
          <path d="M150 150 L262 150 C 256 168, 236 176, 206 176 C 176 176, 158 168, 150 150 Z" fill="var(--brass)" fillOpacity="0.10" />
        </g>
      </svg>
      <span className="imgpanel__label">{label}</span>
    </div>
  );
}
