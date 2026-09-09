import { useEffect, useRef } from "react";

type MatrixRainProps = {
  opacity?: number;
  /** cor principal da chuva */
  color?: string;
  /** cor dos clarões */
  highlight?: string;
  /** cor do rastro (fundo) */
  trail?: string;
};

export function MatrixRain({
  opacity = 0.32,
  color = "#e10600",
  highlight = "#f2f4f6",
  trail = "rgba(5, 5, 5, 0.08)",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const characters = "アイウエオカキクケコサシスセソタチツテト0123456789BLACKSHARK";
    const fontSize = 16;
    let frame = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -40));
    };

    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      context.fillStyle = trail;
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let column = 0; column < columns; column += 1) {
        const character = characters[Math.floor(Math.random() * characters.length)];
        const y = drops[column]! * fontSize;
        context.fillStyle = Math.random() > 0.96 ? highlight : color;
        context.fillText(character!, column * fontSize, y);
        if (y > window.innerHeight && Math.random() > 0.97) {
          drops[column] = Math.floor(Math.random() * -20);
        }
        drops[column]! += 1;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [color, highlight, trail]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
