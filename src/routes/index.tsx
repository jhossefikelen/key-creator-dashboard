import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Eye,
  Github,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { SharkLogo } from "@/components/SharkLogo";
import { MatrixRain } from "@/components/MatrixRain";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Extensão BlackShark IA — Edite projetos Lovable com IA" },
      {
        name: "description",
        content:
          "Transforme comandos em alterações reais no Lovable, com GitHub, validação, preview e aprovação segura.",
      },
      {
        property: "og:title",
        content: "Extensão BlackShark IA — Seu copiloto para Lovable",
      },
      {
        property: "og:description",
        content: "IA, GitHub e Lovable em um fluxo simples: peça, revise e publique.",
      },
    ],
  }),
  component: SalesPage,
});

const features = [
  {
    icon: Bot,
    title: "IA com roteamento inteligente",
    text: "A BlackShark IA escolhe automaticamente o modelo ideal para código, arquitetura, visão, correção ou geração de imagens.",
  },
  {
    icon: Github,
    title: "GitHub conectado",
    text: "Branches temporárias, commits rastreáveis e Pull Requests sem alterar a principal antes da aprovação.",
  },
  {
    icon: Eye,
    title: "Preview antes de publicar",
    text: "Veja a mudança, acompanhe o build e publique no Lovable somente quando estiver satisfeito.",
  },
  {
    icon: ShieldCheck,
    title: "Proteção de produção",
    text: "Bloqueio de arquivos sensíveis, validação de sintaxe, lint, build e reparo automático de falhas.",
  },
  {
    icon: Code2,
    title: "Frontend e backend",
    text: "Crie páginas, componentes, assets, migrations, Edge Functions e integrações em um único fluxo.",
  },
  {
    icon: Workflow,
    title: "Feito para clientes leigos",
    text: "Um painel lateral organizado: escreva o pedido, envie, visualize e aprove. Sem comandos técnicos.",
  },
];

const plans = [
  {
    name: "Diário",
    period: "24 horas",
    description: "Ideal para uma tarefa rápida ou um projeto pontual.",
  },
  {
    name: "Quinzenal",
    period: "15 dias",
    description: "Perfeito para uma sprint de criação e ajustes.",
    featured: true,
  },
  {
    name: "Mensal",
    period: "30 dias",
    description: "Para evolução contínua e uso profissional.",
  },
];

function SalesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020604] text-[#e9fff0]">
      <MatrixRain opacity={0.2} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,102,.13),transparent_38%),linear-gradient(to_bottom,rgba(1,8,4,.2),#020604_86%)]" />

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <a href="#inicio" className="flex items-center gap-4">
          <SharkLogo size={64} className="rounded-2xl border border-[#376b4a]/60 bg-[#061009]/80 p-[2px] shadow-[0_0_15px_rgba(0,255,102,.1)]" />
          <span>
            <b className="block font-mono text-lg tracking-[0.12em]">BLACKSHARK</b>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#78a987]">IA</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-[#9ac7a7] md:flex">
          <a className="transition hover:text-[#00ff66]" href="#recursos">
            Recursos
          </a>
          <a className="transition hover:text-[#00ff66]" href="#como-funciona">
            Como funciona
          </a>
          <a className="transition hover:text-[#00ff66]" href="#planos">
            Planos
          </a>
        </nav>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 rounded-xl border border-[#00ff66]/35 bg-[#06140b]/85 px-4 py-2.5 text-sm font-semibold text-[#caffd8] transition hover:border-[#00ff66] hover:text-[#00ff66]"
        >
          <KeyRound className="size-4" />
          Área administrativa
        </Link>
      </header>

      <section
        id="inicio"
        className="relative z-10 mx-auto grid min-h-[82vh] max-w-7xl items-center gap-14 px-5 pb-20 pt-12 lg:grid-cols-[1.06fr_.94fr] lg:px-8 lg:pt-20"
      >
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00ff66]/25 bg-[#031108]/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#8affaa]">
            <Sparkles className="size-4" />
            IA + GitHub + Lovable
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Construa no Lovable com a{" "}
            <span className="text-[#00ff66] [text-shadow:0_0_30px_rgba(0,255,102,.25)]">
              força total da IA
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#9cc4a8]">
            Diga o que deseja. A BlackShark IA entende o projeto, altera o código, valida no GitHub e
            entrega um preview antes da publicação. Tudo organizado em um painel lateral dentro do
            Lovable.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00e85d] px-6 py-3.5 font-bold text-[#001a08] shadow-[0_0_35px_rgba(0,255,102,.24)] transition hover:bg-[#2cff7e]"
            >
              Quero usar a BlackShark IA
              <ArrowRight className="size-5" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2a5436] bg-[#061009]/80 px-6 py-3.5 font-semibold text-[#c8f3d4] transition hover:border-[#00ff66]/60"
            >
              Ver como funciona
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#87ad92]">
            {[
              "Sem alterar a main antes da aprovação",
              "Preview visual",
              "Build e lint automáticos",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="size-4 text-[#00ff66]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-10 rounded-full bg-[#00ff66]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-[#1c5730] bg-[#020b05]/95 shadow-[0_30px_100px_rgba(0,0,0,.65),0_0_50px_rgba(0,255,102,.08)]">
            <div className="flex items-center justify-between border-b border-[#163a21] px-5 py-4">
              <div className="flex gap-2">
                <span className="size-2.5 rounded-full bg-[#ff4b55]" />
                <span className="size-2.5 rounded-full bg-[#f8c14b]" />
                <span className="size-2.5 rounded-full bg-[#00e85d]" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5fa371]">
                BlackShark Agent
              </span>
            </div>
            <div className="space-y-4 p-5 sm:p-7">
              <div className="rounded-2xl border border-[#1d4227] bg-[#07130b] p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5f9c6e]">
                  Seu comando
                </p>
                <p className="text-sm leading-6 text-[#d9ffe4]">
                  Crie uma página de planos com tema Matrix, responsiva e conectada ao painel de
                  licenças.
                </p>
              </div>
              {[
                ["01", "Analisando o projeto e as rotas", "Concluído"],
                ["02", "Criando branch e alterações", "Concluído"],
                ["03", "Executando build e validação", "Concluído"],
                ["04", "Preview pronto para aprovação", "Pronto"],
              ].map(([number, label, status]) => (
                <div
                  key={number}
                  className="flex items-center gap-3 rounded-xl border border-[#14371f] bg-[#040d07] px-4 py-3"
                >
                  <span className="font-mono text-xs text-[#00ff66]">{number}</span>
                  <span className="flex-1 text-sm text-[#b7d8c0]">{label}</span>
                  <span className="rounded-full bg-[#00ff66]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#40ff83]">
                    {status}
                  </span>
                </div>
              ))}
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <span className="rounded-xl border border-[#00ff66]/50 bg-[#07180c] py-3 text-center text-sm font-bold text-[#9dffba]">
                  Visualizar alteração
                </span>
                <span className="rounded-xl bg-[#00e85d] py-3 text-center text-sm font-bold text-[#001a08]">
                  Publicar no Lovable
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="recursos"
        className="relative z-10 border-y border-[#11331c] bg-[#030a05]/90 py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ff66]">
            Recursos de produção
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">
            Mais capacidade, sem complicar a experiência.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-[#173c22] bg-[#061009]/80 p-6 transition hover:-translate-y-1 hover:border-[#00ff66]/45"
              >
                <span className="mb-5 grid size-11 place-items-center rounded-xl border border-[#00ff66]/25 bg-[#00ff66]/8 text-[#00ff66]">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#85aa90]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ff66]">
              Fluxo simples
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em]">
              Da ideia ao Lovable em quatro passos.
            </h2>
            <p className="mt-5 leading-7 text-[#85aa90]">
              A complexidade fica nos bastidores. O cliente enxerga apenas o que precisa para
              trabalhar com segurança.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["01", "Descreva", "Escreva a mudança em linguagem natural."],
              ["02", "Aguarde", "A IA analisa, edita e valida o projeto."],
              ["03", "Visualize", "Abra o preview antes de confirmar."],
              ["04", "Publique", "Aprove e sincronize com o Lovable."],
            ].map(([number, title, text]) => (
              <article
                key={number}
                className="rounded-2xl border border-[#183b22] bg-[#061009] p-6"
              >
                <span className="font-mono text-sm text-[#00ff66]">{number}</span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#85aa90]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="planos"
        className="relative z-10 border-y border-[#11331c] bg-[#030a05]/95 py-24"
      >
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ff66]">
            Escolha seu acesso
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] sm:text-5xl">
            Planos flexíveis para cada etapa.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#85aa90]">
            O checkout será ativado na próxima integração com a Hoopay. Enquanto isso, fale com
            nossa equipe para liberar seu acesso.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative rounded-3xl border p-7 text-left ${
                  plan.featured
                    ? "border-[#00ff66] bg-[#07170c] shadow-[0_0_45px_rgba(0,255,102,.1)]"
                    : "border-[#173c22] bg-[#061009]"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#00e85d] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#001a08]">
                    Recomendado
                  </span>
                )}
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className="mt-2 font-mono text-sm text-[#00ff66]">{plan.period}</p>
                <p className="mt-5 min-h-12 text-sm leading-6 text-[#85aa90]">{plan.description}</p>
                <ul className="mt-7 space-y-3 text-sm text-[#b8d7c1]">
                  {[
                    "IA com modelos inteligentes",
                    "GitHub e preview visual",
                    "Correção automática de build",
                    "Frontend e backend",
                  ].map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#00ff66]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/55119947664626?text=Ol%C3%A1!%20Quero%20conhecer%20o%20plano%20BlackShark%20IA"
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3 font-bold transition ${
                    plan.featured
                      ? "bg-[#00e85d] text-[#001a08] hover:bg-[#36ff82]"
                      : "border border-[#2c5e39] text-[#bff4ce] hover:border-[#00ff66]"
                  }`}
                >
                  Solicitar acesso
                  <ArrowRight className="size-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-[#63836c] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© 2026 Extensão BlackShark IA. Todos os direitos reservados.</span>
        <span className="flex items-center gap-2 font-mono text-xs">
          <Zap className="size-4 text-[#00ff66]" />
          POWERED BY INTELLIGENT CODE
        </span>
      </footer>
    </main>
  );
}
