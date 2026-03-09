# LEDU Clone - Setup Guide

This guide will help you set up the LEDU clone project locally.

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git (for version control)
- A Supabase account (optional, for contact form functionality)

## Quick Start

### 1. Clone and Install

```bash
# Navigate to the project directory
cd ledu-clone

# Install dependencies
npm install
```

### 2. Environment Setup

If you want to enable Supabase integration for the contact form:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your Supabase project settings.

### 3. Supabase Database Setup (Optional)

If using Supabase, create a `contacts` table with the following schema:

```sql
create table contacts (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  phone text,
  services text,
  message text not null,
  file_name text,
  created_at timestamp with time zone default now()
);

-- Optional: Create a storage bucket for files
-- Storage > New bucket > contact-files > Private
```

Enable Row Level Security (RLS) if desired:

```sql
alter table contacts enable row level security;

create policy "Allow inserts from anyone" on contacts
  for insert with check (true);

create policy "Allow selects for authenticated users" on contacts
  for select using (auth.role() = 'authenticated');
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ledu-clone/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page (main content)
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section with animations
│   │   ├── Testimonials.tsx    # Client testimonials carousel
│   │   ├── Services.tsx        # Service offerings with tabs
│   │   ├── References.tsx      # Portfolio projects
│   │   ├── AboutMe.tsx         # About section with FAQ
│   │   ├── Footer.tsx          # Footer with contact CTA
│   │   ├── ContactForm.tsx     # Contact form modal
│   │   ├── SideLabels.tsx      # Fixed side labels
│   │   └── index.ts            # Component exports
│   └── lib/
│       └── supabase.ts         # Supabase client and helpers
├── public/                     # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── next.config.js             # Next.js config
└── README.md                  # Project documentation
```

## Key Dependencies

- **Next.js 14**: React framework with app router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Supabase**: Backend and storage (optional)

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  black: "#0a0a0a",      // Dark background
  red: {
    500: "#ED0D32",      // Accent color
    600: "#d60928",      // Hover state
  }
}
```

### Typography

Font is loaded from Google Fonts (Inter). Edit `src/app/layout.tsx` to change.

### Content

All text content is in the component files. Czech text can be easily replaced with your language.

Example - Header navigation (src/components/Header.tsx):

```typescript
<Link href="#" className="...">
  Úvod              // Change this text
</Link>
```

### Images/Assets

Place images in the `public/` directory and reference them:

```typescript
import Image from 'next/image';

<Image
  src="/images/my-image.jpg"
  alt="Description"
  width={400}
  height={300}
/>
```

The placeholder divs in Reference and AboutMe components can be replaced with actual images.

## Animations

Animations use Framer Motion. Key animation instances:

1. **Hero word rotation** (Hero.tsx)
   ```typescript
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   exit={{ opacity: 0, y: -20 }}
   transition={{ duration: 0.5 }}
   ```

2. **Testimonials carousel** (Testimonials.tsx)
   ```typescript
   initial={{ opacity: 0, x: 100 }}
   animate={{ opacity: 1, x: 0 }}
   exit={{ opacity: 0, x: -100 }}
   ```

3. **Services tab content** (Services.tsx)
   Similar fade and slide transitions

4. **AboutMe accordion** (AboutMe.tsx)
   Height and opacity animations

## Building for Production

```bash
npm run build
npm run start
```

Or deploy directly to Vercel:

```bash
# Push to GitHub first
git push

# Deploy via Vercel dashboard
# https://vercel.com/new
```

## Performance Tips

1. **Image Optimization**: Use Next.js Image component
   ```typescript
   import Image from 'next/image';
   ```

2. **Code Splitting**: Automatic with Next.js, but can use dynamic imports:
   ```typescript
   const Component = dynamic(() => import('@/components/Component'));
   ```

3. **Lazy Loading**: Use React.lazy for route-based splitting

4. **CSS**: Tailwind CSS automatically purges unused styles in production

## SEO

Metadata is configured in `src/app/layout.tsx`. Customize:

```typescript
export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
  keywords: ['keyword1', 'keyword2'],
};
```

## Responsive Design Breakpoints

Tailwind CSS breakpoints used:

- `sm`: 640px (small phones)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)

Example:
```html
<div className="text-sm md:text-base lg:text-lg">
  Text size changes at breakpoints
</div>
```

## Troubleshooting

### Port Already in Use

```bash
npm run dev -- -p 3001  # Use different port
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Check types
npm run type-check
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect project at vercel.com
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Self-Hosted (Node.js)

```bash
npm run build
npm run start
```

Visit http://localhost:3000

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t ledu-clone .
docker run -p 3000:3000 ledu-clone
```

## Git Workflow

```bash
# Create a new branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add my feature"

# Push and create pull request
git push origin feature/my-feature
```

## Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types

# Cleaning
rm -rf .next             # Clear Next.js cache
rm -rf node_modules      # Clear dependencies
npm install              # Reinstall fresh
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For issues:
1. Check the troubleshooting section above
2. Review component documentation in code comments
3. Refer to framework documentation links
4. Check console for error messages

## License

This is a clone project for educational purposes.

---

Last updated: 2024
