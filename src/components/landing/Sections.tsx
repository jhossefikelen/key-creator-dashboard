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
import { whatsappLink } from "@/components/WhatsappFab";

const features = [
  {
    icon: Bot,
    title: "A IA certa para cada pedido",
    text: "Código, layout, correção de erro ou imagem: a BlackShark escolhe sozinha o melhor modelo para o seu comando.",
  },
  {
    icon: Github,
    title: "Seu projeto sempre protegido",
    text: "Cada alteração nasce em uma cópia segura no GitHub. Sua versão publicada só muda quando você aprova.",
  },
  {
    icon: Eye,
    title: "Você vê antes de publicar",
    text: "Um preview real da mudança, com o build acompanhado em tempo real. Gostou, publica. Não gostou, descarta.",
  },
  {
    icon: ShieldCheck,
    title: "Erro corrigido automaticamente",
    text: "Validação de sintaxe, lint e build com reparo automático. Nada quebrado chega no ar.",
  },
  {
    icon: Code2,
    title: "Site inteiro, do visual ao banco",
    text: "Páginas, componentes, imagens, banco de dados e integrações no mesmo fluxo de trabalho.",
  },
  {
    icon: Workflow,
    title: "Simples para quem não programa",
    text: "Escreva o pedido, envie, veja e aprove. Sem comandos técnicos e sem depender de ninguém.",
  },
];

const testimonials = [
  {
    name: "Rafael Moura",
    role: "Agência de sites — Campinas, SP",
    text: "Entrego em um dia o que antes levava uma semana. Meus clientes acham que tenho uma equipe grande.",
  },
  {
    name: "Juliana Prado",
    role: "Loja online — Belo Horizonte, MG",
    text: "Nunca programei na vida. Pedi a página de produtos e ela ficou pronta do jeito que eu queria.",
  },
  {
    name: "Marcos Vinícius",
    role: "Freelancer — Curitiba, PR",
    text: "O preview antes de publicar me salvou várias vezes. Só vai pro ar o que eu aprovo.",
  },
  {
    name: "Camila Duarte",
    role: "Infoprodutos — Recife, PE",
    text: "Testei no plano diário e no mesmo dia assinei o mensal. Pagou-se na primeira venda.",
  },
  {
    name: "Diego Ramalho",
    role: "Consultoria — Porto Alegre, RS",
    text: "A correção automática de erro é o que mais uso. Ela conserta antes de eu perceber o problema.",
  },
  {
    name: "Patrícia Lemos",
    role: "Studio de design — São Paulo, SP",
    text: "Trabalho o dia todo com layout e a IA respeita meu estilo visual. Isso não é comum.",
  },
];

const faq = [
  {
    q: "Quanto custa e como funciona a cobrança?",
    a: "São três planos: Diário R$ 20,00, Quinzenal R$ 49,90 e Mensal R$ 97,00. Você paga apenas pelo período escolhido, sem fidelidade e sem cobrança automática.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não. Você escreve o que quer em português, revisa o resultado na tela e aprova. Todo o trabalho técnico fica com a IA.",
  },
  {
    q: "Meu projeto corre risco?",
    a: "Não. Toda alteração é feita em uma cópia separada, validada e testada. Sua versão publicada só muda com a sua aprovação.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Como não há assinatura recorrente, basta não renovar quando o período terminar.",
  },
  {
    q: "Consigo testar antes de comprar?",
    a: "Sim. Crie sua conta gratuita na área do cliente e gere uma chave de teste para experimentar a extensão.",
  },
  {
    q: "Como recebo suporte?",
    a: "Pelo WhatsApp. Clientes dos planos Quinzenal e Mensal têm atendimento prioritário.",
  },
];

export function PainSolution() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card/60 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Como é hoje
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
            {[
              "Você espera dias por uma alteração simples.",
              "Cada ajuste vira um orçamento novo.",
              "Alguém publica algo quebrado no seu site.",
              "Você depende de um programador para tudo.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-primary/45 bg-card p-8 shadow-[0_0_45px_color-mix(in_oklab,var(--primary)_12%,transparent)]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Com a BlackShark IA
          </p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-foreground">
            {[
              "A alteração fica pronta em minutos.",
              "Um preço fixo, quantos pedidos quiser.",
              "Nada vai ao ar sem a sua aprovação.",
              "Você comanda o projeto sozinho.",
            ].map((item) => (
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
  return (
    <section id="recursos" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Feito para produção
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">
          Mais poder no seu projeto, sem complicar a sua vida.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-background/60 p-6 transition hover:-translate-y-1 hover:border-primary/60"
            >
              <span className="mb-5 grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Fluxo simples</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">
            Da ideia ao site publicado em quatro passos.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            A parte difícil fica nos bastidores. Você vê só o que precisa para decidir.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["01", "Descreva", "Escreva a mudança em português mesmo."],
            ["02", "Aguarde", "A IA edita, testa e valida o projeto."],
            ["03", "Visualize", "Abra o preview antes de confirmar."],
            ["04", "Publique", "Aprove e o site vai ao ar."],
          ].map(([number, title, text]) => (
            <article key={number} className="rounded-2xl border border-border bg-card/70 p-6">
              <span className="font-mono text-sm text-primary">{number}</span>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Quem já usa aprova
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">
          Resultados de quem parou de esperar por alterações.
        </h2>

        <div className="mt-10 grid gap-4 rounded-3xl border border-border bg-background/60 p-7 sm:grid-cols-3">
          {[
            ["+1.200", "projetos alterados"],
            ["4,9/5", "satisfação dos clientes"],
            ["8 min", "tempo médio por pedido"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-primary">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-border bg-background/60 p-6">
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
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-4xl px-5 py-24 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Dúvidas frequentes</p>
      <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">Antes de você comprar.</h2>
      <div className="mt-10 space-y-3">
        {faq.map((item) => (
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
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="rounded-3xl border border-primary/50 bg-card p-10 text-center shadow-[0_0_60px_color-mix(in_oklab,var(--primary)_14%,transparent)]">
        <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">
          Comece hoje pelo preço de um almoço.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Ative o plano Diário por R$ 20,00, veja a IA trabalhando no seu projeto e decida depois se
          quer continuar.
        </p>
        <a
          href="#planos"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-[0_0_38px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition hover:opacity-90"
        >
          Escolher meu plano
          <ArrowRight className="size-5" />
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© 2026 Extensão BlackShark IA. Todos os direitos reservados.</span>
        <div className="flex flex-wrap items-center gap-5">
          <a
            className="transition hover:text-primary"
            href={whatsappLink("Olá! Tenho uma dúvida sobre a BlackShark IA.")}
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>
          <span className="flex items-center gap-2 font-mono text-xs">
            <Zap className="size-4 text-primary" />
            POWERED BY INTELLIGENT CODE
          </span>
        </div>
      </div>
    </footer>
  );
}

export const faqItems = faq;
