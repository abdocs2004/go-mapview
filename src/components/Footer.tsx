'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import localLogo from '../../public/logo.png';
import { useLocale } from '@hooks/useLocale';
import type { Locale } from '@lib/i18n';
import { defaultFooterServiceLinks } from '@lib/service-footer-links';
import { CMSRichText } from './CMSRichText';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import Container from './Container';
import { cn } from '@lib/utils';

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  logoAlt?: string;
  logo?: string;
  description?: string | Record<string, unknown>;
  companyInfo?: string;
  quickLinks?: FooterLink[];
  servicesLinks?: FooterLink[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: SocialLink[];
  copyright?: string;
  styleSettings?: {
    layout?: string;
    theme?: string;
    socialIconStyle?: string;
  };
}

const Footer: React.FC<FooterProps> = ({
  logo = '🗺️ GoMapView',
  logoAlt,
  description = 'Transform the way people explore spaces with immersive virtual tours and 360° experiences.',
  quickLinks: quickLinksProp,
  servicesLinks: servicesLinksProp,
  contactInfo = {
    email: 'info@gomapview.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Innovation City, IC 12345',
  },
  socialLinks = [
    {
      platform: 'facebook',
      url: 'https://facebook.com/gomapview',
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/gomapview',
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/gomapview',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/company/gomapview',
    },
  ],
  copyright,
  styleSettings,
}) => {
  const locale = useLocale() as Locale;
  const displayCopyright = copyright ?? (locale === 'en' ? `© ${new Date().getFullYear()} GoMapView. All rights reserved.` : `© ${new Date().getFullYear()} جو ماب فيو. جميع الحقوق محفوظة.`);

  const base = `/${locale}`;
  const quickLinks =
    quickLinksProp ??
    [
      { label: locale === 'en' ? 'Home' : 'الرئيسية', href: base },
      { label: locale === 'en' ? 'About' : 'من نحن', href: `${base}/about` },
      { label: locale === 'en' ? 'Services' : 'الخدمات', href: `${base}/services` },
      { label: locale === 'en' ? 'Portfolio' : 'أعمالنا', href: `${base}/portfolio` },
      { label: locale === 'en' ? 'Blog' : 'المدونة', href: '/blog' },
      { label: locale === 'en' ? 'Contact' : 'اتصل بنا', href: `${base}/contact` },
    ];
  const servicesLinks = servicesLinksProp ?? defaultFooterServiceLinks(locale);

  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const logoIsImage = logo && (logo.startsWith('/') || logo.startsWith('http://') || logo.startsWith('https://'));

  const footerThemeClass =
    styleSettings?.theme === 'light'
      ? 'bg-gradient-to-b from-slate-50 to-white text-dark-950 border-slate-200'
      : styleSettings?.theme === 'luxury-blue'
        ? 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white border-blue-900/60'
        : 'bg-gradient-to-b from-dark-900 to-dark-950 border-dark-700/50';

  const footerGridClass =
    styleSettings?.layout === 'columns-2'
      ? 'grid grid-cols-1 md:grid-cols-2 gap-12 mb-12'
      : styleSettings?.layout === 'columns-3'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12'
        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12';

  const socialIconClass =
    styleSettings?.socialIconStyle === 'minimal'
      ? 'p-2 text-dark-400 hover:text-premium-accent transition-all duration-300'
      : styleSettings?.socialIconStyle === 'pill'
        ? 'px-4 py-2 rounded-full bg-dark-800/60 hover:bg-premium-accent/20 hover:text-premium-accent transition-all duration-300'
        : 'p-2.5 rounded-lg bg-dark-800/50 hover:bg-premium-accent/20 hover:text-premium-accent transition-all duration-300';

  const displayDescription = typeof description === 'string' 
    ? (description === 'Transform the way people explore spaces with immersive virtual tours and 360° experiences.' && locale === 'ar'
        ? 'حوّل طريقة استكشاف الناس للمساحات من خلال جولات افتراضية غامرة وتجارب 360 درجة.'
        : description)
    : description;

  return (
    <footer className={cn('border-t py-8 md:py-10', footerThemeClass)}>
      <Container>
        {/* Main Footer Content */}
        <div className={footerGridClass}>
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <Link href={base} className="inline-block hover:opacity-80 transition-opacity">
              {logoIsImage ? (
                <Image
                  src={logo === '/logo.png' ? localLogo : logo}
                  alt={logoAlt || (typeof logo === 'string' ? logo : 'GoMapView')}
                  width={50}
                  height={50}
                  className="h-12 w-auto"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gradient">{logo}</h2>
              )}
            </Link>
            {typeof displayDescription === 'string' ? (
              <p className="text-dark-400 text-sm leading-relaxed">{displayDescription}</p>
            ) : (
              <CMSRichText data={displayDescription} className="text-dark-400 text-sm leading-relaxed" />
            )}
            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialIconClass}
                  title={link.platform}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {locale === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-premium-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {locale === 'en' ? 'Services' : 'الخدمات'}
            </h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-premium-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {locale === 'en' ? 'Contact' : 'تواصل معنا'}
            </h3>
            <ul className="space-y-4">
              {contactInfo.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-premium-accent flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-dark-400 hover:text-premium-accent transition-colors duration-300 text-sm break-all"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-premium-accent flex-shrink-0 mt-0.5" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-dark-400 hover:text-premium-accent transition-colors duration-300 text-sm"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}

              {/* WhatsApp contact shown below email for quick access */}
              {(contactInfo.phone || contactInfo.email) && (
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-premium-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 .08 5.293.08 11.92c0 2.09.547 4.138 1.585 5.95L0 24l6.295-1.644A11.92 11.92 0 0012 23.92c6.627 0 11.92-5.293 11.92-11.999a11.9 11.9 0 00-3.4-8.441z" fill="currentColor" opacity="0.12" />
                    <path d="M17.472 14.382c-.297-.148-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.148-.198.297-.768.967-.942 1.164-.173.198-.347.223-.644.074-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.151-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.148-.672-1.612-.92-2.208-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.793.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.095 3.2 5.077 4.487.709.306 1.26.489 1.692.626.71.226 1.357.194 1.868.118.57-.085 1.758-.718 2.006-1.412.248-.695.248-1.29.173-1.412-.074-.123-.272-.198-.57-.347z" fill="currentColor" />
                  </svg>
                  <a
                    href={`https://wa.me/${(contactInfo.phone || '').toString().replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-400 hover:text-premium-accent transition-colors duration-300 text-sm"
                  >
                    {contactInfo.phone 
                      ? (locale === 'en' ? `WhatsApp: ${contactInfo.phone}` : `واتساب: ${contactInfo.phone}`)
                      : (locale === 'en' ? 'WhatsApp' : 'واتساب')}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-premium-accent flex-shrink-0 mt-0.5" />
                  <span className="text-dark-400 text-sm">{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-500">
          <p>{displayCopyright}</p>
          <p>
            {locale === 'en' ? 'Made with ❤️ by GoMapView • ' : 'صنع بكل ❤️ بواسطة جو ماب فيو • '}
            {currentYear}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
