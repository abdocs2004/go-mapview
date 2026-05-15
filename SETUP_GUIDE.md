# Setup & Deployment Guide

## 🚀 Local Development Setup

### Step 1: Clone and Install

```bash
cd f:\projects\gomap
npm install
```

### Step 2: Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Ensure Docker is installed
docker-compose up -d

# This starts PostgreSQL on port 5432
# pgAdmin available at http://localhost:5050
```

#### Option B: Manual PostgreSQL Setup
1. Install PostgreSQL 15+
2. Create database: `createdb gomap`
3. Update `.env.local` with your connection string

### Step 3: Environment Configuration

Create `.env.local`:
```bash
cp .env.example .env.local
```

Update with your settings:
```
DATABASE_URI=postgresql://postgres:password@localhost:5432/gomap
PAYLOAD_SECRET=your-super-secret-key-at-least-32-chars-long
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Step 4: Start Development

```bash
npm run dev
```

Visit:
- 🌐 Frontend: http://localhost:3000
- 🛠️ CMS Admin: http://localhost:3000/admin
- 📊 Database: pgAdmin at http://localhost:5050

## 📋 Initial Setup Tasks

### 1. Create Admin User
1. Go to http://localhost:3000/admin
2. Create the first admin account
3. Sign in to the dashboard

### 2. Configure Site Settings
1. Go to Globals → Site Settings
2. Add company information
3. Upload logo and favicon
4. Add contact information

### 3. Setup Navigation
1. Go to Globals → Navigation
2. Add main navigation items
3. Add CTA button
4. Translate to Arabic

### 4. Configure Footer
1. Go to Globals → Footer
2. Add company info
3. Add quick links
4. Add services links
5. Add contact information

### 5. Add Services
1. Go to Collections → Services
2. Create services with:
   - Title (EN & AR)
   - Description
   - Icon name (Lucide icon)
   - Features list
   - Featured image

### 6. Add Portfolio Items
1. Go to Collections → Portfolio
2. Add completed projects
3. Upload gallery images
4. Categorize projects
5. Mark featured projects

### 7. Add Team Members
1. Go to Collections → Team
2. Add team member profiles
3. Upload profile images
4. Add social links
5. Add member descriptions

## 🌍 Localization

### Adding Arabic Translations

The application supports English and Arabic with full RTL support.

**Structure:**
- Frontend: Auto-detects from URL (`/en/about`, `/ar/about`)
- CMS: Fields marked as "Localized" support both languages
- UI: Auto-switches to RTL for Arabic

**Translation Process:**
1. In CMS, translate field content to Arabic
2. Frontend automatically displays Arabic when viewing `/ar/` routes
3. Update language strings in `src/lib/i18n.ts` for UI text

## 🏗️ Project Structure Deep Dive

### Frontend Architecture
```
src/app/
├── [locale]/                    # Dynamic locale routes
│   ├── page.tsx                # Home page
│   ├── about/page.tsx         # About page
│   ├── services/page.tsx       # Services page
│   ├── portfolio/page.tsx      # Portfolio page
│   ├── contact/page.tsx        # Contact page
│   └── layout.tsx              # Locale-specific layout
└── layout.tsx                  # Root layout

src/components/
├── Button.tsx                  # Reusable button
├── Card.tsx                    # Card component
├── Container.tsx               # Layout container
├── Header.tsx                  # Navigation header
├── Footer.tsx                  # Footer
├── ServiceCard.tsx             # Service showcase
└── CTASection.tsx              # Call-to-action section

src/lib/
├── utils.ts                    # Utility functions
├── i18n.ts                     # i18n configuration
└── api.ts                      # API client

src/collections/               # CMS collections
src/globals/                    # CMS globals
src/hooks/                      # Custom React hooks
src/types/                      # TypeScript types
```

### CMS Collections Structure

**Pages Collection:**
- Title, Slug, Type
- Rich text content
- Hero image
- SEO fields
- Publishing status

**Services Collection:**
- Localized title & description
- Icon, Image
- Features array
- SEO fields
- Display order

**Portfolio Collection:**
- Localized title & description
- Category, Thumbnail
- Image gallery with captions
- Client info, Location
- Results/Metrics
- Featured flag

**Team Collection:**
- Localized name, position, bio
- Profile image
- Email
- Social media links
- Display order

**Testimonials Collection:**
- Name, Position, Company
- Localized content
- Rating (1-5)
- Profile image
- Featured flag

## 🚀 Deployment

### Vercel (Recommended for Next.js)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import the repository
   - Set environment variables
   - Deploy

3. **Database**
   - Use Vercel's PostgreSQL or Supabase
   - Update DATABASE_URI

### Self-Hosted (Docker)

1. **Build Docker image**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Deploy with Docker Compose**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URI=${DATABASE_URI}
         - PAYLOAD_SECRET=${PAYLOAD_SECRET}
     postgres:
       image: postgres:15-alpine
       # ... (see docker-compose.yml)
   ```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local`
   - Use strong PAYLOAD_SECRET
   - Keep DATABASE_URI secure

2. **Authentication**
   - Use strong admin passwords
   - Enable 2FA if available
   - Regularly rotate secrets

3. **Database**
   - Regular backups
   - Restricted access
   - SSL connections in production

4. **Content Security**
   - Validate user inputs
   - Sanitize rich text content
   - Use Content Security Policy headers

## 📈 Performance Optimization

### Image Optimization
- Use Next.js Image component
- Automatic format selection (WebP, AVIF)
- Responsive image sizes
- Lazy loading by default

### Code Splitting
- Automatic with Next.js
- Dynamic imports for components
- Tree-shaking of unused code

### Caching
- ISR (Incremental Static Regeneration)
- API response caching
- Browser caching headers

### SEO
- Server-side rendering
- Structured data (Schema.org)
- Dynamic sitemaps
- Open Graph tags

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
# Verify DATABASE_URI format
# Test connection
psql postgresql://user:password@localhost:5432/gomap
```

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [TypeScript](https://www.typescriptlang.org)

---

For issues or questions, contact: support@gomapview.com
