import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { NeoAvatar } from "@/components/NeoAvatar";
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

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const chars =
      "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas fixed inset-0 z-0 opacity-40 pointer-events-none"
    />
  );
}

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
    <main className="relative flex min-h-screen items-center justify-center bg-black px-4 py-10 overflow-hidden font-mono">
      <MatrixRain />
      <div className="relative z-10 animate-fade-in-up w-full max-w-md rounded-2xl border border-[#00ff41]/40 bg-black/80 p-8 shadow-[0_0_25px_rgba(0,255,65,0.25)] backdrop-blur-sm sm:p-10">
        <div className="stagger-1 flex flex-col items-center text-center">
          <NeoAvatar size={80} className="mx-auto mb-1" />
          <span className="matrix-glow mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#00ff41]">
            BlackShark
          </span>
        </div>

        <div className="stagger-2 mt-6 text-center">
          <h1 className="matrix-glow text-2xl font-bold tracking-tight text-[#00ff41] sm:text-3xl">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm text-[#00ff41]/70">
            Autentique-se com sua senha de administrador para acessar o painel de licenças.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div className="stagger-3 space-y-2">
            <label htmlFor="password" className="block text-xs font-medium uppercase tracking-widest text-[#00ff41]/80">
              Senha
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#00ff41]/70 transition-colors peer-focus:text-[#00ff41]" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                disabled={loading}
                aria-invalid={!!error}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="matrix-input peer h-11 rounded-xl pl-9 pr-10 font-mono text-[#00ff41] placeholder:text-[#00ff41]/40 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#00ff41]/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00ff41]/70 transition-colors hover:text-[#00ff41]"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p role="alert" aria-live="polite" className="animate-shake text-sm font-medium text-red-500">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="stagger-4 h-11 w-full rounded-xl border border-[#00ff41]/60 bg-black text-sm font-semibold tracking-wide text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00ff41]/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] active:translate-y-0 disabled:opacity-70"
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

        <p className="stagger-5 mt-6 border-t border-[#00ff41]/20 pt-4 text-center text-xs text-[#00ff41]/60">
          Acesso provisório: <span className="font-medium text-[#00ff41]">admin1234</span>
        </p>
      </div>
    </main>
  );
}
