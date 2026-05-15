export type Locale = 'en' | 'ar';

export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

export const localeConfig: Record<Locale, { label: string; rtl: boolean }> = {
  en: { label: 'English', rtl: false },
  ar: { label: 'العربية', rtl: true },
};

export interface MessageKeys {
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    blog: string;
    contact: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
    hero_description: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  aboutSection: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subtitle: string;
    eyebrow: string;
    sectionTitle: string;
    sectionDescription: string;
    features: { title: string; description: string }[];
    stats: { value: string; label: string }[];
    videoLabel: string;
  };
  services: {
    title: string;
    description: string;
  };
  portfolio: {
    title: string;
    description: string;
    filterAll: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    learnMore: string;
    viewMore: string;
  };
}

export const messages: Record<Locale, MessageKeys> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
    home: {
      title: 'Immersive Virtual Tours',
      subtitle: 'Experience properties like never before',
      cta: 'Get Started',
      hero_description: 'Create stunning 360° virtual tours and immersive experiences for real estate, hotels, restaurants, and commercial properties.',
    },
    about: {
      title: 'About GoMapView',
      description: 'We transform the way people explore spaces',
      mission: 'Our mission',
      vision: 'Our vision',
    },
    aboutSection: {
      badge: 'About Us',
      headline: 'Immersive spaces with a',
      headlineAccent: 'digital edge',
      subtitle: 'A premium virtual tour experience built for visibility, engagement, and conversion.',
      eyebrow: 'GOMAPVIEW',
      sectionTitle: 'Built for modern discovery',
      sectionDescription:
        'We create polished 360° experiences that help customers explore spaces with clarity, confidence, and speed.',
      features: [
        {
          title: 'High-res 360° panoramic photography',
          description: 'Capture every angle with crisp detail and a premium viewing experience.',
        },
        {
          title: 'Google Maps visibility & optimization',
          description: 'Improve local presence and help your space stand out in search and maps.',
        },
        {
          title: 'Interactive virtual experience for customers',
          description: 'Let visitors explore your space in an intuitive, engaging way.',
        },
      ],
      stats: [
        { value: '360°', label: 'Virtual Tour' },
        { value: '+500', label: 'Happy Clients' },
        { value: '4K', label: 'Image Quality' },
        { value: 'Google', label: 'Certified Partner' },
      ],
      videoLabel: '360° Virtual Tour',
    },
    services: {
      title: 'Our Services',
      description: 'Comprehensive solutions for every need',
    },
    portfolio: {
      title: 'Our Portfolio',
      description: 'Explore our recent projects',
      filterAll: 'All',
    },
    contact: {
      title: 'Get in Touch',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      submit: 'Send Message',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
      learnMore: 'Learn More',
      viewMore: 'View More',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      portfolio: 'أعمالنا',
      blog: 'المدونة',
      contact: 'اتصل بنا',
    },
    home: {
      title: 'جولات افتراضية غامرة',
      subtitle: 'اكتشف العقارات بطريقة لم تشهدها من قبل',
      cta: 'ابدأ الآن',
      hero_description: 'أنشئ جولات افتراضية بزاوية 360 درجة وتجارب غامرة للعقارات والفنادق والمطاعم والعقارات التجارية.',
    },
    about: {
      title: 'عن GoMapView',
      description: 'نحن نغير طريقة استكشاف الأماكن',
      mission: 'مهمتنا',
      vision: 'رؤيتنا',
    },
    aboutSection: {
      badge: 'من نحن',
      headline: 'مساحات غامرة بهوية',
      headlineAccent: 'رقمية',
      subtitle: 'تجربة جولات افتراضية مميزة مصممة للظهور والتفاعل والتحويل.',
      eyebrow: 'GOMAPVIEW',
      sectionTitle: 'مصممة للاكتشاف العصري',
      sectionDescription:
        'ننشئ تجارب 360° مصقولة تساعد العملاء على استكشاف المكان بوضوح وثقة وسرعة.',
      features: [
        {
          title: 'تصوير بانورامي 360° عالي الدقة',
          description: 'التقاط كل زاوية بتفاصيل واضحة وتجربة مشاهدة فاخرة.',
        },
        {
          title: 'الظهور والتحسين على خرائط جوجل',
          description: 'تعزيز التواجد المحلي ومساعدة المكان على الظهور في البحث والخرائط.',
        },
        {
          title: 'تجربة افتراضية تفاعلية للعملاء',
          description: 'إتاحة استكشاف المكان بطريقة سلسة وجذابة.',
        },
      ],
      stats: [
        { value: '360°', label: 'جولة افتراضية' },
        { value: '+500', label: 'عميل سعيد' },
        { value: '4K', label: 'جودة الصورة' },
        { value: 'Google', label: 'شريك معتمد' },
      ],
      videoLabel: 'جولة افتراضية 360°',
    },
    services: {
      title: 'خدماتنا',
      description: 'حلول شاملة لكل احتياج',
    },
    portfolio: {
      title: 'أعمالنا',
      description: 'اكتشف مشاريعنا الأخيرة',
      filterAll: 'الكل',
    },
    contact: {
      title: 'تواصل معنا',
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      message: 'رسالتك',
      submit: 'إرسال الرسالة',
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ ما',
      success: 'نجح!',
      learnMore: 'اعرف أكثر',
      viewMore: 'عرض المزيد',
    },
  },
};

export function getMessage(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = messages[locale] as unknown as Record<string, unknown>;

  for (const k of keys) {
    if (!value || typeof value !== 'object') return key;
    value = (value as Record<string, unknown>)[k];
    if (value == null) return key;
  }

  return typeof value === 'string' ? value : key;
}
