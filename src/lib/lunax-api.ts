const SUPABASE_URL = "https://htzhueodeeciczhgnyxt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_NWgF4yv6wGQYMKXuMkTgCA_sZKQ7BYu";
const SESSION_KEY = "lunax.admin.session.v1";

export type AdminSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email: string;
};

export type LicenseRecord = {
  id: number;
  keyPrefix: string;
  plan: "daily" | "fortnightly" | "monthly" | "lifetime";
  email: string | null;
  status: "active" | "revoked";
  createdAt: string;
  expiresAt: string | null;
  revokedAt: string | null;
  customerName: string | null;
  maxDevices: number;
  activeDevices: number;
  commandsCount: number;
  lastUsedAt: string | null;
};

function headers(accessToken?: string) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

export function loadAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      window.sessionStorage.getItem(SESSION_KEY) || "null",
    ) as AdminSession | null;
    return parsed?.accessToken ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAdminSession(session: AdminSession) {
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  window.sessionStorage.removeItem(SESSION_KEY);
}

export async function signInAdmin(email: string, password: string) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.msg || "Credenciais inválidas.");
  }
  const session: AdminSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
    email: data.user?.email || email,
  };
  saveAdminSession(session);
  await adminRequest(session, { action: "me" });
  return session;
}

export async function refreshAdminSession(session: AdminSession) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ refresh_token: session.refreshToken }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    clearAdminSession();
    throw new Error("Sua sessão expirou. Entre novamente.");
  }
  const refreshed: AdminSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || session.refreshToken,
    expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
    email: data.user?.email || session.email,
  };
  saveAdminSession(refreshed);
  return refreshed;
}

export async function getValidSession() {
  const session = loadAdminSession();
  if (!session) return null;
  if (session.expiresAt > Date.now() + 60_000) return session;
  return await refreshAdminSession(session);
}

export async function adminRequest(session: AdminSession, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-license-api`, {
    method: "POST",
    headers: headers(session.accessToken),
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    if (response.status === 401 || response.status === 403) {
      clearAdminSession();
    }
    throw new Error(data.error || "Falha ao acessar o painel.");
  }
  return data;
}
