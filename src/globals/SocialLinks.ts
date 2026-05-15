import type { GlobalConfig } from 'payload';
import { getRevalidateSecret } from '@lib/revalidate';

const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social links',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'style',
      type: 'group',
      fields: [
        {
          name: 'iconStyle',
          type: 'select',
          defaultValue: 'soft',
          options: [
            { label: 'Minimal', value: 'minimal' },
            { label: 'Soft', value: 'soft' },
            { label: 'Pill', value: 'pill' },
          ],
        },
      ],
    },
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
              tag: 'social-links',
            }),
          }).catch((err) => console.error('[SocialLinks revalidate]', err));
        } catch (error) {
          console.error('[SocialLinks afterChange]', error);
        }
      },
    ],
  },
};

export default SocialLinks;
