"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const springConfig = { damping: 25, stiffness: 250 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (Math.random() < 0.4) {
        spawnSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ringX, ringY]);

  const spawnSparkle = (x: number, y: number) => {
    const sparkle = document.createElement("div");
    sparkle.className = "cursor-sparkle";
    sparkle.innerText = Math.random() > 0.5 ? "🌸" : "✨";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 40 + 10;
    sparkle.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    sparkle.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  };

  return (
    <>
      {/* Heart Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 text-lg drop-shadow-[0_0_8px_#e8305a] transition-transform duration-75"
        style={{ left: mousePos.x, top: mousePos.y }}
      >
        ❤️
      </div>

      {/* Trailing Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] w-10 h-10 border border-[#d4af6a] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(212,175,106,0.35),inset_0_0_10px_rgba(212,175,106,0.35)]"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
