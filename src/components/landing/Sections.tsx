import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Eye,
  Github,
  Quote,
  ShieldCheck,
  Star,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { DEFAULT_SITE_CONFIG, whatsappHref } from "@/lib/site-config";

const FEATURE_ICONS = [Bot, Github, Eye, ShieldCheck, Code2, Workflow];

export function PainSolution() {
  const { pain } = useSiteConfig();
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card/60 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {pain.leftTitle}
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
            {pain.leftItems.map((item) => (
              <li key={item} className="flex gap-3">
                <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-primary/45 bg-card p-8 shadow-[0_0_45px_color-mix(in_oklab,var(--primary)_12%,transparent)]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {pain.rightTitle}
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-foreground">
            {pain.rightItems.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const { features } = useSiteConfig();
  return (
    <section id="recursos" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {features.eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">
          {features.title}
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item, index) => {
            const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length]!;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-background/60 p-6 transition hover:-translate-y-1 hover:border-primary/60"
              >
                <span className="mb-5 grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { howItWorks } = useSiteConfig();
  return (
    <section id="como-funciona" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {howItWorks.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">{howItWorks.title}</h2>
          <p className="mt-5 leading-7 text-muted-foreground">{howItWorks.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {howItWorks.steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-border bg-card/70 p-6">
              <span className="font-mono text-sm text-primary">{step.number}</span>
              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { testimonials } = useSiteConfig();
  return (
    <section id="depoimentos" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {testimonials.eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">
          {testimonials.title}
        </h2>

        <div className="mt-10 grid gap-4 rounded-3xl border border-border bg-background/60 p-7 sm:grid-cols-3">
          {testimonials.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-border bg-background/60 p-6"
            >
              <Quote className="size-5 text-primary" />
              <p className="mt-4 text-sm leading-6 text-foreground">“{item.text}”</p>
              <div className="mt-5 flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm font-bold text-silver">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { faq } = useSiteConfig();
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-4xl px-5 py-24 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{faq.eyebrow}</p>
      <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">{faq.title}</h2>
      <div className="mt-10 space-y-3">
        {faq.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-card/70 p-5 transition open:border-primary/50"
          >
            <summary className="cursor-pointer list-none text-base font-bold text-foreground marker:hidden">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  const { finalCta } = useSiteConfig();
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="rounded-3xl border border-primary/50 bg-card p-10 text-center shadow-[0_0_60px_color-mix(in_oklab,var(--primary)_14%,transparent)]">
        <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">{finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{finalCta.text}</p>
        <a
          href="#planos"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-[0_0_38px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition hover:opacity-90"
        >
          {finalCta.button}
          <ArrowRight className="size-5" />
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { footer, whatsapp, brand } = useSiteConfig();
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>{footer.text}</span>
        <div className="flex flex-wrap items-center gap-5">
          <a
            className="transition hover:text-primary"
            href={whatsappHref(
              whatsapp.number,
              `Olá! Tenho uma dúvida sobre a ${brand.name} ${brand.suffix}.`,
            )}
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>
          <span className="flex items-center gap-2 font-mono text-xs">
            <Zap className="size-4 text-primary" />
            {footer.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}

export const faqItems = DEFAULT_SITE_CONFIG.faq.items;
