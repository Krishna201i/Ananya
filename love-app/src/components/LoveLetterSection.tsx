"use client";

import { motion } from "framer-motion";

export default function LoveLetterSection() {
  return (
    <section id="love-letter" className="relative py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-sans text-xs font-semibold tracking-[4px] text-[#ffd9a0] uppercase block mb-3 drop-shadow-[0_0_10px_rgba(240,166,60,0.4)]">
          MAHASHIVRATRI · 15 FEBRUARY
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-[#faf1e2]">
          A Letter For <span className="font-script text-[#c9536f] text-1.25em drop-shadow-[0_0_15px_rgba(201,83,111,0.5)]">Annanya</span>
        </h2>
        <p className="font-serif italic text-lg text-[#ffc2d1] mt-2">
          "ek diya jo us raat se aaj tak jalta hi raha hai"
        </p>
      </div>

      {/* Moon + Diya Motif */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-32 h-36 flex flex-col items-center justify-between">
          {/* Moon Glow */}
          <div className="absolute top-0 w-24 h-24 rounded-full bg-[radial-gradient(circle,rgba(255,182,110,0.45)_0%,rgba(255,182,110,0)_70%)]" />
          {/* Moon Crescent */}
          <div className="relative w-12 h-12 rounded-full bg-[#ffd9a0] shadow-[-14px_0_0_-2px_#2a0f2e_inset]" />
          {/* Thread */}
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#ffd9a0] to-transparent opacity-50" />
          {/* Diya */}
          <div className="relative w-16 h-9 flex flex-col items-center justify-end">
            <div className="absolute bottom-4 w-3 h-5 bg-[radial-gradient(ellipse_at_50%_80%,#fff3c4_0%,#f0a63c_45%,#d9660c_90%)] rounded-t-full filter drop-shadow-[0_0_8px_rgba(227,167,60,0.8)] animate-flame" />
            <div className="w-16 h-4 bg-gradient-to-b from-[#f0a63c] to-[#b5741f] rounded-b-full relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-18 h-2 bg-[#f0a63c] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Folded Parchment Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
        className="relative w-full max-w-xl mx-auto"
      >
        {/* Paper Back Layer 2 */}
        <div className="absolute inset-x-[-6px] top-[10px] bottom-[-10px] bg-[#f2e6cf] rounded-lg rotate-[2.2deg] shadow-[0_20px_40px_rgba(0,0,0,0.35)] pointer-events-none" />

        {/* Paper Back Layer 1 */}
        <div className="absolute inset-x-[-3px] top-[6px] bottom-[-6px] bg-[#f6e9d3] rounded-lg -rotate-[1.1deg] shadow-[0_16px_30px_rgba(0,0,0,0.3)] pointer-events-none" />

        {/* Main Parchment Letter */}
        <div className="relative bg-[#faf1e2] text-[#3c2f24] rounded-lg p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.45)] border border-[#3c2f24]/10">
          {/* Wax Stamp Seal */}
          <div className="absolute -top-4 right-6 w-12 h-12 rounded-full bg-[radial-gradient(circle_at_35%_30%,#d76a7f,#a83a52_70%)] shadow-[0_6px_14px_rgba(0,0,0,0.35)] flex items-center justify-center text-xl -rotate-12">
            💌
          </div>

          <p className="font-sans font-semibold text-xl mb-6 text-[#3c2f24]">
            Meri pyaari Annanya,
          </p>

          <div className="font-sans text-base leading-relaxed text-[#3c2f24] flex flex-col gap-4">
            <p>
              Sabse pehle, Happy Birthday. Aaj ka din tumhare naam hai, aur main bas itna chahta hoon ki tumhe pata ho ki tum meri zindagi ke liye kitni khaas ho.
            </p>

            <p>
              Mujhe wo din abhi bhi yaad hai jab pehli baar humari mulaqat hui thi. Lekin jo din mere dil mein hamesha ke liye chhap gaya, wo tha Mahashivratri ka, 15 February — jab maine finally himmat karke tumse apne dil ki baat keh di thi. Us pal se lekar aaj tak, sab kuch badal gaya, aur sach kahun toh, sabse acche tareeke se badla.
            </p>

            <p>
              Mujhe wo hamari saari bike rides yaad aati hain — jab hum bas nikal jaate the, na koi manzil, na koi jaldi, sirf hum dono aur khula raasta. Wo tumhara achanak se mujhe hug kar lena, chhoti si baat lagti hai, but wo mere din ki sabse acchi cheez hoti hai. Aur haan, jab tum mujh pe bacho jaisa gussa karti ho meri harkaton ki wajah se, ya daant deti ho — mujhe wo bhi utna hi pyaara lagta hai, chahe main kabhi maanu na maanu.
            </p>

            <p>
              Tum sirf meri girlfriend nahi ho, Annanya. Tum meri sabse acchi dost ho, meri shanti ho, aur meri sabse pyaari aadat ho.
            </p>

            <p>
              Is birthday pe, main tumse bas itna kehna chahta hoon — thank you, meri zindagi ka hissa banne ke liye. I love you, aaj bhi, hamesha bhi.
            </p>
          </div>

          {/* Letter Closing & Signature */}
          <div className="mt-8 pt-6 border-t border-dashed border-[#3c2f24]/25">
            <p className="text-sm text-[#6b5847] mb-1">Tumhara hamesha,</p>
            <p className="font-caveat text-4xl font-bold text-[#7a2f3f]">
              Krishna
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footnote */}
      <p className="text-center font-sans text-xs text-[#faf1e2]/60 mt-8 max-w-lg mx-auto">
        jaise chaand ki roshni raat ko rasta dikhati hai, waise hi tum meri raahon ko roshan karti ho
      </p>
    </section>
  );
}
