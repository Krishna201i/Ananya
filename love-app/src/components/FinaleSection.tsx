"use client";

import { motion } from "framer-motion";
import { Sparkles, Camera } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

interface FinaleSectionProps {
  polaroidPhotos: Record<string, string>;
  onOpenUpload: (slotKey: string) => void;
}

export default function FinaleSection({
  polaroidPhotos,
  onOpenUpload,
}: FinaleSectionProps) {
  const [gfName, setGfName] = useState("Annanya ❤️");

  useEffect(() => {
    const saved = localStorage.getItem("gf_name");
    if (saved) setGfName(saved);
  }, []);

  const handleNameBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const val = e.currentTarget.innerText;
    setGfName(val);
    localStorage.setItem("gf_name", val);
  };

  const triggerFireworks = () => {
    const flash = document.getElementById("flash-overlay");
    if (flash) {
      flash.style.opacity = "0.08";
      setTimeout(() => (flash.style.opacity = "0"), 120);
    }

    const count = 220;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#c9536f", "#f0a63c", "#ffd9a0", "#7a2452", "#ffffff"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    const emojis = ["❤️", "💕", "⭐", "✨", "🌸", "💖", "🎉", "🎊", "🌹", "💫"];
    const burstCenters = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.4 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 },
    ];

    burstCenters.forEach((center) => {
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 2;
        const emojiEl = document.createElement("div");
        emojiEl.style.position = "fixed";
        emojiEl.style.left = `${center.x}px`;
        emojiEl.style.top = `${center.y}px`;
        emojiEl.style.fontSize = `${Math.random() * 1.2 + 1}rem`;
        emojiEl.style.pointerEvents = "none";
        emojiEl.style.zIndex = "99988";
        emojiEl.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emojiEl.style.transition =
          "transform 1.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.8s ease";

        document.body.appendChild(emojiEl);

        setTimeout(() => {
          const tx = Math.cos(angle) * (speed * 30);
          const ty = Math.sin(angle) * (speed * 30) + 40;
          emojiEl.style.transform = `translate(${tx}px, ${ty}px) scale(1.4) rotate(${
            Math.random() * 360
          }deg)`;
          emojiEl.style.opacity = "0";
        }, 20);

        setTimeout(() => emojiEl.remove(), 1900);
      }
    });

    const floatingContainer = document.getElementById("floating-container");
    if (floatingContainer) {
      for (let i = 0; i < 35; i++) {
        setTimeout(() => {
          const heart = document.createElement("div");
          heart.className = "floating-heart";
          heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
          heart.style.left = `${Math.random() * 100}vw`;
          heart.style.setProperty("--size", `${Math.random() * 2 + 1.2}rem`);
          heart.style.setProperty("--opacity", "0.9");
          heart.style.setProperty(
            "--spin",
            `${Math.random() * 720 - 360}deg`
          );
          heart.style.animationDuration = `${Math.random() * 3 + 4}s`;

          floatingContainer.appendChild(heart);
          setTimeout(() => heart.remove(), 7000);
        }, i * 80);
      }
    }
  };

  const polaroids = [
    { key: "polaroid-1", rot: "-rotate-6", title: "Annanya's Smile 📸" },
    { key: "polaroid-2", rot: "rotate-3", title: "Our Bike Ride 💖" },
    { key: "polaroid-3", rot: "-rotate-3", title: "Mahashivratri 🌹" },
    { key: "polaroid-4", rot: "rotate-6", title: "Forever Together ✨" },
  ];

  return (
    <section id="finale" className="relative py-28 px-6 text-center">
      {/* 4 Polaroid Photo Frames */}
      <div className="flex justify-center flex-wrap gap-8 mb-16">
        {polaroids.map((p, idx) => {
          const imgSrc = polaroidPhotos[p.key];
          return (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ scale: 1.1, rotate: 0, zIndex: 20 }}
              onClick={() => onOpenUpload(p.key)}
              className={`bg-[#fdfbf7] p-3 pb-8 rounded shadow-[0_15px_35px_rgba(0,0,0,0.7)] w-48 cursor-pointer transition-all duration-300 relative ${p.rot}`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/25 backdrop-blur-sm border border-white/40 shadow-sm" />

              <div className="w-full h-44 bg-[#1c0a1e] border border-dashed border-[#f0a63c]/40 flex items-center justify-center overflow-hidden">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={p.key}
                    className="w-full h-full object-cover sepia-[0.2] saturate-[1.2]"
                  />
                ) : (
                  <div className="text-[#f0a63c] text-xs text-center p-2 flex flex-col items-center gap-1">
                    <Camera className="w-5 h-5 text-[#f0a63c]" />
                    <span>{p.title}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Massive Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.2, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 14,
          delay: 0.4,
        }}
        onViewportEnter={() => triggerFireworks()}
        className="font-script text-7xl md:text-9xl lg:text-[11rem] text-[#c9536f] leading-none mb-2 drop-shadow-[0_0_35px_rgba(201,83,111,0.6)]"
      >
        I Love You
      </motion.h1>

      <p className="font-serif italic text-2xl md:text-4xl text-[#ffd9a0] mb-4">
        now, then, and always
      </p>

      {/* Editable Name */}
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={handleNameBlur}
        title="Click to edit name"
        className="font-script text-4xl md:text-5xl text-[#f0a63c] mb-2 inline-block outline-none cursor-pointer border-b border-dashed border-transparent hover:border-[#f0a63c] transition-colors"
      >
        {gfName}
      </div>

      <p className="font-caveat text-3xl text-[#ffc2d1] mb-6">
        — Yours Always, Krishna
      </p>

      <div className="w-60 h-1 mx-auto mb-12 animate-gold-sweep shadow-[0_0_10px_#f0a63c]" />

      {/* Celebrate Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={triggerFireworks}
        className="relative bg-gradient-to-r from-[#c9536f] via-[#ff85a2] to-[#7a2452] border-2 border-[#f0a63c] text-white font-sans font-semibold text-lg tracking-widest uppercase px-12 py-5 rounded-full cursor-pointer shadow-[0_10px_30px_rgba(201,83,111,0.5),0_0_20px_rgba(240,166,60,0.4)] animate-pulse flex items-center gap-3 mx-auto"
      >
        <Sparkles className="w-5 h-5 text-[#ffd9a0]" />
        CELEBRATE OUR LOVE
        <Sparkles className="w-5 h-5 text-[#ffd9a0]" />
      </motion.button>
    </section>
  );
}
