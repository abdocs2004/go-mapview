import type { GlobalConfig } from 'payload';
import { getRevalidateSecret } from '@lib/revalidate';
import { createFooterStyleFields } from '@lib/cms-style-fields';

const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'companyInfo',
      type: 'group',
      fields: [
        { name: 'logoLabel', type: 'text', localized: true, admin: { description: 'Text logo fallback' } },
        { name: 'description', type: 'richText', localized: true },
      ],
    },
    {
      name: 'quickLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'servicesLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'text', localized: true },
      ],
    },
    { name: 'copyright', type: 'text', localized: true },
    ...createFooterStyleFields(),
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/revalidate`;
          const secret = getRevalidateSecret();
          await fetch(revalidateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              revalidateSecret: secret,
              tag: 'footer',
            }),
          }).catch((err) => console.error('[Footer revalidate]', err));
        } catch (error) {
          console.error('[Footer afterChange]', error);
        }
      },
    ],
  },
};

export default Footer;