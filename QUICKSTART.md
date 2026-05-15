# ⚡ GoMapView - Quick Start Guide

Get your GoMapView project running in 5 minutes!

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL (or Docker)
- Git

## 🚀 Quick Setup (5 minutes)

### 1. Install & Setup

```bash
# Navigate to project
cd f:\projects\gomap

# Install dependencies (2 min)
npm install

# Copy environment file
cp .env.example .env.local
```

### 2. Start Database

#### Using Docker (Easiest)
```bash
docker-compose up -d
# PostgreSQL starts on port 5432
```

#### Or PostgreSQL Directly
```bash
createdb gomap
# Then update DATABASE_URI in .env.local
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access the Application

Open your browser and visit:

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Database (pgAdmin)**: http://localhost:5050 (if using Docker)

## 🎯 First Steps

### Step 1: Create Admin Account
1. Go to http://localhost:3000/admin
2. Create your first admin account
3. Sign in

### Step 2: Add Site Information
1. Go to **Globals** → **Site Settings**
2. Fill in company info
3. Save

### Step 3: Create Services
1. Go to **Collections** → **Services**
2. Click "Create"
3. Add service details (Title, Description, Icon)
4. Publish

### Step 4: Add Portfolio Projects
1. Go to **Collections** → **Portfolio**
2. Create new projects
3. Upload images
4. Publish

## 🌐 Viewing the Website

### English
- Home: http://localhost:3000/en
- About: http://localhost:3000/en/about
- Services: http://localhost:3000/en/services
- Portfolio: http://localhost:3000/en/portfolio
- Contact: http://localhost:3000/en/contact

### العربية (Arabic)
- Home: http://localhost:3000/ar
- About: http://localhost:3000/ar/about
- Services: http://localhost:3000/ar/services
- Portfolio: http://localhost:3000/ar/portfolio
- Contact: http://localhost:3000/ar/contact

## 📁 Project Structure at a Glance

```
gomap/
├── src/
│   ├── app/              # Pages & layouts
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utilities & helpers
│   ├── collections/     # CMS collections
│   ├── globals/         # CMS globals
│   └── styles/          # CSS styles
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind settings
├── next.config.js       # Next.js settings
└── .env.local          # Environment variables
```

## 🎨 Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  premium: {
    accent: '#00d9ff',  // Change accent color
    dark: '#0a0e27',
  }
}
```

### Change Logo
Update `src/components/Header.tsx`:
```javascript
logo = '🗺️ GoMapView'  // Change to your logo text/image
```

### Add Navigation Links
Edit `src/components/Header.tsx`:
```javascript
navLinks = [
  { label: 'Home', href: '/' },
  // Add more links
]
```

### Modify Animations
Edit `src/styles/globals.css` or `src/lib/animations.ts`

## 🔧 Common Commands

```bash
# Development
npm run dev                 # Start dev server

# Building
npm run build              # Build for production
npm start                  # Start production server

# CMS
npm run cms               # Just start CMS

# Linting
npm run lint              # Run ESLint
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
PORT=3001 npm run dev
```

### Database Connection Error
```bash
# Check PostgreSQL is running
# Verify DATABASE_URI in .env.local
# Try Docker: docker-compose up -d
```

### Clear Cache
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Next Steps

1. **Explore CMS**: Create services, portfolio items, team members
2. **Customize Content**: Update copy and translations
3. **Add Media**: Upload images and videos
4. **Configure Settings**: Add company info, social links
5. **Deploy**: Follow SETUP_GUIDE.md for deployment

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

## ✅ Quick Checklist

- [ ] Installed Node.js 18+
- [ ] Ran `npm install`
- [ ] Set up PostgreSQL/Docker
- [ ] Configured `.env.local`
- [ ] Started dev server (`npm run dev`)
- [ ] Accessed admin dashboard
- [ ] Created first admin account
- [ ] Added site information
- [ ] Created a service
- [ ] Viewed website on http://localhost:3000/en

## 🎉 You're All Set!

Your GoMapView installation is ready. Start creating amazing content!

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**Need help?** Check the README.md or SETUP_GUIDE.md for more detailed instructions.
