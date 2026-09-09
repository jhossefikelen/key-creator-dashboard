import { DEFAULT_SITE_CONFIG, mergeSiteConfig, type SiteConfig } from "@/lib/site-config";

const SUPABASE_URL = "https://htzhueodeeciczhgnyxt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NWgF4yv6wGQYMKXuMkTgCA_sZKQ7BYu";
const CACHE_KEY = "blackshark.siteconfig.v1";
export const SITE_CONFIG_UPDATED_EVENT = "blackshark:site-config-updated";

function headers(accessToken?: string) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

/** Configuração salva localmente (evita piscar o conteúdo padrão). */
export function readCachedSiteConfig(): SiteConfig {
  if (typeof window === "undefined") return DEFAULT_SITE_CONFIG;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return DEFAULT_SITE_CONFIG;
    return mergeSiteConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/site_config?id=eq.1&select=data`,
      { headers: headers(), cache: "no-store" },
    );
    if (!response.ok) return readCachedSiteConfig();
    const rows = (await response.json()) as Array<{ data: unknown }>;
    const stored = rows[0]?.data ?? {};
    const merged = mergeSiteConfig(stored);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(stored));
    }
    return merged;
  } catch {
    return readCachedSiteConfig();
  }
}

export async function saveSiteConfig(config: SiteConfig, accessToken: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_config?id=eq.1`, {
    method: "PATCH",
    headers: { ...headers(accessToken), Prefer: "return=representation" },
    body: JSON.stringify({ data: config }),
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      (body as { message?: string })?.message ||
        "Não foi possível salvar. Verifique se o SQL de configuração foi executado e se o seu e-mail está na lista de administradores.",
    );
  }
  if (!Array.isArray(body) || body.length === 0) {
    throw new Error("Nada foi salvo: seu usuário não tem permissão de administrador.");
  }
  const saved = mergeSiteConfig((body[0] as { data?: unknown })?.data);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent(SITE_CONFIG_UPDATED_EVENT, { detail: saved }));
  }
  return saved;
}

/* ---------------- Clientes cadastrados ---------------- */

export type CustomerRecord = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
  created_at: string;
};

export async function fetchCustomers(accessToken: string): Promise<CustomerRecord[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/site_customers?select=*&order=created_at.desc&limit=500`,
    { headers: headers(accessToken) },
  );
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      (body as { message?: string })?.message ||
        "Não foi possível carregar os clientes. Rode o SQL de configuração no seu banco.",
    );
  }
  return (body as CustomerRecord[]) || [];
}

/** Registra (ou atualiza) o cliente logado na tabela de clientes. */
export async function upsertCustomerRecord(input: {
  accessToken: string;
  userId: string;
  name: string;
  email: string;
  whatsapp: string;
}) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/site_customers?on_conflict=email`, {
      method: "POST",
      headers: {
        ...headers(input.accessToken),
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        user_id: input.userId,
        name: input.name,
        email: input.email,
        whatsapp: input.whatsapp,
        source: "site",
      }),
    });
  } catch {
    /* cadastro do cliente não deve bloquear o login */
  }
}
