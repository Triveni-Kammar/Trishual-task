import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Cinematic boot sequence: trident falls from the sky, hits the ground,
// shatters into an energy wave, and resolves into the CRM login screen.
export default function OpeningAnimation({ onDone }) {
  const [phase, setPhase] = useState(0)
  // 0 sky/particles, 1 descent, 2 impact, 3 shatter+wave, 4 flash, 5 exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 2450),
      setTimeout(() => setPhase(4), 3100),
      setTimeout(() => setPhase(5), 3450),
      setTimeout(() => onDone(), 3950),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  const skip = () => onDone()

  return (
    <AnimatePresence>
      {phase < 5 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 overflow-hidden bg-[#020308] flex items-center justify-center"
        >
          {/* starfield / particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>

          {/* ambient glow */}
          <motion.div
            className="absolute w-[900px] h-[900px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(242,169,59,0.16), transparent 65%)' }}
            animate={{ scale: phase >= 2 ? 1.3 : 1, opacity: phase >= 4 ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* lightning flashes around descent */}
          {phase === 1 && (
            <>
              <motion.div
                className="absolute left-1/3 top-0 w-px h-2/3 bg-gradient-to-b from-[var(--gold)] to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, repeat: 2 }}
              />
              <motion.div
                className="absolute left-2/3 top-0 w-px h-1/2 bg-gradient-to-b from-[var(--azure)] to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: 2, delay: 0.2 }}
              />
            </>
          )}

          {/* the trident */}
          {phase < 4 && (
            <motion.div
              className="relative z-10"
              initial={{ y: '-60vh', rotate: -8, opacity: 0, scale: 0.6 }}
              animate={
                phase === 0
                  ? { y: '-60vh', opacity: 1, scale: 0.7, rotate: [-8, 8, -8] }
                  : phase === 1
                  ? { y: '0vh', opacity: 1, scale: 1, rotate: 360 }
                  : { y: '0vh', opacity: 1, scale: [1, 1.15, 0.9], rotate: 360 }
              }
              transition={
                phase === 0
                  ? { rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }
                  : phase === 1
                  ? { duration: 1.5, ease: [0.6, 0.05, 0.9, 0.4] }
                  : { duration: 0.4, ease: 'easeOut' }
              }
            >
              <TridentGlyph shake={phase === 2} />
            </motion.div>
          )}

          {/* impact shockwave + shatter */}
          {phase >= 2 && phase < 5 && (
            <motion.div
              className="absolute rounded-full border"
              style={{ borderColor: 'var(--gold)' }}
              initial={{ width: 10, height: 10, opacity: 0.9 }}
              animate={{ width: 1400, height: 1400, opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          )}
          {phase >= 3 && (
            <div className="absolute inset-0">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2
                return (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 block"
                    style={{ width: 3, height: 3, background: i % 2 ? 'var(--gold)' : 'var(--azure)', borderRadius: 2 }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * (300 + Math.random() * 200),
                      y: Math.sin(angle) * (300 + Math.random() * 200) - 60,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                )
              })}
            </div>
          )}

          {/* screen flash -> transform */}
          <AnimatePresence>
            {phase === 4 && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          {/* ground line */}
          <div className="absolute bottom-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(242,169,59,0.35)] to-transparent" />

          <button
            onClick={skip}
            className="absolute bottom-6 right-6 text-xs text-[var(--muted)] hover:text-[var(--gold)] transition-colors font-mono tracking-wide"
          >
            skip intro →
          </button>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.35em] text-[var(--muted-2)] font-mono uppercase">
            Trishul CRM
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TridentGlyph({ shake }) {
  return (
    <motion.svg
      width="120" height="160" viewBox="0 0 120 160"
      animate={shake ? { x: [0, -4, 4, -3, 3, 0] } : {}}
      transition={{ duration: 0.35 }}
      style={{ filter: 'drop-shadow(0 0 24px rgba(242,169,59,0.65))' }}
    >
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd98a" />
          <stop offset="55%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--ember)" />
        </linearGradient>
      </defs>
      <path d="M60 20 L60 150" stroke="url(#tg)" strokeWidth="6" strokeLinecap="round" />
      <path d="M30 15 C30 45 45 55 60 60 C75 55 90 45 90 15" stroke="url(#tg)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M60 5 L60 60" stroke="url(#tg)" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 140 L80 140" stroke="url(#tg)" strokeWidth="6" strokeLinecap="round" />
    </motion.svg>
  )
}
