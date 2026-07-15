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
        {/* water surface */}
        <line x1="0" y1="168" x2="400" y2="168" stroke="var(--brass)" strokeOpacity="0.15" strokeWidth="1" />
        {/* water ripples */}
        <path d="M50 176 Q110 172 170 176" stroke="var(--brass)" strokeOpacity="0.08" strokeWidth="1" fill="none" />
        <path d="M230 176 Q300 172 360 176" stroke="var(--brass)" strokeOpacity="0.08" strokeWidth="1" fill="none" />
        {/* main hull */}
        <path d="M72 158 L82 138 L308 134 L338 148 L338 168 L72 168 Z"
          fill="var(--brass)" fillOpacity="0.11" stroke="var(--brass)" strokeOpacity="0.38" strokeWidth="1.2" />
        {/* hull accent line */}
        <path d="M82 148 L308 144 L330 154" stroke="var(--brass)" strokeOpacity="0.18" strokeWidth="0.8" fill="none" />
        {/* cabin */}
        <rect x="178" y="112" width="96" height="30" rx="4"
          fill="var(--brass)" fillOpacity="0.08" stroke="var(--brass)" strokeOpacity="0.32" strokeWidth="1" />
        {/* cabin windshield */}
        <line x1="194" y1="112" x2="196" y2="138" stroke="var(--brass)" strokeOpacity="0.22" strokeWidth="1" />
        {/* GPS dome on bow */}
        <circle cx="126" cy="138" r="6"
          fill="var(--brass)" fillOpacity="0.07" stroke="var(--brass)" strokeOpacity="0.28" strokeWidth="1" />
        {/* antenna 1 */}
        <line x1="218" y1="112" x2="212" y2="80" stroke="var(--brass)" strokeOpacity="0.35" strokeWidth="0.9" />
        <circle cx="212" cy="80" r="2" fill="var(--brass)" fillOpacity="0.3" />
        {/* antenna 2 */}
        <line x1="246" y1="112" x2="244" y2="84" stroke="var(--brass)" strokeOpacity="0.35" strokeWidth="0.9" />
        <circle cx="244" cy="84" r="2" fill="var(--brass)" fillOpacity="0.3" />
        {/* propeller */}
        <ellipse cx="326" cy="170" rx="6" ry="10"
          fill="none" stroke="var(--brass)" strokeOpacity="0.32" strokeWidth="1" />
        <line x1="326" y1="160" x2="326" y2="180" stroke="var(--brass)" strokeOpacity="0.2" strokeWidth="0.8" />
      </svg>
      <span className="imgpanel__label">{label}</span>
    </div>
  );
}
