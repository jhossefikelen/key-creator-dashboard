import { useCallback, useEffect, useState } from "react";
import { adminRequest, getValidSession, type LicenseRecord } from "@/lib/lunax-api";

export type CreateLicenseOptions = {
  quantity: number;
  plan: "daily" | "fortnightly" | "monthly" | "lifetime";
  maxDevices: number;
  customerName: string;
  email: string;
};

export function useLicenseKeys(enabled = true) {
  const [keys, setKeys] = useState<LicenseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const session = await getValidSession();
      if (!session) throw new Error("Sua sessão expirou.");
      const data = await adminRequest(session, { action: "list" });
      setKeys(data.licenses || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) void reload().catch(() => {});
    else setLoading(false);
  }, [enabled, reload]);

  const generate = useCallback(
    async (options: CreateLicenseOptions) => {
      const session = await getValidSession();
      if (!session) throw new Error("Sua sessão expirou.");
      const data = await adminRequest(session, {
        action: "create",
        ...options,
      });
      await reload();
      return data.created as Array<{
        id: number;
        key: string;
        keyPrefix: string;
      }>;
    },
    [reload],
  );

  const setStatus = useCallback(
    async (licenseId: number, status: "active" | "revoked") => {
      const session = await getValidSession();
      if (!session) throw new Error("Sua sessão expirou.");
      await adminRequest(session, { action: "set_status", licenseId, status });
      await reload();
    },
    [reload],
  );

  const resetDevices = useCallback(
    async (licenseId: number) => {
      const session = await getValidSession();
      if (!session) throw new Error("Sua sessão expirou.");
      await adminRequest(session, { action: "reset_devices", licenseId });
      await reload();
    },
    [reload],
  );

  return { keys, loading, reload, generate, setStatus, resetDevices };
}
