import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { MatrixRain } from "@/components/MatrixRain";
import { SharkLogo } from "@/components/SharkLogo";
import {
  getValidCustomerSession,
  requestPasswordReset,
  signInCustomer,
  signUpCustomer,
} from "@/lib/customer-api";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Área do cliente — BlackShark IA" },
      {
        name: "description",
        content:
          "Entre na sua conta BlackShark IA para ver sua chave, gerar um teste grátis e renovar seu plano.",
      },
      { property: "og:title", content: "Área do cliente — BlackShark IA" },
      {
        property: "og:description",
        content: "Acesse sua chave, gere um teste grátis e renove seu plano.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CustomerAuthPage,
});

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function CustomerAuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    void getValidCustomerSession().then((session) => {
      if (session) void navigate({ to: "/minha-conta" });
    });
  }, [navigate]);

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInCustomer(email.trim(), password);
      await navigate({ to: "/minha-conta" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  async function onSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (name.trim().length < 3) return setError("Informe seu nome completo.");
    if (whatsapp.replace(/\D/g, "").length < 10) return setError("Informe um WhatsApp válido.");
    if (password.length < 8) return setError("A senha precisa ter pelo menos 8 caracteres.");
    if (password !== confirm) return setError("As senhas não conferem.");

    setLoading(true);
    try {
      const session = await signUpCustomer({
        name: name.trim(),
        email: email.trim(),
        whatsapp,
        password,
      });
      if (session) {
        await navigate({ to: "/minha-conta" });
      } else {
        toast.success("Conta criada! Confirme o e-mail que enviamos para entrar.");
        setTab("login");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível criar sua conta.");
    } finally {
      setLoading(false);
    }
  }

  async function onRecover() {
    if (!email.trim()) return setError("Digite seu e-mail para recuperar a senha.");
    try {
      await requestPasswordReset(email.trim());
      toast.success("Enviamos um e-mail com o link para criar uma nova senha.");
    } catch {
      toast.error("Não foi possível enviar o e-mail agora.");
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-5 py-12 text-foreground">
      <MatrixRain opacity={0.22} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_25%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_36%)]" />

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[0_28px_100px_rgba(0,0,0,.75)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-border px-7 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-3.5" />
            Voltar ao site
          </Link>
          <SharkLogo size={34} />
        </div>

        <div className="p-7 sm:p-9">
          <h1 className="text-3xl font-black tracking-[-0.03em]">
            {tab === "login" ? "Área do cliente" : "Criar sua conta"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {tab === "login"
              ? "Acesse sua chave, gere um teste grátis e renove seu plano."
              : "Crie sua conta gratuita e gere uma chave de teste em segundos."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-border bg-background p-1">
            {(["login", "signup"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTab(value);
                  setError("");
                }}
                className={`rounded-lg py-2 text-sm font-bold transition ${
                  tab === value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {value === "login" ? "Entrar" : "Criar conta"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <form className="mt-7 space-y-5" onSubmit={onLogin}>
              <label className="block">
                <span className={labelClass}>E-mail</span>
                <input
                  type="email"
                  autoComplete="username"
                  className={inputClass}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@email.com"
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>Senha</span>
                <span className="relative block">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`${inputClass} pr-12`}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted-foreground transition hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </span>
              </label>

              {error && (
                <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? <Loader2 className="size-5 animate-spin" /> : <LogIn className="size-5" />}
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <button
                type="button"
                onClick={onRecover}
                className="w-full text-center text-xs text-muted-foreground transition hover:text-primary"
              >
                Esqueci minha senha
              </button>
            </form>
          ) : (
            <form className="mt-7 space-y-5" onSubmit={onSignup}>
              <label className="block">
                <span className={labelClass}>Nome completo</span>
                <input
                  className={inputClass}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  maxLength={80}
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>E-mail</span>
                <input
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="voce@email.com"
                  maxLength={120}
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>WhatsApp</span>
                <input
                  inputMode="tel"
                  className={inputClass}
                  value={whatsapp}
                  onChange={(event) => setWhatsapp(formatWhatsapp(event.target.value))}
                  placeholder="(11) 99999-9999"
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>Senha</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  className={inputClass}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>Confirmar senha</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  className={inputClass}
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  placeholder="Repita a senha"
                  required
                />
              </label>

              {error && (
                <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <UserPlus className="size-5" />
                )}
                {loading ? "Criando conta..." : "Criar conta grátis"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
