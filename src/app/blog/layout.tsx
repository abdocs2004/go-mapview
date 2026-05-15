import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const navLinks = [
  { label: 'Home', href: '/en' },
  { label: 'About', href: '/en/about' },
  { label: 'Services', href: '/en/services' },
  { label: 'Portfolio', href: '/en/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header navLinks={navLinks} ctaLabel="Contact Us" ctaHref="/contact" />
      <div>{children}</div>
      <Footer />
    </div>
  );
}