"use client";

import { motion } from "framer-motion";
import { Camera, Shuffle, Grid } from "lucide-react";

interface GallerySectionProps {
  galleryPhotos: Record<string, string>;
  onOpenUpload: (slotKey: string) => void;
  onShuffle: () => void;
  onOpenVault: () => void;
}

export default function GallerySection({
  galleryPhotos,
  onOpenUpload,
  onShuffle,
  onOpenVault,
}: GallerySectionProps) {
  const cards = [
    { key: "gallery-1", label: "CHAPTER I", title: "Where It All Began", sub: "Our First Photo", span: "lg:col-span-7 lg:row-span-2" },
    { key: "gallery-2", label: "CHAPTER II", title: "Your Pure Magic", sub: "Your Smile", span: "lg:col-span-5 lg:row-span-2" },
    { key: "gallery-3", label: "CHAPTER III", title: "Exploring Together", sub: "Our Adventure", span: "lg:col-span-4 lg:row-span-2" },
    { key: "gallery-4", label: "CHAPTER IV", title: "Stolen Hugs", sub: "Unforgettable Moments", span: "lg:col-span-4 lg:row-span-2" },
    { key: "gallery-5", label: "CHAPTER V", title: "My Heart & Soul", sub: "Forever Together", span: "lg:col-span-4 lg:row-span-2" },
  ];

  return (
    <section id="gallery" className="relative py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-sans text-xs font-semibold tracking-[4px] text-[#ffd9a0] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(240,166,60,0.35)]">
          CHERISHED MOMENTS
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-[#faf1e2]">
          Our <span className="font-script text-[#c9536f] text-1.25em drop-shadow-[0_0_15px_rgba(201,83,111,0.5)]">Romantic</span> Gallery
        </h2>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <button
          onClick={onShuffle}
          className="flex items-center gap-2 bg-[#2a0f2e]/80 border border-[#f0a63c] text-[#ffd9a0] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-[#c9536f] hover:border-[#c9536f] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(240,166,60,0.35)] hover:shadow-[0_10px_25px_rgba(201,83,111,0.5)] active:scale-95 cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          🔀 Shuffle Gallery Photos
        </button>
        <button
          onClick={onOpenVault}
          className="flex items-center gap-2 bg-[#2a0f2e]/80 border border-[#f0a63c] text-[#ffd9a0] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-[#c9536f] hover:border-[#c9536f] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(240,166,60,0.35)] hover:shadow-[0_10px_25px_rgba(201,83,111,0.5)] active:scale-95 cursor-pointer"
        >
          <Grid className="w-4 h-4" />
          📸 Open Memory Vault
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[240px] gap-6">
        {cards.map((card, idx) => {
          const imgSrc = galleryPhotos[card.key];
          return (
            <motion.div
              key={`${card.key}-${imgSrc}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                type: "spring",
                stiffness: 150,
              }}
              onClick={() => onOpenUpload(card.key)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer glass-card ${card.span} min-h-[300px] md:min-h-[auto]`}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-[#f0a63c]/40 rounded-3xl flex flex-col items-center justify-center gap-2 text-[#ffd9a0] group-hover:border-[#c9536f] group-hover:text-[#c9536f] group-hover:bg-[#c9536f]/15 transition-all p-6 text-center">
                  <Camera className="w-8 h-8 text-[#f0a63c]" />
                  <span className="font-semibold text-sm">{card.sub}</span>
                </div>
              )}

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0a1e]/95 via-[#1c0a1e]/20 to-transparent flex flex-col justify-end p-7 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                <span className="font-sans text-xs tracking-[2px] text-[#f0a63c] uppercase mb-1">
                  {card.label}
                </span>
                <h3 className="font-script text-3xl text-white drop-shadow-[0_0_10px_rgba(201,83,111,0.5)]">
                  {card.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
