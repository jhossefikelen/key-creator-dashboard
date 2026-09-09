interface SharkLogoProps {
  className?: string;
  size?: number;
}

export function SharkLogo({ className = "", size = 40 }: SharkLogoProps) {
  return (
    <svg
      width={size}
      height={size * (60 / 120)}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BlackShark IA Logo"
    >
      {/* Body — sleek elongated shape pointing right */}
      <path
        d="M8 34 C8 34 18 12 52 18 C72 20 96 26 112 34 C96 42 72 48 52 46 C18 44 8 34 8 34Z"
        fill="#00ff66"
        fillOpacity="0.12"
        stroke="#00ff66"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Dorsal fin — prominent triangular fin on top */}
      <path
        d="M52 18 L44 2 L62 16"
        fill="#00ff66"
        fillOpacity="0.18"
        stroke="#00ff66"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Caudal fin — V-shaped tail */}
      <path
        d="M8 34 L2 22 L12 30"
        fill="#00ff66"
        fillOpacity="0.15"
        stroke="#00ff66"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 34 L2 46 L12 38"
        fill="#00ff66"
        fillOpacity="0.15"
        stroke="#00ff66"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Pectoral fin — small lower fin */}
      <path
        d="M60 42 L56 52 L68 44"
        fill="#00ff66"
        fillOpacity="0.13"
        stroke="#00ff66"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Gill lines */}
      <line x1="72" y1="28" x2="70" y2="38" stroke="#00ff66" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="76" y1="27" x2="74" y2="39" stroke="#00ff66" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="80" y1="27" x2="78" y2="39" stroke="#00ff66" strokeWidth="1.2" strokeOpacity="0.3" />

      {/* Eye */}
      <circle cx="96" cy="32" r="3" fill="#010502" stroke="#00ff66" strokeWidth="1.5" />
      <circle cx="96.8" cy="31.5" r="1" fill="#00ff66" />

      {/* Mouth line with teeth */}
      <path
        d="M112 34 L104 36"
        stroke="#00ff66"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Stylized teeth — small triangles along mouth */}
      <path
        d="M108 34.5 L106.5 32 L105 34.8"
        fill="#00ff66"
        fillOpacity="0.7"
      />
      <path
        d="M111 34.2 L109.5 31.8 L108 34.5"
        fill="#00ff66"
        fillOpacity="0.7"
      />

      {/* Nose / snout accent */}
      <circle cx="112" cy="34" r="1.2" fill="#00ff66" fillOpacity="0.6" />
    </svg>
  );
}
