import type { CollectionConfig } from 'payload';

const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'position', type: 'text', required: true, localized: true },
    { name: 'bio', type: 'richText', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'email', type: 'email' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'github', type: 'text' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
};

export default Team;
