import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudinaryStorage } from 'payload-cloudinary';



import { lexicalEditor } from '@payloadcms/richtext-lexical';

import Users from '@collections/Users';
import Media from '@collections/Media';
import Pages from '@collections/Pages';
import ContactMessages from '@collections/ContactMessages';
import Services from '@collections/Services';
import Portfolio from '@collections/Portfolio';
import Team from '@collections/Team';
import Testimonials from '@collections/Testimonials';

import SiteSettings from '@globals/SiteSettings';
import Navigation from '@globals/Navigation';
import Footer from '@globals/Footer';
import SocialLinks from '@globals/SocialLinks';
import MatterportExperience from '@globals/MatterportExperience';

const filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(filename);
const srcDir = path.resolve(rootDir, 'src');

// Legacy SQLite config removed for Railway/Postgres deployment


export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    `http://localhost:${process.env.PORT && process.env.PORT !== '' ? process.env.PORT : 3000}`,
  secret:
    process.env.PAYLOAD_SECRET ||
    'development-only-change-me-please-use-strong-secret-32chars-min',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' · GoMapView CMS',
    },
    importMap: {
      baseDir: srcDir,
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Arabic', code: 'ar', rtl: true },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Pages, ContactMessages, Services, Portfolio, Team, Testimonials],
  globals: [SiteSettings, Navigation, Footer, SocialLinks, MatterportExperience],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  upload: cloudinaryStorage({
    config: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || '',
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(rootDir, 'payload-types.ts'),
  },
});
