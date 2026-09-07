import { useCallback, useEffect, useState } from "react";
import {
  clearAdminSession,
  getValidSession,
  signInAdmin,
  type AdminSession,
} from "@/lib/lunax-api";

export function useAdminGate() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    void getValidSession()
      .then((current) => {
        if (mounted) setSession(current);
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const current = await signInAdmin(email, password);
    setSession(current);
    return current;
  }, []);

  const logout = useCallback(() => {
    clearAdminSession();
    setSession(null);
  }, []);

  return {
    authed: Boolean(session),
    session,
    ready,
    login,
    logout,
  };
}
