export type PlanId = "daily" | "fortnightly" | "monthly";

export type SitePlan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  description: string;
  featured: boolean;
  benefits: string[];
};

export type SiteConfig = {
  brand: { name: string; suffix: string; tagline: string };
  whatsapp: { number: string; message: string };
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badges: string[];
    mockTitle: string;
    mockCommand: string;
    mockFooter: string;
    steps: Array<{ number: string; label: string; status: string }>;
  };
  pain: {
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
  features: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{ number: string; title: string; text: string }>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    stats: Array<{ value: string; label: string }>;
    items: Array<{ name: string; role: string; text: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    plans: SitePlan[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: { title: string; text: string; button: string };
  footer: { text: string; tagline: string };
  seo: { title: string; description: string };
  socialProof: { enabled: boolean; names: string[]; cities: string[] };
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand: {
    name: "BlackShark",
    suffix: "IA",
    tagline: "Seu site alterado por IA em minutos",
  },
  whatsapp: {
    number: "55119947664626",
    message: "Olá! Quero falar sobre a Extensão BlackShark IA.",
  },
  hero: {
    badge: "IA + GitHub + Lovable",
    titleLead: "Peça em português.",
    titleHighlight: "Receba o site pronto.",
    subtitle:
      "A BlackShark IA entende seu projeto no Lovable, escreve o código, testa, mostra o resultado e só publica depois que você aprovar. Tudo em minutos, sem contratar equipe.",
    ctaPrimary: "Quero meu acesso agora",
    ctaSecondary: "Ver como funciona",
    badges: [
      "Sem alterar seu projeto sem aprovação",
      "Preview visual antes de publicar",
      "Ativação na hora",
    ],
    mockTitle: "BlackShark Agent",
    mockCommand: "Crie uma página de vendas com depoimentos, planos e botão de WhatsApp.",
    mockFooter: "Em minutos, não em horas",
    steps: [
      { number: "01", label: "Analisando o projeto e as rotas", status: "Concluído" },
      { number: "02", label: "Criando branch e alterações", status: "Concluído" },
      { number: "03", label: "Executando build e validação", status: "Concluído" },
      { number: "04", label: "Preview pronto para aprovação", status: "Pronto" },
    ],
  },
  pain: {
    leftTitle: "Como é hoje",
    leftItems: [
      "Você espera dias por uma alteração simples.",
      "Cada ajuste vira um orçamento novo.",
      "Alguém publica algo quebrado no seu site.",
      "Você depende de um programador para tudo.",
    ],
    rightTitle: "Com a BlackShark IA",
    rightItems: [
      "A alteração fica pronta em minutos.",
      "Um preço fixo, quantos pedidos quiser.",
      "Nada vai ao ar sem a sua aprovação.",
      "Você comanda o projeto sozinho.",
    ],
  },
  features: {
    eyebrow: "Feito para produção",
    title: "Mais poder no seu projeto, sem complicar a sua vida.",
    items: [
      {
        title: "A IA certa para cada pedido",
        text: "Código, layout, correção de erro ou imagem: a BlackShark escolhe sozinha o melhor modelo para o seu comando.",
      },
      {
        title: "Seu projeto sempre protegido",
        text: "Cada alteração nasce em uma cópia segura no GitHub. Sua versão publicada só muda quando você aprova.",
      },
      {
        title: "Você vê antes de publicar",
        text: "Um preview real da mudança, com o build acompanhado em tempo real. Gostou, publica. Não gostou, descarta.",
      },
      {
        title: "Erro corrigido automaticamente",
        text: "Validação de sintaxe, lint e build com reparo automático. Nada quebrado chega no ar.",
      },
      {
        title: "Site inteiro, do visual ao banco",
        text: "Páginas, componentes, imagens, banco de dados e integrações no mesmo fluxo de trabalho.",
      },
      {
        title: "Simples para quem não programa",
        text: "Escreva o pedido, envie, veja e aprove. Sem comandos técnicos e sem depender de ninguém.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Fluxo simples",
    title: "Da ideia ao site publicado em quatro passos.",
    subtitle: "A parte difícil fica nos bastidores. Você vê só o que precisa para decidir.",
    steps: [
      { number: "01", title: "Descreva", text: "Escreva a mudança em português mesmo." },
      { number: "02", title: "Aguarde", text: "A IA edita, testa e valida o projeto." },
      { number: "03", title: "Visualize", text: "Abra o preview antes de confirmar." },
      { number: "04", title: "Publique", text: "Aprove e o site vai ao ar." },
    ],
  },
  testimonials: {
    eyebrow: "Quem já usa aprova",
    title: "Resultados de quem parou de esperar por alterações.",
    stats: [
      { value: "+1.200", label: "projetos alterados" },
      { value: "4,9/5", label: "satisfação dos clientes" },
      { value: "8 min", label: "tempo médio por pedido" },
    ],
    items: [
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
    ],
  },
  pricing: {
    eyebrow: "Escolha seu acesso",
    title: "Um preço fixo. Pedidos ilimitados.",
    subtitle:
      "Sem fidelidade e sem cobrança automática. Você ativa o período que quiser e renova quando precisar.",
    note: "Ativação manual pelo WhatsApp em poucos minutos.",
    plans: [
      {
        id: "daily",
        name: "Diário",
        price: "R$ 20,00",
        period: "24 horas de acesso",
        description: "Ideal para uma tarefa rápida ou um projeto pontual.",
        featured: false,
        benefits: [
          "IA com modelos inteligentes",
          "GitHub e preview visual",
          "Correção automática de build",
          "1 dispositivo",
        ],
      },
      {
        id: "fortnightly",
        name: "Quinzenal",
        price: "R$ 49,90",
        period: "15 dias de acesso",
        description: "Perfeito para uma sprint de criação e ajustes.",
        featured: true,
        benefits: [
          "Tudo do plano Diário",
          "Frontend e backend",
          "Suporte prioritário no WhatsApp",
          "2 dispositivos",
        ],
      },
      {
        id: "monthly",
        name: "Mensal",
        price: "R$ 97,00",
        period: "30 dias de acesso",
        description: "Para evolução contínua e uso profissional.",
        featured: false,
        benefits: [
          "Tudo do plano Quinzenal",
          "Uso ilimitado de comandos",
          "Renovação com 1 clique",
          "3 dispositivos",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Dúvidas frequentes",
    title: "Tudo que você precisa saber antes de comprar.",
    items: [
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
    ],
  },
  finalCta: {
    title: "Comece hoje pelo preço de um almoço.",
    text: "Ative o plano Diário por R$ 20,00, veja a IA trabalhando no seu projeto e decida depois se quer continuar.",
    button: "Escolher meu plano",
  },
  footer: {
    text: "© 2026 Extensão BlackShark IA. Todos os direitos reservados.",
    tagline: "POWERED BY INTELLIGENT CODE",
  },
  seo: {
    title: "BlackShark IA — Seu site alterado por IA em minutos",
    description:
      "Peça em português e a BlackShark IA edita, testa e publica seu projeto Lovable. Planos a partir de R$ 20,00 com liberação imediata.",
  },
  socialProof: {
    enabled: true,
    names: [
      "Rafael M.",
      "Juliana P.",
      "Marcos V.",
      "Camila D.",
      "Diego R.",
      "Patrícia L.",
      "Bruno A.",
      "Larissa F.",
    ],
    cities: [
      "São Paulo, SP",
      "Rio de Janeiro, RJ",
      "Belo Horizonte, MG",
      "Curitiba, PR",
      "Recife, PE",
      "Porto Alegre, RS",
      "Fortaleza, CE",
      "Goiânia, GO",
    ],
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Mescla o que está salvo no banco sobre os valores padrão. */
export function mergeSiteConfig(stored: unknown): SiteConfig {
  const merge = (base: unknown, patch: unknown): unknown => {
    if (Array.isArray(base)) return Array.isArray(patch) ? patch : base;
    if (isObject(base)) {
      if (!isObject(patch)) return base;
      const result: Record<string, unknown> = { ...base };
      for (const key of Object.keys(base)) {
        if (key in patch) result[key] = merge(base[key], patch[key]);
      }
      return result;
    }
    return patch === undefined || patch === null ? base : patch;
  };
  return merge(DEFAULT_SITE_CONFIG, stored) as SiteConfig;
}

export function whatsappHref(number: string, message: string) {
  const digits = (number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
