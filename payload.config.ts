import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
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
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        'postgresql://postgres:password@127.0.0.1:5432/gomap',
    },
    push: true,
  }),
  plugins: [
    cloudinaryStorage({
      collections: {
        media: {
          prefix: 'gomapview',
        },
      },
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
    }),
  ],



  typescript: {
    // Write generated types outside of `src/` so Next's file watcher won't trigger rebuild loops
    outputFile: path.resolve(rootDir, 'payload-types.ts'),
  },
  sharp,
  async onInit(payload) {
    // Skip database operations during Next.js build phase
    if (process.env.npm_lifecycle_event === 'build' || process.env.NEXT_PHASE === 'phase-production-build') {
      console.log('[Payload Init] Skipping user creation during build phase');
      return;
    }

    // Create default admin user if none exists
    try {
      const existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
      });

      if (existingUsers.docs.length === 0) {
        try {
          await payload.create({
            collection: 'users',
            data: {
              email: 'admin@gomapview.com',
              password: 'GoMapView@2026',
            },
          });
          console.log('[Payload Init] Created default admin user: admin@gomapview.com');
        } catch (error) {
          console.error('[Payload Init] Failed to create default admin user:', error);
        }
      }
      // Create admin user from environment variables if provided
      const newAdminEmail = process.env.NEW_ADMIN_EMAIL;
      const newAdminPass = process.env.NEW_ADMIN_PASS;
      if (newAdminEmail && newAdminPass) {
        try {
          const found = await payload.find({
            collection: 'users',
            where: {
              email: {
                equals: newAdminEmail,
              },
            },
            limit: 1,
          });

          if (found.docs.length === 0) {
            await payload.create({
              collection: 'users',
              data: {
                email: newAdminEmail,
                password: newAdminPass,
              },
            });
            console.log('[Payload Init] Created NEW_ADMIN user:', newAdminEmail);
          } else {
            // If the user already exists, update their password to the provided one
            try {
              const existing = found.docs[0];
              await payload.update({
                collection: 'users',
                id: existing.id,
                data: {
                  password: newAdminPass,
                },
              });
              console.log('[Payload Init] Updated password for existing NEW_ADMIN:', newAdminEmail);
            } catch (updateErr) {
              console.error('[Payload Init] Failed to update NEW_ADMIN password:', updateErr);
            }
          }
        } catch (err) {
          console.error('[Payload Init] Failed to create NEW_ADMIN user:', err);
        }
      }
    } catch (error) {
      // Silently fail if tables don't exist yet during initial setup
      // Payload will retry on next startup once schema is initialized
      console.debug('[Payload Init] Database not ready yet, skipping user creation');
    }
  },
});
