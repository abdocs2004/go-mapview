import type { CollectionConfig } from 'payload';

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'rating', 'isPublished', 'featured', 'order'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'position', type: 'text', localized: true },
    { name: 'company', type: 'text', localized: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'location', type: 'text' },
    { name: 'googleReviewUrl', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'isPublished', type: 'checkbox', defaultValue: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
  hooks: {
    afterChange: [async () => {
      try {
        const secret = process.env.REVALIDATE_SECRET || 'gomap-revalidate-dev';
        const base = process.env.NEXT_PUBLIC_SERVER_URL || '';
        const url = `${base}/api/revalidate?secret=${secret}&path=/`;
        // fire-and-forget
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetch(url, { method: 'POST' }).catch(() => null);
      } catch (e) {
        // noop
      }
    }],
  },
};

export default Testimonials;
