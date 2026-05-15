# 💡 Development Tips & Tricks

Quick reference guide for developing with GoMapView.

## 🛠️ Development Workflow

### Daily Startup
```bash
# Start fresh
npm run dev

# This starts:
# - Frontend on http://localhost:3000
# - CMS on http://localhost:3000/admin
```

### Component Development
```bash
# 1. Create component in src/components/
# 2. Export from src/components/index.ts
# 3. Import and use in pages

import { Button, Card } from '@components'
```

### Adding New Pages
```bash
# 1. Create src/app/[locale]/newpage/page.tsx
# 2. Use existing components
# 3. Add to Header navigation
# 4. Update language strings in src/lib/i18n.ts

const NewPage = () => {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  // ... page content
}
```

### Styling Tips
```css
/* Use Tailwind classes */
<div className="text-gradient">Gradient Text</div>

/* Use custom animations */
<div className="animate-fade-in">Fade In</div>

/* Use premium styles */
<button className="btn-premium">Button</button>

/* Use neon effects */
<div className="neon-glow">Glowing Card</div>
```

## 🎨 Customization Quick Tweaks

### Change Primary Color (Cyan to Purple)
Edit `tailwind.config.js`:
```javascript
premium: {
  accent: '#a78bfa', // Purple instead of cyan
}
```

### Change Font
Add to `src/styles/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');

body {
  font-family: 'YourFont', sans-serif;
}
```

### Add Dark Mode Toggle
Create `src/components/ThemeToggle.tsx`:
```typescript
'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
```

## 🚀 Performance Optimizations

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

### Lazy Loading Components
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <p>Loading...</p>
});
```

### Memoize Components
```typescript
import { memo } from 'react';

const MyComponent = memo(function MyComponent(props) {
  // Component only re-renders if props change
  return <div>{props.content}</div>;
});
```

## 📝 Adding Content to CMS

### Create a Service
1. Go to `/admin` → Collections → Services
2. Click "Create"
3. Fill fields:
   - Title (EN & AR)
   - Description (rich text)
   - Icon (lucide name: camera, map, etc)
   - Features
   - Upload image
4. Save & Publish

### Add Portfolio Project
1. Go to `/admin` → Collections → Portfolio
2. Click "Create"
3. Fill:
   - Title & description
   - Category (dropdown)
   - Thumbnail image
   - Gallery images
   - Featured (checkbox)
4. Publish

### Update Navigation
1. Go to `/admin` → Globals → Navigation
2. Edit mainNavigation array
3. Add label, URL, submenu items
4. Translate to Arabic
5. Save

## 🔍 Debugging Tips

### Check Console Errors
```bash
# Terminal - shows Next.js errors
npm run dev

# Browser console (F12) - shows runtime errors
```

### Debug Routes
```typescript
// Add to page.tsx
console.log('Locale:', locale);
console.log('Params:', params);
```

### Test Responsive Design
```javascript
// DevTools Responsive Mode
// Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac)
```

### Check Build Errors
```bash
npm run build  # Test production build
```

## 📦 Adding New Dependencies

### Install Package
```bash
npm install package-name

# Rebuild if needed
npm run dev
```

### Popular Additions
```bash
npm install react-hot-toast  # Notifications
npm install axios            # HTTP client (already included)
npm install zustand          # State management
npm install react-query      # Data fetching
```

## 🌐 Language/Translation Updates

### Add New UI String
1. Edit `src/lib/i18n.ts`
2. Add to `messages` object:
```typescript
export const messages: Record<Locale, MessageKeys> = {
  en: {
    // ... existing strings
    myNewString: 'Hello World',
  },
  ar: {
    myNewString: 'مرحبا بالعالم',
  },
};
```

3. Use in component:
```typescript
const text = getMessage(locale, 'myNewString');
```

## 🎬 Animation Tips

### Use Predefined Variants
```typescript
import { containerVariants, itemVariants } from '@lib/animations';
import { motion } from 'framer-motion';

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Create Custom Animation
```typescript
const customVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

<motion.div
  initial="hidden"
  whileInView="visible"
  variants={customVariant}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## 🔗 API Integration

### Fetch CMS Data
```typescript
import { getServices } from '@lib/api';

const services = await getServices();
```

### Custom API Call
```typescript
import { fetchPayload } from '@lib/api';

const data = await fetchPayload('/payload/collections/custom', {
  tags: ['custom'],
});
```

## 📱 Mobile-First Development

### Test Locally
```bash
# Get your IP address
# Access from phone: http://YOUR_IP:3000

# Or use ngrok for external access
npx ngrok http 3000
```

### Common Mobile Breakpoints (Tailwind)
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)

Usage:
```typescript
<div className="text-sm md:text-lg lg:text-xl">Responsive text</div>
```

## 🚢 Pre-Deployment Checklist

```bash
# 1. Test build
npm run build

# 2. Run linting
npm run lint

# 3. Check console for errors
npm start

# 4. Test all pages and forms

# 5. Verify CMS data exports

# 6. Check environment variables

# 7. Test on mobile device

# 8. Verify animations work

# 9. Check image loading

# 10. Test form submissions
```

## 🐛 Common Issues & Solutions

### Issue: Port 3000 in use
```bash
# Solution
PORT=3001 npm run dev
```

### Issue: Tailwind classes not applying
```bash
# Solution: Ensure path in tailwind.config.js includes the file
content: [
  './src/**/*.{js,ts,jsx,tsx}',  // ← Must include your files
]
```

### Issue: Images not loading
```bash
# Solution: Ensure remotePatterns in next.config.js is configured
# Or use Image component properly:
import Image from 'next/image';
```

### Issue: Locale not detected
```bash
# Check middleware.ts is present
# Verify locale in URL: /en/ or /ar/
# Check middleware matches all routes
```

### Issue: CMS not responding
```bash
# Check PostgreSQL is running
docker ps  // Should show postgres container
# Verify DATABASE_URI in .env.local
# Check Payload secret matches
```

## 📚 Resources & Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React 19](https://react.dev)

## 💬 Development Workflow Example

### Adding a New Feature (Feature: Team Page)

1. **Create Page**
```bash
mkdir -p src/app/[locale]/team
touch src/app/[locale]/team/page.tsx
```

2. **Create Component**
```bash
touch src/components/TeamCard.tsx
# Update components/index.ts exports
```

3. **Add CMS Collection** (already done - Team collection exists)

4. **Fetch & Display Data**
```typescript
import { getTeam } from '@lib/api';

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <Container>
      {team.docs.map((member) => (
        <TeamCard key={member.id} {...member} />
      ))}
    </Container>
  );
}
```

5. **Update Navigation**
```typescript
// src/components/Header.tsx
navLinks = [
  // ... existing
  { label: 'Team', href: '/team' },
];
```

6. **Test**
```bash
npm run dev
# Visit /en/team and /ar/team
```

7. **Deploy**
```bash
git add .
git commit -m "Add team page"
git push
# Auto-deploys on Vercel
```

---

## 🎯 Pro Tips

1. **Use Browser DevTools** - Inspect elements, debug JavaScript
2. **Enable Next.js Debug** - `DEBUG=* npm run dev`
3. **Use React DevTools** - Chrome extension for React debugging
4. **Monitor Performance** - Use Lighthouse (DevTools → Lighthouse)
5. **Test Accessibility** - Use axe DevTools extension
6. **Check Bundle Size** - `npm install --save-dev webpack-bundle-analyzer`
7. **Use Git Branches** - Create feature branches
8. **Commit Often** - Small, meaningful commits
9. **Write Comments** - Explain complex logic
10. **Keep It DRY** - Don't Repeat Yourself

---

**Happy coding! 🚀**
