type NeoAvatarProps = {
  className?: string;
};

export function NeoAvatar({ className }: NeoAvatarProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Neo Matrix"
    >
      <rect x="0" y="0" width="64" height="64" fill="#000000" />
      <ellipse cx="32" cy="28" rx="14" ry="16" fill="#0d1f0f" stroke="#00ff41" strokeWidth="0.5" />
      <path
        d="M18 22 C18 10, 46 10, 46 22 L46 18 C46 12, 18 12, 18 18 Z"
        fill="#0a0a0a"
      />
      <rect x="16" y="24" width="14" height="7" rx="1.5" fill="#050505" stroke="#00ff41" strokeWidth="1" />
      <rect x="34" y="24" width="14" height="7" rx="1.5" fill="#050505" stroke="#00ff41" strokeWidth="1" />
      <rect x="30" y="26" width="4" height="2" fill="#050505" />
      <rect x="18" y="25.5" width="3" height="1.2" fill="#00ff41" opacity="0.8" />
      <rect x="36" y="25.5" width="3" height="1.2" fill="#00ff41" opacity="0.8" />
      <rect x="20" y="28" width="2" height="1" fill="#00ff41" opacity="0.5" />
      <rect x="38" y="28" width="2" height="1" fill="#00ff41" opacity="0.5" />
      <path d="M28 34 Q32 37 36 34" stroke="#00ff41" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M20 48 L44 48 L48 64 L16 64 Z" fill="#050505" stroke="#1a1a1a" strokeWidth="0.5" />
      <path d="M28 42 L32 48 L36 42 L32 40 Z" fill="#0a0a0a" />
      <path d="M22 44 L28 42 L32 48 L24 52 Z" fill="#050505" />
      <path d="M42 44 L36 42 L32 48 L40 52 Z" fill="#050505" />
    </svg>
  );
}

export default NeoAvatar;
