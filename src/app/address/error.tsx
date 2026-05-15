"use client"
import React from 'react'

export default function AdderssError({ error, reset }: { error: Error; reset: () => void }) {
  // Minimal user-friendly error UI for runtime errors on this route
  return (
    <div style={{padding:40,display:'flex',flexDirection:'column',gap:20,alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <h2 style={{color:'#111'}}>حدث خطأ بسيط</h2>
      <p style={{color:'#333'}}>واجهت الصفحة مشكلة أثناء التشغيل. هذا لا يؤثر على بقية الموقع.</p>
      <pre style={{maxWidth:800,whiteSpace:'pre-wrap',background:'#f7f7f7',padding:12,borderRadius:6}}>{String(error?.message)}</pre>
      <div>
        <button onClick={() => reset()} style={{marginRight:12,padding:'8px 12px'}}>حاول مرة أخرى</button>
      </div>
    </div>
  )
}
