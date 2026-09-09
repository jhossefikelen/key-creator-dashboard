import { useEffect, useState, type ReactNode } from "react";
import { Loader2, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";
import { fetchSiteConfig, saveSiteConfig } from "@/lib/site-config-api";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#9aa1a9]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#3a1a1a] bg-[#0a0a0c]/96 p-6">
      <h3 className="text-xl font-black text-[#f2f4f6]">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-[#7d838b]">{subtitle}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Lines({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <Field label={`${label} (um por linha)`}>
      <textarea
        className="matrix-input min-h-28 py-3"
        value={value.join("\n")}
        onChange={(event) =>
          onChange(
            event.target.value
              .split("\n")
              .map((line) => line.trimStart())
              .filter((line, index, all) => line !== "" || index < all.length - 1),
          )
        }
      />
    </Field>
  );
}

export function SettingsPanel({ accessToken }: { accessToken: string }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    void fetchSiteConfig()
      .then((loaded) => mounted && setConfig(loaded))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  function patch<K extends keyof SiteConfig>(key: K, value: Partial<SiteConfig[K]>) {
    setConfig((current) => ({ ...current, [key]: { ...current[key], ...value } }));
  }

  async function onSave() {
    setSaving(true);
    try {
      const saved = await saveSiteConfig(config, accessToken);
      const confirmed = await fetchSiteConfig();
      if (JSON.stringify(saved) !== JSON.stringify(confirmed)) {
        throw new Error("O banco não confirmou todas as alterações. Tente salvar novamente.");
      }
      setConfig(confirmed);
      toast.success(`Configurações confirmadas. WhatsApp: ${confirmed.whatsapp.number}`);
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-64 place-items-center">
        <Loader2 className="size-6 animate-spin text-[#ff2a20]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="sticky top-20 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#3a1a1a] bg-[#080809]/95 px-5 py-4 backdrop-blur">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff2a20]">
            Configurações do site
          </p>
          <p className="mt-1 text-sm text-[#9aa1a9]">
            Tudo que aparece na página inicial pode ser editado aqui.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setConfig(DEFAULT_SITE_CONFIG)}
            className="flex h-11 items-center gap-2 rounded-xl border border-[#2a1416] bg-[#101013] px-4 text-sm text-[#c8ccd2] transition hover:border-[#ff2a20]/60 hover:text-[#ff2a20]"
          >
            <RotateCcw className="size-4" />
            Restaurar padrão
          </button>
          <button
            onClick={() => void onSave()}
            disabled={saving}
            className="flex h-11 items-center gap-2 rounded-xl bg-[#e10600] px-5 font-bold text-white transition hover:bg-[#ff2a20] disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Salvar alterações
          </button>
        </div>
      </div>

      <Card title="Marca" subtitle="Nome exibido no cabeçalho e nos textos automáticos.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Nome">
            <input
              className="matrix-input"
              value={config.brand.name}
              onChange={(event) => patch("brand", { name: event.target.value })}
            />
          </Field>
          <Field label="Complemento (ex.: IA)">
            <input
              className="matrix-input"
              value={config.brand.suffix}
              onChange={(event) => patch("brand", { suffix: event.target.value })}
            />
          </Field>
          <Field label="Frase da marca">
            <input
              className="matrix-input"
              value={config.brand.tagline}
              onChange={(event) => patch("brand", { tagline: event.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="WhatsApp" subtitle="Número usado em todos os botões do site.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Número com DDI (só dígitos)">
            <input
              className="matrix-input"
              value={config.whatsapp.number}
              onChange={(event) => patch("whatsapp", { number: event.target.value })}
              placeholder="5511999999999"
            />
          </Field>
          <Field label="Mensagem inicial">
            <input
              className="matrix-input"
              value={config.whatsapp.message}
              onChange={(event) => patch("whatsapp", { message: event.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Topo da página">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Etiqueta">
            <input
              className="matrix-input"
              value={config.hero.badge}
              onChange={(event) => patch("hero", { badge: event.target.value })}
            />
          </Field>
          <Field label="Título — início">
            <input
              className="matrix-input"
              value={config.hero.titleLead}
              onChange={(event) => patch("hero", { titleLead: event.target.value })}
            />
          </Field>
          <Field label="Título — parte destacada">
            <input
              className="matrix-input"
              value={config.hero.titleHighlight}
              onChange={(event) => patch("hero", { titleHighlight: event.target.value })}
            />
          </Field>
          <Field label="Botão principal">
            <input
              className="matrix-input"
              value={config.hero.ctaPrimary}
              onChange={(event) => patch("hero", { ctaPrimary: event.target.value })}
            />
          </Field>
          <Field label="Botão secundário">
            <input
              className="matrix-input"
              value={config.hero.ctaSecondary}
              onChange={(event) => patch("hero", { ctaSecondary: event.target.value })}
            />
          </Field>
        </div>
        <Field label="Texto de apoio">
          <textarea
            className="matrix-input min-h-24 py-3"
            value={config.hero.subtitle}
            onChange={(event) => patch("hero", { subtitle: event.target.value })}
          />
        </Field>
        <Lines
          label="Selos de confiança"
          value={config.hero.badges}
          onChange={(badges) => patch("hero", { badges })}
        />
      </Card>

      <Card title="Comparativo (antes e depois)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Título da coluna da esquerda">
            <input
              className="matrix-input"
              value={config.pain.leftTitle}
              onChange={(event) => patch("pain", { leftTitle: event.target.value })}
            />
          </Field>
          <Field label="Título da coluna da direita">
            <input
              className="matrix-input"
              value={config.pain.rightTitle}
              onChange={(event) => patch("pain", { rightTitle: event.target.value })}
            />
          </Field>
        </div>
        <Lines
          label="Itens da esquerda"
          value={config.pain.leftItems}
          onChange={(leftItems) => patch("pain", { leftItems })}
        />
        <Lines
          label="Itens da direita"
          value={config.pain.rightItems}
          onChange={(rightItems) => patch("pain", { rightItems })}
        />
      </Card>

      <Card title="Benefícios">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Etiqueta">
            <input
              className="matrix-input"
              value={config.features.eyebrow}
              onChange={(event) => patch("features", { eyebrow: event.target.value })}
            />
          </Field>
          <Field label="Título">
            <input
              className="matrix-input"
              value={config.features.title}
              onChange={(event) => patch("features", { title: event.target.value })}
            />
          </Field>
        </div>
        {config.features.items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-[#241315] p-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
              <input
                className="matrix-input"
                value={item.title}
                onChange={(event) => {
                  const items = [...config.features.items];
                  items[index] = { ...item, title: event.target.value };
                  patch("features", { items });
                }}
              />
              <input
                className="matrix-input"
                value={item.text}
                onChange={(event) => {
                  const items = [...config.features.items];
                  items[index] = { ...item, text: event.target.value };
                  patch("features", { items });
                }}
              />
              <button
                onClick={() =>
                  patch("features", {
                    items: config.features.items.filter((_, i) => i !== index),
                  })
                }
                className="grid size-11 place-items-center rounded-xl border border-[#2a1416] text-[#9aa1a9] transition hover:border-red-500/60 hover:text-red-300"
                aria-label="Remover benefício"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            patch("features", {
              items: [...config.features.items, { title: "Novo benefício", text: "Descrição." }],
            })
          }
          className="flex h-11 items-center gap-2 rounded-xl border border-[#2a1416] px-4 text-sm text-[#c8ccd2] transition hover:border-[#ff2a20]/60 hover:text-[#ff2a20]"
        >
          <Plus className="size-4" />
          Adicionar benefício
        </button>
      </Card>

      <Card title="Como funciona">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Etiqueta">
            <input
              className="matrix-input"
              value={config.howItWorks.eyebrow}
              onChange={(event) => patch("howItWorks", { eyebrow: event.target.value })}
            />
          </Field>
          <Field label="Título">
            <input
              className="matrix-input"
              value={config.howItWorks.title}
              onChange={(event) => patch("howItWorks", { title: event.target.value })}
            />
          </Field>
        </div>
        <Field label="Subtítulo">
          <input
            className="matrix-input"
            value={config.howItWorks.subtitle}
            onChange={(event) => patch("howItWorks", { subtitle: event.target.value })}
          />
        </Field>
        {config.howItWorks.steps.map((step, index) => (
          <div key={index} className="grid gap-3 sm:grid-cols-[80px_1fr_2fr]">
            <input
              className="matrix-input"
              value={step.number}
              onChange={(event) => {
                const steps = [...config.howItWorks.steps];
                steps[index] = { ...step, number: event.target.value };
                patch("howItWorks", { steps });
              }}
            />
            <input
              className="matrix-input"
              value={step.title}
              onChange={(event) => {
                const steps = [...config.howItWorks.steps];
                steps[index] = { ...step, title: event.target.value };
                patch("howItWorks", { steps });
              }}
            />
            <input
              className="matrix-input"
              value={step.text}
              onChange={(event) => {
                const steps = [...config.howItWorks.steps];
                steps[index] = { ...step, text: event.target.value };
                patch("howItWorks", { steps });
              }}
            />
          </div>
        ))}
      </Card>

      <Card title="Depoimentos" subtitle="Conteúdo fictício usado como prova social.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Etiqueta">
            <input
              className="matrix-input"
              value={config.testimonials.eyebrow}
              onChange={(event) => patch("testimonials", { eyebrow: event.target.value })}
            />
          </Field>
          <Field label="Título">
            <input
              className="matrix-input"
              value={config.testimonials.title}
              onChange={(event) => patch("testimonials", { title: event.target.value })}
            />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {config.testimonials.stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <input
                className="matrix-input"
                value={stat.value}
                onChange={(event) => {
                  const stats = [...config.testimonials.stats];
                  stats[index] = { ...stat, value: event.target.value };
                  patch("testimonials", { stats });
                }}
              />
              <input
                className="matrix-input"
                value={stat.label}
                onChange={(event) => {
                  const stats = [...config.testimonials.stats];
                  stats[index] = { ...stat, label: event.target.value };
                  patch("testimonials", { stats });
                }}
              />
            </div>
          ))}
        </div>
        {config.testimonials.items.map((item, index) => (
          <div key={index} className="grid gap-3 rounded-2xl border border-[#241315] p-4 sm:grid-cols-[1fr_1fr_2fr_auto]">
            <input
              className="matrix-input"
              value={item.name}
              onChange={(event) => {
                const items = [...config.testimonials.items];
                items[index] = { ...item, name: event.target.value };
                patch("testimonials", { items });
              }}
            />
            <input
              className="matrix-input"
              value={item.role}
              onChange={(event) => {
                const items = [...config.testimonials.items];
                items[index] = { ...item, role: event.target.value };
                patch("testimonials", { items });
              }}
            />
            <input
              className="matrix-input"
              value={item.text}
              onChange={(event) => {
                const items = [...config.testimonials.items];
                items[index] = { ...item, text: event.target.value };
                patch("testimonials", { items });
              }}
            />
            <button
              onClick={() =>
                patch("testimonials", {
                  items: config.testimonials.items.filter((_, i) => i !== index),
                })
              }
              className="grid size-11 place-items-center rounded-xl border border-[#2a1416] text-[#9aa1a9] transition hover:border-red-500/60 hover:text-red-300"
              aria-label="Remover depoimento"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            patch("testimonials", {
              items: [
                ...config.testimonials.items,
                { name: "Novo cliente", role: "Cidade, UF", text: "Depoimento." },
              ],
            })
          }
          className="flex h-11 items-center gap-2 rounded-xl border border-[#2a1416] px-4 text-sm text-[#c8ccd2] transition hover:border-[#ff2a20]/60 hover:text-[#ff2a20]"
        >
          <Plus className="size-4" />
          Adicionar depoimento
        </button>
      </Card>

      <Card title="Planos e valores">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Etiqueta">
            <input
              className="matrix-input"
              value={config.pricing.eyebrow}
              onChange={(event) => patch("pricing", { eyebrow: event.target.value })}
            />
          </Field>
          <Field label="Título">
            <input
              className="matrix-input"
              value={config.pricing.title}
              onChange={(event) => patch("pricing", { title: event.target.value })}
            />
          </Field>
          <Field label="Subtítulo">
            <input
              className="matrix-input"
              value={config.pricing.subtitle}
              onChange={(event) => patch("pricing", { subtitle: event.target.value })}
            />
          </Field>
          <Field label="Observação abaixo dos planos">
            <input
              className="matrix-input"
              value={config.pricing.note}
              onChange={(event) => patch("pricing", { note: event.target.value })}
            />
          </Field>
        </div>

        {config.pricing.plans.map((plan, index) => (
          <div key={plan.id} className="space-y-3 rounded-2xl border border-[#241315] p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Nome">
                <input
                  className="matrix-input"
                  value={plan.name}
                  onChange={(event) => {
                    const plans = [...config.pricing.plans];
                    plans[index] = { ...plan, name: event.target.value };
                    patch("pricing", { plans });
                  }}
                />
              </Field>
              <Field label="Valor">
                <input
                  className="matrix-input"
                  value={plan.price}
                  onChange={(event) => {
                    const plans = [...config.pricing.plans];
                    plans[index] = { ...plan, price: event.target.value };
                    patch("pricing", { plans });
                  }}
                />
              </Field>
              <Field label="Período">
                <input
                  className="matrix-input"
                  value={plan.period}
                  onChange={(event) => {
                    const plans = [...config.pricing.plans];
                    plans[index] = { ...plan, period: event.target.value };
                    patch("pricing", { plans });
                  }}
                />
              </Field>
            </div>
            <Field label="Descrição">
              <input
                className="matrix-input"
                value={plan.description}
                onChange={(event) => {
                  const plans = [...config.pricing.plans];
                  plans[index] = { ...plan, description: event.target.value };
                  patch("pricing", { plans });
                }}
              />
            </Field>
            <Lines
              label="Itens inclusos"
              value={plan.benefits}
              onChange={(benefits) => {
                const plans = [...config.pricing.plans];
                plans[index] = { ...plan, benefits };
                patch("pricing", { plans });
              }}
            />
            <label className="flex items-center gap-2 text-sm text-[#c8ccd2]">
              <input
                type="checkbox"
                checked={plan.featured}
                onChange={(event) => {
                  const plans = config.pricing.plans.map((current, i) => ({
                    ...current,
                    featured: i === index ? event.target.checked : false,
                  }));
                  patch("pricing", { plans });
                }}
              />
              Destacar como “Mais vendido”
            </label>
          </div>
        ))}
      </Card>

      <Card title="Dúvidas frequentes">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Etiqueta">
            <input
              className="matrix-input"
              value={config.faq.eyebrow}
              onChange={(event) => patch("faq", { eyebrow: event.target.value })}
            />
          </Field>
          <Field label="Título">
            <input
              className="matrix-input"
              value={config.faq.title}
              onChange={(event) => patch("faq", { title: event.target.value })}
            />
          </Field>
        </div>
        {config.faq.items.map((item, index) => (
          <div key={index} className="grid gap-3 rounded-2xl border border-[#241315] p-4 sm:grid-cols-[1fr_2fr_auto]">
            <input
              className="matrix-input"
              value={item.q}
              onChange={(event) => {
                const items = [...config.faq.items];
                items[index] = { ...item, q: event.target.value };
                patch("faq", { items });
              }}
            />
            <textarea
              className="matrix-input min-h-20 py-3"
              value={item.a}
              onChange={(event) => {
                const items = [...config.faq.items];
                items[index] = { ...item, a: event.target.value };
                patch("faq", { items });
              }}
            />
            <button
              onClick={() => patch("faq", { items: config.faq.items.filter((_, i) => i !== index) })}
              className="grid size-11 place-items-center rounded-xl border border-[#2a1416] text-[#9aa1a9] transition hover:border-red-500/60 hover:text-red-300"
              aria-label="Remover pergunta"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            patch("faq", { items: [...config.faq.items, { q: "Nova pergunta", a: "Resposta." }] })
          }
          className="flex h-11 items-center gap-2 rounded-xl border border-[#2a1416] px-4 text-sm text-[#c8ccd2] transition hover:border-[#ff2a20]/60 hover:text-[#ff2a20]"
        >
          <Plus className="size-4" />
          Adicionar pergunta
        </button>
      </Card>

      <Card title="Chamada final e rodapé">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Título da chamada final">
            <input
              className="matrix-input"
              value={config.finalCta.title}
              onChange={(event) => patch("finalCta", { title: event.target.value })}
            />
          </Field>
          <Field label="Botão">
            <input
              className="matrix-input"
              value={config.finalCta.button}
              onChange={(event) => patch("finalCta", { button: event.target.value })}
            />
          </Field>
        </div>
        <Field label="Texto da chamada final">
          <textarea
            className="matrix-input min-h-20 py-3"
            value={config.finalCta.text}
            onChange={(event) => patch("finalCta", { text: event.target.value })}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Rodapé — texto">
            <input
              className="matrix-input"
              value={config.footer.text}
              onChange={(event) => patch("footer", { text: event.target.value })}
            />
          </Field>
          <Field label="Rodapé — frase final">
            <input
              className="matrix-input"
              value={config.footer.tagline}
              onChange={(event) => patch("footer", { tagline: event.target.value })}
            />
          </Field>
        </div>
      </Card>

      <Card title="Avisos de compra" subtitle="Avisos fictícios exibidos no canto da tela.">
        <label className="flex items-center gap-2 text-sm text-[#c8ccd2]">
          <input
            type="checkbox"
            checked={config.socialProof.enabled}
            onChange={(event) => patch("socialProof", { enabled: event.target.checked })}
          />
          Mostrar avisos na página inicial
        </label>
        <Lines
          label="Nomes"
          value={config.socialProof.names}
          onChange={(names) => patch("socialProof", { names })}
        />
        <Lines
          label="Cidades"
          value={config.socialProof.cities}
          onChange={(cities) => patch("socialProof", { cities })}
        />
      </Card>

      <Card title="Busca no Google" subtitle="Título e descrição exibidos nos resultados.">
        <Field label="Título">
          <input
            className="matrix-input"
            value={config.seo.title}
            onChange={(event) => patch("seo", { title: event.target.value })}
          />
        </Field>
        <Field label="Descrição">
          <textarea
            className="matrix-input min-h-20 py-3"
            value={config.seo.description}
            onChange={(event) => patch("seo", { description: event.target.value })}
          />
        </Field>
      </Card>
    </div>
  );
}
