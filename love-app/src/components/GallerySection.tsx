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
    { key: "gallery-4", label: "CHAPTER IV", title: "Stolen Kisses", sub: "Unforgettable Moments", span: "lg:col-span-4 lg:row-span-2" },
    { key: "gallery-5", label: "CHAPTER V", title: "My Heart & Soul", sub: "Forever Together", span: "lg:col-span-4 lg:row-span-2" },
  ];

  return (
    <section id="gallery" className="relative py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-sans text-xs font-semibold tracking-[4px] text-[#d4af6a] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(212,175,106,0.35)]">
          CHERISHED MOMENTS
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-[#f5edeb]">
          Our <span className="font-script text-[#e8305a] text-1.25em drop-shadow-[0_0_15px_rgba(232,48,90,0.4)]">Romantic</span> Gallery
        </h2>
      </div>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <button
          onClick={onShuffle}
          className="flex items-center gap-2 bg-[#160612]/80 border border-[#d4af6a] text-[#f3e5ab] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full hover:bg-[#e8305a] hover:border-[#e8305a] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,106,0.35)]"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle Gallery Photos
        </button>
        <button
          onClick={onOpenVault}
          className="flex items-center gap-2 bg-[#160612]/80 border border-[#d4af6a] text-[#f3e5ab] font-sans font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full hover:bg-[#e8305a] hover:border-[#e8305a] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(212,175,106,0.35)]"
        >
          <Grid className="w-4 h-4" />
          Open Memory Vault
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[240px] gap-6">
        {cards.map((card, idx) => {
          const imgSrc = galleryPhotos[card.key];
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                type: "spring",
                stiffness: 120,
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
                <div className="w-full h-full border-2 border-dashed border-[#d4af6a]/40 rounded-3xl flex flex-col items-center justify-center gap-2 text-[#c4b0b7] group-hover:border-[#e8305a] group-hover:text-[#e8305a] group-hover:bg-[#e8305a]/15 transition-all p-6 text-center">
                  <Camera className="w-8 h-8 text-[#d4af6a]" />
                  <span className="font-semibold text-sm">{card.sub}</span>
                </div>
              )}

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0008]/95 via-[#0a0008]/20 to-transparent flex flex-col justify-end p-7 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                <span className="font-sans text-xs tracking-[2px] text-[#d4af6a] uppercase mb-1">
                  {card.label}
                </span>
                <h3 className="font-script text-3xl text-white drop-shadow-[0_0_10px_rgba(232,48,90,0.4)]">
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
