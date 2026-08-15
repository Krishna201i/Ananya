"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function PromisesSection() {
  const promises = [
    {
      icon: "🌹",
      title: "To Always Listen",
      text: "I promise to hear you with an open heart, cherish your feelings, and remain your safest shelter in any storm.",
    },
    {
      icon: "💫",
      title: "To Stand By You",
      text: "Through life's highest peaks and lowest valleys, I will be your unwavering partner, your rock, and your companion.",
    },
    {
      icon: "✨",
      title: "To Never Stop Courting You",
      text: "I promise to keep falling in love with you every single day, bringing romance, surprises, and joy to your life.",
    },
    {
      icon: "💖",
      title: "To Cherish Your Dreams",
      text: "I promise to honor your ambitions, nurture your passions, and celebrate every one of your victories as if it were my own.",
    },
    {
      icon: "🔒",
      title: "To Protect Our Love",
      text: "I will guard our relationship with loyalty, honesty, and tender respect through every milestone of our lives.",
    },
    {
      icon: "♾️",
      title: "To Love You Endlessly",
      text: "Above all else, I promise to love you fiercely, unconditionally, and devotedly — today, tomorrow, and forever.",
    },
  ];

  return (
    <section id="promises" className="relative py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-sans text-xs font-semibold tracking-[4px] text-[#d4af6a] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(212,175,106,0.35)]">
          ETERNAL VOWS
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-[#f5edeb]">
          My Sacred <span className="font-script text-[#e8305a] text-1.25em drop-shadow-[0_0_15px_rgba(232,48,90,0.4)]">Promises</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
        {promises.map((item, idx) => (
          <PromiseCard key={idx} item={item} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function PromiseCard({
  item,
  idx,
}: {
  item: { icon: string; title: string; text: string };
  idx: number;
}) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 15, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: idx * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      className="group relative p-10 rounded-3xl glass-card overflow-hidden transition-all duration-300"
    >
      {/* Dynamic Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(232,48,90,0.18) 0%, transparent 60%)`,
        }}
      />

      <span className="text-4xl mb-4 block drop-shadow-[0_0_10px_rgba(232,48,90,0.4)]">
        {item.icon}
      </span>
      <h3 className="font-serif italic text-2xl text-[#f3e5ab] mb-3">
        {item.title}
      </h3>
      <p className="text-[#c4b0b7] text-base leading-relaxed">{item.text}</p>
    </motion.div>
  );
}
