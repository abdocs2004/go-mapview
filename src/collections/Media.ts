import type { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'center' },
      { name: 'card', width: 800, height: undefined, position: 'center' },
      { name: 'hero', width: 1920, height: undefined, position: 'center' },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      localized: true,
    },
    { name: 'caption', label: 'Caption', type: 'text', localized: true },
    // Cloudinary technical fields (hidden from admin UI)
    { name: 'public_id', type: 'text', admin: { hidden: true } },
    { name: 'resource_type', type: 'text', admin: { hidden: true } },
    { name: 'format', type: 'text', admin: { hidden: true } },
    { name: 'secure_url', type: 'text', admin: { hidden: true } },
    { name: 'bytes', type: 'number', admin: { hidden: true } },
    { name: 'width', type: 'number', admin: { hidden: true } },
    { name: 'height', type: 'number', admin: { hidden: true } },
  ],
};

export default Media;
