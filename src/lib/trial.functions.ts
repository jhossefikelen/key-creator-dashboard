import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const SUPABASE_URL = "https://htzhueodeeciczhgnyxt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NWgF4yv6wGQYMKXuMkTgCA_sZKQ7BYu";

export type TrialResult = {
  ok: boolean;
  key?: string | undefined;
  expiresAt?: string | undefined;
  error?: string | undefined;
};

function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for") || "";
  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    forwarded.split(",")[0] ||
    ""
  ).trim();
}

export const createTrialLicense = createServerFn({ method: "POST" }).handler(
  async (): Promise<TrialResult> => {
    const ip = clientIp(getRequest().headers);
    if (!ip) {
      return { ok: false, error: "Não foi possível identificar seu acesso." };
    }

    let response: Response;
    try {
      response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/create_trial_key`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ p_ip: ip }),
      });
    } catch {
      return { ok: false, error: "Serviço de teste indisponível no momento." };
    }

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; key?: string; expires_at?: string; error?: string }
      | null;

    if (!response.ok || !data) {
      return {
        ok: false,
        error:
          "O gerador de teste ainda não está liberado no banco de dados. Rode o arquivo sql/blackshark-trial.sql.",
      };
    }

    if (!data.ok) {
      return { ok: false, error: data.error || "Não foi possível gerar o teste." };
    }

    return { ok: true, key: data.key, expiresAt: data.expires_at };
  },
);
