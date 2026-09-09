import { ArrowRight, Check } from "lucide-react";
import { PLANS } from "@/lib/plans";
import { whatsappLink } from "@/components/WhatsappFab";

export function Pricing() {
  return (
    <section id="planos" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Escolha seu acesso
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
          Um preço fixo. Pedidos ilimitados.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Sem fidelidade e sem cobrança automática. Você ativa o período que quiser e renova quando
          precisar.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
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
                href={whatsappLink(
                  `Olá! Quero ativar o plano ${plan.name} (${plan.price}) da BlackShark IA.`,
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

        <p className="mt-8 text-xs text-muted-foreground">
          Pagamento por WhatsApp com liberação imediata da sua chave de acesso.
        </p>
      </div>
    </section>
  );
}
