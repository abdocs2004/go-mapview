'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@lib/utils';

interface WhatsAppFloatProps {
  phone?: string;
  className?: string;
}

export default function WhatsAppFloat({ phone, className }: WhatsAppFloatProps) {
  const n = (phone || '').replace(/\D/g, '');
  if (!n) return null;

  const href = `https://wa.me/${n}?text=${encodeURIComponent('Hello GoMapView — I would like to discuss a virtual tour project.')}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 md:h-16 md:w-16',
        className
      )}
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
}
