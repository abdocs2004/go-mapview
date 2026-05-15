"use client"
import React, { useState } from 'react'

import Sidebar from './Sidebar'
import styles from './styles.module.css'

export default function AdderssPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <video className={styles.bgVideo} autoPlay muted loop playsInline>
        <source src="/AddressMakkah.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.overlay} />

      <header className={styles.header}>
        <button className={styles.toggle} onClick={() => setOpen(true)} aria-label="Open menu">
          Menu
        </button>
      </header>

      <main className={styles.content}>
        <div className={styles.centerCard}>
          <img src="/en/Logo-Address-Jabal-Omar-Makkah-Copy.svg" alt="Address logo" width={300} height={120} />
        </div>
      </main>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
