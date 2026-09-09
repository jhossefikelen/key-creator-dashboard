import { MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { whatsappHref } from "@/lib/site-config";

export const WHATSAPP_NUMBER = "55119947664626";

export function whatsappLink(message: string, number: string = WHATSAPP_NUMBER) {
  return whatsappHref(number, message);
}

export function WhatsappFab() {
  const config = useSiteConfig();
  return (
    <a
      href={whatsappHref(config.whatsapp.number, config.whatsapp.message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
