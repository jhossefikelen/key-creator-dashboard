import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Terminal, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminGate } from "@/hooks/useAdminGate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KEYGEN // Acesso Admin" },
      {
        name: "description",
        content:
          "Área restrita do painel de geração de chaves de licença. Autentique-se para gerar e gerenciar keys.",
      },
      { property: "og:title", content: "KEYGEN // Acesso Admin" },
      {
        property: "og:description",
        content: "Área restrita do painel de geração de chaves de licença.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { authed, ready, login } = useAdminGate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && authed) navigate({ to: "/painel" });
  }, [ready, authed, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      setError("");
      navigate({ to: "/painel" });
    } else {
      setError("ACESSO NEGADO :: credencial inválida");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="scanlines w-full max-w-md border border-border bg-card p-8 shadow-[var(--glow-primary)]">
        <div className="flex items-center gap-2 text-primary">
          <Terminal className="size-5" />
          <span className="text-sm tracking-[0.3em] uppercase">keygen v1.0</span>
        </div>

        <h1 className="text-glow mt-6 text-3xl font-bold text-primary">
          Acesso restrito
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Autenticação de administrador necessária para emitir chaves de licença.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">
            Senha
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-none border-border bg-background pl-9 font-mono tracking-widest"
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}

          <Button
            type="submit"
            className="glow w-full rounded-none tracking-[0.2em] uppercase"
          >
            Autenticar
          </Button>
        </form>

        <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
          Acesso provisório: <span className="text-primary">admin1234</span> —
          será substituído por login real quando o banco de dados for integrado.
        </p>
      </div>
    </main>
  );
}
