'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Menu,
  MessageCircle,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import { cn } from '@lib/utils';

type AddressLink = {
  label: string;
  href: string;
};

type AddressSocialLink = {
  platform: string;
  label?: string;
  href: string;
};

interface AddressAsidePanelProps {
  companyName: string;
  title: string;
  logoUrl?: string | null;
  links: AddressLink[];
  socialLinks: AddressSocialLink[];
  showNavigationLinks?: boolean;
  showSocialLinks?: boolean;
}

const socialIconMap: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  x: <Twitter className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  whatsapp: <MessageCircle className="h-5 w-5" />,
  website: <Globe className="h-5 w-5" />,
};

function getSocialIcon(platform: string) {
  return socialIconMap[platform.toLowerCase()] ?? <Globe className="h-5 w-5" />;
}

export default function AddressAsidePanel({
  companyName,
  title,
  logoUrl,
  links,
  socialLinks,
  showNavigationLinks = true,
  showSocialLinks = true,
}: AddressAsidePanelProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const visibleLinks = useMemo(
    () => links.filter((link) => typeof link.href === 'string' && link.href.length > 0),
    [links]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="address-aside-panel"
        className={cn(
          'fixed right-4 top-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/10',
          'bg-slate-950/80 text-white shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:scale-105 hover:border-white/20'
        )}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close panel"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] cursor-default bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              id="address-aside-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              className={cn(
                'fixed inset-y-0 right-0 z-[65] flex w-full max-w-[22rem] flex-col overflow-hidden',
                'border-l border-white/10 bg-slate-950/90 text-white shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl',
                'md:max-w-[26rem]'
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_42%)]" />
              <div className="relative flex h-full flex-col px-6 py-8 md:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {logoUrl ? (
                      <Image src={logoUrl} alt={companyName} width={56} height={56} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold tracking-[0.3em] text-white/80">GM</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Luxury Experience</p>
                    <p className="mt-1 text-sm text-white/70">{companyName}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <p className="text-sm uppercase tracking-[0.4em] text-amber-300/80">Immersive Address</p>
                  <h1 className="max-w-sm text-4xl font-semibold leading-[1.05] md:text-5xl">{title}</h1>
                </div>

                {showNavigationLinks && visibleLinks.length > 0 ? (
                  <nav className="mt-10 flex-1 overflow-y-auto pr-1">
                    <ul className="space-y-3">
                      {visibleLinks.map((link) => (
                        <li key={`${link.label}-${link.href}`}>
                          <a
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              'group flex items-center justify-between rounded-2xl border border-white/8 px-4 py-4',
                              'bg-white/4 text-sm text-white/80 transition-all duration-300 hover:border-amber-300/30 hover:bg-white/8 hover:text-white'
                            )}
                          >
                            <span className="text-base font-medium tracking-wide">{link.label}</span>
                            <ChevronRight className="h-4 w-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : (
                  <div className="mt-10 flex-1" />
                )}

                {showSocialLinks && socialLinks.length > 0 ? (
                  <div className="relative mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">Connect</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={`${link.platform}-${link.href}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label || link.platform}
                          className={cn(
                            'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10',
                            'bg-white/5 text-white/85 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/30 hover:bg-amber-300/10 hover:text-amber-200'
                          )}
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}