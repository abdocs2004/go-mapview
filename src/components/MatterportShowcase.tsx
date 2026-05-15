"use client"

import React from 'react'
// use native img to avoid Next image optimizer issues for local dev files
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'

interface Props {
  src?: string
  alt?: string
}

export default function MatterportShowcase({ src = '/matterport.png', alt = 'Matterport model' }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])
  const scale = useTransform(y, [-50, 50], [1.02, 0.98])
  const controls = useAnimation()

  React.useEffect(() => {
    // subtle breathing animation
    controls.start({ translateY: [0, -8, 0], scale: [1, 1.01, 1], transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' } })
  }, [controls])

  function handleMouse(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    // center to -50..50
    x.set((px - 0.5) * 100)
    y.set((py - 0.5) * 100)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Glow + ambient layers */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[420px] h-[260px] md:w-[560px] md:h-[340px] rounded-3xl bg-gradient-to-b from-blue-600/6 via-purple-600/3 to-transparent filter blur-3xl opacity-60" />
        </div>

        <motion.div
          className="relative rounded-3xl bg-gradient-to-tr from-black/40 to-black/20 border border-white/6 shadow-2xl overflow-visible p-3"
          style={{ perspective: 1200 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          animate={controls}
        >
          <motion.div
            style={{ rotateX, rotateY, scale }}
            transition={{ type: 'spring', stiffness: 90, damping: 18 }}
            className="relative rounded-2xl w-[420px] h-[300px] md:w-[640px] md:h-[420px] lg:w-[760px] lg:h-[480px] bg-gradient-to-br from-black/30 to-black/10 flex items-center justify-center"
          >
            {/* soft shadow / depth */}
            <div className="absolute inset-0 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />

            <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
              <img src={src} alt={alt} decoding="async" className="object-contain w-full h-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </div>

            {/* projector base + beam */}
            <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="projector-base w-36 h-16 rounded-xl bg-gradient-to-b from-black to-gray-800 border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <style jsx>{`
        :global(.bg-dark-900\/60) { background-color: rgba(15,15,15,0.6); }
        .projector-base { position: relative; }
        .projector-base::after {
          content: '';
          position: absolute;
          left: 50%;
          top: -220px;
          transform: translateX(-50%) rotate(0deg);
          width: 420px;
          height: 420px;
          background: radial-gradient(closest-side, rgba(99,102,241,0.06), transparent 40%);
          filter: blur(30px);
          pointer-events: none;
        }
        @media (hover: none) and (pointer: coarse) {
          /* on touch, disable tilt and simplify animation */
          :global(.rounded-2xl) { transform: none !important; }
        }
      `}</style>
    </div>
  )
}
