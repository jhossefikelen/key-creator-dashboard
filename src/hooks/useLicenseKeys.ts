import { useCallback, useEffect, useState } from "react";
import {
  expiryFromDays,
  generateCode,
  type LicenseKey,
} from "@/lib/license-keys";

const STORAGE_KEY = "keygen.licenses.v1";

// Fonte de dados isolada: ao integrar o banco, troque apenas as funções abaixo
// por chamadas ao backend — a UI não muda.
function load(): LicenseKey[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LicenseKey[]) : [];
  } catch {
    return [];
  }
}

export type GenerateOptions = {
  quantity: number;
  groups: number;
  groupSize: number;
  prefix: string;
  durationDays: number | null;
  maxActivations: number;
  note: string;
};

export function useLicenseKeys() {
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setKeys(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  }, [keys, hydrated]);

  const generate = useCallback((opts: GenerateOptions): LicenseKey[] => {
    const existing = new Set(load().map((k) => k.code));
    const created: LicenseKey[] = [];
    while (created.length < opts.quantity) {
      const code = generateCode(opts.groups, opts.groupSize, opts.prefix);
      if (existing.has(code)) continue;
      existing.add(code);
      created.push({
        id: crypto.randomUUID(),
        code,
        createdAt: new Date().toISOString(),
        expiresAt: expiryFromDays(opts.durationDays),
        maxActivations: opts.maxActivations,
        activations: 0,
        revoked: false,
        note: opts.note.trim(),
      });
    }
    setKeys((prev) => [...created, ...prev]);
    return created;
  }, []);

  const revoke = useCallback((id: string) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, revoked: !k.revoked } : k)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }, []);

  const clearAll = useCallback(() => setKeys([]), []);

  return { keys, hydrated, generate, revoke, remove, clearAll };
}
