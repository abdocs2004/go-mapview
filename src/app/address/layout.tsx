import React from 'react'
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { getPayloadClient } from '@lib/payload-client';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Address - Address Jabal Omar',
}

export default async function AdderssLayout({ children }: { children: React.ReactNode }) {
  let gtmId = '';
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: 'site-settings' });
    const analytics = settings?.analytics as { gtmContainerId?: string } | undefined;
    gtmId = analytics?.gtmContainerId || '';
  } catch (error) {
    console.error('Failed to fetch GTM ID for Address layout:', error);
  }

  return (
    <div className="address-wrapper relative">
      {gtmId && (
        <>
          <Script
            id="gtm-script-address"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Page-specific background video */}
      <div className="site-bg" aria-hidden>
        <video className="site-bg-video" autoPlay muted loop playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
          <source src="/AddressMakkahW.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="site-bg-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 0 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
