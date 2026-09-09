import { useEffect, useMemo, useState } from "react";
import { Loader2, Mail, MessageCircle, RefreshCw, Search, Users } from "lucide-react";
import { fetchCustomers, type CustomerRecord } from "@/lib/site-config-api";
import { whatsappHref } from "@/lib/site-config";

function dateLabel(value: string) {
  return new Date(value).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export function CustomersPanel({ accessToken }: { accessToken: string }) {
  const [rows, setRows] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setRows(await fetchCustomers(accessToken));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      [row.name, row.email, row.whatsapp].join(" ").toLowerCase().includes(normalized),
    );
  }, [rows, query]);

  return (
    <section className="rounded-3xl border border-[#3a1a1a] bg-[#0a0a0c]/96">
      <div className="flex flex-col gap-4 border-b border-[#241315] p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a20]">
            Cadastros do site
          </p>
          <h2 className="mt-2 text-2xl font-black">Clientes cadastrados ({rows.length})</h2>
        </div>
        <div className="flex gap-3">
          <label className="relative min-w-0 sm:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6b7178]" />
            <input
              className="matrix-input pl-10"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar nome, e-mail ou WhatsApp..."
            />
          </label>
          <button
            onClick={() => void load()}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#2a1416] bg-[#101013] text-[#c8ccd2] transition hover:border-[#ff2a20]/60 hover:text-[#ff2a20]"
            aria-label="Atualizar clientes"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {error && <p className="px-6 py-5 text-sm text-red-300">{error}</p>}

      {loading ? (
        <div className="grid min-h-64 place-items-center">
          <Loader2 className="size-6 animate-spin text-[#ff2a20]" />
        </div>
      ) : filtered.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#241315] bg-[#080809] font-mono text-[10px] uppercase tracking-[0.13em] text-[#7d838b]">
              <tr>
                <th className="px-5 py-4">Cliente</th>
                <th className="px-4 py-4">WhatsApp</th>
                <th className="px-4 py-4">Origem</th>
                <th className="px-5 py-4">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1013]">
              {filtered.map((row) => (
                <tr key={row.id} className="transition hover:bg-[#120a0b]">
                  <td className="px-5 py-4">
                    <strong className="block text-[#f2f4f6]">{row.name || "Sem nome"}</strong>
                    <a
                      href={`mailto:${row.email}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#9aa1a9] transition hover:text-[#ff2a20]"
                    >
                      <Mail className="size-3" />
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-4">
                    {row.whatsapp ? (
                      <a
                        href={whatsappHref(row.whatsapp, "Olá! Aqui é da BlackShark IA.")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#c8ccd2] transition hover:text-[#ff2a20]"
                      >
                        <MessageCircle className="size-3.5" />
                        {row.whatsapp}
                      </a>
                    ) : (
                      <span className="text-[#6b7178]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-[#9aa1a9]">{row.source}</td>
                  <td className="px-5 py-4 text-[#9aa1a9]">{dateLabel(row.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid min-h-64 place-items-center px-6 text-center">
          <div>
            <Users className="mx-auto size-8 text-[#5a2a2a]" />
            <p className="mt-3 font-semibold text-[#c8ccd2]">Nenhum cliente cadastrado ainda.</p>
            <p className="mt-1 text-sm text-[#7d838b]">
              Os cadastros feitos na área do cliente aparecem aqui.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
