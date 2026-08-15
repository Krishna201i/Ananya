"use client";

import { motion } from "framer-motion";
import { Sparkles, Shuffle, Grid, Camera } from "lucide-react";

interface HeroSectionProps {
  heroPhoto: string;
  onOpenUpload: () => void;
  onShuffle: () => void;
  onOpenVault: () => void;
}

export default function HeroSection({
  heroPhoto,
  onOpenUpload,
  onShuffle,
  onOpenVault,
}: HeroSectionProps) {
  const titleText = "Happy Birthday, Annanya";
  const subtitleText = "Ek diya... jo Mahashivratri ki us raat se, aaj tak mere dil mein jalta hi raha hai ✨";

  const letterVariants: any = {
    hidden: { opacity: 0, y: 80, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 12,
        delay: i * 0.06,
      },
    }),
  };

  const wordVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2 + i * 0.1,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 max-w-full overflow-hidden">
      {/* Background Photo Slot */}
      <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden">
        {heroPhoto ? (
          <img
            src={heroPhoto}
            alt="Annanya Backdrop"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-35 blur-[1px] saturate-[0.85] transition-opacity duration-800"
          />
        ) : (
          <div
            onClick={onOpenUpload}
            className="absolute inset-8 border-2 border-dashed border-[#f0a63c]/40 rounded-3xl flex flex-col items-center justify-center gap-3 text-[#ffd9a0] cursor-pointer hover:border-[#f0a63c] hover:text-[#f0a63c] hover:bg-[#c9536f]/15 transition-all duration-300 bg-[#2a0f2e]/60"
          >
            <Camera className="w-10 h-10 text-[#f0a63c]" />
            <span className="font-semibold text-lg">
              Add Annanya's photo — it will glow behind her title
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,15,46,0.35)_0%,rgba(28,10,30,0.95)_85%)] pointer-events-none" />
      </div>

      {/* Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-sans text-xs font-semibold tracking-[4px] text-[#ffd9a0] uppercase px-6 py-2 border border-[#f0a63c]/40 rounded-full bg-[#1c0a1e]/70 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(240,166,60,0.35)] flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-[#f0a63c]" />
        MAHASHIVRATRI · 15 FEBRUARY · FOR MY ANNANYA
        <Sparkles className="w-4 h-4 text-[#f0a63c]" />
      </motion.div>

      {/* Letter by Letter Title */}
      <h1 className="font-yatra text-4xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6df] via-[#ffd9a0] to-[#f0a63c] mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-wrap justify-center gap-x-3 gap-y-1">
        {titleText.split(" ").map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.split("").map((char, cIdx) => {
              const globalIdx =
                titleText
                  .split(" ")
                  .slice(0, wIdx)
                  .join("").length + cIdx;
              return (
                <motion.span
                  key={cIdx}
                  custom={globalIdx}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>

      {/* Elegant Subtitle with High Legibility & Gold Highlights */}
      <p className="font-serif italic text-xl md:text-3xl lg:text-4xl text-[#ffd9a0] mb-8 drop-shadow-[0_0_20px_rgba(240,166,60,0.35)] flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-4xl mx-auto leading-relaxed px-4">
        {subtitleText.split(" ").map((word, i) => {
          const isHighlight = ["diya", "mahashivratri", "jalta"].includes(word.toLowerCase().replace(/[^a-z]/g, ""));
          return (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`inline-block ${
                isHighlight
                  ? "text-[#f0a63c] font-script not-italic text-1.25em drop-shadow-[0_0_15px_rgba(240,166,60,0.6)] px-1"
                  : "text-[#faf1e2]"
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </p>

      {/* Gold Self-Drawing Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 280 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
        className="h-0.5 bg-gradient-to-r from-transparent via-[#f0a63c] to-transparent shadow-[0_0_15px_#f0a63c] mb-12"
      />

      {/* Action Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        <button
          onClick={onShuffle}
          className="flex items-center gap-2 bg-[#2a0f2e]/80 border border-[#f0a63c] text-[#ffd9a0] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-[#c9536f] hover:border-[#c9536f] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(240,166,60,0.35)] hover:shadow-[0_10px_25px_rgba(201,83,111,0.4)] hover:-translate-y-1 cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle Memories
        </button>

        <button
          onClick={onOpenVault}
          className="flex items-center gap-2 bg-[#2a0f2e]/80 border border-[#f0a63c] text-[#ffd9a0] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-[#c9536f] hover:border-[#c9536f] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(240,166,60,0.35)] hover:shadow-[0_10px_25px_rgba(201,83,111,0.4)] hover:-translate-y-1 cursor-pointer"
        >
          <Grid className="w-4 h-4" />
          Annanya's Memory Vault (101 Photos)
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <a
        href="#love-letter"
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[#ffc2d1]/80 hover:text-[#ffd9a0] text-xs tracking-[2px] uppercase transition-colors"
      >
        <div className="w-6 h-9 border-2 border-[#f0a63c] rounded-full relative shadow-[0_0_10px_rgba(240,166,60,0.35)]">
          <div className="w-1 h-2 bg-[#c9536f] rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-[mouseScroll_1.8s_infinite_ease-in-out]" />
        </div>
        <span>Scroll to read Krishna's letter</span>
      </a>
    </section>
  );
}
