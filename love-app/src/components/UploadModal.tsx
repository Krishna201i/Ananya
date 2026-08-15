"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, FolderPlus } from "lucide-react";
import React, { useRef } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadFile: (file: File) => void;
  onBatchFiles: (files: File[]) => void;
  onOpenVault: () => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onUploadFile,
  onBatchFiles,
  onOpenVault,
}: UploadModalProps) {
  const singleInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(e.target.files[0]);
      onClose();
    }
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      onBatchFiles(Array.from(e.target.files));
      onClose();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadFile(e.dataTransfer.files[0]);
      onClose();
    }
  };

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
            className="bg-[#160612]/95 border border-[#d4af6a] rounded-3xl w-full max-w-lg p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(232,48,90,0.4)] text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-6 text-[#c4b0b7] hover:text-[#e8305a] text-2xl transition-colors"
            >
              <X className="w-7 h-7" />
            </button>

            <h3 className="font-serif text-3xl text-[#f3e5ab] mb-2">
              Upload Romantic Photo
            </h3>
            <p className="text-sm text-[#c4b0b7] mb-6">
              Choose a photo for your love story memory slot.
            </p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => singleInputRef.current?.click()}
              className="border-2 border-dashed border-[#d4af6a]/50 rounded-2xl p-8 bg-[#0a0008]/60 cursor-pointer hover:border-[#e8305a] hover:bg-[#e8305a]/15 transition-all mb-6 flex flex-col items-center gap-3"
            >
              <Camera className="w-10 h-10 text-[#e8305a]" />
              <p className="font-semibold text-[#f3e5ab]">
                Click or Drag & Drop Photo Here
              </p>
              <p className="text-xs text-[#c4b0b7]">Supports JPG, PNG, WEBP</p>
            </div>

            <input
              type="file"
              ref={singleInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleSingleChange}
            />
            <input
              type="file"
              ref={batchInputRef}
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleBatchChange}
            />

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenVault();
                }}
                className="w-full bg-[#e8305a] hover:bg-[#e8305a]/90 text-white font-sans text-sm font-semibold py-3 px-6 rounded-full transition-all shadow-[0_0_15px_rgba(232,48,90,0.4)]"
              >
                📸 Choose from 101 Cluster 2 Photos
              </button>

              <button
                onClick={() => batchInputRef.current?.click()}
                className="w-full border border-[#d4af6a] text-[#d4af6a] hover:bg-[#d4af6a] hover:text-[#0a0008] font-sans text-xs font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <FolderPlus className="w-4 h-4" />
                Upload Multiple Custom Files
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
