"use client";

import { motion } from "framer-motion";

export default function TimelineSection() {
  const milestones = [
    {
      date: "15 FEBRUARY · MAHASHIVRATRI",
      title: "The Day I Confessed My Heart",
      desc: "When I finally gathered the courage to tell you how deeply I love you. From that exact moment, my entire world changed in the most beautiful way.",
    },
    {
      date: "OUR UNFORGETTABLE BIKE RIDES",
      title: "Endless Roads & Warm Hugs",
      desc: "Riding into the open roads with no destination and no rush — just the cool breeze, us together, and you suddenly hugging me tight from behind.",
    },
    {
      date: "PLAYFUL MOMENTS",
      title: "Your Cute Tantrums & Daant",
      desc: "When you get adorably angry at my silly antics or scold me like a kid — it's secretly one of my favorite things in the world.",
    },
    {
      date: "MY SANCTUARY & PEACE",
      title: "More Than My Girlfriend",
      desc: "You are my best friend, my ultimate peace of mind, and my most cherished habit that makes every single day worth living.",
    },
    {
      date: "HAPPY BIRTHDAY ANNANYA",
      title: "The Promise of Forever",
      desc: "Thank you for being the most precious part of my life. I love you, Annanya — today, tomorrow, and through all of eternity.",
    },
  ];

  return (
    <section id="timeline" className="relative py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="font-sans text-xs font-semibold tracking-[4px] text-[#ffd9a0] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(240,166,60,0.35)]">
          OUR MEMORY MILESTONES
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-[#faf1e2]">
          Milestones of <span className="font-script text-[#c9536f] text-1.25em drop-shadow-[0_0_15px_rgba(201,83,111,0.5)]">Krishna & Annanya</span>
        </h2>
      </div>

      <div className="relative py-8">
        {/* Central Vertical Line */}
        <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#f0a63c] to-transparent shadow-[0_0_15px_#f0a63c]" />

        <div className="flex flex-col gap-12">
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.18 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Node Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 w-5 h-5 bg-[#c9536f] border-4 border-[#1c0a1e] rounded-full z-10 shadow-[0_0_15px_#c9536f] animate-pulse" />

                {/* Card Container */}
                <div
                  className={`pl-14 md:pl-0 w-full md:w-[45%] ${
                    isEven ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div className="p-8 rounded-3xl glass-card hover:border-[#c9536f]/60 transition-all">
                    <span className="font-sans text-xs font-semibold tracking-[2px] text-[#ffd9a0] uppercase block mb-2">
                      {item.date}
                    </span>
                    <h3 className="font-serif italic text-2xl text-[#faf1e2] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#ffc2d1]/80 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
