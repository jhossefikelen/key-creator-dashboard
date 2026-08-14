export type LicenseStatus = "ativa" | "revogada" | "expirada";

export type LicenseKey = {
  id: string;
  code: string;
  createdAt: string;
  /** null = vitalícia */
  expiresAt: string | null;
  maxActivations: number;
  activations: number;
  revoked: boolean;
  note: string;
};

// Alfabeto sem caracteres ambíguos (0/O, 1/I, etc.)
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomChars(count: number): string {
  const buf = new Uint32Array(count);
  crypto.getRandomValues(buf);
  let out = "";
  for (let i = 0; i < count; i++) {
    out += ALPHABET[buf[i]! % ALPHABET.length];
  }
  return out;
}

export function generateCode(groups: number, groupSize: number, prefix = ""): string {
  const parts: string[] = [];
  if (prefix.trim()) parts.push(prefix.trim().toUpperCase().slice(0, 8));
  for (let i = 0; i < groups; i++) parts.push(randomChars(groupSize));
  return parts.join("-");
}

export function statusOf(key: LicenseKey): LicenseStatus {
  if (key.revoked) return "revogada";
  if (key.expiresAt && new Date(key.expiresAt).getTime() < Date.now()) return "expirada";
  return "ativa";
}

export function expiryFromDays(days: number | null): string | null {
  if (days === null) return null;
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

export function formatDate(iso: string | null): string {
  if (!iso) return "vitalícia";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
