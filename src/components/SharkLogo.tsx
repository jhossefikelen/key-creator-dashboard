interface SharkLogoProps {
  className?: string;
  size?: number;
}

export function SharkLogo({ className = "", size = 48 }: SharkLogoProps) {
  return (
    <img
      src="/lunax-assets/9f7782be67c9-chatgpt-image-9-de-set-de-2026-15_37_49.png"
      alt="BlackShark IA Logo"
      style={{ width: size, height: size, flexShrink: 0 }}
      className={`object-contain ${className}`}
      width={size}
      height={size}
    />






  );
}
