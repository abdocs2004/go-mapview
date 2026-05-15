import { getPayload } from 'payload';
import config from '@payload-config';

type PayloadClientConfig = Parameters<typeof getPayload>[0]['config'];

const payloadConfig = config as PayloadClientConfig;

declare global {
  // eslint-disable-next-line no-var
  var __gomapPayloadClient: ReturnType<typeof getPayload> | undefined;
}

export function getPayloadClient() {
  if (!globalThis.__gomapPayloadClient) {
    globalThis.__gomapPayloadClient = getPayload({ config: payloadConfig });
  }

  return globalThis.__gomapPayloadClient;
}