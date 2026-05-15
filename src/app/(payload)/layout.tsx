import config from '@payload-config';
import '@payloadcms/next/css';
import type { ServerFunctionClient } from 'payload';
import { handleServerFunctions,  RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './admin/importMap.js';
import './custom.scss';

type Args = {
  children: React.ReactNode;
};

type PayloadRootConfig = Awaited<React.ComponentProps<typeof RootLayout>['config']>;

const payloadConfig = config as PayloadRootConfig;

const serverFunction: ServerFunctionClient = async function serverFn(args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config: payloadConfig,
    importMap,
  });
};

export default function PayloadLayout({ children }: Args) {
  return (
    <RootLayout config={Promise.resolve(payloadConfig)} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
