import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "keygen.session.v1";
// TODO: senha temporária apenas para o protótipo. Ao ativar o backend,
// substituir por autenticação real com papel de admin.
const TEMP_PASSWORD = "admin1234";

export function useAdminGate() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(window.localStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  const login = useCallback((password: string) => {
    if (password !== TEMP_PASSWORD) return false;
    window.localStorage.setItem(SESSION_KEY, "1");
    setAuthed(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }, []);

  return { authed, ready, login, logout };
}
