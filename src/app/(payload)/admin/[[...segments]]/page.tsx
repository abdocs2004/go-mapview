import type { Metadata } from 'next';

import config from '@payload-config';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';

import { importMap } from '../importMap.js';

type Args = {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type PayloadRootConfig = Awaited<React.ComponentProps<typeof RootPage>['config']>;

const payloadConfig = config as PayloadRootConfig;

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({
    config: Promise.resolve(payloadConfig),
    params: params as Promise<{ segments: string[] }>,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
  });
}

export default async function AdminPage({ params, searchParams }: Args) {
  return RootPage({
    config: Promise.resolve(payloadConfig),
    importMap,
    params: params as Promise<{ segments: string[] }>,
    searchParams: searchParams as Promise<{ [key: string]: string | string[] }>,
  });
}
