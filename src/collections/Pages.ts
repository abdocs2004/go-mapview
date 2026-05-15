import type { CollectionConfig } from 'payload';
import { pageSectionBlocks } from './pageSectionBlocks';
import { REVALIDATE_SECRET } from '@lib/revalidate';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', 'isPublished', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Page Title',
        ar: 'عنوان الصفحة',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: {
        en: 'URL Slug',
        ar: 'رابط الصفحة (Slug)',
      },
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Use lowercase, e.g. home, about, contact' },
    },
    {
      name: 'pageType',
      label: {
        en: 'Page Type',
        ar: 'نوع الصفحة',
      },
      type: 'select',
      required: true,
      options: [
        { label: { en: 'Home', ar: 'الرئيسية' }, value: 'home' },
        { label: { en: 'About', ar: 'من نحن' }, value: 'about' },
        { label: { en: 'Services', ar: 'الخدمات' }, value: 'services' },
        { label: { en: 'Portfolio', ar: 'الأعمال' }, value: 'portfolio' },
        { label: { en: 'Contact', ar: 'اتصل بنا' }, value: 'contact' },
        { label: { en: 'Address', ar: 'العنوان' }, value: 'address' },
        { label: { en: 'Custom', ar: 'مخصصة' }, value: 'custom' },
      ],
    },
    {
      name: 'showInNavigation',
      label: {
        en: 'Show in navigation',
        ar: 'عرض في القائمة العليا',
      },
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: {
          en: 'Disable this for hidden pages such as /address.',
          ar: 'عطل هذا للخيار للصفحات المخفية مثل /address.',
        },
      },
    },
    {
      name: 'sections',
      label: {
        en: 'Page sections',
        ar: 'أقسام الصفحة',
      },
      type: 'blocks',
      blocks: pageSectionBlocks,
      admin: {
        description: {
          en: 'Build immersive layouts (hero, tours, CTAs). Used by the frontend per page type.',
          ar: 'ابني تخطيطات غامرة (هيرو، جولات، دعوات لاتخاذ إجراء). يتم استخدامها في الواجهة الأمامية حسب نوع الصفحة.',
        },
      },
    },
    {
      name: 'content',
      label: 'Legacy body (optional)',
      type: 'richText',
      localized: true,
    },
    {
      name: 'heroImage',
      label: 'Hero image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'addressPage',
      label: 'Address page experience',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'address',
        description: 'Controls for the hidden cinematic /address page.',
      },
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'headline',
          label: 'H1 title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'companyLogo',
          label: 'Company logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'showAsidePanel',
          label: 'Show aside panel',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showNavigationLinks',
          label: 'Show navigation links',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showSocialLinks',
          label: 'Show social links',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'navLinks',
          label: 'Aside navigation links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true },
            {
              name: 'href',
              type: 'text',
              required: true,
              admin: { description: 'Use anchors such as #lobby or external URLs.' },
            },
          ],
        },
        {
          name: 'socialLinks',
          label: 'Aside social links',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'X', value: 'x' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Website', value: 'website' },
              ],
            },
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', label: 'SEO title', type: 'text', localized: true },
        { name: 'description', label: 'SEO description', type: 'textarea', localized: true },
        { name: 'keywords', label: 'Keywords', type: 'text', localized: true },
        { name: 'ogImage', label: 'Open Graph image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'publishedAt',
      label: {
        en: 'Published at',
        ar: 'تاريخ النشر',
      },
      type: 'date',
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'isPublished',
      label: {
        en: 'Published',
        ar: 'منشور',
      },
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
          await fetch(`${baseUrl}/api/revalidate`, {
            method: 'POST',
            headers: {
              'x-revalidate-secret': REVALIDATE_SECRET,
            },
          });
        } catch (error) {
          console.error('Failed to revalidate after page change', error);
        }
      },
    ],
  },
};

export default Pages;
