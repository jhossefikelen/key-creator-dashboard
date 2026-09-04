import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Download, LogOut, KeyRound, Trash2, Ban, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminGate } from "@/hooks/useAdminGate";
import { useLicenseKeys } from "@/hooks/useLicenseKeys";
import { formatDate, statusOf, type LicenseKey } from "@/lib/license-keys";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Familia Adams // Painel de Licenças" },
      {
        name: "description",
        content:
          "Familia Adams - Gere, revogue e acompanhe chaves de licença com validade e limite de ativações.",
      },
      { property: "og:title", content: "Familia Adams // Painel de Licenças" },
      {
        property: "og:description",
        content: "Familia Adams - Gere, revogue e acompanhe chaves de licença em um painel único.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PainelPage,
});

const STATUS_STYLES: Record<string, string> = {
  ativa: "border-primary text-primary",
  revogada: "border-destructive text-destructive",
  expirada: "border-warning text-warning",
};

function PainelPage() {
  const navigate = useNavigate();
  const { authed, ready, logout } = useAdminGate();
  const { keys, hydrated, generate, revoke, remove, clearAll } = useLicenseKeys();

  const [quantity, setQuantity] = useState(5);
  const [groups, setGroups] = useState("4");
  const [prefix, setPrefix] = useState("");
  const [duration, setDuration] = useState("30");
  const [maxActivations, setMaxActivations] = useState(1);
  const [note, setNote] = useState("");
  const [batch, setBatch] = useState<LicenseKey[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todas");

  useEffect(() => {
    if (ready && !authed) navigate({ to: "/" });
  }, [ready, authed, navigate]);

  const stats = useMemo(() => {
    const counts = { total: keys.length, ativa: 0, revogada: 0, expirada: 0 };
    for (const k of keys) counts[statusOf(k)] += 1;
    return counts;
  }, [keys]);

  const filtered = useMemo(
    () =>
      keys.filter((k) => {
        const matchesQuery =
          !query ||
          k.code.toLowerCase().includes(query.toLowerCase()) ||
          k.note.toLowerCase().includes(query.toLowerCase());
        const matchesStatus =
          statusFilter === "todas" || statusOf(k) === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [keys, query, statusFilter],
  );

  function onGenerate() {
    const qty = Math.min(Math.max(Math.trunc(quantity) || 1, 1), 100);
    const created = generate({
      quantity: qty,
      groups: Number(groups),
      groupSize: 4,
      prefix,
      durationDays: duration === "vitalicia" ? null : Number(duration),
      maxActivations: Math.max(Math.trunc(maxActivations) || 1, 1),
      note,
    });
    setBatch(created);
    toast.success(`${created.length} key(s) geradas`);
  }

  async function copy(text: string, label = "Key copiada") {
    await navigator.clipboard.writeText(text);
    toast.success(label);
  }

  function downloadBatch() {
    const blob = new Blob([batch.map((k) => k.code).join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keys-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!ready || !authed) return null;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl bg-black px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3a0a0a] pb-6">
        <div>
          <h1 className="text-glow flex items-center gap-2 text-2xl font-bold text-[#8b1a1a]">
            <KeyRound className="size-6" /> Familia Adams
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Emissão e controle de chaves — armazenamento local até a integração do banco.
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-none border-border uppercase tracking-widest"
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
        >
          <LogOut className="size-4" /> Sair
        </Button>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total },
          { label: "Ativas", value: stats.ativa },
          { label: "Revogadas", value: stats.revogada },
          { label: "Expiradas", value: stats.expirada },
        ].map((s) => (
          <div key={s.label} className="border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
            <p className="text-glow mt-1 text-3xl font-bold text-primary">
              {hydrated ? s.value : 0}
            </p>
          </div>
        ))}
      </section>

      <section className="scanlines mt-6 border border-border bg-card p-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-primary">Gerador</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Field label="Quantidade (1-100)">
            <Input
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rounded-none bg-background"
            />
          </Field>
          <Field label="Formato">
            <Select value={groups} onValueChange={setGroups}>
              <SelectTrigger className="w-full rounded-none bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">XXXX-XXXX-XXXX</SelectItem>
                <SelectItem value="4">XXXX-XXXX-XXXX-XXXX</SelectItem>
                <SelectItem value="5">XXXX-XXXX-XXXX-XXXX-XXXX</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Prefixo (opcional)">
            <Input
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="PRO"
              className="rounded-none bg-background uppercase"
            />
          </Field>
          <Field label="Duração">
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full rounded-none bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
                <SelectItem value="vitalicia">Vitalícia</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Limite de ativações">
            <Input
              type="number"
              min={1}
              value={maxActivations}
              onChange={(e) => setMaxActivations(Number(e.target.value))}
              className="rounded-none bg-background"
            />
          </Field>
          <Field label="Observação (opcional)">
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="lote parceiros"
              className="rounded-none bg-background"
            />
          </Field>
        </div>
        <Button
          onClick={onGenerate}
          className="glow mt-5 rounded-none uppercase tracking-[0.2em]"
        >
          Gerar keys
        </Button>
      </section>

      {batch.length > 0 ? (
        <section className="mt-6 border border-primary/60 bg-card p-6 shadow-[var(--glow-primary)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary">
              Último lote ({batch.length})
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-none border-border"
                onClick={() =>
                  copy(batch.map((k) => k.code).join("\n"), "Lote copiado")
                }
              >
                <Copy className="size-4" /> Copiar tudo
              </Button>
              <Button
                variant="outline"
                className="rounded-none border-border"
                onClick={downloadBatch}
              >
                <Download className="size-4" /> .txt
              </Button>
            </div>
          </div>
          <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap break-all border border-border bg-background p-4 text-sm text-primary">
            {batch.map((k) => k.code).join("\n")}
          </pre>
        </section>
      ) : null}

      <section className="mt-6 border border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="buscar key ou observação"
              className="rounded-none bg-background pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44 rounded-none bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todos os status</SelectItem>
              <SelectItem value="ativa">Ativas</SelectItem>
              <SelectItem value="revogada">Revogadas</SelectItem>
              <SelectItem value="expirada">Expiradas</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="rounded-none border-destructive/60 text-destructive"
            onClick={() => {
              clearAll();
              setBatch([]);
              toast.success("Histórico limpo");
            }}
          >
            <Trash2 className="size-4" /> Limpar tudo
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Ativações</TableHead>
                <TableHead>Criada em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    Nenhuma key encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((k) => {
                  const status = statusOf(k);
                  return (
                    <TableRow key={k.id}>
                      <TableCell className="text-primary">
                        {k.code}
                        {k.note ? (
                          <span className="block text-xs text-muted-foreground">
                            {k.note}
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`border px-2 py-0.5 text-xs uppercase tracking-widest ${STATUS_STYLES[status]}`}
                        >
                          {status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(k.expiresAt)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {k.activations}/{k.maxActivations}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(k.createdAt)}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Copiar key"
                          onClick={() => copy(k.code)}
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Revogar key"
                          onClick={() => revoke(k.id)}
                        >
                          <Ban className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-label="Excluir key"
                          onClick={() => remove(k.id)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}
