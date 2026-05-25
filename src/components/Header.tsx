'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import localLogo from '../../public/logo.png';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@hooks/useLocale';
import { Menu, X, Globe, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import Container from './Container';
import { cn } from '@lib/utils';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  isExternal?: boolean;
  children?: NavLink[];
}

interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  whatsappNumber?: string;
  onLanguageChange?: (locale: string) => void;
  styleSettings?: {
    isSticky?: boolean;
    isTransparent?: boolean;
    navbarTheme?: string;
    mobileMenuStyle?: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  logo = '🗺️ GoMapView',
  logoAlt,
  navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ],
  ctaLabel = 'Get Started',
  ctaHref = '/contact',
  whatsappNumber = '+1234567890',
  styleSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hello%20GoMapView`;

  const renderNavLink = (link: NavLink, mobile = false) => {
    const content = (
      <span className={cn(link.active ? 'text-premium-accent' : 'text-dark-300 hover:text-white')}>
        {link.label}
      </span>
    );

    if (link.isExternal) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={mobile ? closeMenu : undefined}
          className={cn(
            'font-medium transition-all duration-300 hover:text-premium-accent relative',
            mobile ? 'block px-4 py-2 rounded-lg hover:bg-dark-800' : ''
          )}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={link.href}
        onClick={mobile ? closeMenu : undefined}
        className={cn(
          'font-medium transition-all duration-300 hover:text-premium-accent relative',
          mobile ? 'block px-4 py-2 rounded-lg hover:bg-dark-800' : ''
        )}
      >
        {content}
      </Link>
    );
  };

  const headerThemeClass =
    styleSettings?.navbarTheme === 'light'
      ? 'bg-white/95 text-dark-950 border-b border-slate-200'
      : styleSettings?.navbarTheme === 'glass'
        ? 'bg-white/10 backdrop-blur-xl border-b border-white/20'
        : 'bg-dark-950/95 backdrop-blur-md border-b border-dark-700/50';

  const mobileMenuClass =
    styleSettings?.mobileMenuStyle === 'fullscreen'
      ? 'fixed inset-0 z-40 bg-dark-950/98'
      : styleSettings?.mobileMenuStyle === 'popover'
        ? 'absolute left-3 right-3 top-20 z-40 rounded-2xl bg-dark-950/95 border border-dark-700/50'
        : 'fixed inset-0 top-20 lg:hidden z-40 bg-dark-950/95 backdrop-blur-md border-t border-dark-700/50';

  return (
    <>
      {/* Fixed Header */}
      <header
        className={cn(
          styleSettings?.isSticky === false ? 'relative top-0 left-0 right-0 z-50 transition-all duration-300' : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? `${headerThemeClass} shadow-lg`
            : styleSettings?.isTransparent === false
              ? headerThemeClass
              : 'bg-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              {logo && (logo.startsWith('/') || logo.startsWith('http://') || logo.startsWith('https://')) ? (
                <Image
                  src={logo === '/logo.png' ? localLogo : logo}
                  alt={logoAlt || 'GoMapView'}
                  width={120}
                  height={60}
                  priority
                  className="h-12 md:h-14 w-auto"
                />
              ) : (
                <div className="text-2xl md:text-3xl font-bold text-gradient">{logo}</div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const hasChildren = link.children && link.children.length > 0;
                const isOpen = activeDropdown === link.href;

                return (
                  <div 
                    key={`${link.href}-${link.label}`} 
                    className="relative dropdown-container"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        if (hasChildren) {
                          e.preventDefault();
                          setActiveDropdown(isOpen ? null : link.href);
                        }
                      }}
                      className="flex items-center gap-1 focus:outline-none"
                    >
                      {renderNavLink(link)}
                      {hasChildren && (
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isOpen && "rotate-180 text-premium-accent"
                        )} />
                      )}
                    </button>

                    {hasChildren && isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        className="absolute left-1/2 top-full z-50 mt-3 min-w-[240px] -translate-x-1/2 rounded-2xl border border-dark-700/80 bg-dark-950/95 p-2 shadow-2xl backdrop-blur-md"
                      >
                        <div className="flex flex-col">
                          {link.children!.map((child) => (
                            <div key={`${link.href}-${child.href}`} onClick={() => setActiveDropdown(null)}>
                              {renderNavLink(child, true)}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Language Switcher */}
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-dark-800 transition-colors flex items-center gap-2"
                title="Switch Language"
                onClick={() => {
                  const nextLocale = locale === 'en' ? 'ar' : 'en';
                  const segments = (pathname || '').split('/').filter(Boolean);
                  
                  // If we have segments and the first one is a known locale, replace it
                  if (segments.length > 0 && ['en', 'ar'].includes(segments[0])) {
                    segments[0] = nextLocale;
                  } else {
                    // Otherwise, prepend the next locale
                    segments.unshift(nextLocale);
                  }
                  
                  router.push(`/${segments.join('/')}`);
                }}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {locale === 'en' ? 'AR' : 'EN'}
                </span>
              </button>

              {/* CTA Button */}
              <Link href={ctaHref} className="hidden lg:block">
                <Button size="sm">{ctaLabel}</Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={cn(mobileMenuClass, styleSettings?.mobileMenuStyle === 'fullscreen' ? 'pt-24' : '', styleSettings?.mobileMenuStyle === 'popover' ? 'lg:hidden' : '')}>
          <Container className="py-8">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={`${link.href}-${link.label}`} className="space-y-2">
                  {renderNavLink(link, true)}
                  {link.children && link.children.length > 0 ? (
                    <div className="pl-4 border-l border-dark-700/60 space-y-1">
                      {link.children.map((child) => (
                        <div key={`${link.href}-${child.href}-mobile`}>{renderNavLink(child, true)}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <Link href={ctaHref} onClick={closeMenu} className="pt-4">
                <Button className="w-full">{ctaLabel}</Button>
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </>
  );
};

export default Header;
