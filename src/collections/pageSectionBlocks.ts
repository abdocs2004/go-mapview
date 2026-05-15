import type { Block } from 'payload';
import { createSectionStyleFields } from '@lib/cms-style-fields';

const styleFields = createSectionStyleFields();

export const pageSectionBlocks: Block[] = [
  {
    slug: 'heroImmersive',
    labels: { plural: 'Hero (immersive)', singular: 'Hero (immersive)' },
    fields: [
      {
        name: 'videoUrl',
        type: 'text',
        admin: {
          description: 'Direct MP4/WebM URL (e.g. CDN). Leave empty for gradient-only hero.',
        },
      },
      { name: 'poster', type: 'upload', relationTo: 'media' },
      { name: 'eyebrow', type: 'text', localized: true },
      { name: 'title', type: 'text', localized: true, required: true },
      { name: 'subtitle', type: 'textarea', localized: true },
      { name: 'primaryCtaLabel', type: 'text', localized: true },
      { name: 'primaryCtaHref', type: 'text' },
      { name: 'secondaryCtaLabel', type: 'text', localized: true },
      { name: 'secondaryCtaHref', type: 'text' },
      ...styleFields,
    ],
  },
  {
    slug: 'contentBand',
    labels: { plural: 'Content band', singular: 'Content band' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'body', type: 'richText', localized: true },
      ...styleFields,
    ],
  },
  {
    slug: 'servicesStrip',
    labels: { plural: 'Services overview', singular: 'Services overview' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'subheading', type: 'textarea', localized: true },
      {
        name: 'displayMode',
        type: 'select',
        options: [
          { label: 'Manual (Select services)', value: 'manual' },
          { label: 'Automatic (All services)', value: 'auto' },
        ],
        defaultValue: 'auto',
      },
      {
        name: 'services',
        type: 'array',
        admin: { condition: (_, siblingData) => siblingData?.displayMode === 'manual' },
        fields: [{ name: 'service', type: 'relationship', relationTo: 'services' }],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'visionExpertise',
    labels: { plural: 'Vision & expertise', singular: 'Vision & expertise' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'body', type: 'richText', localized: true },
      ...styleFields,
    ],
  },
  {
    slug: 'statsGrid',
    labels: { plural: 'Statistics', singular: 'Statistics' },
    fields: [
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', localized: true, required: true },
          { name: 'icon', type: 'text' },
        ],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'featuredTours',
    labels: { plural: 'Featured tours', singular: 'Featured tours' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'tours',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', localized: true },
          {
            name: 'embedUrl',
            type: 'text',
            admin: { description: 'Matterport / iframe-friendly tour URL' },
          },
          { name: 'poster', type: 'upload', relationTo: 'media' },
        ],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'showcase',
    labels: { plural: 'Showcase', singular: 'Showcase' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'body', type: 'richText', localized: true },
      ...styleFields,
    ],
  },
  {
    slug: 'ctaBanner',
    labels: { plural: 'CTA banner', singular: 'CTA banner' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'text', type: 'textarea', localized: true },
      { name: 'buttonLabel', type: 'text', localized: true },
      { name: 'buttonHref', type: 'text' },
      ...styleFields,
    ],
  },
  {
    slug: 'aboutBlock',
    labels: { plural: 'About', singular: 'About' },
    fields: [
      { name: 'eyebrow', type: 'text', localized: true },
      { name: 'title', type: 'text', localized: true },
      { name: 'body', type: 'richText', localized: true },
      { name: 'image', type: 'upload', relationTo: 'media' },
      ...styleFields,
    ],
  },
  {
    slug: 'portfolioBlock',
    labels: { plural: 'Portfolio', singular: 'Portfolio' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'subheading', type: 'textarea', localized: true },
      {
        name: 'displayMode',
        type: 'select',
        options: [
          { label: 'Manual', value: 'manual' },
          { label: 'Auto (all)', value: 'auto' },
        ],
        defaultValue: 'auto',
      },
      {
        name: 'items',
        type: 'array',
        admin: { condition: (_, d) => d?.displayMode === 'manual' },
        fields: [{ name: 'project', type: 'relationship', relationTo: 'portfolio' }],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'teamBlock',
    labels: { plural: 'Team', singular: 'Team' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'members',
        type: 'array',
        fields: [{ name: 'member', type: 'relationship', relationTo: 'team' }],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'testimonialsBlock',
    labels: { plural: 'Testimonials', singular: 'Testimonials' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'testimonials',
        type: 'array',
        fields: [{ name: 'testimonial', type: 'relationship', relationTo: 'testimonials' }],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'galleryBlock',
    labels: { plural: 'Gallery', singular: 'Gallery' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'images',
        type: 'array',
        fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'contactBlock',
    labels: { plural: 'Contact', singular: 'Contact' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      { name: 'subheading', type: 'textarea', localized: true },
      { name: 'showForm', type: 'checkbox', defaultValue: true },
      { name: 'formRecipientEmail', type: 'email' },
      { name: 'mapEmbedUrl', type: 'textarea' },
      ...styleFields,
    ],
  },
  {
    slug: 'videoBlock',
    labels: { plural: 'Video', singular: 'Video' },
    fields: [
      { name: 'title', type: 'text', localized: true },
      { name: 'videoUrl', type: 'text' },
      { name: 'poster', type: 'upload', relationTo: 'media' },
      ...styleFields,
    ],
  },
  {
    slug: 'featuresBlock',
    labels: { plural: 'Features', singular: 'Features' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', localized: true },
          { name: 'description', type: 'textarea', localized: true },
          { name: 'icon', type: 'text' },
        ],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'timelineBlock',
    labels: { plural: 'Timeline', singular: 'Timeline' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'events',
        type: 'array',
        fields: [
          { name: 'date', type: 'date' },
          { name: 'title', type: 'text', localized: true },
          { name: 'description', type: 'textarea', localized: true },
        ],
      },
      ...styleFields,
    ],
  },
  {
    slug: 'faqBlock',
    labels: { plural: 'FAQ', singular: 'FAQ' },
    fields: [
      { name: 'heading', type: 'text', localized: true },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'question', type: 'text', localized: true },
          { name: 'answer', type: 'richText', localized: true },
        ],
      },
      ...styleFields,
    ],
  },
];
