import React from 'react';
import type { SeoSchema } from '@lib/seo';

export default function SeoJsonLd({ schemas }: { schemas: Array<SeoSchema | null | undefined> }) {
  const items = schemas.filter(Boolean) as SeoSchema[];
  if (!items.length) return null;

  return (
    <>
      {items.map((schema, index) => {
        const type = Array.isArray(schema['@type']) ? schema['@type'].join('-') : String(schema['@type'] || 'schema');
        return (
          <script
            key={`${type}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        );
      })}
    </>
  );
}
