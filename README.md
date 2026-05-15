# GoMapView - Premium Virtual Tour Platform

A modern, full-stack web application for creating immersive 360° virtual tours and digital experiences. Built with Next.js 15, Payload CMS, TypeScript, and Tailwind CSS.

## 🌟 Features

### Frontend
- **Immersive Homepage** with hero video background and animated sections
- **Responsive Design** with mobile-first approach (RTL Arabic & LTR English support)
- **Multiple Pages**: Home, About, Services, Portfolio, Contact
- **Dynamic Content** fully editable from CMS
- **Framer Motion Animations** for smooth, premium interactions
- **Premium Dark UI** with luxury design system
- **SEO Optimized** with proper metadata and structured data
- **Performance Optimized** with image optimization and lazy loading

### Admin Dashboard (Payload CMS)
- **Authentication & Security** with admin login
- **Collections**: Pages, Services, Portfolio, Team, Testimonials, Media
- **Globals**: Site Settings, Navigation, Footer, Social Links
- **Media Management** with image upload and optimization
- **Rich Text Editor** for content creation
- **Localization Support** (English & Arabic)
- **SEO Fields** for every content type

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **CMS**: Payload CMS 3.0
- **Database**: PostgreSQL
- **Internationalization**: next-intl with RTL support
- **UI Components**: Lucide React icons
- **Form Handling**: React Hook Form, Zod validation

## 📁 Project Structure

```
gomap/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── about/page.tsx        # About page
│   │   │   ├── services/page.tsx     # Services page
│   │   │   ├── portfolio/page.tsx    # Portfolio page
│   │   │   ├── contact/page.tsx      # Contact page
│   │   │   └── layout.tsx            # Locale layout
│   │   ├── api/                      # API routes
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── collections/
│   │   ├── Pages.ts
│   │   ├── Services.ts
│   │   ├── Portfolio.ts
│   │   ├── Team.ts
│   │   ├── Testimonials.ts
│   │   └── Media.ts
│   ├── globals/
│   │   ├── SiteSettings.ts
│   │   ├── Navigation.ts
│   │   ├── Footer.ts
│   │   └── SocialLinks.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── i18n.ts
│   │   └── api.ts
│   ├── hooks/
│   │   └── useLocale.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── payload.config.ts                 # Payload CMS configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

1. **Clone and Setup**
```bash
cd f:\projects\gomap
npm install
```

2. **Environment Setup**
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Update DATABASE_URI with your PostgreSQL connection string
# Update PAYLOAD_SECRET with a secure random string
```

3. **Database Setup**
```bash
# Create PostgreSQL database
createdb gomap

# Run migrations (automatic on first run)
```

4. **Start Development Server**
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- CMS Dashboard: `http://localhost:3000/admin`

## 🎯 Features in Detail

### Multi-Language Support (RTL/LTR)
- Full Arabic (RTL) and English (LTR) support
- Language switcher in header
- Automatic direction based on selected language
- Localized content in CMS

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation
- Adaptive images and layouts

### SEO Optimization
- Meta tags and Open Graph support
- Structured data (Schema.org)
- Sitemap support
- Dynamic page titles and descriptions
- Canonical URLs

### Performance
- Image optimization with Next.js Image
- Code splitting and lazy loading
- CSS-in-JS with Tailwind
- Optimized bundle size
- Server-side rendering for SEO

## 🎨 Design System

### Color Scheme
- **Dark Theme**: Premium dark design with luxury accents
- **Primary Accent**: Cyan (#00d9ff)
- **Gold**: #d4af37 (luxury)
- **Backgrounds**: Dark gradients (950, 900, 800)

### Typography
- **Headings**: Poppins (Bold, 700-900)
- **Body**: Sora (Regular, 400-700)
- **Arabic**: Cairo (400-700)

### Animations
- Smooth fade-in and slide transitions
- Framer Motion for complex animations
- Hover effects on cards and buttons
- Parallax scrolling effects

## 📱 Pages

### Home Page
- Hero section with CTA
- Services overview (6 main services)
- Statistics section
- Call-to-action section
- Smooth scrolling animations

### About Page
- Company mission, vision, and values
- Timeline of company history
- Team showcase section
- CTA for engagement

### Services Page
- Detailed service descriptions
- Feature lists for each service
- Image showcases
- Professional service cards
- Call-to-action

### Portfolio Page
- Grid layout with filtering
- Project categories
- Featured projects
- Project details modals
- CTA for new projects

### Contact Page
- Contact form with validation
- Contact information cards
- Social media links
- WhatsApp integration
- Google Maps placeholder

## 🛠️ Customization

### Adding New Services
1. Go to Admin Dashboard (`/admin`)
2. Navigate to Services collection
3. Create new service with:
   - Title (localized)
   - Description (rich text)
   - Icon name
   - Features list
   - Images

### Managing Content
All content is managed through the Payload CMS admin dashboard:
- Create/edit pages
- Manage services and portfolio
- Upload media
- Manage team members
- Handle testimonials
- Update global settings

### Styling
Customize the design by modifying:
- `tailwind.config.js` - Colors, animations, themes
- `src/styles/globals.css` - Global styles and custom utilities
- Component files - Individual component styles

## 📧 Contact & Support

For inquiries or support:
- Email: info@gomapview.com
- Phone: +1 (555) 123-4567
- WhatsApp: +1 (555) 123-4567

## 📄 License

This project is proprietary. All rights reserved.

## 🤝 Contributing

Contributions are welcome! Please create a feature branch and submit a pull request.

---

**Made with ❤️ by GoMapView**
