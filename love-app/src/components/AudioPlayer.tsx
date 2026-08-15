"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Disc } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger: boolean;
}

export default function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const START_TIME = 26; // Start song at 0:26

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.currentTime = START_TIME;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked by browser policy:", err);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.currentTime < START_TIME) {
        audioRef.current.currentTime = START_TIME;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.log(err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = START_TIME;
      audioRef.current.play();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/song.mp3"
        preload="metadata"
        onEnded={handleEnded}
      />

      <div className="fixed bottom-6 right-6 z-[99980]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="relative group"
        >
          {/* Main Floating Glass Player Pill */}
          <div className="flex items-center gap-3 bg-[#2a0f2e]/90 border border-[#f0a63c] backdrop-blur-xl px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(42,15,46,0.8),0_0_20px_rgba(240,166,60,0.35)] hover:border-[#c9536f] transition-all">
            {/* Spinning Disc / Vinyl Icon */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#f0a63c] via-[#c9536f] to-[#7a2452] flex items-center justify-center shadow-[0_0_10px_#f0a63c]"
            >
              <Disc className="w-5 h-5 text-white" />
            </motion.div>

            {/* Song Details */}
            <div className="flex flex-col text-left max-w-[140px] sm:max-w-[180px]">
              <span className="font-sans text-[10px] tracking-widest text-[#ffd9a0] uppercase font-semibold">
                OUR SONG (0:26) 🎵
              </span>
              <span className="font-serif italic text-sm text-[#faf1e2] truncate">
                Tum Ho Toh Saiyaara
              </span>
            </div>

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-[#c9536f] hover:bg-[#ff85a2] text-white flex items-center justify-center transition-all shadow-[0_0_12px_rgba(201,83,111,0.6)] cursor-pointer active:scale-90"
              title={isPlaying ? "Pause Song" : "Play Song"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              className="text-[#ffd9a0] hover:text-white transition-colors p-1 cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
