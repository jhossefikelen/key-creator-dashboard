import type { SVGProps } from "react";

export interface NeoAvatarProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function NeoAvatar({ size = 96, className, ...props }: NeoAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="neoAvatarBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="48" fill="url(#neoAvatarBg)" stroke="#00ff41" strokeWidth="1.5" />

      <ellipse cx="50" cy="46" rx="22" ry="26" fill="#1c1c1c" stroke="#00ff41" strokeWidth="1" />

      <path
        d="M20 95 C20 78 34 68 50 68 C66 68 80 78 80 95 Z"
        fill="#0a0a0a"
        stroke="#00ff41"
        strokeWidth="1"
      />

      <path
        d="M32 62 L50 70 L68 62 L68 78 L50 86 L32 78 Z"
        fill="#111111"
        stroke="#00ff41"
        strokeWidth="1"
      />

      <rect
        x="28"
        y="38"
        width="18"
        height="11"
        rx="3"
        fill="#050505"
        stroke="#00ff41"
        strokeWidth="1.5"
      />
      <rect
        x="54"
        y="38"
        width="18"
        height="11"
        rx="3"
        fill="#050505"
        stroke="#00ff41"
        strokeWidth="1.5"
      />
      <rect x="46" y="41" width="8" height="3" fill="#00ff41" opacity="0.7" />

      <path d="M28 40 L20 36" stroke="#00ff41" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M72 40 L80 36" stroke="#00ff41" strokeWidth="1.5" strokeLinecap="round" />

      <rect x="32" y="41" width="10" height="5" rx="1" fill="#00ff41" opacity="0.15" />
      <rect x="58" y="41" width="10" height="5" rx="1" fill="#00ff41" opacity="0.15" />
    </svg>
  );
}

export default NeoAvatar;
