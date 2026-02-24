import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// CLEANED + MORE CREATIVE VERSION
// ✔ Removed song concept
// ✔ Fully responsive centered layout
// ✔ Sensible No button movement (within safe zone)
// ✔ No button will NEVER cover Yes button
// ✔ More cute animations + floating hearts
// ✔ Better mobile behavior

const PHONE_NUMBER = "+91-8098898019"; // mobile number
const CELEBRATION_SOUND =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_6f6b6b0b12.mp3?filename=party-horn-6242.mp3";

export default function CrushSite() {
  const [phase, setPhase] = useState(0); // 0 intro | 1 ask | 2 success
  const [showSad, setShowSad] = useState(false);
  const [showNumber, setShowNumber] = useState(false);

  const sadTimeout = useRef(null);

  // Movement disabled — keeping for reference but not used
  const OFFSETS = [{ x: 0, y: 0 }];

  const [noIndexLocal, setNoIndexLocal] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    // ensure initial offset is safe (side-by-side)
    setNoOffset(OFFSETS[0]);
  }, []);

  // 🔥 PHASE AUTO-SWITCH (intro → ask after 4s)
  useEffect(() => {
    if (phase !== 0) return;
    const timer = setTimeout(() => setPhase(1), 4000);
    return () => clearTimeout(timer);
  }, [phase]);

  function triggerSad(short = true) {
    setShowSad(true);
    if (sadTimeout.current) clearTimeout(sadTimeout.current);
    sadTimeout.current = setTimeout(() => setShowSad(false), short ? 900 : 1800);
  }

  function moveNo() {
    // movement disabled — button stays in place (cleaned buggy code)
    return;
  }

  function handleNoClick() {
    // Show ONLY the Vadivelu GIF (avoid double popup)
    setNoAnim(true);
    // ❌ Removed triggerSad here because it caused the second popup
    // keep GIF visible longer so she can notice 😏
    // keep GIF visible much longer so it is clearly noticed 😏
    setTimeout(() => setNoAnim(false), 5500);
  }

  function handleYes() {
    setPhase(2);
    setShowNumber(true);

    const s = new Audio(CELEBRATION_SOUND);
    s.play().catch(() => {});

    popConfetti();
  }

  function popConfetti() {
    const container = document.getElementById("confetti");
    if (!container) return;

    for (let i = 0; i < 35; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece absolute rounded-sm opacity-90";

      const size = Math.random() * 10 + 6;
      el.style.width = `${size}px`;
      el.style.height = `${size * 0.6}px`;
      el.style.left = `${50 + (Math.random() - 0.5) * 200}px`;
      el.style.background = randomTailwindColor();

      container.appendChild(el);

      const toX = (Math.random() - 0.5) * 500;
      const toY = -300 - Math.random() * 300;

      el.animate(
        [
          { transform: `translateY(0px) translateX(0px) rotate(0deg)`, opacity: 1 },
          {
            transform: `translateY(${toY}px) translateX(${toX}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0
          }
        ],
        { duration: 1300 + Math.random() * 800, easing: "cubic-bezier(.2,.9,.2,1)" }
      );

      setTimeout(() => el.remove(), 2200);
    }
  }

  function randomTailwindColor() {
    const colors = [
      "#f87171",
      "#fb923c",
      "#facc15",
      "#34d399",
      "#60a5fa",
      "#a78bfa",
      "#f472b6"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ButtonsGroup: encapsulates the Yes / No buttons with improved behavior
  function ButtonsGroup() {
    return (
      <div className="relative flex items-center justify-center gap-6 min-h-[120px]">
        {/* YES BUTTON — anchor element */}
        <motion.button
          onClick={handleYes}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="relative z-30 px-10 py-4 rounded-full shadow-2xl text-white font-bold text-lg bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 flex items-center gap-3"
        >
          <span className="text-2xl">🥰</span>
          Paakalam!
        </motion.button>

        {/* NO BUTTON — shy behavior: slides left as if hiding behind Yes */}
        <motion.button
          onClick={handleNoClick}
          animate={{ x: 0, y: 0 }}
          className="relative z-20 px-6 py-3 bg-white rounded-full shadow font-semibold border border-gray-200 overflow-visible"
          style={{ minWidth: 120 }}
        >
          {noAnim && (
            <motion.img
              src="https://media1.tenor.com/m/BbuMNSjspbkAAAAd/mudiyadhu-vadivelu.gif"
              alt="mudiyadhu"
              initial={{ scale: 0, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: -60, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className="absolute left-1/2 -translate-x-1/2 z-[9999] pointer-events-none rounded-lg shadow-lg"
              style={{ top: "-100px", left: "-100px", width: "280px" }}
            />
          )}

          <span className="mr-2">😜</span>
          Mudiyathu Mudiyathu!
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-100 px-4 py-10 overflow-hidden">
      <main className="w-full max-w-4xl mx-auto text-center relative">
        {/* Floating hearts background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -200, opacity: [0, 1, 0] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.6
              }}
              className="absolute text-pink-300 text-xl"
              style={{ left: `${10 + i * 10}%` }}
            >
              ❤
            </motion.div>
          ))}
        </div>

        {/* INTRO */}
        <AnimatePresence>
          {phase === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >

              <motion.h2
                className="text-5xl sm:text-6xl font-extrabold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-700">
                  Gotcha!
                </span>{" "}
                <span className="inline-block">😁</span>
              </motion.h2>

              <motion.p
                className="mt-6 text-3xl sm:text-4xl font-semibold text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Epdi iruka Bharathi (Parvati)! 💫
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ASK */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-6"
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-extrabold text-gray-800"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                Enkooda Pesuviya Maa! ✨
              </motion.h2>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 relative">
                {/* Buttons container now uses motion offsets so they never stack behind each other */}
                {
                  /* OFFSETS are small pixel moves so the No button slides around sensibly */
                }
                <ButtonsGroup />
              </div>

              {/* Romantic YouTube video */}
              <div className="mt-10 w-full flex justify-center">
                <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-pink-200">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/knkNX-_Zp5w?start=156&rel=0"
                    title="romantic video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SUCCESS */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="py-10"
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-extrabold text-green-700"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.8 }}
              >
                Yay! 🎊
              </motion.h2>

              <p className="mt-4 text-lg text-gray-700">You just made my day a whole lot brighter… can't wait to talk with you 💖</p>

              {showNumber && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 p-5 bg-white/80 backdrop-blur rounded-xl shadow-lg inline-block"
                >
                  <div className="font-mono text-xl font-bold">{PHONE_NUMBER}</div>
                  <div className="text-sm text-gray-500">Save my number ✨</div>
                </motion.div>
              )}

              <div id="confetti" className="relative w-full h-40 mt-8 overflow-visible"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SAD EMOJI */}
        <AnimatePresence>
          {showSad && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none fixed inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 rounded-full bg-white/90 backdrop-blur-lg flex items-center justify-center text-5xl shadow-2xl animate-sad">
                😭
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        
      </main>

      <style>{`
        .animate-sad {
          animation: pop 0.7s cubic-bezier(.2,.9,.2,1);
        }
        @keyframes pop {
          0% { transform: scale(0.5); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .confetti-piece { transform-origin: center; }
      `}</style>
    </div>
  );
}
