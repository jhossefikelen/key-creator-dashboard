import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Copy, Gift, Loader2, LogOut, RefreshCw, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { MatrixRain } from "@/components/MatrixRain";
import { SharkLogo } from "@/components/SharkLogo";
import { whatsappLink } from "@/components/WhatsappFab";
import { PLANS } from "@/lib/plans";
import {
  clearCustomerSession,
  createTrialKey,
  fetchCustomerData,
  getValidCustomerSession,
  updateCustomerProfile,
  type CustomerData,
  type CustomerLicense,
  type CustomerSession,
} from "@/lib/customer-api";

export const Route = createFileRoute("/minha-conta")({
  head: () => ({
    meta: [
      { title: "Minha conta — BlackShark IA" },
      {
        name: "description",
        content: "Sua chave de acesso, teste grátis, renovação de plano e dados da conta.",
      },
      { property: "og:title", content: "Minha conta — BlackShark IA" },
      { property: "og:description", content: "Gerencie sua chave e renove seu plano." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CustomerAreaPage,
});

function maskKey(key: string) {
  if (key.length <= 8) return key;
  return `${key.slice(0, 6)}••••••${key.slice(-4)}`;
}

function formatDate(iso: string | null) {
  if (!iso) return "vitalícia";
  return new Date(iso).toLocaleDateString("pt-BR");
}

function daysLeft(iso: string | null) {
  if (!iso) return null;
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000));
}

function statusLabel(license: CustomerLicense) {
  if (license.status === "revoked") return "revogada";
  if (license.status === "trial") return "teste";
  if (license.expiresAt && new Date(license.expiresAt).getTime() < Date.now()) return "expirada";
  return "ativa";
}

function CustomerAreaPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [data, setData] = useState<CustomerData | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const bootstrap = useCallback(async () => {
    const current = await getValidCustomerSession();
    if (!current) {
      await navigate({ to: "/entrar" });
      return;
    }
    setSession(current);
    setName(current.name);
    setWhatsapp(current.whatsapp);
    setData(await fetchCustomerData(current));
    setReady(true);
  }, [navigate]);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  if (!ready || !session || !data) {
    return (
      <main className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-primary" />
      </main>
    );
  }

  const active = data.licenses[0] ?? null;

  async function onTrial() {
    if (!session) return;
    setBusy(true);
    try {
      setData(await createTrialKey(session));
      toast.success("Chave de teste gerada!");
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Não foi possível gerar o teste.");
    } finally {
      setBusy(false);
    }
  }

  async function onSaveProfile() {
    if (!session) return;
    setBusy(true);
    try {
      setSession(await updateCustomerProfile(session, { name, whatsapp }));
      toast.success("Dados atualizados.");
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Não foi possível salvar.");
    } finally {
      setBusy(false);
    }
  }

  function onLogout() {
    clearCustomerSession();
    void navigate({ to: "/entrar" });
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    toast.success("Chave copiada.");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <MatrixRain opacity={0.12} />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <SharkLogo size={44} />
          <span>
            <b className="block font-mono text-sm tracking-[0.12em] text-silver">BLACKSHARK</b>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Minha conta</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl space-y-5 px-5 pb-16 lg:px-8">
        {data.demo && (
          <p className="rounded-2xl border border-warning/40 bg-warning/10 px-5 py-3 text-sm text-foreground">
            Modo demonstração: as chaves mostradas aqui ficam salvas apenas neste navegador até
            liberarmos o serviço de licenças dos clientes.
          </p>
        )}

        <div className="rounded-3xl border border-border bg-card/80 p-7">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Olá, {session.name || session.email}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.03em]">Sua licença</h1>

          {active ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-2xl border border-primary/45 bg-background p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <code className="font-mono text-lg tracking-[0.12em] text-primary">
                    {revealed === active.key ? active.key : maskKey(active.key)}
                  </code>
                  <button
                    type="button"
                    onClick={() => setRevealed(revealed === active.key ? null : active.key)}
                    className="rounded-lg border border-border px-3 py-1 text-xs transition hover:border-primary hover:text-primary"
                  >
                    {revealed === active.key ? "Ocultar" : "Mostrar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void copy(active.key)}
                    className="grid size-8 place-items-center rounded-lg border border-border transition hover:border-primary hover:text-primary"
                    aria-label="Copiar chave"
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Plano", active.plan],
                    ["Situação", statusLabel(active)],
                    ["Válida até", formatDate(active.expiresAt)],
                    [
                      "Dias restantes",
                      daysLeft(active.expiresAt) === null
                        ? "—"
                        : `${daysLeft(active.expiresAt)} dias`,
                    ],
                    ["Dispositivos", `${active.activeDevices}/${active.maxDevices}`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <RefreshCw className="size-4 text-primary" />
                  Renovar acesso
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  A renovação estende a validade da mesma chave. Escolha o período:
                </p>
                <div className="mt-5 space-y-2">
                  {PLANS.map((plan) => (
                    <a
                      key={plan.id}
                      href={whatsappLink(
                        `Olá! Quero renovar minha licença BlackShark IA no plano ${plan.name} (${plan.price}). Minha chave: ${active.key}`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm transition hover:border-primary"
                    >
                      <span className="font-bold">{plan.name}</span>
                      <span className="text-primary">{plan.price}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-border bg-background/60 p-6">
              <p className="text-sm text-muted-foreground">
                Você ainda não tem uma chave. Gere um teste grátis ou escolha um plano.
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onTrial}
              disabled={busy || data.trialUsed}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Gift className="size-4" />
              {data.trialUsed ? "Teste grátis já utilizado" : "Gerar teste grátis (3 dias)"}
            </button>
            <a
              href="/#planos"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-semibold transition hover:border-primary hover:text-primary"
            >
              <ShieldCheck className="size-4" />
              Ver planos
            </a>
          </div>
        </div>

        {data.licenses.length > 1 && (
          <div className="rounded-3xl border border-border bg-card/80 p-7">
            <h2 className="text-xl font-bold">Histórico de licenças</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <tr>
                    <th className="py-2">Chave</th>
                    <th className="py-2">Plano</th>
                    <th className="py-2">Situação</th>
                    <th className="py-2">Validade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.licenses.map((license) => (
                    <tr key={license.key} className="border-t border-border">
                      <td className="py-3 font-mono text-primary">{maskKey(license.key)}</td>
                      <td className="py-3">{license.plan}</td>
                      <td className="py-3">{statusLabel(license)}</td>
                      <td className="py-3 text-muted-foreground">{formatDate(license.expiresAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-border bg-card/80 p-7">
          <h2 className="text-xl font-bold">Dados da conta</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Nome
              </span>
              <input
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                WhatsApp
              </span>
              <input
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                maxLength={20}
              />
            </label>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">E-mail da conta: {session.email}</p>
          <button
            type="button"
            onClick={onSaveProfile}
            disabled={busy}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-semibold transition hover:border-primary hover:text-primary disabled:opacity-60"
          >
            <Save className="size-4" />
            Salvar alterações
          </button>
        </div>
      </section>
    </main>
  );
}
