import { createFileRoute } from "@tanstack/react-router";
import { MatrixRain } from "@/components/MatrixRain";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { WhatsappFab } from "@/components/WhatsappFab";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import {
  Faq,
  Features,
  FinalCta,
  HowItWorks,
  PainSolution,
  SiteFooter,
  Testimonials,
  faqItems,
} from "@/components/landing/Sections";
import { PLANS } from "@/lib/plans";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Extensão BlackShark IA",
  description:
    "Extensão de IA que edita, testa e publica projetos Lovable a partir de comandos em português.",
  brand: { "@type": "Brand", name: "BlackShark IA" },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `Plano ${plan.name}`,
    price: plan.price.replace("R$ ", "").replace(".", "").replace(",", "."),
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlackShark IA — Seu site alterado por IA em minutos" },
      {
        name: "description",
        content:
          "Peça em português e a BlackShark IA edita, testa e publica seu projeto Lovable. Planos a partir de R$ 20,00 com liberação imediata.",
      },
      { property: "og:title", content: "BlackShark IA — Seu site alterado por IA em minutos" },
      {
        property: "og:description",
        content: "Planos a partir de R$ 20,00. Preview antes de publicar e suporte no WhatsApp.",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(productJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <MatrixRain opacity={0.18} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_38%)]" />

      <SiteHeader />
      <Hero />
      <PainSolution />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
      <SiteFooter />

      <SocialProofToasts />
      <WhatsappFab />
    </main>
  );
}
