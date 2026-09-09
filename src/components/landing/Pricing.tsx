import { ArrowRight, Check } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { whatsappHref } from "@/lib/site-config";

export function Pricing() {
  const config = useSiteConfig();
  const { pricing, whatsapp, brand } = config;

  return (
    <section id="planos" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {pricing.eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">{pricing.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{pricing.subtitle}</p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pricing.plans.map((plan) => (
            <article
              key={plan.id}
              className={`relative rounded-3xl border p-7 text-left ${
                plan.featured
                  ? "border-primary bg-background shadow-[0_0_55px_color-mix(in_oklab,var(--primary)_16%,transparent)]"
                  : "border-border bg-background/60"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary-foreground">
                  Mais vendido
                </span>
              )}
              <h3 className="text-2xl font-black">{plan.name}</h3>
              <p className="mt-4 text-4xl font-black text-primary">{plan.price}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {plan.period}
              </p>
              <p className="mt-5 min-h-12 text-sm leading-6 text-muted-foreground">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-foreground">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappHref(
                  whatsapp.number,
                  `Olá! Quero ativar o plano ${plan.name} (${plan.price}) da ${brand.name} ${brand.suffix}.`,
                )}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3 font-bold transition ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary"
                }`}
              >
                Ativar {plan.name}
                <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{pricing.note}</p>
      </div>
    </section>
  );
}
