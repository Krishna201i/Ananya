"use client";

import { motion } from "framer-motion";

export default function PoemSection() {
  const poemLines = [
    "In a sky full of stars, your light shines the brightest,",
    "In a world of noise, your voice is my peace.",
    "With every heartbeat, my love grows deeper,",
    "A timeless romance that never will cease.",
    "Hand in hand, through all of life's seasons,",
    "You are my destiny, my purpose, my home.",
  ];

  return (
    <section id="poem" className="relative py-24 px-6 max-w-4xl mx-auto">
      <div className="relative bg-[radial-gradient(circle_at_center,rgba(232,48,90,0.15)_0%,rgba(10,0,8,0.95)_75%)] border border-[#e8305a]/20 rounded-[36px] p-8 md:p-16 text-center shadow-[0_0_60px_rgba(232,48,90,0.15)] overflow-hidden">
        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#d4af6a] text-xl tracking-[12px] mb-10"
        >
          ✦ ✦ ✦
        </motion.div>

        {/* Poem Lines */}
        <div className="flex flex-col gap-6 mb-12">
          {poemLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.4 }}
              className="font-serif italic text-xl md:text-3xl text-[#f5edeb] leading-relaxed"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Sign-off */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: poemLines.length * 0.4 }}
          className="font-script text-4xl md:text-5xl text-[#e8305a] drop-shadow-[0_0_20px_rgba(232,48,90,0.6)] animate-pulse"
        >
          — yours, completely
        </motion.div>
      </div>
    </section>
  );
}
