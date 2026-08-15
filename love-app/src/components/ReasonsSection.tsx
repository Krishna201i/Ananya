"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ReasonsSection() {
  const [headingText, setHeadingText] = useState("");
  const fullText = "Reasons Why I Love You ❤️";

  const reasons = [
    {
      num: "01",
      title: "Your Kindness & Warmth",
      desc: "The gentle way you treat everyone around you and how effortless you make it to feel safe, loved, and completely understood.",
    },
    {
      num: "02",
      title: "That Breathtaking Smile",
      desc: "A single glance at your laughing face can erase my darkest days and instantly fill my heart with overwhelming warmth.",
    },
    {
      num: "03",
      title: "Your Gentle Soul",
      desc: "Your profound empathy, quiet strength, and how deeply you care for the beauty in this world inspire me every single day.",
    },
    {
      num: "04",
      title: "Our Shared Laughter",
      desc: "The endless inside jokes, silly late-night giggles, and spontaneous moments of pure, unadulterated happiness we share.",
    },
    {
      num: "05",
      title: "How You Support My Dreams",
      desc: "You are my grandest cheerleader, believing in me even when I doubt myself and giving me the courage to reach higher.",
    },
    {
      num: "06",
      title: "Simply Being You",
      desc: "Because in a world full of temporary things, your love is my eternal sanctuary, my home, and my greatest blessing.",
    },
  ];

  return (
    <section id="reasons" className="relative py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-sans text-xs font-semibold tracking-[4px] text-[#d4af6a] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(212,175,106,0.35)]">
          COUNTLESS WAYS
        </span>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => {
            let idx = 0;
            const timer = setInterval(() => {
              setHeadingText(fullText.slice(0, idx + 1));
              idx++;
              if (idx >= fullText.length) clearInterval(timer);
            }, 75);
          }}
          className="font-serif text-4xl md:text-5xl text-[#f5edeb] min-h-[60px]"
        >
          {headingText}
          <span className="inline-block w-0.5 h-8 bg-[#e8305a] ml-1 animate-pulse" />
        </motion.h2>
      </div>

      <div className="flex flex-col gap-7">
        {reasons.map((item, idx) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: idx * 0.15,
              type: "spring",
              stiffness: 100,
            }}
            className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-3xl glass-card hover:border-[#e8305a]/50 hover:shadow-[0_25px_50px_rgba(232,48,90,0.25)] transition-all duration-400"
          >
            <span className="font-serif text-5xl md:text-6xl font-bold text-[#d4af6a]/25 group-hover:text-[#e8305a] group-hover:drop-shadow-[0_0_25px_rgba(232,48,90,0.6)] min-w-[90px] transition-colors duration-400">
              {item.num}
            </span>

            <div className="flex-1">
              <h3 className="font-serif italic text-2xl md:text-3xl text-[#f3e5ab] mb-2">
                {item.title}
              </h3>
              <p className="text-[#c4b0b7] text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
