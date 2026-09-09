export type PlanId = "daily" | "fortnightly" | "monthly";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  description: string;
  featured?: boolean;
  benefits: string[];
};

export const PLANS: Plan[] = [
  {
    id: "daily",
    name: "Diário",
    price: "R$ 20,00",
    period: "24 horas de acesso",
    description: "Ideal para uma tarefa rápida ou um projeto pontual.",
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
    benefits: [
      "Tudo do plano Quinzenal",
      "Uso ilimitado de comandos",
      "Renovação com 1 clique",
      "3 dispositivos",
    ],
  },
];

export function planById(id: string | null | undefined) {
  return PLANS.find((plan) => plan.id === id);
}
