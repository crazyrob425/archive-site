export default function LuxuryBackdrop() {
  return (
    <div className="luxury-backdrop" aria-hidden="true">
      <div className="luxury-backdrop__glow luxury-backdrop__glow--left" />
      <div className="luxury-backdrop__glow luxury-backdrop__glow--right" />

      <svg
        className="luxury-backdrop__frame"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="luxuryStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5ede3" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#d4af69" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b6a47" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="luxuryHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4af69" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#d4af69" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#d4af69" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="28" y="28" width="1544" height="1144" rx="44" fill="none" stroke="url(#luxuryStroke)" strokeWidth="2" opacity="0.45" />
        <rect x="52" y="52" width="1496" height="1096" rx="34" fill="none" stroke="#d4af69" strokeWidth="1" opacity="0.18" />

        <circle cx="800" cy="160" r="150" fill="url(#luxuryHalo)" />
        <circle cx="800" cy="1040" r="190" fill="url(#luxuryHalo)" />

        <g fill="none" stroke="#d4af69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5">
          <path d="M800 96v78" />
          <path d="M800 1026v78" />
          <path d="M96 600h80" />
          <path d="M1424 600h80" />
          <path d="M760 600h80" />
          <path d="M800 560v80" />
        </g>

        <g fill="none" stroke="#f5ede3" strokeWidth="2" opacity="0.28" strokeLinecap="round" strokeLinejoin="round">
          <path d="M160 164h120c22 0 40 18 40 40v72" />
          <path d="M1440 164h-120c-22 0-40 18-40 40v72" />
          <path d="M160 1036h120c22 0 40-18 40-40v-72" />
          <path d="M1440 1036h-120c-22 0-40-18-40-40v-72" />
        </g>

        <g fill="none" stroke="#d4af69" strokeWidth="3" opacity="0.35" strokeLinecap="round" strokeLinejoin="round">
          <path d="M300 220c38-44 84-66 140-66" />
          <path d="M1300 220c-38-44-84-66-140-66" />
          <path d="M300 980c38 44 84 66 140 66" />
          <path d="M1300 980c-38 44-84 66-140 66" />
          <path d="M365 253c34-30 73-45 118-45" />
          <path d="M1235 253c-34-30-73-45-118-45" />
          <path d="M365 947c34 30 73 45 118 45" />
          <path d="M1235 947c-34 30-73 45-118 45" />
        </g>

        <g fill="#d4af69" opacity="0.22">
          <circle cx="160" cy="164" r="6" />
          <circle cx="1440" cy="164" r="6" />
          <circle cx="160" cy="1036" r="6" />
          <circle cx="1440" cy="1036" r="6" />
          <circle cx="800" cy="160" r="8" />
          <circle cx="800" cy="1040" r="8" />
        </g>
      </svg>

      <div className="luxury-backdrop__grain" />
    </div>
  );
}