import config from '@payload-config';
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes';

type RestConfig = Parameters<typeof REST_GET>[0];

const payloadConfig = config as RestConfig;

export const GET = REST_GET(payloadConfig);
export const POST = REST_POST(payloadConfig);
export const DELETE = REST_DELETE(payloadConfig);
export const PATCH = REST_PATCH(payloadConfig);
export const PUT = REST_PUT(payloadConfig);
export const OPTIONS = REST_OPTIONS(payloadConfig);
