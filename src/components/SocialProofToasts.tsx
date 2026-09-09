import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";

// Conteúdo 100% fictício, usado apenas como prova social na landing.
const NAMES = [
  "Rafael",
  "Juliana",
  "Marcos",
  "Camila",
  "Diego",
  "Patrícia",
  "Lucas",
  "Fernanda",
  "Bruno",
  "Aline",
  "Thiago",
  "Renata",
];

const CITIES = [
  "Campinas, SP",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Recife, PE",
  "Porto Alegre, RS",
  "Goiânia, GO",
  "Fortaleza, CE",
  "São Paulo, SP",
  "Florianópolis, SC",
  "Salvador, BA",
];

const PLANS = ["plano Diário", "plano Quinzenal", "plano Mensal"];

function pick<T>(list: T[], avoid?: T): T {
  let value = list[Math.floor(Math.random() * list.length)]!;
  if (avoid !== undefined && list.length > 1) {
    let guard = 0;
    while (value === avoid && guard < 8) {
      value = list[Math.floor(Math.random() * list.length)]!;
      guard += 1;
    }
  }
  return value;
}

type Notice = { id: number; name: string; city: string; plan: string; minutes: number };

export function SocialProofToasts() {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timeout: ReturnType<typeof setTimeout>;
    let hide: ReturnType<typeof setTimeout>;
    let lastName: string | undefined;

    const schedule = (delay: number) => {
      timeout = setTimeout(() => {
        const name = pick(NAMES, lastName);
        lastName = name;
        setNotice({
          id: Date.now(),
          name,
          city: pick(CITIES),
          plan: pick(PLANS),
          minutes: 1 + Math.floor(Math.random() * 14),
        });
        hide = setTimeout(() => setNotice(null), 7000);
        schedule(20000 + Math.floor(Math.random() * 20000));
      }, delay);
    };

    schedule(9000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(hide);
    };
  }, [dismissed]);

  if (!notice || dismissed) return null;

  return (
    <div
      key={notice.id}
      className="fixed bottom-5 left-4 z-50 max-w-[22rem] animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 pr-10 shadow-[0_18px_50px_rgba(0,0,0,.6)] backdrop-blur">
        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
          <ShieldCheck className="size-4" />
        </span>
        <div>
          <p className="text-sm leading-5 text-foreground">
            <b>{notice.name}</b> de {notice.city} ativou o {notice.plan}.
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            há {notice.minutes} min
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Fechar aviso"
          className="absolute right-3 top-3 text-muted-foreground transition hover:text-primary"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
