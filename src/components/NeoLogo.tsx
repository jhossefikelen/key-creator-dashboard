interface NeoLogoProps {
  className?: string;
}

export function NeoLogo({ className = "w-16 h-16" }: NeoLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Neo Matrix Logo"
    >
      <defs>
        <linearGradient id="neoGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00ff41" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#003b10" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill="black" stroke="#00ff41" strokeWidth="1.5" opacity="0.6" />

      <path
        d="M30 95 L34 55 Q50 40 66 55 L70 95 Z"
        fill="black"
        stroke="#00ff41"
        strokeWidth="1.2"
      />
      <path d="M50 55 L46 95" stroke="#00ff41" strokeWidth="0.6" opacity="0.5" />
      <path d="M50 55 L54 95" stroke="#00ff41" strokeWidth="0.6" opacity="0.5" />

      <path
        d="M38 52 Q50 60 62 52 L58 45 Q50 50 42 45 Z"
        fill="black"
        stroke="#00ff41"
        strokeWidth="1"
      />

      <circle cx="50" cy="34" r="14" fill="url(#neoGlow)" stroke="#00ff41" strokeWidth="1" />

      <g>
        <rect x="37" y="30" width="11" height="6" rx="1.5" fill="#00ff41" opacity="0.9" />
        <rect x="52" y="30" width="11" height="6" rx="1.5" fill="#00ff41" opacity="0.9" />
        <rect x="48" y="32" width="4" height="1.5" fill="#00ff41" opacity="0.9" />
        <path d="M37 31 L32 29" stroke="#00ff41" strokeWidth="1" />
        <path d="M63 31 L68 29" stroke="#00ff41" strokeWidth="1" />
      </g>

      <path
        d="M38 24 Q50 16 62 24 Q60 20 50 19 Q40 20 38 24 Z"
        fill="black"
      />
    </svg>
  );
}
