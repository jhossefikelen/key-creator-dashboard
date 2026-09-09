import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, KeyRound, Loader2, LockKeyhole } from "lucide-react";
import { SharkLogo } from "@/components/SharkLogo";
import { useEffect, useState, type FormEvent } from "react";
import { MatrixRain } from "@/components/MatrixRain";
import { useAdminGate } from "@/hooks/useAdminGate";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Extensão BlackShark IA // Acesso administrativo" },
      {
        name: "description",
        content: "Acesso restrito ao painel de licenças Extensão BlackShark IA.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { authed, ready, login } = useAdminGate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && authed) void navigate({ to: "/painel" });
  }, [authed, navigate, ready]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      await navigate({ to: "/painel" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#010502] px-5 py-12 text-[#eafff0]">
      <MatrixRain opacity={0.36} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,102,.14),transparent_32%),linear-gradient(to_bottom,rgba(0,0,0,.18),#010502_90%)]" />

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#1f6033] bg-[#020a05]/95 shadow-[0_28px_100px_rgba(0,0,0,.75),0_0_55px_rgba(0,255,102,.1)] backdrop-blur-xl">
        <div className="border-b border-[#174325] px-7 py-5">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="font-mono text-xs uppercase tracking-[0.25em] text-[#70a97f] transition hover:text-[#00ff66]"
            >
              ← Voltar ao site
            </Link>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00ff66]">
              <span className="size-2 animate-pulse rounded-full bg-[#00ff66]" />
              conexão segura
            </span>
          </div>
        </div>

        <div className="p-7 sm:p-9">
          <SharkLogo size={36} />
          <p className="mt-7 font-mono text-xs uppercase tracking-[0.28em] text-[#00ff66]">
            BlackShark IA Command Center
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.03em]">Acesso administrativo</h1>
          <p className="mt-3 text-sm leading-6 text-[#7fa78a]">
            Entre para criar planos, gerar chaves, controlar dispositivos e acompanhar os clientes
            da extensão.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#74a181]">
                E-mail
              </span>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#1c4c2a] bg-[#020703] px-4 text-sm text-[#eafff0] outline-none transition placeholder:text-[#3e6949] focus:border-[#00ff66] focus:ring-2 focus:ring-[#00ff66]/10"
                placeholder="admin@blackshark.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#74a181]">
                Senha
              </span>
              <span className="relative block">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#1c4c2a] bg-[#020703] px-4 pr-12 text-sm text-[#eafff0] outline-none transition placeholder:text-[#3e6949] focus:border-[#00ff66] focus:ring-2 focus:ring-[#00ff66]/10"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 grid w-12 place-items-center text-[#63836c] transition hover:text-[#00ff66]"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </span>
            </label>

            {error && (
              <p className="rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00e85d] font-bold text-[#001a08] shadow-[0_0_30px_rgba(0,255,102,.2)] transition hover:bg-[#35ff80] disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <KeyRound className="size-5" />
              )}
              {loading ? "Autenticando..." : "Entrar no painel"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
