"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

type PreloaderStage = "loading" | "ready" | "kissing" | "curtains";

interface KissParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  angle: number;
  distance: number;
  scale: number;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<PreloaderStage>("loading");
  const [kisses, setKisses] = useState<KissParticle[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setStage("ready");
          }, 400);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleKissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStage("kissing");

    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const emojis = ["💋", "😘", "💖", "✨", "🌹", "💝", "🌸", "💋"];
    const particles: KissParticle[] = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: startX,
      y: startY,
      emoji: emojis[i % emojis.length],
      angle: (i / 18) * Math.PI * 2 + (Math.random() * 0.5 - 0.25),
      distance: Math.random() * 320 + 180,
      scale: Math.random() * 1.5 + 1.8,
    }));
    setKisses(particles);

    // Part curtains after flying kiss explosion
    setTimeout(() => {
      setStage("curtains");
    }, 900);

    // Complete preloader and reveal main site
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  const isCurtains = (stage as string) === "curtains";

  return (
    <AnimatePresence>
      {!isCurtains && (
        <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden bg-[#1c0a1e]">
          {/* Left Curtain */}
          <motion.div
            animate={isCurtains ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#1c0a1e] via-[#2a0f2e] to-[#7a2452] border-r-4 border-[#f0a63c] z-[10] shadow-[25px_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between p-8"
          >
            <div className="w-full h-14 border-b border-[#f0a63c]/30" />
            <div className="w-full h-14 border-t border-[#f0a63c]/30" />
          </motion.div>

          {/* Right Curtain */}
          <motion.div
            animate={isCurtains ? { x: "100%" } : { x: "0%" }}
            transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#1c0a1e] via-[#2a0f2e] to-[#7a2452] border-l-4 border-[#f0a63c] z-[10] shadow-[-25px_0_60px_rgba(0,0,0,0.95)] flex flex-col justify-between p-8"
          >
            <div className="w-full h-14 border-b border-[#f0a63c]/30" />
            <div className="w-full h-14 border-t border-[#f0a63c]/30" />
          </motion.div>

          {/* Ambient Floating Glow Circles */}
          <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#c9536f]/20 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#f0a63c]/15 blur-3xl animate-pulse" />
          </div>

          {/* Center Stage Content */}
          <div className="relative z-[20] flex flex-col items-center justify-center text-center px-6 max-w-lg">
            {stage === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                {/* Glowing Heart & Flame Hybrid Icon */}
                <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#f0a63c]/20 blur-2xl animate-pulse" />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1, 1.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <svg
                      className="w-24 h-24 fill-[url(#roseGoldGrad)] filter drop-shadow-[0_0_25px_rgba(240,166,60,0.8)]"
                      viewBox="0 0 32 32"
                    >
                      <defs>
                        <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f0a63c" />
                          <stop offset="50%" stopColor="#c9536f" />
                          <stop offset="100%" stopColor="#ffd9a0" />
                        </linearGradient>
                      </defs>
                      <path d="M16 28.5S2 19.5 2 10.5C2 5.5 6 2 10.5 2c3 0 5.5 1.5 5.5 1.5S18.5 2 21.5 2C26 2 30 5.5 30 10.5c0 9-14 18-14 18z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Counter & Track */}
                <div className="font-yatra text-4xl text-[#ffd9a0] mb-3 tracking-wider drop-shadow-[0_0_15px_rgba(240,166,60,0.5)]">
                  {progress}%
                </div>

                <div className="w-72 h-2.5 bg-[#2a0f2e] rounded-full overflow-hidden mb-6 border border-[#f0a63c]/40 shadow-[0_0_20px_rgba(240,166,60,0.3)] p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#c9536f] via-[#ffc2d1] to-[#f0a63c] rounded-full shadow-[0_0_12px_#f0a63c]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>

                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="font-script text-3xl md:text-4xl text-[#ffd9a0] tracking-wide drop-shadow-[0_0_15px_rgba(240,166,60,0.5)]"
                >
                  Crafting a surprise for Annanya…
                </motion.p>
              </motion.div>
            )}

            {(stage === "ready" || stage === "kissing") && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="flex flex-col items-center"
              >
                <div className="font-yatra text-3xl md:text-5xl text-[#ffd9a0] mb-3 drop-shadow-[0_0_25px_rgba(240,166,60,0.6)]">
                  My Heart is Ready
                </div>
                <div className="font-script text-2xl md:text-4xl text-[#ffc2d1] mb-8 drop-shadow-[0_0_15px_rgba(201,83,111,0.5)] italic">
                  Blow a kiss to enter our universe
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleKissClick}
                  disabled={stage === "kissing"}
                  className="relative group bg-gradient-to-r from-[#c9536f] via-[#ff85a2] to-[#7a2452] border-2 border-[#f0a63c] text-white font-sans font-semibold text-base md:text-lg tracking-widest uppercase px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(201,83,111,0.7),0_0_35px_rgba(240,166,60,0.6)] flex items-center gap-4 cursor-pointer overflow-hidden"
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                    💋
                  </span>
                  <span className="font-sans font-bold">SEND A FLYING KISS</span>
                  <Sparkles className="w-5 h-5 text-[#ffd9a0] animate-spin" />
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Explosive Flying Kiss Particles */}
          {kisses.map((k) => {
            const tx = Math.cos(k.angle) * k.distance;
            const ty = Math.sin(k.angle) * k.distance - 120;
            return (
              <motion.div
                key={k.id}
                initial={{
                  x: k.x - window.innerWidth / 2,
                  y: k.y - window.innerHeight / 2,
                  scale: 0.4,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: (k.x - window.innerWidth / 2) + tx,
                  y: (k.y - window.innerHeight / 2) + ty,
                  scale: [0.4, k.scale, k.scale * 1.3],
                  opacity: [1, 1, 0],
                  rotate: [0, Math.random() * 90 - 45],
                }}
                transition={{ duration: 1.3, ease: "easeOut" }}
                className="fixed pointer-events-none z-[99998] text-5xl md:text-7xl filter drop-shadow-[0_0_35px_rgba(240,166,60,0.9)]"
              >
                {k.emoji}
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
