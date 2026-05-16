"use client"

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

type ClientImage = { src: string; key: string }

function buildClientImages(count = 13): ClientImage[] {
  const imgs: ClientImage[] = []
  for (let i = 1; i <= count; i++) {
    // Corrected path to match public/client(i).jpg
    imgs.push({ src: `/client(${i}).jpg`, key: `client-${i}-jpg` })
  }
  return imgs
}

export default function OurClients() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const isAr = locale === 'ar'

  const images = useMemo(() => buildClientImages(13), [])
  const controls = useAnimation()

  // refined smooth horizontal marquee
  React.useEffect(() => {
    controls.start({ x: ['0%', '-50%'], transition: { repeat: Infinity, ease: 'linear', duration: 30 } })
  }, [controls])

  return (
    <section className="our-clients-section relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#0b0b0c] via-[#070707] to-[#050505]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-sm text-premium-accent/80 uppercase tracking-widest font-medium">
            {isAr ? 'نحظى بثقة' : 'Trusted by'}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {isAr ? 'موثوقون من قِبل كبرى الشركات' : 'Trusted By Leading Brands'}
          </h2>
          <p className="mt-4 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'نشترك مع كبرى العلامات التجارية العالمية لتقديم تجارب غامرة وتقنيات تصوير ثلاثية الأبعاد فائقة الجودة.'
              : 'We partner with world-class brands to deliver premium immersive experiences and 3D capture at scale.'}
          </p>
        </div>

        <div className="relative">
          {/* glassmorphism blur layer */}
          <div className="pointer-events-none absolute inset-y-0 -left-4 w-24 z-20 bg-gradient-to-r from-[#0b0b0c] to-transparent md:w-48" />
          <div className="pointer-events-none absolute inset-y-0 -right-4 w-24 z-20 bg-gradient-to-l from-[#0b0b0c] to-transparent md:w-48" />

          {/* marquee wrapper with clipped overflow */}
          <div className="overflow-hidden py-4">
            <motion.div className="flex gap-4 md:gap-8 items-center will-change-transform" animate={controls}>
              {images.concat(images).map((img, idx) => (
                <div key={img.key + '-' + idx} className="client-card flex-none w-28 md:w-44 lg:w-52 h-20 md:h-28 lg:h-32 rounded-xl bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden group">
                  <div className="logo-inner relative w-full h-full p-4 md:p-6 transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={img.src}
                      alt={img.key}
                      fill
                      className="object-contain grayscale invert opacity-70 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
                      sizes="(max-width: 640px) 100px, (max-width: 1024px) 176px, 208px"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .our-clients-section { background-image: radial-gradient(circle at 10% 20%, rgba(0,217,255,0.03), transparent 20%), radial-gradient(circle at 90% 60%, rgba(59,130,246,0.02), transparent 25%); }
        .client-card { transition: all 500ms cubic-bezier(.2,.9,.2,1); }
        .client-card:hover { transform: translateY(-8px); border-color: rgba(0,217,255,0.3); box-shadow: 0 20px 40px -15px rgba(0,217,255,0.15); }
        @media (max-width: 640px) {
          .client-card { width: 100px; height: 70px; }
        }
      `}</style>
    </section>
  )
}
