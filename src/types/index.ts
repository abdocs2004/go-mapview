export interface LocaleOption {
  code: string;
  label: string;
  rtl: boolean;
}

export interface SEO {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string;
  author?: string;
}

export interface Service {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image?: string;
  icon: string;
  features: {
    en: string[];
    ar: string[];
  };
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: string;
  images: string[];
  thumbnail?: string;
  featured: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  position: {
    en: string;
    ar: string;
  };
  image?: string;
  bio: {
    en: string;
    ar: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: {
    en: string;
    ar: string;
  };
  rating: number;
  image?: string;
}

export interface NavItem {
  label: {
    en: string;
    ar: string;
  };
  href: string;
  isExternal?: boolean;
}

export interface FooterLink {
  label: {
    en: string;
    ar: string;
  };
  href: string;
  isExternal?: boolean;
}
