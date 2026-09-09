import { upsertCustomerRecord } from "@/lib/site-config-api";

const SUPABASE_URL = "https://htzhueodeeciczhgnyxt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NWgF4yv6wGQYMKXuMkTgCA_sZKQ7BYu";
const SESSION_KEY = "blackshark.customer.session.v1";
const DEMO_KEY = "blackshark.customer.demo.v1";

export type CustomerSession = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
  name: string;
  whatsapp: string;
};

export type CustomerLicense = {
  key: string;
  plan: string;
  status: "active" | "expired" | "revoked" | "trial";
  createdAt: string;
  expiresAt: string | null;
  maxDevices: number;
  activeDevices: number;
};

export type CustomerData = {
  licenses: CustomerLicense[];
  trialUsed: boolean;
  /** true quando o backend do cliente ainda não está disponível */
  demo: boolean;
};

function headers(accessToken?: string) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

export function loadCustomerSession(): CustomerSession | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(SESSION_KEY) || "null",
    ) as CustomerSession | null;
    return parsed?.accessToken ? parsed : null;
  } catch {
    return null;
  }
}

function saveCustomerSession(session: CustomerSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearCustomerSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

function sessionFromAuth(data: any, fallback: Partial<CustomerSession>): CustomerSession {
  const meta = data.user?.user_metadata || {};
  return {
    userId: data.user?.id || fallback.userId || "",
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
    email: data.user?.email || fallback.email || "",
    name: meta.name || fallback.name || "",
    whatsapp: meta.whatsapp || fallback.whatsapp || "",
  };
}

async function registerCustomer(session: CustomerSession) {
  if (!session.userId || !session.email) return;
  await upsertCustomerRecord({
    accessToken: session.accessToken,
    userId: session.userId,
    name: session.name,
    email: session.email,
    whatsapp: session.whatsapp,
  });
}

export async function signUpCustomer(input: {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
}) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      data: { name: input.name, whatsapp: input.whatsapp, role: "customer" },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.msg || data.error_description || "Não foi possível criar sua conta.");
  }
  if (!data.access_token) {
    // Confirmação por e-mail habilitada.
    return null;
  }
  const session = sessionFromAuth(data, input);
  saveCustomerSession(session);
  void registerCustomer(session);
  return session;
}

export async function signInCustomer(email: string, password: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.msg || "E-mail ou senha inválidos.");
  }
  const session = sessionFromAuth(data, { email });
  saveCustomerSession(session);
  void registerCustomer(session);
  return session;
}

export async function requestPasswordReset(email: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("Não foi possível enviar o e-mail de recuperação.");
}

async function refreshSession(session: CustomerSession) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ refresh_token: session.refreshToken }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    clearCustomerSession();
    throw new Error("Sua sessão expirou. Entre novamente.");
  }
  const refreshed = sessionFromAuth(data, session);
  saveCustomerSession(refreshed);
  return refreshed;
}

export async function getValidCustomerSession() {
  const session = loadCustomerSession();
  if (!session) return null;
  if (session.expiresAt > Date.now() + 60_000) return session;
  try {
    return await refreshSession(session);
  } catch {
    return null;
  }
}

export async function updateCustomerProfile(
  session: CustomerSession,
  input: { name: string; whatsapp: string },
) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: "PUT",
    headers: headers(session.accessToken),
    body: JSON.stringify({ data: { name: input.name, whatsapp: input.whatsapp } }),
  });
  if (!response.ok) throw new Error("Não foi possível salvar seus dados.");
  const updated = { ...session, ...input };
  saveCustomerSession(updated);
  return updated;
}

/* ---------- Licenças do cliente ---------- */

async function customerRequest(session: CustomerSession, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/customer-license-api`, {
    method: "POST",
    headers: headers(session.accessToken),
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.error || "Serviço indisponível.");
  return data;
}

function loadDemo(): CustomerData {
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(DEMO_KEY) || "null",
    ) as CustomerData | null;
    if (parsed) return { ...parsed, demo: true };
  } catch {
    /* ignora */
  }
  return { licenses: [], trialUsed: false, demo: true };
}

function saveDemo(data: CustomerData) {
  window.localStorage.setItem(DEMO_KEY, JSON.stringify(data));
}

function randomKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const group = () =>
    Array.from(
      { length: 4 },
      () => alphabet[Math.floor(Math.random() * alphabet.length)],
    ).join("");
  return `BS-${group()}-${group()}-${group()}`;
}

export async function fetchCustomerData(session: CustomerSession): Promise<CustomerData> {
  try {
    const data = await customerRequest(session, { action: "me" });
    return {
      licenses: (data.licenses || []) as CustomerLicense[],
      trialUsed: Boolean(data.trialUsed),
      demo: false,
    };
  } catch {
    return loadDemo();
  }
}

export async function createTrialKey(session: CustomerSession): Promise<CustomerData> {
  try {
    const data = await customerRequest(session, { action: "create_trial" });
    return {
      licenses: (data.licenses || []) as CustomerLicense[],
      trialUsed: true,
      demo: false,
    };
  } catch {
    const current = loadDemo();
    if (current.trialUsed) throw new Error("Você já utilizou o seu teste gratuito.");
    const trial: CustomerLicense = {
      key: randomKey(),
      plan: "Teste grátis",
      status: "trial",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
      maxDevices: 1,
      activeDevices: 0,
    };
    const next: CustomerData = {
      licenses: [trial, ...current.licenses],
      trialUsed: true,
      demo: true,
    };
    saveDemo(next);
    return next;
  }
}
