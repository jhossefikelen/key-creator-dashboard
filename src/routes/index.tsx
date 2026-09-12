import { createFileRoute } from "@tanstack/react-router";
import { MatrixRain } from "@/components/MatrixRain";
import { SocialProofToasts } from "@/components/SocialProofToasts";
import { WhatsappFab } from "@/components/WhatsappFab";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { TrialDownload } from "@/components/landing/TrialDownload";
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
import { SiteConfigProvider } from "@/hooks/useSiteConfig";
import { DEFAULT_SITE_CONFIG } from "@/lib/site-config";

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
  offers: DEFAULT_SITE_CONFIG.pricing.plans.map((plan) => ({
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
      { title: DEFAULT_SITE_CONFIG.seo.title },
      { name: "description", content: DEFAULT_SITE_CONFIG.seo.description },
      { property: "og:title", content: DEFAULT_SITE_CONFIG.seo.title },
      { property: "og:description", content: DEFAULT_SITE_CONFIG.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    <SiteConfigProvider>
      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <MatrixRain opacity={0.18} />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_38%)]" />

        <div className="relative z-20 flex justify-center pt-8">
          <h1 className="brand-animated text-5xl sm:text-6xl md:text-7xl">BlackShark IA</h1>
        </div>
        <SiteHeader />
        <Hero />
        <PainSolution />
        <Features />
        <HowItWorks />
        <TrialDownload />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
        <SiteFooter />

        <SocialProofToasts />
        <WhatsappFab />
      </main>
    </SiteConfigProvider>
  );
}
