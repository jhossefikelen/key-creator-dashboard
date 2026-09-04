import { createFileRoute } from "@tanstack/react-router";
import { Cookie, Leaf, Hand, Truck, Star, MessageCircle, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/biscoitos")({
  head: () => ({
    meta: [
      { title: "Biscoitos Caseiros // Loja" },
      {
        name: "description",
        content:
          "Biscoitos caseiros artesanais feitos com ingredientes naturais. Peça já e receba em casa com entrega rápida.",
      },
      { property: "og:title", content: "Biscoitos Caseiros // Loja" },
      {
        property: "og:description",
        content: "Biscoitos artesanais feitos à mão com ingredientes naturais. Faça seu pedido agora!",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BiscoitosPage,
});

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20fazer%20um%20pedido%20de%20biscoitos%20caseiros.";

const diferenciais = [
  { icon: Leaf, title: "Ingredientes Naturais", desc: "Selecionamos apenas ingredientes frescos e de qualidade." },
  { icon: Hand, title: "Feito à Mão", desc: "Cada biscoito é preparado artesanalmente, com carinho." },
  { icon: Truck, title: "Entrega Rápida", desc: "Receba seus biscoitos quentinhos direto na sua casa." },
];

const sabores = [
  { nome: "Chocolate Belga", desc: "Gotas de chocolate belga em massa amanteigada.", preco: "R$ 18,90" },
  { nome: "Aveia e Mel", desc: "Aveia crocante com toque de mel puro.", preco: "R$ 16,90" },
  { nome: "Coco Queimado", desc: "Coco tostado com leite condensado.", preco: "R$ 17,90" },
  { nome: "Canela e Especiarias", desc: "Massa amanteigada com canela e noz-moscada.", preco: "R$ 16,90" },
  { nome: "Amendoim Crocante", desc: "Pedaços generosos de amendoim torrado.", preco: "R$ 17,90" },
  { nome: "Limão Siciliano", desc: "Massa leve com raspas de limão siciliano.", preco: "R$ 16,90" },
];

const depoimentos = [
  { nome: "Mariana S.", texto: "Os melhores biscoitos que já experimentei! Sabor de casa da vovó." },
  { nome: "Carlos R.", texto: "Entrega rápida e biscoitos fresquinhos. Virei cliente fiel!" },
  { nome: "Fernanda L.", texto: "Qualidade impecável, dá pra sentir que é tudo natural." },
];

const passos = [
  { numero: "1", texto: "Escolha seus sabores favoritos" },
  { numero: "2", texto: "Chame no WhatsApp e finalize o pedido" },
  { numero: "3", texto: "Receba fresquinho em casa" },
];

function BiscoitosPage() {
  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#4A2E1F] font-sans">
      <header className="fixed top-0 z-50 w-full border-b border-[#E3C79B] bg-[#FBF3E7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Cookie className="size-6 text-[#8B5A2B]" />
            <span className="font-serif text-xl font-bold text-[#6B3F1D]">Biscoitos da Vovó</span>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-[#B8791C] text-white hover:bg-[#96601A]">
              Fazer Pedido
            </Button>
          </a>
        </div>
      </header>

      <section className="flex min-h-[90vh] items-center justify-center bg-gradient-to-b from-[#F3DFC0] to-[#FBF3E7] px-4 pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#5A3417] md:text-6xl">
              Biscoitos caseiros que aquecem o coração
            </h1>
            <p className="mt-4 text-lg text-[#6B4A2F]">
              Receitas artesanais, feitas à mão, com ingredientes naturais e muito amor.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="mt-8 rounded-full bg-[#B8791C] px-8 text-white hover:bg-[#96601A]">
                <MessageCircle className="mr-2 size-5" />
                Peça pelo WhatsApp
              </Button>
            </a>
          </div>
          <div className="flex justify-center">
            <div className="flex size-64 items-center justify-center rounded-full bg-gradient-to-br from-[#D9A867] to-[#B8791C] shadow-2xl md:size-80">
              <Cookie className="size-32 text-white/90 md:size-40" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-[#5A3417]">Nossos diferenciais</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {diferenciais.map((d) => (
              <Card key={d.title} className="border-[#E3C79B] bg-white/70 text-center">
                <CardContent className="flex flex-col items-center gap-3 p-8">
                  <d.icon className="size-10 text-[#B8791C]" />
                  <h3 className="font-serif text-xl font-semibold text-[#5A3417]">{d.title}</h3>
                  <p className="text-sm text-[#6B4A2F]">{d.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F3DFC0] px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-[#5A3417]">Nossos sabores</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {sabores.map((s) => (
              <Card key={s.nome} className="border-[#E3C79B] bg-white/80">
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-[#5A3417]">{s.nome}</h3>
                  <p className="mt-2 text-sm text-[#6B4A2F]">{s.desc}</p>
                  <p className="mt-4 text-lg font-bold text-[#B8791C]">{s.preco}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-[#5A3417]">O que dizem nossos clientes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {depoimentos.map((d) => (
              <Card key={d.nome} className="border-[#E3C79B] bg-white/70">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-[#B8791C]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm italic text-[#6B4A2F]">"{d.texto}"</p>
                  <p className="mt-3 text-sm font-semibold text-[#5A3417]">{d.nome}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F3DFC0] px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold text-[#5A3417]">Como pedir</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {passos.map((p) => (
              <div key={p.numero} className="flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#B8791C] font-serif text-xl font-bold text-white">
                  {p.numero}
                </div>
                <p className="mt-4 text-[#6B4A2F]">{p.texto}</p>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="mt-10 rounded-full bg-[#B8791C] px-8 text-white hover:bg-[#96601A]">
              <MessageCircle className="mr-2 size-5" />
              Fazer meu pedido agora
            </Button>
          </a>
        </div>
      </section>

      <footer className="bg-[#5A3417] px-4 py-12 text-[#F3DFC0]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Cookie className="size-6" />
              <span className="font-serif text-xl font-bold">Biscoitos da Vovó</span>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm justify-center md:justify-start">
              <MapPin className="size-4" /> Sua cidade, Brasil
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm justify-center md:justify-start">
              <Clock className="size-4" /> Seg a Sáb, 9h às 18h
            </p>
          </div>
          <div className="flex gap-4">
            <Instagram className="size-6 cursor-pointer hover:text-[#D9A867]" />
            <Facebook className="size-6 cursor-pointer hover:text-[#D9A867]" />
            <MessageCircle className="size-6 cursor-pointer hover:text-[#D9A867]" />
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-[#D9A867]">
          © {new Date().getFullYear()} Biscoitos da Vovó. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
