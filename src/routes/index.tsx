import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminGate } from "@/hooks/useAdminGate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlackShark // Acesso Admin" },
      {
        name: "description",
        content:
          "Área restrita do painel BlackShark. Autentique-se para gerar e gerenciar keys.",
      },
      { property: "og:title", content: "BlackShark // Acesso Admin" },
      {
        property: "og:description",
        content: "Área restrita do painel de geração de chaves de licença BlackShark.",
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && authed) navigate({ to: "/painel" });
  }, [ready, authed, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    window.setTimeout(() => {
      if (login(password)) {
        navigate({ to: "/painel" });
      } else {
        setError("Credencial inválida. Verifique a senha e tente novamente.");
        setLoading(false);
      }
    }, 350);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/40 px-4 py-10">
      <div className="animate-fade-in-up w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 shadow-xl sm:p-10">
        <div className="stagger-1 flex flex-col items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <span className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            BlackShark
          </span>
        </div>

        <div className="stagger-2 mt-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Autentique-se com sua senha de administrador para acessar o painel de licenças.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div className="stagger-3 space-y-2">
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Senha
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors peer-focus:text-primary" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                disabled={loading}
                aria-invalid={!!error}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="peer h-11 rounded-xl border-border/70 bg-background pl-9 pr-10 transition-all duration-200 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p role="alert" aria-live="polite" className="animate-shake text-sm font-medium text-destructive">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="stagger-4 h-11 w-full rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Autenticando...
              </span>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <p className="stagger-5 mt-6 border-t border-border/50 pt-4 text-center text-xs text-muted-foreground">
          Acesso provisório: <span className="font-medium text-primary">admin1234</span>
        </p>
      </div>
    </main>
  );
}
