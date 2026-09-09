import { ArrowRight, Check, Sparkles } from "lucide-react";

const badges = [
  "Sem alterar seu projeto sem aprovação",
  "Preview visual antes de publicar",
  "Ativação na hora",
];

const steps: Array<[string, string, string]> = [
  ["01", "Analisando o projeto e as rotas", "Concluído"],
  ["02", "Criando branch e alterações", "Concluído"],
  ["03", "Executando build e validação", "Concluído"],
  ["04", "Preview pronto para aprovação", "Pronto"],
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 lg:grid-cols-[1.06fr_.94fr] lg:px-8 lg:pt-16"
    >
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
          <Sparkles className="size-4" />
          IA + GitHub + Lovable
        </div>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          Peça em português.{" "}
          <span className="text-primary [text-shadow:0_0_34px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
            Receba o site pronto.
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
          A BlackShark IA entende seu projeto no Lovable, escreve o código, testa, mostra o resultado
          e só publica depois que você aprovar. Tudo em minutos, sem contratar equipe.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#planos"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[0_0_38px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition hover:opacity-90"
          >
            Quero meu acesso agora
            <ArrowRight className="size-5" />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 py-3.5 font-semibold text-foreground transition hover:border-primary"
          >
            Ver como funciona
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {badges.map((item) => (
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
              BlackShark Agent
            </span>
          </div>
          <div className="space-y-4 p-5 sm:p-7">
            <div className="rounded-2xl border border-border bg-secondary/60 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Seu comando
              </p>
              <p className="text-sm leading-6 text-foreground">
                Crie uma página de vendas com depoimentos, planos e botão de WhatsApp.
              </p>
            </div>
            {steps.map(([number, label, status]) => (
              <div
                key={number}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3"
              >
                <span className="font-mono text-xs text-primary">{number}</span>
                <span className="flex-1 text-sm text-muted-foreground">{label}</span>
                <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {status}
                </span>
              </div>
            ))}
            <p className="pt-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
              Em minutos, não em horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
