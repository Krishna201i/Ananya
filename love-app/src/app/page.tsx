"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CanvasBackground from "@/components/CanvasBackground";
import HeroSection from "@/components/HeroSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import GallerySection from "@/components/GallerySection";
import ReasonsSection from "@/components/ReasonsSection";
import PoemSection from "@/components/PoemSection";
import TimelineSection from "@/components/TimelineSection";
import PromisesSection from "@/components/PromisesSection";
import FinaleSection from "@/components/FinaleSection";
import MemoryVaultModal from "@/components/MemoryVaultModal";
import UploadModal from "@/components/UploadModal";
import { LOCAL_PHOTOS, getPhotoUrl } from "@/data/photos";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const slotKeys = [
    "hero",
    "gallery-1", "gallery-2", "gallery-3", "gallery-4", "gallery-5",
    "polaroid-1", "polaroid-2", "polaroid-3", "polaroid-4",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("love_photos");
    if (saved) {
      try {
        setPhotoMap(JSON.parse(saved));
        return;
      } catch (e) {
        console.error(e);
      }
    }

    const initial: Record<string, string> = {};
    slotKeys.forEach((key, idx) => {
      initial[key] = getPhotoUrl(LOCAL_PHOTOS[idx % LOCAL_PHOTOS.length]);
    });
    setPhotoMap(initial);
  }, []);

  const savePhotoMap = (updated: Record<string, string>) => {
    setPhotoMap({ ...updated });
    localStorage.setItem("love_photos", JSON.stringify(updated));
  };

  const handleShuffle = () => {
    const shuffled = [...LOCAL_PHOTOS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const updated: Record<string, string> = {};
    slotKeys.forEach((key, idx) => {
      updated[key] = getPhotoUrl(shuffled[idx]);
    });
    savePhotoMap(updated);
  };

  const handleOpenUpload = (slotKey: string) => {
    setActiveSlot(slotKey);
    setIsUploadOpen(true);
  };

  const handleSelectPhoto = (url: string) => {
    const target = activeSlot || "hero";
    const updated = { ...photoMap, [target]: url };
    savePhotoMap(updated);
  };

  const handleUploadFile = (file: File) => {
    const target = activeSlot || "hero";
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const updated = { ...photoMap, [target]: e.target.result as string };
        savePhotoMap(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchFiles = (files: File[]) => {
    const updated = { ...photoMap };
    files.slice(0, 10).forEach((file, idx) => {
      const target = slotKeys[idx];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updated[target] = e.target.result as string;
          savePhotoMap({ ...updated });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <main className="relative min-h-screen">
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <CanvasBackground />

      <div id="flash-overlay" className="fixed inset-0 bg-white opacity-0 pointer-events-none z-[99990] transition-opacity duration-100" />

      {preloaderDone && (
        <>
          <HeroSection
            heroPhoto={photoMap["hero"]}
            onOpenUpload={() => handleOpenUpload("hero")}
            onShuffle={handleShuffle}
            onOpenVault={() => setIsVaultOpen(true)}
          />

          <LoveLetterSection />

          <GallerySection
            galleryPhotos={photoMap}
            onOpenUpload={handleOpenUpload}
            onShuffle={handleShuffle}
            onOpenVault={() => setIsVaultOpen(true)}
          />

          <ReasonsSection />
          <PoemSection />
          <TimelineSection />
          <PromisesSection />

          <FinaleSection
            polaroidPhotos={photoMap}
            onOpenUpload={handleOpenUpload}
          />
        </>
      )}

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadFile={handleUploadFile}
        onBatchFiles={handleBatchFiles}
        onOpenVault={() => setIsVaultOpen(true)}
      />

      <MemoryVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onSelectPhoto={handleSelectPhoto}
      />
    </main>
  );
}
