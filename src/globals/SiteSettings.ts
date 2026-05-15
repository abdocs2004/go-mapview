import type { GlobalConfig } from 'payload';
import { getRevalidateSecret } from '@lib/revalidate';
import { createGlobalDesignSettingsFields } from '@lib/cms-style-fields';

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Global settings',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'siteName', type: 'text', required: true, localized: true },
    { name: 'siteDescription', type: 'textarea', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'text', localized: true },
    {
      name: 'whatsappNumber',
      type: 'text',
      admin: { description: 'E.164 e.g. +971501234567' },
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'textarea',
      admin: { description: 'Google Maps embed src URL for contact page' },
    },
    {
      name: 'analytics',
      label: { en: 'Analytics', ar: 'التحليلات والتتبع' },
      type: 'group',
      fields: [
        {
          name: 'gtmContainerId',
          label: { en: 'Google Tag Manager ID', ar: 'معرف Google Tag Manager' },
          type: 'text',
          admin: {
            description: 'Starts with GTM-XXXXXX',
            placeholder: 'GTM-XXXXXX',
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'defaultTitle', type: 'text', localized: true },
        { name: 'defaultDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    ...createGlobalDesignSettingsFields(),
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'https://localhost:3000'}/api/revalidate`;
          const secret = getRevalidateSecret();
          await fetch(revalidateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              revalidateSecret: secret,
              tag: 'site-settings',
            }),
          }).catch((err) => console.error('[SiteSettings revalidate]', err));
        } catch (error) {
          console.error('[SiteSettings afterChange]', error);
        }
      },
    ],
  },
};

export default SiteSettings;
