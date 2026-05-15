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
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      label: 'Short Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'Hospitality', value: 'hospitality' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Photography', value: 'photography' },
        { label: '360 Tour', value: '360-tour' },
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
