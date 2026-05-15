export type LocalizedString = {
  en: string;
  ar: string;
};

export type BlogSection =
  | { kind: 'paragraph'; text: LocalizedString }
  | { kind: 'heading'; level: 1 | 2 | 3; text: LocalizedString }
  | { kind: 'list'; items: LocalizedString[] }
  | { kind: 'quote'; text: LocalizedString; cite?: string }
  | { kind: 'image'; src: string; alt: LocalizedString; caption?: LocalizedString }
  | { kind: 'callout'; title?: LocalizedString; text: LocalizedString }
  | { kind: 'links'; items: Array<{ label: LocalizedString; href: string }> };

export type BlogArticle = {
  slug: string;
  category: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  coverAlt: LocalizedString;
  readTime: LocalizedString;
  seoDescription: LocalizedString;
  keywords: string[];
  faq: Array<{ question: LocalizedString; answer: LocalizedString }>;
  sections: BlogSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: 'matterport-virtual-tours-increase-real-estate-sales-saudi-arabia',
    category: { en: 'Real Estate', ar: 'العقارات' },
    title: {
      en: 'Why Matterport Virtual Tours Increase Real Estate Sales in Saudi Arabia',
      ar: 'لماذا تزيد جولات ماتربورت الافتراضية من مبيعات العقارات في السعودية؟',
    },
    excerpt: {
      en: 'Matterport-style virtual tours help buyers inspect layouts faster, build trust sooner, and move from curiosity to inquiry with fewer friction points.',
      ar: 'تساعد الجولات الافتراضية بنمط ماتربورت المشترين على معاينة المخططات بشكل أسرع، وبناء الثقة في وقت أقصر، والانتقال من مرحلة الفضول إلى الاستفسار الجاد بنقاط احتكاك أقل.',
    },
    publishedAt: '2026-03-18',
    updatedAt: '2026-05-15',
    coverImage: '/blog-1.jpg',
    coverAlt: {
      en: 'Luxury property captured in a cinematic virtual tour',
      ar: 'عقار فاخر تم تصويره بجولة افتراضية سينمائية',
    },
    readTime: { en: '6 min read', ar: 'قراءة في 6 دقائق' },
    seoDescription: {
      en: 'Discover how Matterport virtual tours improve real estate sales performance in Saudi Arabia by increasing trust, reducing viewing friction, and accelerating buyer decisions.',
      ar: 'اكتشف كيف تعمل جولات ماتربورت الافتراضية على تحسين أداء مبيعات العقارات في السعودية من خلال زيادة الثقة وتقليل معوقات المشاهدة وتسريع قرارات المشترين.',
    },
    keywords: ['Matterport', 'real estate sales', 'Saudi Arabia', 'virtual tours', 'property marketing'],
    faq: [
      {
        question: {
          en: 'Do virtual tours replace in-person viewings?',
          ar: 'هل الجولات الافتراضية تغني عن الزيارة الميدانية؟',
        },
        answer: {
          en: 'No. They shorten the path to a serious viewing by helping buyers pre-qualify the property before they travel or book a physical tour.',
          ar: 'لا، بل تقصر الطريق نحو الزيارة الجادة من خلال مساعدة المشترين على التقييم الأولي للعقار قبل السفر أو حجز جولة ميدانية.',
        },
      },
      {
        question: {
          en: 'Which property types benefit the most?',
          ar: 'ما هي أنواع العقارات الأكثر استفادة؟',
        },
        answer: {
          en: 'Apartments, villas, branded residences, off-plan show units, and commercial listings benefit when the buyer wants clarity on layout and finish quality.',
          ar: 'تستفيد الشقق والفلل والوحدات السكنية والوحدات قيد الإنشاء والعقارات التجارية عندما يحتاج المشتري لوضوح في المخطط وجودة التشطيب.',
        },
      },
      {
        question: {
          en: 'Can Matterport tours help with luxury listings?',
          ar: 'هل تساعد جولات ماتربورت في تسويق العقارات الفاخرة؟',
        },
        answer: {
          en: 'Yes. Luxury buyers expect polished presentation, and immersive tours help them evaluate premium details without delays or uncertainty.',
          ar: 'نعم، يتوقع مشترو العقارات الفاخرة عرضاً احترافياً، وتساعدهم الجولات الغامرة على تقييم التفاصيل الدقيقة دون تأخير أو تردد.',
        },
      },
    ],
    sections: [
      {
        kind: 'paragraph',
        text: {
          en: 'In Saudi Arabia, the property buying journey is increasingly digital. Buyers expect premium visuals, transparent layouts, and fast access to accurate information before they commit time to a site visit.',
          ar: 'في المملكة العربية السعودية، أصبحت رحلة شراء العقارات رقمية بشكل متزايد. يتوقع المشترون مرئيات متميزة، ومخططات شفافة، ووصولاً سريعاً إلى معلومات دقيقة قبل تخصيص وقت لزيارة الموقع.',
        },
      },
      {
        kind: 'heading',
        level: 2,
        text: {
          en: 'Why the buying journey changes with immersive media',
          ar: 'لماذا تتغير رحلة الشراء مع الوسائط الغامرة',
        },
      },
      {
        kind: 'paragraph',
        text: {
          en: 'When a listing includes a polished Matterport-style tour, the buyer can move through the space at their own pace. That sense of control reduces hesitation and increases the quality of inbound leads.',
          ar: 'عندما يتضمن العرض جولة احترافية بنمط ماتربورت، يمكن للمشتري التنقل عبر المساحة بالسرعة التي تناسبه. هذا الشعور بالتحكم يقلل من التردد ويزيد من جودة الطلبات الواردة.',
        },
      },
      {
        kind: 'list',
        items: [
          { en: 'More time spent engaging with the listing', ar: 'وقت أطول يقضيه العميل في تصفح العقار' },
          { en: 'Stronger trust in the property presentation', ar: 'ثقة أكبر في طريقة عرض العقار' },
          { en: 'Fewer low-intent inquiries', ar: 'عدد أقل من الاستفسارات غير الجادة' },
          { en: 'Higher likelihood of booking a serious viewing', ar: 'احتمالية أكبر لحجز زيارة ميدانية جادة' },
        ],
      },
      {
        kind: 'callout',
        title: { en: 'Sales impact', ar: 'تأثير المبيعات' },
        text: {
          en: 'A better pre-viewing experience often means a shorter sales cycle, especially for high-value properties where confidence matters as much as aesthetics.',
          ar: 'تجربة ما قبل المشاهدة الأفضل تعني غالباً دورة مبيعات أقصر، خاصة للعقارات عالية القيمة حيث تهم الثقة بقدر ما تهم الجماليات.',
        },
      },
      {
        kind: 'heading',
        level: 2,
        text: {
          en: 'Where virtual tours add the most value',
          ar: 'أين تضيف الجولات الافتراضية أكبر قيمة',
        },
      },
      {
        kind: 'paragraph',
        text: {
          en: 'The biggest gains usually appear in premium villas, furnished apartments, hospitality assets, and commercial spaces where scale, finishing, and layout influence the buyer’s decision.',
          ar: 'تظهر أكبر المكاسب عادةً في الفلل الفاخرة، والشقق المفروشة، وأصول الضيافة، والمساحات التجارية حيث يؤثر المقياس والتشطيب والمخطط على قرار المشتري.',
        },
      },
      {
        kind: 'links',
        items: [
          {
            label: { en: 'Explore GoMapView services', ar: 'استكشف خدمات جو ماب فيو' },
            href: '/services',
          },
          {
            label: { en: 'Book a project discussion', ar: 'احجز موعد لمناقشة مشروعك' },
            href: '/contact',
          },
        ],
      },
      {
        kind: 'quote',
        text: {
          en: 'A virtual tour is not just a visual asset. It is a trust asset that helps the right buyer move faster.',
          ar: 'الجولة الافتراضية ليست مجرد أصل مرئي، بل هي أصل ثقة يساعد المشتري المناسب على اتخاذ القرار بشكل أسرع.',
        },
        cite: 'GoMapView editorial perspective',
      },
    ],
  },
  {
    slug: '360-virtual-tours-hotels-restaurants-benefits',
    category: { en: 'Hospitality', ar: 'الضيافة' },
    title: {
      en: 'Benefits of 360 Virtual Tours for Hotels and Restaurants',
      ar: 'فوائد الجولات الافتراضية 360 للفنادق والمطاعم',
    },
    excerpt: {
      en: 'Hotels and restaurants use 360 tours to improve bookings, strengthen first impressions, and let guests preview the atmosphere before they arrive.',
      ar: 'تستخدم الفنادق والمطاعم جولات 360 لتحسين الحجوزات، وتعزيز الانطباعات الأولى، والسماح للضيوف بمعاينة الأجواء قبل وصولهم.',
    },
    publishedAt: '2026-02-22',
    updatedAt: '2026-05-15',
    coverImage: '/blog-2.jpg',
    coverAlt: {
      en: 'Hospitality venue showcased through a 360 virtual experience',
      ar: 'مكان ضيافة يتم عرضه من خلال تجربة افتراضية 360 درجة',
    },
    readTime: { en: '5 min read', ar: 'قراءة في 5 دقائق' },
    seoDescription: {
      en: 'Learn how 360 virtual tours help hotels and restaurants increase bookings, improve guest confidence, and present their atmosphere with premium visual storytelling.',
      ar: 'تعرف على كيف تساعد الجولات الافتراضية 360 الفنادق والمطاعم على زيادة الحجوزات، وتحسين ثقة الضيوف، وعرض أجوائهم بسرد بصري متميز.',
    },
    keywords: ['360 virtual tours', 'hotels', 'restaurants', 'hospitality marketing', 'guest trust'],
    faq: [
      {
        question: {
          en: 'Are 360 tours useful for small restaurants?',
          ar: 'هل جولات 360 مفيدة للمطاعم الصغيرة؟',
        },
        answer: {
          en: 'Yes. Even compact venues benefit because guests can quickly understand ambiance, seating, and layout before making a reservation.',
          ar: 'نعم. حتى الأماكن الصغيرة تستفيد لأن الضيوف يمكنهم فهم الأجواء والمقاعد والمخطط بسرعة قبل إجراء الحجز.',
        },
      },
      {
        question: {
          en: 'Do hotel tours improve direct bookings?',
          ar: 'هل تعمل جولات الفنادق على تحسين الحجوزات المباشرة؟',
        },
        answer: {
          en: 'They can. A clearer and more premium presentation builds confidence and reduces reliance on third-party booking platforms.',
          ar: 'ممكن. العرض الأكثر وضوحاً وتميزاً يبني الثقة ويقلل الاعتماد على منصات الحجز الخارجية.',
        },
      },
    ],
    sections: [
      {
        kind: 'paragraph',
        text: {
          en: 'Hospitality is an experience industry. Guests are not only buying a room or a meal, they are buying atmosphere, reassurance, and anticipation. A high-end 360 tour helps communicate all three instantly.',
          ar: 'الضيافة هي صناعة تجربة. لا يشتري الضيوف مجرد غرفة أو وجبة، بل يشترون الأجواء والاطمئنان والترقب. تساعد جولة 360 الراقية في إيصال هذه المشاعر الثلاثة فوراً.',
        },
      },
      {
        kind: 'heading',
        level: 2,
        text: {
          en: 'How immersive tours increase guest confidence',
          ar: 'كيف تزيد الجولات الغامرة من ثقة الضيوف',
        },
      },
      {
        kind: 'list',
        items: [
          { en: 'Better pre-booking transparency', ar: 'شفافية أفضل قبل الحجز' },
          { en: 'Stronger visual differentiation from competitors', ar: 'تميز بصري أقوى عن المنافسين' },
          { en: 'Higher perceived quality and attention to detail', ar: 'جودة ملموسة أعلى واهتمام بالتفاصيل' },
          { en: 'More time spent interacting with the venue online', ar: 'وقت أطول يقضيه العميل في التفاعل مع المكان عبر الإنترنت' },
        ],
      },
      {
        kind: 'callout',
        title: { en: 'Hospitality advantage', ar: 'ميزة الضيافة' },
        text: {
          en: 'For premium hotels and signature restaurants, a cinematic digital walkthrough can feel like an extension of the brand experience itself.',
          ar: 'بالنسبة للفنادق الفاخرة والمطاعم المتميزة، يمكن أن تبدو الجولة الرقمية السينمائية وكأنها امتداد لتجربة العلامة التجارية نفسها.',
        },
      },
      {
        kind: 'links',
        items: [
          {
            label: { en: 'See GoMapView services', ar: 'شاهد خدمات جو ماب فيو' },
            href: '/services',
          },
          {
            label: { en: 'Request a hospitality proposal', ar: 'اطلب عرض سعر لقطاع الضيافة' },
            href: '/contact',
          },
        ],
      },
    ],
  },
  {
    slug: 'google-business-virtual-tours-improve-customer-trust',
    category: { en: 'Local SEO', ar: 'سيو محلي' },
    title: {
      en: 'How Google Business Virtual Tours Improve Customer Trust',
      ar: 'كيف تعمل جولات جوجل بيزنس الافتراضية على تحسين ثقة العملاء',
    },
    excerpt: {
      en: 'A Google Business virtual tour gives customers a clearer sense of your space, which can increase confidence before they call, book, or visit.',
      ar: 'تمنح جولة جوجل بيزنس الافتراضية العملاء شعوراً أوضح بمساحتك، مما قد يزيد الثقة قبل الاتصال أو الحجز أو الزيارة.',
    },
    publishedAt: '2026-01-14',
    updatedAt: '2026-05-15',
    coverImage: '/blog-3.jpg',
    coverAlt: {
      en: 'Google Business listing experience displayed in a premium visual layout',
      ar: 'تجربة إدراج جوجل بيزنس معروضة في تخطيط بصري متميز',
    },
    readTime: { en: '5 min read', ar: 'قراءة في 5 دقائق' },
    seoDescription: {
      en: 'See how Google Business virtual tours support customer trust by improving transparency, strengthening local presence, and helping your business stand out in search.',
      ar: 'شاهد كيف تدعم جولات جوجل بيزنس الافتراضية ثقة العملاء من خلال تحسين الشفافية وتعزيز التواجد المحلي ومساعدة عملك على البروز في نتائج البحث.',
    },
    keywords: ['Google Business', 'virtual tours', 'customer trust', 'local SEO', 'Google Maps'],
    faq: [
      {
        question: {
          en: 'Do virtual tours help local search visibility?',
          ar: 'هل تساعد الجولات الافتراضية في ظهور البحث المحلي؟',
        },
        answer: {
          en: 'They can support engagement signals and make your listing more compelling, which improves the chance that searchers choose your business.',
          ar: 'يمكنها دعم إشارات التفاعل وجعل إدراجك أكثر جاذبية، مما يحسن فرصة اختيار الباحثين لعملك.',
        },
      },
      {
        question: {
          en: 'Which businesses need this most?',
          ar: 'ما هي الشركات التي تحتاج هذا أكثر؟',
        },
        answer: {
          en: 'Showrooms, clinics, hospitality venues, retail stores, and service businesses benefit from an extra layer of trust and transparency.',
          ar: 'تستفيد صالات العرض والعيادات وأماكن الضيافة ومتاجر التجزئة والشركات الخدمية من طبقة إضافية من الثقة والشفافية.',
        },
      },
    ],
    sections: [
      {
        kind: 'paragraph',
        text: {
          en: 'Customers often decide whether to contact a business in just a few seconds. If the online presence feels vague, outdated, or generic, trust drops fast. A virtual tour fixes that by showing the real environment behind the brand.',
          ar: 'غالباً ما يقرر العملاء التواصل مع نشاط تجاري في غضون ثوانٍ قليلة. إذا كان التواجد عبر الإنترنت يبدو غامضاً أو قديماً، فإن الثقة تنخفض بسرعة. الجولة الافتراضية تصلح ذلك من خلال إظهار البيئة الحقيقية وراء العلامة التجارية.',
        },
      },
      {
        kind: 'heading',
        level: 2,
        text: {
          en: 'Why transparency matters in local search',
          ar: 'لماذا تهم الشفافية في البحث المحلي',
        },
      },
      {
        kind: 'list',
        items: [
          { en: 'Stronger first impression in Google Business Profile', ar: 'انطباع أول أقوى في ملف جوجل بيزنس' },
          { en: 'More confidence before visiting the location', ar: 'ثقة أكبر قبل زيارة الموقع' },
          { en: 'Clearer expectation setting for new customers', ar: 'تحديد توقعات أوضح للعملاء الجدد' },
          { en: 'Better support for service and venue credibility', ar: 'دعم أفضل لمصداقية الخدمة والمكان' },
        ],
      },
      {
        kind: 'callout',
        title: { en: 'Trust signal', ar: 'إشارة ثقة' },
        text: {
          en: 'The more real your business feels online, the easier it becomes for a customer to choose you over a competitor with a weaker visual presence.',
          ar: 'كلما بدا عملك أكثر واقعية عبر الإنترنت، أصبح من الأسهل على العميل اختيارك على منافس بتواجد بصري أضعف.',
        },
      },
      {
        kind: 'links',
        items: [
          {
            label: { en: 'Browse our services', ar: 'تصفح خدماتنا' },
            href: '/services',
          },
          {
            label: { en: 'Talk to GoMapView', ar: 'تحدث إلى جو ماب فيو' },
            href: '/contact',
          },
        ],
      },
    ],
  },
];

export function getBlogArticles(): BlogArticle[] {
  return blogArticles;
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
