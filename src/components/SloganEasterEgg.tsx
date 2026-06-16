"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";

const DEBOUNCE = 680;
const LONG_PRESS = 3000;

type Stage = 0 | 1 | 2 | 3 | 4 | 5;

// ─── Scratch marks ───────────────────────────────────────────────────────────
const SCRATCHES = [
  { x1: 7,  y1: 12, x2: 19, y2: 88, w: 0.5 },
  { x1: 45, y1: 4,  x2: 56, y2: 96, w: 0.5 },
  { x1: 74, y1: 16, x2: 89, y2: 78, w: 0.6 },
];

// ─── Particles ───────────────────────────────────────────────────────────────
function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 41 + 3) % 100,
    drift: ((i * 17) % 32) - 16,
    delay: (i * 0.27) % 2.9,
    duration: 1.6 + (i % 6) * 0.32,
    size: i % 5 === 0 ? 2.5 : 1.5,
    peak: 0.5 + (i % 3) * 0.22,
  }));
}

const PARTICLES: Partial<Record<Stage, ReturnType<typeof buildParticles>>> = {
  2: buildParticles(8),
  3: buildParticles(14),
  4: buildParticles(18),
  5: buildParticles(10),
};

const PARTICLE_COLOR: Partial<Record<Stage, string>> = {
  2: "#ef4444",
  3: "#5c0606",
  4: "#dc2626",
  5: "#818cf8",
};

// ─── Stars (Stage 5) ─────────────────────────────────────────────────────────
const STARS = Array.from({ length: 26 }, (_, i) => {
  const angle = (i / 26) * 360 + (i % 4) * 22;
  const r = 40 + (i % 7) * 10;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    x: Math.cos(rad) * r,
    y: Math.sin(rad) * (r * 0.28),
    size: i % 7 === 0 ? 2 : 1,
    color: ["#818cf8", "#a78bfa", "#22d3ee", "#c4b5fd", "#ffffff", "#7dd3fc"][i % 6],
    delay: (i * 0.14) % 2.6,
    duration: 1.0 + (i % 5) * 0.4,
  };
});

// ─── Text styles ─────────────────────────────────────────────────────────────
const TEXT_STYLE: Record<number, React.CSSProperties> = {
  0: { color: "rgba(255,255,255,0.55)" },
  1: {
    color: "#9ca3af",
    textShadow: "0 0 10px rgba(220,38,38,0.45), 0 0 28px rgba(220,38,38,0.18)",
  },
  2: {
    color: "#f87171",
    textShadow: "0 0 14px rgba(220,38,38,0.75), 0 0 40px rgba(220,38,38,0.3)",
  },
  3: {
    color: "#fca5a5",
    textShadow:
      "1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000," +
      "0 0 22px rgba(185,28,28,0.9),0 0 55px rgba(185,28,28,0.45)",
  },
  4: {
    color: "#060001",
    textShadow:
      "0 0 2px rgba(255,255,255,0.18),0 0 16px #dc2626," +
      "0 0 50px rgba(220,38,38,0.72),0 0 95px rgba(220,38,38,0.28)",
  },
};

// CSS class for looping glow animations (defined in globals.css)
const STAGE_CLASS: Partial<Record<Stage, string>> = {
  3: "easter-monster",
  4: "easter-evil",
  5: "easter-cosmic",
};

const STAGE_LABELS: Record<Stage, string | null> = {
  0: null,
  1: "HERO HUNTER",
  2: "HALF MONSTER",
  3: "MONSTER",
  4: "ABSOLUTE EVIL",
  5: "COSMIC HORROR",
};

// ─── Enter animations per stage ──────────────────────────────────────────────
type MotionProps = { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };

const ENTER: Record<number, MotionProps> = {
  0: { initial: {}, animate: {}, transition: { duration: 0.3 } },
  1: {
    initial: { skewX: -13, opacity: 0.25, x: -8 },
    animate:  { skewX: 0,   opacity: 1,   x: 0  },
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
  2: {
    initial: { scale: 1.05, opacity: 0.35 },
    animate:  { scale: 1,   opacity: 1    },
    transition: { duration: 0.42, ease: "easeOut" },
  },
  3: {
    initial: { scale: 0.92, opacity: 0.2 },
    animate:  { scale: 1,   opacity: 1   },
    transition: { duration: 0.5, ease: [0, 0.55, 0.45, 1] },
  },
  4: {
    initial: { opacity: 0, scale: 1.12 },
    animate:  { opacity: 1, scale: 1    },
    transition: { duration: 0.5 },
  },
  5: {
    initial: { opacity: 0, scale: 0.86 },
    animate:  { opacity: 1, scale: 1    },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Hover filters per stage ─────────────────────────────────────────────────
const HOVER_FILTER: Record<Stage, string> = {
  0: "brightness(2.8) drop-shadow(0 0 14px rgba(255,255,255,0.55)) drop-shadow(0 0 28px rgba(255,255,255,0.2))",
  1: "brightness(1.7) drop-shadow(0 0 12px rgba(220,38,38,0.6)) drop-shadow(0 0 28px rgba(220,38,38,0.25))",
  2: "brightness(1.6) drop-shadow(0 0 16px rgba(220,38,38,0.8)) drop-shadow(0 0 36px rgba(220,38,38,0.3))",
  3: "brightness(1.8) drop-shadow(0 0 18px rgba(185,28,28,0.95)) drop-shadow(0 0 40px rgba(185,28,28,0.4))",
  4: "brightness(2.2) drop-shadow(0 0 20px rgba(220,38,38,1)) drop-shadow(0 0 50px rgba(220,38,38,0.5))",
  5: "brightness(1.5) drop-shadow(0 0 18px rgba(129,140,248,0.9)) drop-shadow(0 0 40px rgba(167,139,250,0.5)) drop-shadow(0 0 65px rgba(34,211,238,0.2))",
};

// ─── Component ───────────────────────────────────────────────────────────────
export function SloganEasterEgg() {
  const [stage, setStage]               = useState<Stage>(0);
  const [locked, setLocked]             = useState(false);
  const [shockwave, setShockwave]       = useState(false);
  const [limiterShown, setLimiterShown] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClick  = useRef(0);

  const handleClick = useCallback(() => {
    const now = Date.now();
    if (locked || now - lastClick.current < DEBOUNCE || stage >= 5) return;
    lastClick.current = now;
    setLocked(true);
    setTimeout(() => setLocked(false), DEBOUNCE);

    const next = (stage + 1) as Stage;

    if (next === 4) {
      setShockwave(true);
      setTimeout(() => setShockwave(false), 950);
    }
    if (next === 5) {
      setTimeout(() => {
        setLimiterShown(true);
        setTimeout(() => setLimiterShown(false), 3200);
      }, 800);
    }

    setStage(next);
  }, [stage, locked]);

  const onPressStart = useCallback(() => {
    pressTimer.current = setTimeout(() => {
      setStage(0);
      setLimiterShown(false);
      setShockwave(false);
    }, LONG_PRESS);
  }, []);

  const onPressEnd = useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }, []);

  const enterAnim    = ENTER[stage];
  const stageClass   = STAGE_CLASS[stage] ?? "";
  const isCosmic     = stage === 5;
  const particles    = PARTICLES[stage] ?? [];
  const pColor       = PARTICLE_COLOR[stage] ?? "transparent";
  const label        = STAGE_LABELS[stage];
  const scratchCount = stage === 1 ? 2 : 3;

  const cosmicStyle: React.CSSProperties = {
    background: "linear-gradient(135deg,#818cf8 0%,#a78bfa 30%,#22d3ee 65%,#818cf8 100%)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div className="relative flex flex-col items-center gap-0">
      {/* ── Clickable button ─────────────────────────────────────────────── */}
      <motion.button
        onClick={handleClick}
        onPointerDown={onPressStart}
        onPointerUp={onPressEnd}
        onPointerLeave={onPressEnd}
        onPointerCancel={onPressEnd}
        initial={{ filter: "brightness(1)" }}
        animate={{ filter: "brightness(1)" }}
        whileHover={stage === 0 ? { filter: HOVER_FILTER[0] } : {}}
        transition={{ filter: { duration: 0.28, ease: "easeOut" } }}
        whileTap={{}}
        className="relative select-none cursor-none focus:outline-none"
        aria-label="Break Through Your Limits"
      >
        {/* Dark halo — Stage 4+ */}
        {stage >= 4 && (
          <div className="absolute inset-[-24px] rounded-3xl bg-black/55 blur-2xl pointer-events-none" />
        )}

        {/* Scratch marks — Stage 1–4 */}
        {stage >= 1 && stage < 5 && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            preserveAspectRatio="none"
          >
            {SCRATCHES.slice(0, scratchCount).map((s, i) => (
              <motion.line
                key={i}
                x1={`${s.x1}%`} y1={`${s.y1}%`}
                x2={`${s.x2}%`} y2={`${s.y2}%`}
                stroke={stage >= 3 ? "rgba(185,28,28,0.65)" : "rgba(220,38,38,0.38)"}
                strokeWidth={stage >= 4 ? s.w + 0.35 : s.w}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.38 + stage * 0.09 }}
                transition={{ duration: 0.26, delay: i * 0.07 }}
              />
            ))}
          </motion.svg>
        )}

        {/* Floating particles — Stage 2–5 */}
        {particles.length > 0 && (
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: pColor,
                  left: `${p.x}%`,
                  bottom: "40%",
                }}
                animate={{
                  y: [0, -(48 + stage * 9)],
                  x: [0, p.drift],
                  opacity: [0, p.peak, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Star field — Stage 5 */}
        {isCosmic && (
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            {STARS.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  width: star.size,
                  height: star.size,
                  background: star.color,
                  top: "50%",
                  left: "50%",
                  x: star.x,
                  y: star.y,
                }}
                animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.5, 0.7] }}
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Slogan text */}
        <AnimatePresence mode="wait">
          <motion.span
            key={stage}
            className={`relative z-10 text-sm sm:text-base font-semibold tracking-[0.25em] uppercase block ${stageClass}`}
            style={isCosmic ? cosmicStyle : TEXT_STYLE[stage]}
            initial={enterAnim.initial}
            animate={enterAnim.animate}
            exit={{ opacity: 0, y: -5, transition: { duration: 0.18 } }}
            transition={enterAnim.transition}
          >
            BREAK THROUGH YOUR LIMITS
          </motion.span>
        </AnimatePresence>

        {/* Shockwave ring — Stage 4 click */}
        <AnimatePresence>
          {shockwave && (
            <motion.div
              className="absolute inset-0 rounded-full border border-red-500/55 pointer-events-none z-20"
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 7, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.95, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Stage label */}
      <AnimatePresence mode="wait">
        {label && (
          <motion.span
            key={`lbl-${stage}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35 }}
            className={`mt-2 block text-[9px] tracking-[0.45em] ${
              stage === 5 ? "text-indigo-400/55" : "text-red-500/50"
            }`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* LIMITER REMOVED */}
      <AnimatePresence>
        {limiterShown && (
          <motion.p
            initial={{ opacity: 0, y: 14, letterSpacing: "0.6em" }}
            animate={{
              opacity:       [0, 1, 1, 0],
              y:             [14, 0, 0, -10],
              letterSpacing: ["0.6em", "0.38em", "0.38em", "0.38em"],
            }}
            transition={{ duration: 3.2, times: [0, 0.14, 0.75, 1] }}
            exit={{}}
            className="mt-3 text-[11px] font-bold tracking-[0.38em] text-indigo-300/80"
          >
            LIMITER REMOVED
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
