import React from 'react';
import DocumentLang from '@components/DocumentLang';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { getPayloadClient } from '@lib/payload-client';
import Script from 'next/script';
import { Poppins, Sora, Cairo } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: 'GoMapView - Virtual Tours & 360° Immersive Experiences',
  description: 'Immersive capture · Matterport-grade delivery for real estate, hospitality, retail & landmarks.',
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
  },
};

export const dynamic = 'force-dynamic';

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  let gtmId = '';
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    });
    const analytics = settings?.analytics as { gtmContainerId?: string } | undefined;
    gtmId = analytics?.gtmContainerId || '';
  } catch (error) {
    console.error('Failed to fetch GTM ID:', error);
  }

  return (
    <html lang="en" className={`${poppins.variable} ${sora.variable} ${cairo.variable}`}>
      <body>
        {gtmId && (
          <>
            <Script
              id="gtm-script"
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
        <DocumentLang />
        <div className="min-h-screen bg-dark-950 text-white antialiased selection:bg-premium-accent/30">
          {children}
        </div>
      </body>
    </html>
  );
}
