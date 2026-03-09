# Quick Start Guide

Get the LEDU Clone running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

That's it! 🎉

## What You'll See

1. **Header** - Fixed navigation with logo
2. **Hero** - Full-screen intro with animated text
3. **Testimonials** - Client feedback carousel
4. **Services** - Service offerings with tabs
5. **References** - Portfolio projects
6. **About Me** - Bio and FAQ section
7. **Footer** - Contact information

## Making Changes

### Edit Component Text
Open any file in `src/components/` and edit the text directly.

Example - Change "POSOUVÁM HRANICE" text in Hero:
```typescript
// src/components/Hero.tsx
<h1>POSOUVÁM HRANICE</h1>  // Edit this
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  red: {
    500: "#ED0D32",  // Change accent color
  }
}
```

### Add Your Own Content
- Update testimonials in `src/components/Testimonials.tsx`
- Modify services in `src/components/Services.tsx`
- Edit projects in `src/components/References.tsx`

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check for errors
npm run type-check

# Lint code
npm run lint
```

## Project Structure (Simple Version)

```
src/
├── components/          # All visual components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── References.tsx
│   ├── AboutMe.tsx
│   ├── Footer.tsx
│   └── ... (5 more components)
└── app/
    ├── page.tsx         # Main page
    ├── layout.tsx       # Page template
    └── globals.css      # Global styles
```

## Key Features

✅ Dark theme with red accents
✅ Fully responsive design
✅ Smooth animations
✅ Contact form ready
✅ TypeScript typed
✅ Tailwind CSS styling

## Customization Examples

### Change Hero Text
```typescript
// src/components/Hero.tsx
<h1>YOUR TEXT HERE</h1>
```

### Modify Testimonials
```typescript
// src/components/Testimonials.tsx
const testimonials: Testimonial[] = [
  {
    quote: 'Your quote here',
    name: 'Your Name',
    role: 'Your Role',
    company: 'Your Company',
  },
  // ... more testimonials
];
```

### Update Services
```typescript
// src/components/Services.tsx
const tabs: Tab[] = [
  { id: 'tab1', label: 'Your Service 1' },
  { id: 'tab2', label: 'Your Service 2' },
  // ... more tabs
];
```

## Next Steps

1. **Customize content** - Edit text in components
2. **Update colors** - Modify tailwind.config.js
3. **Add images** - Place in `public/` folder
4. **Add pages** - Create new files in `src/app/`
5. **Deploy** - Use Vercel, Netlify, or your host

## Deployment (Vercel - Easiest)

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Click Deploy
5. Done! Your site is live

## Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Module not found errors?
```bash
rm -rf node_modules
npm install
```

### Styling not working?
```bash
# Check if Tailwind is imported in globals.css
# Should have: @tailwind base; @tailwind components; @tailwind utilities;
```

## Performance Tips

- Images: Use Next.js Image component
- Code splitting: Automatic with Next.js
- CSS: Tailwind purges unused styles
- Animations: Framer Motion uses GPU

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## File Locations Reference

| What | Where |
|------|-------|
| Components | `src/components/` |
| Page content | `src/app/page.tsx` |
| Styles | `src/app/globals.css` or Tailwind |
| Colors | `tailwind.config.js` |
| Static files | `public/` |
| Environment vars | `.env.local` |

## Need More Help?

1. **Components Overview** - See `COMPONENTS_OVERVIEW.md`
2. **Full Setup Guide** - See `SETUP.md`
3. **File Structure** - See `FILE_STRUCTURE.md`
4. **Main Docs** - See `README.md`

## Common Edits

### Change Header Text
File: `src/components/Header.tsx`
Look for: Navigation link names

### Change Hero Animation Speed
File: `src/components/Hero.tsx`
Look for: `setInterval` with 3000 milliseconds

### Change Service Tabs
File: `src/components/Services.tsx`
Look for: `const tabs: Tab[]`

### Modify Footer Email
File: `src/components/Footer.tsx`
Look for: `info@ledu.cz`

## Project Size

- **Source code**: ~200KB
- **After npm install**: ~500MB (node_modules)
- **Built output**: ~100KB (optimized)

---

Happy coding! 🚀

For detailed information, see the other documentation files in this project.
