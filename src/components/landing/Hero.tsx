import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function Hero() {
  const { hero } = useSiteConfig();

  return (
    <section
      id="inicio"
      className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 lg:grid-cols-[1.06fr_.94fr] lg:px-8 lg:pt-16"
    >
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
          <Sparkles className="size-4" />
          {hero.badge}
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          {hero.titleLead}{" "}
          <span className="text-primary [text-shadow:0_0_34px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
            {hero.titleHighlight}
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{hero.subtitle}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#planos"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[0_0_38px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition hover:opacity-90"
          >
            {hero.ctaPrimary}
            <ArrowRight className="size-5" />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 py-3.5 font-semibold text-foreground transition hover:border-primary"
          >
            {hero.ctaSecondary}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {hero.badges.map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute -inset-10 rounded-full bg-primary/12 blur-3xl" />
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[0_30px_100px_rgba(0,0,0,.7)]">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex gap-2">
              <span className="size-2.5 rounded-full bg-primary" />
              <span className="size-2.5 rounded-full bg-warning" />
              <span className="size-2.5 rounded-full bg-silver" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {hero.mockTitle}
            </span>
          </div>
          <div className="space-y-4 p-5 sm:p-7">
            <div className="rounded-2xl border border-border bg-secondary/60 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Seu comando
              </p>
              <p className="text-sm leading-6 text-foreground">{hero.mockCommand}</p>
            </div>
            {hero.steps.map((step) => (
              <div
                key={step.number}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3"
              >
                <span className="font-mono text-xs text-primary">{step.number}</span>
                <span className="flex-1 text-sm text-muted-foreground">{step.label}</span>
                <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {step.status}
                </span>
              </div>
            ))}
            <p className="pt-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
              {hero.mockFooter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
