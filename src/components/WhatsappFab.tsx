import { MessageCircle } from "lucide-react";

export const WHATSAPP_NUMBER = "55119947664626";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function WhatsappFab() {
  return (
    <a
      href={whatsappLink("Olá! Quero falar sobre a Extensão BlackShark IA.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
