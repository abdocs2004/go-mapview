import type { Field } from 'payload';

export type StyleFieldOptions = {
  withBackgroundMedia?: boolean;
  withButtonStyle?: boolean;
  withAnimation?: boolean;
};

export function createSectionStyleFields(options: StyleFieldOptions = {}): Field[] {
  const { withBackgroundMedia = true, withButtonStyle = true, withAnimation = true } = options;

  const styleFields: Field[] = [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'contained',
      options: [
        { label: 'Full Width', value: 'full-width' },
        { label: 'Contained', value: 'contained' },
        { label: 'Split Layout', value: 'split' },
        { label: 'Centered Layout', value: 'centered' },
        { label: 'Grid Layout', value: 'grid' },
      ],
    },
    {
      name: 'themeVariant',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'Luxury Blue', value: 'luxury-blue' },
        { label: 'Glassmorphism', value: 'glass' },
        { label: 'Minimal', value: 'minimal' },
        { label: 'Modern Gradient', value: 'modern-gradient' },
      ],
    },
    {
      name: 'backgroundType',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Solid Color', value: 'solid' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'solidBackground',
      type: 'select',
      defaultValue: 'dark-950',
      options: [
        { label: 'Dark 950', value: 'dark-950' },
        { label: 'Dark 900', value: 'dark-900' },
        { label: 'White', value: 'white' },
        { label: 'Slate', value: 'slate' },
        { label: 'Premium Accent', value: 'accent' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === 'solid',
      },
    },
    {
      name: 'gradientPreset',
      type: 'select',
      defaultValue: 'dark-to-dark',
      options: [
        { label: 'Dark to Dark', value: 'dark-to-dark' },
        { label: 'Accent to Blue', value: 'accent-to-blue' },
        { label: 'Blue to Cyan', value: 'blue-to-cyan' },
        { label: 'Dark to Accent', value: 'dark-to-accent' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.backgroundType === 'gradient',
      },
    },
    {
      name: 'overlay',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'lg',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'contentWidth',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Medium', value: 'medium' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
    },
    {
      name: 'containerWidth',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Narrow', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full', value: 'full' },
      ],
    },
    {
      name: 'headingSize',
      type: 'select',
      defaultValue: 'lg',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      name: 'textSize',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
    {
      name: 'fontWeight',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Semibold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
      ],
    },
    {
      name: 'uppercaseHeadings',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'gridLayout',
      type: 'select',
      defaultValue: '3-col',
      options: [
        { label: '2 Columns', value: '2-col' },
        { label: '3 Columns', value: '3-col' },
        { label: '4 Columns', value: '4-col' },
      ],
    },
    {
      name: 'cardStyle',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Glass', value: 'glass' },
      ],
    },
    {
      name: 'mediaStyle',
      type: 'select',
      defaultValue: 'cover',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
        { label: 'Cinematic', value: 'cinematic' },
        { label: 'Rounded', value: 'rounded' },
        { label: 'Parallax', value: 'parallax' },
      ],
    },
    {
      name: 'borderRadius',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Rounded Full', value: 'full' },
      ],
    },
    {
      name: 'shadowStyle',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Soft', value: 'soft' },
        { label: 'Medium', value: 'medium' },
        { label: 'Strong', value: 'strong' },
        { label: 'Glow', value: 'glow' },
      ],
    },
  ];

  const fields: Field[] = [
    {
      name: 'isVisible',
      label: 'Show section',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'responsiveVisibility',
      label: 'Responsive visibility',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All devices', value: 'all' },
        { label: 'Desktop only', value: 'desktop-only' },
        { label: 'Tablet only', value: 'tablet-only' },
        { label: 'Mobile only', value: 'mobile-only' },
        { label: 'Hide on mobile', value: 'hide-mobile' },
        { label: 'Hide on desktop', value: 'hide-desktop' },
      ],
    },
    {
      name: 'style',
      label: 'Visual style',
      type: 'group',
      fields: styleFields,
    },
  ];

  if (withBackgroundMedia) {
    styleFields.push(
      {
        name: 'backgroundImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          condition: (_, siblingData) => siblingData?.backgroundType === 'image',
        },
      },
      {
        name: 'backgroundVideoUrl',
        type: 'text',
        admin: {
          description: 'MP4/WebM URL for background video mode',
          condition: (_, siblingData) => siblingData?.backgroundType === 'video',
        },
      },
    );
  }

  if (withButtonStyle) {
    styleFields.push({
      name: 'buttonStyle',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Gradient', value: 'gradient' },
      ],
    });
  }

  if (withAnimation) {
    styleFields.push({
      name: 'animationStyle',
      type: 'select',
      defaultValue: 'fade',
      options: [
        { label: 'Fade', value: 'fade' },
        { label: 'Slide Up', value: 'slide-up' },
        { label: 'Zoom', value: 'zoom' },
        { label: 'Parallax', value: 'parallax' },
        { label: 'None', value: 'none' },
      ],
    });
  }

  return fields;
}

export function createHeaderStyleFields(): Field[] {
  return [
    {
      name: 'headerStyle',
      label: 'Header style',
      type: 'group',
      fields: [
        { name: 'isSticky', type: 'checkbox', defaultValue: true },
        { name: 'isTransparent', type: 'checkbox', defaultValue: true },
        {
          name: 'navbarTheme',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Glass', value: 'glass' },
          ],
        },
        {
          name: 'mobileMenuStyle',
          type: 'select',
          defaultValue: 'drawer',
          options: [
            { label: 'Drawer', value: 'drawer' },
            { label: 'Fullscreen', value: 'fullscreen' },
            { label: 'Popover', value: 'popover' },
          ],
        },
      ],
    },
  ];
}

export function createFooterStyleFields(): Field[] {
  return [
    {
      name: 'footerStyle',
      label: 'Footer style',
      type: 'group',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'columns-4',
          options: [
            { label: '2 Columns', value: 'columns-2' },
            { label: '3 Columns', value: 'columns-3' },
            { label: '4 Columns', value: 'columns-4' },
          ],
        },
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Luxury Blue', value: 'luxury-blue' },
          ],
        },
        {
          name: 'socialIconStyle',
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
  ];
}

export function createGlobalDesignSettingsFields(): Field[] {
  return [
    {
      name: 'designSystem',
      label: 'Global design settings',
      type: 'group',
      fields: [
        {
          name: 'themeMode',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Auto', value: 'auto' },
          ],
        },
        {
          name: 'primaryColor',
          type: 'select',
          defaultValue: 'premium-accent',
          options: [
            { label: 'Premium Accent', value: 'premium-accent' },
            { label: 'Blue', value: 'blue' },
            { label: 'Cyan', value: 'cyan' },
            { label: 'Emerald', value: 'emerald' },
          ],
        },
        {
          name: 'secondaryColor',
          type: 'select',
          defaultValue: 'blue',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Slate', value: 'slate' },
            { label: 'Purple', value: 'purple' },
          ],
        },
        {
          name: 'defaultSpacing',
          type: 'select',
          defaultValue: 'lg',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'globalBorderRadius',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'defaultButtonStyle',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Gradient', value: 'gradient' },
          ],
        },
        {
          name: 'defaultAnimationStyle',
          type: 'select',
          defaultValue: 'fade',
          options: [
            { label: 'Fade', value: 'fade' },
            { label: 'Slide Up', value: 'slide-up' },
            { label: 'Zoom', value: 'zoom' },
            { label: 'None', value: 'none' },
          ],
        },
        {
          name: 'defaultContainerWidth',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Default', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full', value: 'full' },
          ],
        },
      ],
    },
  ];
}
