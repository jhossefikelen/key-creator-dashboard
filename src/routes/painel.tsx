import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Ban,
  Check,
  Copy,
  KeyRound,
  Loader2,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SharkLogo } from "@/components/SharkLogo";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { MatrixRain } from "@/components/MatrixRain";
import { useAdminGate } from "@/hooks/useAdminGate";
import { useLicenseKeys, type CreateLicenseOptions } from "@/hooks/useLicenseKeys";
import { CustomersPanel } from "@/components/admin/CustomersPanel";
import { SettingsPanel } from "@/components/admin/SettingsPanel";

import type { LicenseRecord } from "@/lib/lunax-api";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Extensão BlackShark IA // Painel administrativo" },
      {
        name: "description",
        content: "Crie chaves, controle clientes, planos e dispositivos BlackShark IA.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LicenseDashboard,
});

const PLAN_LABEL: Record<string, string> = {
  daily: "Diário",
  fortnightly: "Quinzenal",
  monthly: "Mensal",
  lifetime: "Vitalício",
};

function dateLabel(value: string | null) {
  if (!value) return "Sem expiração";
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function statusOf(license: LicenseRecord) {
  if (license.status === "revoked") return "revoked";
  if (license.expiresAt && new Date(license.expiresAt).getTime() < Date.now()) {
    return "expired";
  }
  return "active";
}

function LicenseDashboard() {
  const navigate = useNavigate();
  const { authed, ready, session, logout } = useAdminGate();
  const { keys, loading, reload, generate, setStatus, resetDevices } = useLicenseKeys(authed);
  const [plan, setPlan] = useState<CreateLicenseOptions["plan"]>("monthly");
  const [quantity, setQuantity] = useState(1);
  const [maxDevices, setMaxDevices] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [busy, setBusy] = useState<string | null>(null);
  const [generatedKeys, setGeneratedKeys] = useState<
    Array<{ id: number; key: string; keyPrefix: string }>
  >([]);

  useEffect(() => {
    if (ready && !authed) void navigate({ to: "/admin" });
  }, [authed, navigate, ready]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return keys.filter((license) => {
      const status = statusOf(license);
      const text = [
        license.keyPrefix,
        license.customerName,
        license.email,
        PLAN_LABEL[license.plan] || license.plan,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return (
        (!normalized || text.includes(normalized)) &&
        (statusFilter === "all" || statusFilter === status)
      );
    });
  }, [keys, query, statusFilter]);

  const stats = useMemo(
    () => ({
      total: keys.length,
      active: keys.filter((license) => statusOf(license) === "active").length,
      devices: keys.reduce((total, license) => total + Number(license.activeDevices || 0), 0),
      commands: keys.reduce((total, license) => total + Number(license.commandsCount || 0), 0),
    }),
    [keys],
  );

  async function onGenerate() {
    setBusy("create");
    try {
      const created = await generate({
        quantity: Math.min(50, Math.max(1, Math.trunc(quantity) || 1)),
        plan,
        maxDevices: Math.min(100, Math.max(1, Math.trunc(maxDevices) || 1)),
        customerName,
        email,
      });
      setGeneratedKeys(created);
      setCustomerName("");
      setEmail("");
      toast.success(
        created.length === 1
          ? "Chave criada e salva no Supabase."
          : `${created.length} chaves criadas e salvas no Supabase.`,
      );
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Não foi possível criar.");
    } finally {
      setBusy(null);
    }
  }

  async function copy(text: string, message = "Chave copiada.") {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message);
    } catch {
      toast.error("O navegador não permitiu copiar.");
    }
  }

  async function perform(name: string, action: () => Promise<void>, success: string) {
    setBusy(name);
    try {
      await action();
      toast.success(success);
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Não foi possível concluir.");
    } finally {
      setBusy(null);
    }
  }

  function signOut() {
    logout();
    void navigate({ to: "/admin" });
  }

  if (!ready || (authed && loading && !keys.length)) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#050505] text-[#ff2a20]">
        <Loader2 className="size-8 animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-[#f2f4f6]">
      <MatrixRain opacity={0.1} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,6,0,.09),transparent_32%),linear-gradient(to_bottom,rgba(1,5,2,.3),#050505_70%)]" />

      <header className="sticky top-0 z-30 border-b border-[#153a20] bg-[#080809]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <SharkLogo size={52} className="rounded-xl shadow-lg border border-[#4a2020]/60 bg-[#101013] p-[2px]" />
            <span>
              <b className="block font-mono text-sm uppercase tracking-[0.16em]">
                BlackShark IA Command Center
              </b>
              <span className="text-xs text-[#66836d]">Licenças e clientes em produção</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-lg border border-[#2a1416] bg-[#101013] px-3 py-2 text-xs text-[#8aae94] md:block">
              {session?.email}
            </span>
            <button
              onClick={() => void reload()}
              disabled={loading}
              className="grid size-10 place-items-center rounded-xl border border-[#2a1416] bg-[#101013] text-[#9cc8a8] transition hover:border-[#ff2a20]/60 hover:text-[#ff2a20] disabled:opacity-50"
              aria-label="Atualizar licenças"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={signOut}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#2a1416] bg-[#101013] px-3 text-sm text-[#9cc8a8] transition hover:border-red-500/50 hover:text-red-300"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1500px] space-y-6 px-5 py-7 lg:px-8">
        <nav className="flex flex-wrap gap-2">
          {(
            [
              ["licencas", "Licenças"],
              ["clientes", "Clientes"],
              ["config", "Configurações do site"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setTab(value)}
              className={`h-11 rounded-xl border px-5 text-sm font-bold transition ${
                tab === value
                  ? "border-[#e10600] bg-[#e10600]/12 text-[#ff2a20]"
                  : "border-[#2a1416] bg-[#101013] text-[#9aa1a9] hover:border-[#ff2a20]/50 hover:text-[#ff2a20]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === "clientes" && <CustomersPanel accessToken={session?.accessToken || ""} />}
        {tab === "config" && <SettingsPanel accessToken={session?.accessToken || ""} />}

        {tab === "licencas" && (
        <>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {[
            {
              icon: KeyRound,
              label: "Chaves cadastradas",
              value: stats.total,
            },
            {
              icon: ShieldCheck,
              label: "Licenças ativas",
              value: stats.active,
            },
            {
              icon: MonitorSmartphone,
              label: "Dispositivos ativos",
              value: stats.devices,
            },
            {
              icon: Sparkles,
              label: "Comandos executados",
              value: stats.commands,
            },
          ].map(({ icon: Icon, label, value }) => (
            <article
              key={label}
              className="rounded-2xl border border-[#173d22] bg-[#050e08]/92 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#76927d]">{label}</span>
                <Icon className="size-4 text-[#ff2a20]" />
              </div>
              <strong className="mt-3 block font-mono text-3xl text-[#f2f4f6]">{value}</strong>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[390px_1fr]">
          <aside className="h-fit rounded-3xl border border-[#1b4b2a] bg-[#0a0a0c]/96 p-6 shadow-[0_25px_80px_rgba(0,0,0,.35)] xl:sticky xl:top-24">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a20]">
                  Nova licença
                </p>
                <h1 className="mt-2 text-2xl font-black">Gerar chave</h1>
              </div>
              <span className="grid size-11 place-items-center rounded-xl border border-[#ff2a20]/25 bg-[#ff2a20]/8 text-[#ff2a20]">
                <KeyRound className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#71917a]">
              A chave é salva diretamente no banco utilizado pela extensão e aparece apenas uma vez
              após a criação.
            </p>

            <div className="mt-6 space-y-4">
              <Field label="Plano">
                <select
                  value={plan}
                  onChange={(event) => setPlan(event.target.value as CreateLicenseOptions["plan"])}
                  className="matrix-input"
                >
                  <option value="daily">Diário — 24 horas</option>
                  <option value="fortnightly">Quinzenal — 15 dias</option>
                  <option value="monthly">Mensal — 30 dias</option>
                  <option value="lifetime">Vitalício — sem expiração</option>
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Quantidade">
                  <input
                    className="matrix-input"
                    type="number"
                    min={1}
                    max={50}
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                  />
                </Field>
                <Field label="Dispositivos">
                  <input
                    className="matrix-input"
                    type="number"
                    min={1}
                    max={100}
                    value={maxDevices}
                    onChange={(event) => setMaxDevices(Number(event.target.value))}
                  />
                </Field>
              </div>
              <Field label="Nome do cliente">
                <input
                  className="matrix-input"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Nome ou empresa"
                />
              </Field>
              <Field label="E-mail do cliente">
                <input
                  className="matrix-input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="cliente@empresa.com"
                />
              </Field>
              <button
                onClick={() => void onGenerate()}
                disabled={busy === "create"}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e10600] font-bold text-[#001a08] shadow-[0_0_28px_rgba(225,6,0,.17)] transition hover:bg-[#34ff7f] disabled:cursor-wait disabled:opacity-60"
              >
                {busy === "create" ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Sparkles className="size-5" />
                )}
                {busy === "create" ? "Criando..." : "Criar e salvar chave"}
              </button>
            </div>
          </aside>

          <section className="min-w-0 rounded-3xl border border-[#173d22] bg-[#0a0a0c]/96">
            <div className="border-b border-[#153a20] p-5 lg:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a20]">
                    Base de clientes
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Licenças BlackShark IA</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative min-w-0 sm:w-72">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#55705d]" />
                    <input
                      className="matrix-input pl-10"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Buscar cliente, e-mail ou prefixo..."
                    />
                  </label>
                  <select
                    className="matrix-input sm:w-40"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="all">Todos</option>
                    <option value="active">Ativos</option>
                    <option value="expired">Expirados</option>
                    <option value="revoked">Revogados</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="border-b border-[#241315] bg-[#080809] font-mono text-[10px] uppercase tracking-[0.13em] text-[#5f7d67]">
                  <tr>
                    <th className="px-5 py-4">Cliente / chave</th>
                    <th className="px-4 py-4">Plano</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Dispositivos</th>
                    <th className="px-4 py-4">Uso</th>
                    <th className="px-5 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102c19]">
                  {filtered.map((license) => {
                    const status = statusOf(license);
                    return (
                      <tr key={license.id} className="transition hover:bg-[#07140b]">
                        <td className="px-5 py-4">
                          <strong className="block text-[#e8ffef]">
                            {license.customerName || "Cliente sem nome"}
                          </strong>
                          <span className="mt-1 block text-xs text-[#66836d]">
                            {license.email || "Sem e-mail"}
                          </span>
                          <button
                            onClick={() => void copy(license.keyPrefix, "Prefixo copiado.")}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[#1e4b2b] bg-[#07120a] px-2 py-1 font-mono text-[10px] text-[#8fba9b] transition hover:border-[#ff2a20]/50 hover:text-[#ff2a20]"
                            title="Copiar prefixo identificador"
                          >
                            {license.keyPrefix}
                            <Copy className="size-3" />
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-[#bfe0c7]">
                            {PLAN_LABEL[license.plan] || license.plan}
                          </span>
                          <span className="mt-1 block text-xs text-[#66836d]">
                            {dateLabel(license.expiresAt)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={status} />
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-mono text-[#bfe0c7]">
                            {license.activeDevices}/{license.maxDevices}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-mono text-[#bfe0c7]">{license.commandsCount}</span>
                          <span className="mt-1 block text-xs text-[#66836d]">
                            {license.lastUsedAt ? dateLabel(license.lastUsedAt) : "Nunca usada"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                void perform(
                                  `reset-${license.id}`,
                                  () => resetDevices(license.id),
                                  "Dispositivos liberados.",
                                )
                              }
                              disabled={busy === `reset-${license.id}`}
                              className="matrix-action"
                              title="Liberar todos os dispositivos"
                            >
                              {busy === `reset-${license.id}` ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <MonitorSmartphone className="size-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                void perform(
                                  `status-${license.id}`,
                                  () =>
                                    setStatus(
                                      license.id,
                                      license.status === "revoked" ? "active" : "revoked",
                                    ),
                                  license.status === "revoked"
                                    ? "Licença reativada."
                                    : "Licença revogada.",
                                )
                              }
                              disabled={busy === `status-${license.id}`}
                              className={`matrix-action ${
                                license.status === "revoked"
                                  ? "text-[#ff2a20]"
                                  : "hover:border-red-500/50 hover:text-red-300"
                              }`}
                              title={
                                license.status === "revoked"
                                  ? "Reativar licença"
                                  : "Revogar licença"
                              }
                            >
                              {busy === `status-${license.id}` ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : license.status === "revoked" ? (
                                <Check className="size-4" />
                              ) : (
                                <Ban className="size-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!filtered.length && (
                <div className="grid min-h-64 place-items-center px-6 text-center">
                  <div>
                    <Users className="mx-auto size-8 text-[#356243]" />
                    <p className="mt-3 font-semibold text-[#a8c9b1]">Nenhuma licença encontrada.</p>
                    <p className="mt-1 text-sm text-[#5e7966]">
                      Gere a primeira chave ou ajuste os filtros.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </section>
        </>
        )}
      </div>


      {generatedKeys.length > 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5 backdrop-blur-sm">
          <section className="w-full max-w-xl rounded-3xl border border-[#ff2a20]/40 bg-[#030b05] p-6 shadow-[0_25px_100px_rgba(0,0,0,.75),0_0_50px_rgba(225,6,0,.12)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a20]">
                  Criadas com sucesso
                </p>
                <h2 className="mt-2 text-2xl font-black">Copie as chaves agora</h2>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-[#ff2a20]/10 text-[#ff2a20]">
                <Check className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#7d9f85]">
              Por segurança, a chave completa não é armazenada e não poderá ser exibida novamente.
            </p>
            <div className="mt-5 max-h-72 space-y-3 overflow-auto">
              {generatedKeys.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-[#194827] bg-[#06120a] p-3"
                >
                  <code className="min-w-0 flex-1 break-all text-xs text-[#caffd7]">
                    {item.key}
                  </code>
                  <button
                    className="matrix-action shrink-0"
                    onClick={() => void copy(item.key)}
                    title="Copiar chave"
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() =>
                  void copy(
                    generatedKeys.map((item) => item.key).join("\n"),
                    "Todas as chaves foram copiadas.",
                  )
                }
                className="rounded-xl border border-[#ff2a20]/35 bg-[#07150b] py-3 font-bold text-[#f2f4f6] transition hover:border-[#ff2a20]"
              >
                Copiar todas
              </button>
              <button
                onClick={() => setGeneratedKeys([])}
                className="rounded-xl bg-[#e10600] py-3 font-bold text-[#001a08] transition hover:bg-[#34ff7f]"
              >
                Concluir
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#6e9477]">
        {label}
      </span>
      {children}
    </label>
  );
}

function StatusBadge({ status }: { status: "active" | "expired" | "revoked" }) {
  const options = {
    active: ["Ativa", "border-[#ff2a20]/30 bg-[#ff2a20]/8 text-[#56ff8e]"],
    expired: ["Expirada", "border-amber-400/30 bg-amber-400/8 text-amber-300"],
    revoked: ["Revogada", "border-red-500/30 bg-red-500/8 text-red-300"],
  } as const;
  const [label, className] = options[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${className}`}
    >
      {label}
    </span>
  );
}
