"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AuroraVariant = "default" | "sunset" | "ocean" | "forest" | "lavender" | "ember" | "ice" | "custom";

interface AuroraBackgroundProps {
  className?: string;
  variant?: AuroraVariant;
  colors?: [string, string, string];
  speed?: number;
  blobCount?: number;
  children?: React.ReactNode;
  childrenClassName?: string;
}

const VARIANTS: Record<AuroraVariant, [string, string, string][]> = {
  custom: [],
  default: [
    ["hsla(220, 100%, 50%, 0.6)", "hsla(210, 100%, 60%, 0.3)", "transparent"],
    ["hsla(200, 100%, 40%, 0.5)", "transparent", "transparent"],
  ],
  ember: [
    ["hsla(25, 95%, 55%, 0.5)", "hsla(0, 90%, 50%, 0.3)", "transparent"],
    ["hsla(45, 90%, 60%, 0.4)", "transparent", "transparent"],
  ],
  forest: [
    ["hsla(145, 60%, 45%, 0.45)", "hsla(165, 55%, 40%, 0.25)", "transparent"],
    ["hsla(120, 65%, 50%, 0.35)", "transparent", "transparent"],
  ],
  ice: [
    ["hsla(200, 70%, 75%, 0.4)", "hsla(220, 60%, 85%, 0.25)", "transparent"],
    ["hsla(180, 65%, 80%, 0.35)", "transparent", "transparent"],
  ],
  lavender: [
    ["hsla(270, 70%, 65%, 0.45)", "hsla(300, 60%, 55%, 0.25)", "transparent"],
    ["hsla(240, 75%, 70%, 0.35)", "transparent", "transparent"],
  ],
  ocean: [
    ["hsla(195, 80%, 50%, 0.45)", "hsla(220, 70%, 45%, 0.25)", "transparent"],
    ["hsla(170, 75%, 55%, 0.35)", "transparent", "transparent"],
  ],
  sunset: [
    ["hsla(15, 90%, 65%, 0.5)", "hsla(350, 80%, 55%, 0.3)", "transparent"],
    ["hsla(45, 95%, 60%, 0.4)", "transparent", "transparent"],
  ],
};

export function AuroraBackground({
  className,
  variant = "default",
  colors,
  speed = 1,
  blobCount = 5,
  children,
  childrenClassName,
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const palette =
      variant === "custom" && colors
        ? [
            [colors[0], colors[1], colors[2]],
            [colors[0], "transparent", "transparent"],
          ]
        : VARIANTS[variant];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    const animate = () => {
      timeRef.current += 0.01 * speed;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < blobCount; i++) {
        const layer = palette[i % palette.length];
        if (!layer) {
          continue;
        }
        const [c1, c2, c3] = layer;
        const phase = (i / blobCount) * Math.PI * 2 + t;
        const x = w / 2 + Math.sin(phase) * (w * 0.2) + Math.cos(t * 0.5) * (w * 0.1);
        const y = h / 2 + Math.cos(phase * 0.7) * (h * 0.2) + Math.sin(t * 0.3) * (h * 0.1);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(w, h) * 0.4);
        gradient.addColorStop(0, c1 ?? "transparent");
        gradient.addColorStop(0.5, c2 ?? "transparent");
        gradient.addColorStop(1, c3 ?? "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < Math.min(2, palette.length); i++) {
        const layer = palette[i];
        if (!layer) {
          continue;
        }
        const phase = (i / 2) * Math.PI + t * 0.8;
        const x = w / 2 + Math.sin(phase * 1.2) * (w * 0.15);
        const y = h / 2 + Math.cos(phase * 0.9) * (h * 0.15);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(w, h) * 0.35);
        gradient.addColorStop(0, layer[0] ?? "transparent");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [variant, colors, speed, blobCount]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {children && <div className={cn("relative z-10", childrenClassName)}>{children}</div>}
    </div>
  );
}

export default AuroraBackground;
