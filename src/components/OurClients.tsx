"use client"

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'

type ClientImage = { src: string; key: string }

function buildClientImages(count = 13): ClientImage[] {
  const imgs: ClientImage[] = []
  for (let i = 1; i <= count; i++) {
    imgs.push({ src: `/clients/client${i}.jpg`, key: `client-${i}-jpg` })
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
    controls.start({ x: ['0%', '-50%'], transition: { repeat: Infinity, ease: 'linear', duration: 40 } })
  }, [controls])

  return (
    <section className="our-clients-section relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#0b0b0c] via-[#070707] to-[#050505]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest">
            {isAr ? 'نحظى بثقة' : 'Trusted by'}
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            {isAr ? 'موثوقون من قِبل كبرى الشركات' : 'Trusted By Leading Brands'}
          </h2>
          <p className="mt-2 text-sm text-gray-400 max-w-2xl mx-auto">
            {isAr 
              ? 'نشترك مع كبرى العلامات التجارية العالمية لتقديم تجارب غامرة وتقنيات تصوير ثلاثية الأبعاد فائقة الجودة.'
              : 'We partner with world-class brands to deliver premium immersive experiences and 3D capture at scale.'}
          </p>
        </div>

        <div className="relative">
          {/* glassmorphism blur layer */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            <div className="absolute -inset-y-10 left-0 w-1/3 bg-white/3 blur-3xl" />
            <div className="absolute -inset-y-10 right-0 w-1/3 bg-white/3 blur-3xl" />
          </div>

          {/* marquee wrapper with clipped overflow */}
          <div className="overflow-hidden">
            <motion.div className="flex gap-6 items-center will-change-transform" animate={controls}>
              {images.concat(images).map((img, idx) => (
                <div key={img.key + '-' + idx} className="client-card flex-none w-36 md:w-44 lg:w-52 h-24 md:h-28 lg:h-32 rounded-xl bg-gradient-to-b from-white/3 via-white/2 to-white/5 backdrop-blur-sm border border-white/5 flex items-center justify-center shadow-xl overflow-hidden">
                  <div className="logo-inner w-full h-full flex items-center justify-center p-3">
                    <img
                      src={img.src}
                      alt={img.key}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      className="max-w-full max-h-full object-contain grayscale opacity-90 transition-all duration-500 ease-out hover:grayscale-0 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* subtle bottom vignette */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .our-clients-section { background-image: radial-gradient(circle at 10% 20%, rgba(255,255,255,0.02), transparent 6%), radial-gradient(circle at 90% 60%, rgba(255,255,255,0.01), transparent 10%); }
        .client-card { transition: transform 400ms cubic-bezier(.2,.9,.2,1), filter 350ms ease; }
        .client-card:hover { transform: translateY(-4px); }
        @media (max-width: 640px) {
          .client-card { width: 120px; height: 56px; }
        }
      `}</style>
    </section>
  )
}
