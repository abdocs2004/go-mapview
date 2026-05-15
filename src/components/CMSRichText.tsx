'use client';

import type React from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';

interface CMSRichTextProps {
  data: unknown;
  className?: string;
}

export function CMSRichText({ data, className }: CMSRichTextProps) {
  if (!data || typeof data !== 'object') return null;

  type RichTextData = React.ComponentProps<typeof RichText>['data'];

  return (
    <div className={className}>
      <RichText data={data as RichTextData} />
    </div>
  );
}
