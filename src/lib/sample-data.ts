/**
 * Sample Data for GoMapView CMS
 * This file contains sample data that can be used to populate the CMS
 * for demonstration purposes.
 */

export const sampleServices = [
  {
    title_en: '360 Virtual Tours',
    title_ar: 'جولات افتراضية 360',
    slug: '360-virtual-tours',
    description_en:
      'Immersive 360-degree virtual tours that let customers explore every corner of your property from anywhere in the world.',
    description_ar:
      'جولات افتراضية غامرة بزاوية 360 درجة تتيح للعملاء استكشاف كل زاوية من الممتلكات الخاصة بك.',
    icon: 'camera',
    features_en: ['High-resolution imagery', 'Interactive navigation', 'Mobile responsive', 'Google Business integration'],
    features_ar: ['صور عالية الدقة', 'الملاحة التفاعلية', 'متوافق مع الجوال', 'تكامل جوجل بيزنس'],
    order: 1,
  },
  {
    title_en: 'Matterport Tours',
    title_ar: 'جولات ماتربورت',
    slug: 'matterport-tours',
    description_en: 'Professional Matterport-style 3D virtual tours with precise measurements and floor plans.',
    description_ar: 'جولات افتراضية ثلاثية الأبعاد احترافية على غرار ماتربورت مع قياسات دقيقة.',
    icon: 'cube',
    features_en: ['3D floor plans', 'Accurate measurements', 'Professional quality', 'Customizable branding'],
    features_ar: ['خطط الطوابق ثلاثية الأبعاد', 'القياسات الدقيقة', 'جودة احترافية', 'الترويج القابل للتخصيص'],
    order: 2,
  },
  {
    title_en: 'Real Estate Photography',
    title_ar: 'تصوير العقارات',
    slug: 'real-estate-photography',
    description_en: 'Stunning drone and professional property photography that showcases your listings beautifully.',
    description_ar: 'تصوير احترافي وبالطائرات بدون طيار يعرض عقاراتك بشكل جميل.',
    icon: 'image',
    features_en: ['Drone photography', 'Professional editing', 'Aerial views', 'Fast turnaround'],
    features_ar: ['تصوير بالطائرات بدون طيار', 'التحرير الاحترافي', 'المناظر الجوية', 'استدارة سريعة'],
    order: 3,
  },
];

export const samplePortfolio = [
  {
    title_en: 'Luxury Penthouse Tour',
    title_ar: 'جولة البنتهاوس الفاخرة',
    slug: 'luxury-penthouse-tour',
    description_en: 'Modern luxury penthouse with stunning city views and premium amenities.',
    description_ar: 'بنتهاوس فاخرة حديثة مع مناظر مدينة مذهلة ووسائل مريحة عالية الجودة.',
    category: 'real-estate',
    clientName: 'Premium Real Estate Co.',
    location: 'Downtown District',
    featured: true,
  },
  {
    title_en: '5-Star Hotel Virtual Tour',
    title_ar: 'جولة الفندق الخمس نجوم',
    slug: '5-star-hotel-tour',
    description_en: 'Complete hotel facilities showcase including rooms, dining, and conference spaces.',
    description_ar: 'عرض كامل لمرافق الفندق بما فيها الغرف والمطاعم وقاعات المؤتمرات.',
    category: 'hospitality',
    clientName: 'Luxury Hotels Group',
    location: 'Business District',
    featured: true,
  },
];

export const sampleTeam = [
  {
    name_en: 'John Smith',
    name_ar: 'جون سميث',
    position_en: 'CEO & Founder',
    position_ar: 'الرئيس التنفيذي والمؤسس',
    bio_en: 'Visionary leader with 10+ years of experience in virtual reality and immersive technologies.',
    bio_ar: 'قائد بنظرة مستقبلية مع أكثر من 10 سنوات من الخبرة في الواقع الافتراضي والتقنيات الغامرة.',
    email: 'john@gomapview.com',
    order: 1,
  },
  {
    name_en: 'Sarah Johnson',
    name_ar: 'سارة جونسون',
    position_en: 'Head of Technology',
    position_ar: 'رئيسة قسم التكنولوجيا',
    bio_en: 'Tech innovator specializing in 3D rendering and virtual tour development.',
    bio_ar: 'مبتكر تكنولوجي متخصص في العرض ثلاثي الأبعاد وتطوير الجولات الافتراضية.',
    email: 'sarah@gomapview.com',
    order: 2,
  },
];

export const sampleTestimonials = [
  {
    name: 'Ahmed Hassan',
    position: 'Real Estate Agent',
    company: 'Prime Properties',
    content_en:
      "GoMapView transformed how we showcase properties. Our sales increased by 40% after implementing virtual tours.",
    content_ar:
      'حول GoMapView طريقة عرضنا للعقارات. زادت مبيعاتنا بنسبة 40٪ بعد تطبيق الجولات الافتراضية.',
    rating: 5,
  },
  {
    name: 'Fatima Al-Mansouri',
    position: 'Hotel Manager',
    company: 'Luxe Hotels',
    content_en: 'The virtual tours help guests make better decisions. We recommend GoMapView to all hotels.',
    content_ar: 'تساعد الجولات الافتراضية الضيوف على اتخاذ قرارات أفضل. ننصح جميع الفنادق بـ GoMapView.',
    rating: 5,
  },
];
