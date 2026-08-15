"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const ringX = useSpring(-100, springConfig);
  const ringY = useSpring(-100, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (Math.random() < 0.35) {
        spawnSparkle(e.clientX, e.clientY);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ringX, ringY, isVisible]);

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

  if (!isVisible) return null;

  return (
    <>
      {/* 3D Heart Glow Cursor - Rendered above preloader at z-[999999] */}
      <div
        className="fixed pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow-[0_0_12px_rgba(201,83,111,0.9)] select-none transition-transform duration-75"
        style={{ left: mousePos.x, top: mousePos.y }}
      >
        💖
      </div>

      {/* Trailing Gold Ring */}
      <motion.div
        className="fixed pointer-events-none z-[999998] w-10 h-10 border-2 border-[#f0a63c] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(240,166,60,0.6),inset_0_0_10px_rgba(240,166,60,0.4)] select-none"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
