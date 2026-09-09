import { useEffect, useState } from "react";
import { Chrome, Copy, Download, Loader2, Puzzle, Timer } from "lucide-react";
import { toast } from "sonner";
import { createTrialLicense } from "@/lib/trial.functions";

const EXTENSION_FILE = "/blackshark-extensao.zip";
const STORAGE_KEY = "blackshark.trial.key.v1";

type Trial = { key: string; expiresAt: string };

function remaining(expiresAt: string) {
  return Math.max(0, new Date(expiresAt).getTime() - Date.now());
}

function formatClock(ms: number) {
  const total = Math.floor(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function TrialDownload() {
  const [trial, setTrial] = useState<Trial | null>(null);
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) || "null",
      ) as Trial | null;
      if (saved && remaining(saved.expiresAt) > 0) setTrial(saved);
    } catch {
      /* ignora */
    }
  }, []);

  useEffect(() => {
    if (!trial) return;
    const tick = () => setLeft(remaining(trial.expiresAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [trial]);

  function downloadExtension() {
    fetch(EXTENSION_FILE)
      .then((response) => {
        if (!response.ok) throw new Error("Não foi possível baixar agora.");
        return response.blob();
      })
      .then((blob) => {
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = "blackshark-extensao.zip";
        anchor.click();
        URL.revokeObjectURL(anchor.href);
        toast.success("Download iniciado!");
      })
      .catch((error: Error) => toast.error(error.message));
  }

  async function generateTrial() {
    setBusy(true);
    try {
      const result = await createTrialLicense();
      if (!result.ok || !result.key || !result.expiresAt) {
        toast.error(result.error || "Não foi possível gerar o teste.");
        return;
      }
      const next = { key: result.key, expiresAt: result.expiresAt };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setTrial(next);
      toast.success("Chave de teste gerada por 20 minutos!");
    } catch {
      toast.error("Serviço de teste indisponível no momento.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="baixar" className="relative z-10 border-y border-border bg-card/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-border bg-background/60 p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Passo 1 — instalar
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em]">Baixar a extensão</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Funciona no Chrome, Edge, Brave e Opera. Baixe o arquivo e siga os quatro passos abaixo.
          </p>
          <button
            type="button"
            onClick={downloadExtension}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-[0_0_38px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition hover:opacity-90"
          >
            <Download className="size-5" />
            Baixar extensão
          </button>
          <ol className="mt-7 space-y-3 text-sm text-muted-foreground">
            {[
              "Descompacte o arquivo baixado.",
              "Abra chrome://extensions no seu navegador.",
              "Ative o Modo do desenvolvedor no canto superior direito.",
              "Clique em Carregar sem compactação e escolha a pasta descompactada.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-lg border border-primary/40 font-mono text-[11px] text-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Chrome className="size-4 text-primary" />
            Compatível com navegadores baseados em Chromium.
          </p>
        </article>

        <article className="rounded-3xl border border-primary/45 bg-background p-8 shadow-[0_0_45px_color-mix(in_oklab,var(--primary)_12%,transparent)]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Passo 2 — testar grátis
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em]">Teste de 20 minutos</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Chave real, liberada na hora. Um teste gratuito por dia para cada conexão de internet.
          </p>

          {trial && left > 0 ? (
            <div className="mt-7 rounded-2xl border border-primary/45 bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <code className="font-mono text-lg tracking-[0.12em] text-primary">{trial.key}</code>
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(trial.key);
                    toast.success("Chave copiada.");
                  }}
                  className="grid size-8 place-items-center rounded-lg border border-border transition hover:border-primary hover:text-primary"
                  aria-label="Copiar chave de teste"
                >
                  <Copy className="size-4" />
                </button>
              </div>
              <p className="mt-4 flex items-center gap-2 font-mono text-sm text-foreground">
                <Timer className="size-4 text-primary" />
                Expira em {formatClock(left)}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Cole a chave na extensão para liberar o painel imediatamente.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void generateTrial()}
              disabled={busy}
              className="mt-7 inline-flex items-center gap-2 rounded-xl border border-primary px-7 py-3.5 font-bold text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {busy ? <Loader2 className="size-5 animate-spin" /> : <Puzzle className="size-5" />}
              Gerar teste grátis de 20 minutos
            </button>
          )}

          {trial && left === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Seu teste terminou. Escolha um plano para continuar usando sem limite de tempo.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
