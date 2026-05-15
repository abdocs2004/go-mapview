import type { GlobalConfig } from 'payload';
import { getRevalidateSecret } from '@lib/revalidate';
import { createHeaderStyleFields } from '@lib/cms-style-fields';

const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'mainNavigation',
      label: 'Main navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: { description: 'Relative path without locale, e.g. /about' },
        },
        { name: 'isExternal', type: 'checkbox', defaultValue: false },
        {
          name: 'subMenu',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
    ...createHeaderStyleFields(),
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
              tag: 'navigation',
            }),
          }).catch((err) => console.error('[Navigation revalidate]', err));
        } catch (error) {
          console.error('[Navigation afterChange]', error);
        }
      },
    ],
  },
};

export default Navigation;
