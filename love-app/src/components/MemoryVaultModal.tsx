"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LOCAL_PHOTOS, getPhotoUrl } from "@/data/photos";

interface MemoryVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (url: string) => void;
}

export default function MemoryVaultModal({
  isOpen,
  onClose,
  onSelectPhoto,
}: MemoryVaultModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99995] bg-[#0a0008]/90 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-[#160612]/95 border border-[#d4af6a] rounded-3xl w-full max-w-6xl max-h-[85vh] overflow-y-auto p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(232,48,90,0.4)] text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-6 text-[#c4b0b7] hover:text-[#e8305a] text-2xl transition-colors"
            >
              <X className="w-7 h-7" />
            </button>

            <h3 className="font-serif text-3xl md:text-4xl text-[#f3e5ab] mb-2">
              Our Complete Memory Vault
            </h3>
            <p className="text-sm text-[#c4b0b7] mb-8">
              Every precious moment captured together (101 Photos). Click any photo to apply it to your website!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {LOCAL_PHOTOS.map((filename, idx) => {
                const url = getPhotoUrl(filename);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      onSelectPhoto(url);
                      onClose();
                    }}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer border border-[#d4af6a]/30 hover:border-[#e8305a] shadow-md hover:shadow-[0_10px_25px_rgba(232,48,90,0.4)] transition-all"
                  >
                    <img
                      src={url}
                      alt={`Memory ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
