"use client"
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

type Props = {
  open: boolean
  onClose: () => void
}

const roomLinks = [
  { label: 'Explore Panoramic Suite Haram View 3D', url: 'https://my.matterport.com/show/?m=EZ7qCo4GRDQ&lang=en' },
  { label: 'Explore Premier Room Twin Partial Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=1d7h8PNvGTi&lang=en' },
  { label: 'Explore Deluxe Club Twin Partial Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=HqUpGpGoiNL&lang=en' },
  { label: 'Explore Deluxe Accessible room King Partial Haram View in 3D', url: 'https://my.matterport.com/show/?m=PcTB6UEjKzA&lang=en' },
  { label: 'Explore Superior Suite Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=2qDxAHdvd3y&lang=en' },
  { label: 'Explore Deluxe Room Twin Partial Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=ExhP5kXaE4E&lang=en' },
  { label: 'Explore Deluxe Room Twin Haram in 3D', url: 'https://my.matterport.com/show/?m=y771icHsJ5c&lang=en' },
  { label: 'Explore Deluxe Room Twin Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=aW7adyRvBe7&lang=en' },
  { label: 'Explore 3 Bedroom Presidential Suit Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=tRfGTCVwuZt&lang=en' },
  { label: 'Explore 4 Bedroom Penthouse Kaaba View in 3D', url: 'https://my.matterport.com/show/?m=MpYfYBopzMs&lang=en' },
  { label: 'Explore Junior Suite City View in 3D', url: 'https://my.matterport.com/show/?m=Sz3DmQstBKi&lang=en' },
]

export default function Sidebar({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="sidebar-inner">
        <button className="close" onClick={onClose} aria-label="Close menu">Close</button>
        <div className="logo">
          <Image src="/en/Logo-Address-Jabal-Omar-Makkah-Copy.svg" alt="logo" width={180} height={60} />
        </div>

        <nav className="links">
          <button
            className="link rooms-button"
            aria-expanded={expanded}
            aria-controls="rooms-list"
            onClick={() => setExpanded((s) => !s)}
          >
            Rooms &amp; Suites
          </button>

          {expanded && (
            <ul id="rooms-list" className="rooms-list" role="list">
              {roomLinks.map((r) => (
                    <li key={r.url} className="room-item">
                      <span className="room-label">{r.label}</span>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="room-view">view</a>
                    </li>
              ))}
            </ul>
          )}
        </nav>

  <div className="social" style={{ marginTop: 'auto' }}>
          <a href="https://www.facebook.com/AddressJabalOmarMakkah" aria-label="facebook" title="Facebook" className="social-link">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.1c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.1h-1.08c-1.06 0-1.39.66-1.39 1.34v1.58h2.37l-.38 2.9h-1.99v7A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="#" aria-label="twitter" title="Twitter" className="social-link">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 5.92c-.63.28-1.31.47-2.02.56.73-.44 1.28-1.14 1.54-1.97-.68.4-1.43.69-2.23.85A3.48 3.48 0 0016.1 4c-1.92 0-3.48 1.57-3.48 3.5 0 .27.03.53.09.78-2.89-.14-5.45-1.53-7.16-3.64-.3.52-.47 1.12-.47 1.76 0 1.22.62 2.3 1.56 2.93-.58-.02-1.12-.18-1.59-.44v.04c0 1.7 1.21 3.12 2.82 3.44-.3.08-.62.12-.95.12-.24 0-.47-.02-.69-.07.47 1.47 1.83 2.54 3.45 2.57A6.98 6.98 0 013 19.54a9.8 9.8 0 005.29 1.55c6.35 0 9.83-5.27 9.83-9.84v-.45c.67-.48 1.25-1.08 1.71-1.77-.62.28-1.28.47-1.97.55z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/addressjabalomarmakkah" aria-label="instagram" title="Instagram" className="social-link">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.9a4.1 4.1 0 100 8.2 4.1 4.1 0 000-8.2zM18.5 6a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/@addresshotelsandresorts" aria-label="youtube" title="YouTube" className="social-link">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23.5 6.2a3 3 0 00-2.12-2.12C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.38.58A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.12 2.12C4.4 20.5 12 20.5 12 20.5s7.6 0 9.38-.58a3 3 0 002.12-2.12A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
          </a>
  </div>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 0;
          overflow: hidden;
          background: rgba(255,255,255,0.98);
          box-shadow: -4px 0 12px rgba(0,0,0,0.12);
          transition: width 300ms ease;
          z-index: 40;
        }
        .sidebar.open { width: 340px; }
        @media (max-width: 400px) {
          .sidebar.open { width: 100%; }
        }
        .sidebar-inner { 
          padding: 28px; 
          display: flex; 
          flex-direction: column; 
          height: 100%; 
          overflow: hidden;
        }
  .close { background:none; border:0; font-size:16px; align-self:flex-end; cursor:pointer; color:#000; }
        .logo { margin: 12px 0 20px 0 }
        .links { 
          display: flex; 
          flex-direction: column; 
          gap: 18px; 
          margin-top: 12px; 
          flex: 1; 
          overflow-y: auto; 
          min-height: 0;
          padding-right: 8px; /* space for scrollbar */
          -webkit-overflow-scrolling: touch;
        }
        /* Custom scrollbar for cleaner look */
        .links::-webkit-scrollbar { width: 4px; }
        .links::-webkit-scrollbar-track { background: transparent; }
        .links::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .link { color:#111; text-decoration:none; font-size:18px; border-top:1px solid rgba(0,0,0,0.06); padding:12px 0; }
        .social { display:flex; gap:12px; align-items:center; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.06); flex-shrink: 0; }
        .social a { text-decoration:none; font-weight:bold; color:#000; display:inline-flex; align-items:center; }
        .rooms-button { background:none; border:0; text-align:left; padding:12px 0; font-size:18px; cursor:pointer; color:#111; }
  .rooms-list { list-style:none; padding:0 0 0 8px; margin:6px 0 0 0; display:flex; flex-direction:column; gap:8px; }
  .room-item { border-left: 3px solid rgba(0,0,0,0.06); padding-left:10px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .room-label { color:#000; font-size:15px; }
  .room-view { background:#0b5fff; color:#fff; padding:6px 10px; border-radius:8px; text-decoration:none; font-weight:600; font-size:13px; }
      `}</style>
    </aside>
  )
}
