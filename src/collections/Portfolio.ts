import type { CollectionConfig } from 'payload';

const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
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
        en: 'Title',
        ar: 'عنوان العمل',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: {
        en: 'Slug',
        ar: 'الرابط المختصر (Slug)',
      },
      type: 'text',
      required: true,
      unique: true,
      defaultValue: 'project-1',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      label: {
        en: 'Short Description',
        ar: 'وصف قصير',
      },
      type: 'textarea',
      localized: true,
    },
    {
      name: 'category',
      label: {
        en: 'Category',
        ar: 'القسم',
      },
      type: 'select',
      required: true,
      options: [
        { label: { en: 'Real Estate', ar: 'عقارات' }, value: 'real-estate' },
        { label: { en: 'Hospitality', ar: 'ضيافة' }, value: 'hospitality' },
        { label: { en: 'Commercial', ar: 'تجاري' }, value: 'commercial' },
        { label: { en: 'Photography', ar: 'تصوير' }, value: 'photography' },
        { label: { en: '360 Tour', ar: 'جولة 360' }, value: '360-tour' },
      ],
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      localized: true,
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredVideo',
      label: 'Featured Video',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'MP4 or WebM file' },
    },
    {
      name: 'videoUrl',
      label: 'External Video URL',
      type: 'text',
      admin: { description: 'Alternative to uploading video' },
    },
    {
      name: 'matterportUrl',
      label: 'Matterport Preview URL',
      type: 'text',
      admin: { description: 'Optional Matterport tour URL for showcase' },
    },
    {
      name: 'clientName',
      label: 'Client Name',
      type: 'text',
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show this project on the home page' },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'seo',
      label: 'SEO (for showcase listing)',
      type: 'group',
      fields: [
        { name: 'title', label: 'SEO title', type: 'text', localized: true },
        { name: 'description', label: 'SEO description', type: 'textarea', localized: true },
      ],
    },
  ],
};

export default Portfolio;
