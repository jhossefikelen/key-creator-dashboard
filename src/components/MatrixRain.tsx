import { useEffect, useRef } from "react";

export function MatrixRain({ opacity = 0.32 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const characters = "アイウエオカキクケコサシスセソタチツテト0123456789LUNAX";
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
      context.fillStyle = "rgba(1, 7, 3, 0.075)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let column = 0; column < columns; column += 1) {
        const character = characters[Math.floor(Math.random() * characters.length)];
        const y = drops[column]! * fontSize;
        context.fillStyle = Math.random() > 0.96 ? "#d7ffe3" : "#00ff66";
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ opacity }}
    />
  );
}
