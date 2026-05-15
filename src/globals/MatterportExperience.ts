import type { GlobalConfig } from 'payload';
import { getRevalidateSecret } from '@lib/revalidate';

const MatterportExperience: GlobalConfig = {
  slug: 'matterport-experience',
  label: 'Matterport Experience',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show/hide the Matterport section on home page' },
    },
    {
      name: 'sectionTitle',
      label: {
        en: 'Section Title',
        ar: 'عنوان القسم',
      },
      type: 'text',
      localized: true,
      admin: { description: 'Section heading' },
    },
    {
      name: 'sectionDescription',
      label: {
        en: 'Section Description',
        ar: 'وصف القسم',
      },
      type: 'textarea',
      localized: true,
      admin: { description: 'Short premium description' },
    },
    {
      name: 'matterportUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://my.matterport.com/show/?m=mD52qFoTJaU&lang=en',
      admin: {
        description: 'Full Matterport embed URL (e.g. https://my.matterport.com/show/?m=MODEL_ID&lang=en)',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Explore More Tours',
      localized: true,
      admin: { description: 'Optional CTA button label' },
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/services',
      admin: { description: 'Optional CTA button link' },
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
              tag: 'matterport-experience',
            }),
          }).catch((err) => console.error('[MatterportExperience revalidate]', err));
        } catch (error) {
          console.error('[MatterportExperience afterChange]', error);
        }
      },
    ],
  },
};

export default MatterportExperience;
