import { SharkLogo } from "@/components/SharkLogo";

type BrandProps = {
  /** Ex.: "BlackShark" */
  name?: string;
  suffix?: string;
  size?: number;
  className?: string;
  logoClassName?: string;
};

/** Marca escrita igual à logo: "Black" prateado + "Shark" vermelho. */
export function BrandWordmark({
  name = "BlackShark",
  suffix = "IA",
  className = "",
}: Pick<BrandProps, "name" | "suffix" | "className">) {
  const match = /^(.*?)(shark.*)$/i.exec(name.trim());
  const first = match ? match[1] : name;
  const second = match ? match[2] : "";
  return (
    <span className={`block font-black tracking-[-0.02em] ${className}`}>
      <span className="text-silver">{first}</span>
      <span className="text-primary [text-shadow:0_0_18px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
        {second}
      </span>
      {suffix ? <span className="ml-1.5 text-primary/80">{suffix}</span> : null}
    </span>
  );
}

export function Brand({
  name = "BlackShark",
  suffix = "IA",
  size = 52,
  className = "",
  logoClassName = "",
}: BrandProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <SharkLogo size={size} className={logoClassName} />
      <BrandWordmark name={name} suffix={suffix} className="text-xl" />
    </span>
  );
}
