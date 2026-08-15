"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 300 Stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: ["#ffffff", "#ffd700", "#ffb6c1", "#f0e6df"][
        Math.floor(Math.random() * 4)
      ],
    }));

    // 15 Faint Drifting Background Hearts
    const bgHearts = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 15,
      speed: Math.random() * 0.5 + 0.3,
      alpha: Math.random() * 0.12 + 0.05,
      swing: Math.random() * 2 + 1,
      step: Math.random() * 100,
    }));

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#e8305a";
      ctx.beginPath();
      const d = size;
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - d / 2, y - d / 2, x - d, y + d / 3, x, y + d);
      ctx.bezierCurveTo(x + d, y + d / 3, x + d / 2, y - d / 2, x, y);
      ctx.fill();
      ctx.restore();
    };

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.1) s.speed = -s.speed;
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      bgHearts.forEach((h) => {
        h.step += 0.02;
        h.y -= h.speed;
        h.x += Math.sin(h.step) * h.swing;

        if (h.y < -50) {
          h.y = height + 50;
          h.x = Math.random() * width;
        }
        drawHeart(h.x, h.y, h.size, h.alpha);
      });

      animId = requestAnimationFrame(render);
    };
    render();

    // Continuous Floating Rose Petals & Emoji Hearts
    const container = containerRef.current;
    let petalInterval: NodeJS.Timeout;
    let heartInterval: NodeJS.Timeout;

    if (container) {
      petalInterval = setInterval(() => {
        const petal = document.createElement("div");
        petal.className = "floating-petal";
        const size = Math.random() * 18 + 12;
        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.3}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.setProperty("--drift", `${Math.random() * 200 - 100}px`);
        petal.style.animationDuration = `${Math.random() * 6 + 8}s`;

        container.appendChild(petal);
        setTimeout(() => petal.remove(), 14000);
      }, 900);

      const heartEmojis = ["❤️", "💕", "💖", "💗", "💝"];
      heartInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.innerText =
          heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.setProperty("--size", `${Math.random() * 1.5 + 1}rem`);
        heart.style.setProperty("--opacity", `${Math.random() * 0.5 + 0.4}`);
        heart.style.setProperty(
          "--spin",
          `${Math.random() * 360 - 180}deg`
        );
        heart.style.animationDuration = `${Math.random() * 5 + 7}s`;

        container.appendChild(heart);
        setTimeout(() => heart.remove(), 12000);
      }, 1400);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (petalInterval) clearInterval(petalInterval);
      if (heartInterval) clearInterval(heartInterval);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[-2]"
      />
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]"
        id="floating-container"
      />
    </>
  );
}
