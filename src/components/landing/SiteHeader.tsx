import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { SharkLogo } from "@/components/SharkLogo";
import { BrandWordmark } from "@/components/Brand";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function SiteHeader() {
  const { brand } = useSiteConfig();

  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
      <a href="#inicio" className="flex items-center gap-3">
        <SharkLogo
          size={56}
          className="rounded-2xl border border-border/70 bg-card/70 p-[2px] shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
        />
        <BrandWordmark name={brand.name} suffix={brand.suffix} className="text-xl" />
      </a>

      <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
        <a className="transition hover:text-primary" href="#recursos">
          Recursos
        </a>
        <a className="transition hover:text-primary" href="#como-funciona">
          Como funciona
        </a>
        <a className="transition hover:text-primary" href="#baixar">
          Baixar / Teste grátis
        </a>
        <a className="transition hover:text-primary" href="#depoimentos">
          Depoimentos
        </a>
        <a className="transition hover:text-primary" href="#planos">
          Planos
        </a>
        <a className="transition hover:text-primary" href="#faq">
          Dúvidas
        </a>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          to="/entrar"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
        >
          <UserRound className="size-4" />
          Área do cliente
        </Link>
        <a
          href="#planos"
          className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_35%,transparent)] transition hover:opacity-90 sm:inline-flex"
        >
          Quero meu acesso
        </a>
      </div>
    </header>
  );
}
