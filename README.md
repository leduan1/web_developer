# LEDU Clone - Dark Themed Web Developer Portfolio

A complete React/Next.js clone of ledu.cz - a dark-themed freelance web developer portfolio website.

## Features

- **Dark Theme**: Professional dark background (#0a0a0a) with white text and red accent color (#ED0D32)
- **Responsive Design**: Fully responsive layout with mobile-first approach
- **Interactive Components**: Smooth animations using Framer Motion
- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Form Integration**: Contact form with Supabase integration ready

## Components

### 1. **Header**
- Fixed navigation header
- Logo with L, U, D, E letters arranged in X shape
- Responsive menu with hamburger icon
- Navigation links with hover effects
- Scroll-triggered background

### 2. **Hero**
- Full viewport height section
- Outline text "POSOUVÁM HRANICE" using webkit-text-stroke
- Rotating word animation with Framer Motion
- Animated scroll indicator

### 3. **Testimonials**
- Carousel with 3 client testimonials
- Auto-play with manual navigation
- Animated transitions between slides
- Navigation dots and arrow buttons

### 4. **Services**
- Tabbed content with 5 service categories
- Smooth content transitions
- Feature cards with icons
- Call-to-action buttons

### 5. **References**
- Portfolio project showcase
- Alternating layout (image left/right)
- Dark and red background alternation
- Tag pills and project descriptions
- Links to live websites

### 6. **AboutMe**
- Photo placeholder section
- Bio introduction
- FAQ accordion with 4 questions
- Statistics display with blue highlights
- Responsive layout

### 7. **Footer**
- Large heading section
- Email display with outline text
- Green "active" indicator for available capacity
- Circular contact button
- Social media links
- Back to top navigation

### 8. **ContactForm**
- Modal contact form
- Name, email, phone (with country code)
- Service selection checkboxes
- Message textarea
- File upload capability
- Submit status feedback
- Supabase integration ready

### 9. **SideLabels**
- Fixed "KONTAKT" label on left (desktop)
- Fixed "scroll" indicator on right (desktop)
- Mobile scroll indicator at bottom
- Responsive visibility

## Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Testimonials.tsx
│   ├── Services.tsx
│   ├── References.tsx
│   ├── AboutMe.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── SideLabels.tsx
│   └── index.ts
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
└── lib/
    └── supabase.ts (optional - for backend integration)
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install required packages:
   ```bash
   npm install next react react-dom framer-motion @supabase/supabase-js
   npm install -D tailwindcss postcss autoprefixer typescript @types/react @types/node
   ```

4. Create environment variables (if using Supabase):
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

## Running the Project

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build
```bash
npm run build
npm run start
```

## Styling

- **Framework**: Tailwind CSS with dark theme configuration
- **Colors**:
  - Primary Dark: `#0a0a0a`
  - Secondary Dark: `#111111`
  - Accent Red: `#ED0D32`
  - Text: White with opacity variations
- **Font**: Inter (sans-serif) from Google Fonts
- **Animations**: Framer Motion for smooth transitions

## TypeScript

All components are fully typed with TypeScript. Type definitions include:
- Component props interfaces
- Form data types
- FAQ items structure
- Testimonial structure

## Responsive Design

The design is responsive across:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  red: {
    500: "#ED0D32",
  }
}
```

### Content
Update text content directly in component files. All Czech text can be easily replaced.

### Animations
Framer Motion props can be adjusted in:
- `Hero.tsx` - word rotation timing
- `Testimonials.tsx` - slide transitions
- `Services.tsx` - tab content animation
- `AboutMe.tsx` - accordion animations

## Supabase Integration

The ContactForm component is ready for Supabase integration. Create a `@/lib/supabase.ts` file:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
```

## Performance Optimization

- Image optimization ready (use Next.js Image component)
- Lazy loading for components
- CSS-in-JS with Tailwind for optimized output
- Next.js automatic code splitting

## License

This is a clone project for educational purposes.

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
