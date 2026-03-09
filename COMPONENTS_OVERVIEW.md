# Components Overview - LEDU Clone

Complete documentation of all React components and their features.

## Table of Contents

1. [Header](#header)
2. [Hero](#hero)
3. [Testimonials](#testimonials)
4. [Services](#services)
5. [References](#references)
6. [AboutMe](#aboutme)
7. [Footer](#footer)
8. [ContactForm](#contactform)
9. [SideLabels](#sidelabels)

---

## Header

**File**: `src/components/Header.tsx`

### Features
- Fixed position navigation header
- Logo with X shape and L, U, D, E letters
- Responsive mobile menu with hamburger icon
- Scroll-triggered semi-transparent background
- Desktop and mobile navigation links

### Props
None (standalone component)

### Navigation Links
- Úvod (Home)
- Reference (Portfolio)
- O mně (About)
- Blog
- Kontakt (Contact)

### Styling
- Transparent by default
- Background becomes `bg-black/40 backdrop-blur-sm` on scroll
- Logo size: 3rem x 3rem
- Full width layout with max-width container

### States
- Scroll state triggers background change
- Mobile menu toggle with animated hamburger icon

---

## Hero

**File**: `src/components/Hero.tsx`

### Features
- Full viewport height section
- Outline text effect using `-webkit-text-stroke`
- Rotating word animation (5 words cycling)
- Smooth scroll indicator animation
- Responsive typography

### Props
None (standalone component)

### Content
Main text: "POSOUVÁM HRANICE" (outline stroke)
Subtitle: "PŘI TVORBĚ" (solid white)

Rotating words (3-second intervals):
1. webových stránek
2. WordPress webů
3. návrhů
4. ads kampaní
5. optimalizací

### Animations
- Word fade in/out: 0.5s duration
- Scroll indicator bounce: 2s infinite loop
- Smooth transitions using Framer Motion

### Text Styling
- Outline text: white stroke, transparent fill
- Rotating words: red accent color (#ED0D32)
- Font: Bold, uppercase, large sizes

---

## Testimonials

**File**: `src/components/Testimonials.tsx`

### Features
- Carousel/slider component with 3 testimonials
- Auto-play (6-second intervals)
- Manual navigation with dots and arrow buttons
- Smooth fade and slide transitions
- Responsive layout

### Props
```typescript
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}
```

### Testimonials Data
1. Zuzana Z., CEO, OnlineWorkout
2. Mirek, CEO, MyMillenium
3. Mikell, CEO, Maji

### Navigation
- Dots: Click to jump to specific testimonial
- Arrows: Previous/Next navigation
- Auto-play pauses when manually navigating (10s timeout)

### Styling
- Quote text: Italic, larger font
- Attribution: Small uppercase, white/60 opacity
- Navigation dots: 3px default, 8px active (red)

---

## Services

**File**: `src/components/Services.tsx`

### Features
- Tabbed interface with 5 service categories
- Smooth content transitions
- Outline section header
- Tab-specific content with feature cards
- Call-to-action buttons

### Tabs
1. **VÝVOJ WEBU** (Web Development)
   - 4 feature cards: Stabilita, Responzivita, Rychlost, Kvalita
   - Illustration placeholder
   - Features with descriptions

2. **E-SHOP**
   - E-commerce solutions description
   - Focus on security and scalability

3. **WEB DESIGN**
   - Design services description
   - 8 service bullets: Branding, Wireframes, UX, UI, etc.

4. **SPRÁVA WEBU**
   - Website maintenance packages
   - Starting from 1000Kč

5. **MARKETING**
   - 3 sub-sections: PPC, SEO, Social Media
   - Detailed descriptions for each

### Styling
- Active tab: Red text (#ED0D32) with red bottom border
- Inactive tabs: White/60 opacity
- Feature cards: Left red border, light description text

### Animations
- Tab content fade and slide transitions
- 0.3s duration using Framer Motion

---

## References

**File**: `src/components/References.tsx`

### Features
- Portfolio project showcase
- Alternating layout (image left/right)
- Dual background colors (dark and red)
- Project tags and descriptions
- Links to live websites
- Bottom CTA buttons

### Projects (7 total)
1. Jagr Weddings - Dark background
2. Schlieger.cz, Schlieger.de - Dark background
3. Domy Sobě - Red background (#ED0D32)
4. Denis Fueco & Workshop - Red background
5. Hasú Restaurant & Sushi Bar - Dark background
6. Suková Photography - Dark background
7. Wollem - Red background

### Tag Examples
- Návrh webu (Web Design)
- Programování (Programming)
- Kódování (Coding)
- WordPress
- E-Shop

### Styling
- Dark projects: bg-gray-900
- Red projects: bg-red-500
- Tags: Rounded pills with padding
- Image placeholders: Gradient backgrounds
- Links: Left border accent with arrow

### Buttons
- "Kontakt" - Red background
- "Všechny reference" - White border outline

---

## AboutMe

**File**: `src/components/AboutMe.tsx`

### Features
- Two-column layout (photo + content)
- Photo placeholder with gradient circle
- Bio introduction with emoji
- 4-item FAQ accordion
- Statistics section with blue highlights
- Responsive design

### Content
- Name: Duy
- Experience: 6 years
- Location: Prague
- Background: Corporate to freelance

### FAQ Questions
1. Proč zvolit webdesignéra na volné noze?
2. Jaké lokality pokrýváte?
3. Jaký je rozdíl mezi webovým designérem na volné noze a webovým vývojářem na volné noze?
4. Jaké služby nabízíte?

### Statistics
- 6 - Let zkušeností
- 100+ - Vytvořených webů
- 70+ - Návrhů
- 14 - Marketingových kampaní

### Styling
- Stats numbers: Large (text-3xl), blue color
- FAQ items: Expandable with smooth animation
- Photo placeholder: Circular gradient background
- Accordion: Plus/rotate animation on toggle

### Animations
- Accordion open/close: Height and opacity fade
- 0.2s duration

---

## Footer

**File**: `src/components/Footer.tsx`

### Features
- Large heading "POJĎME TO PROBRAT"
- Email display with outline text style
- Green "active status" indicator
- Large circular contact button
- Social media links
- Back to top navigation
- Bottom legal links
- Contact modal integration

### Email
- Display: info@ledu.cz (outline text)
- Clickable with mailto: link

### Content
- "Mám aktuálně volné kapacity pro nové projekty"
- Green dot indicator with pulse animation
- Explanation text about project availability

### Contact Button
- Circular shape (48rem x 48rem)
- Red gradient background
- Pulsing border animation
- Text: "Napište mi" + "Volné kapacity"
- Positioned on the right (desktop)

### Links
- Facebook
- Instagram
- Back to top (↑ icon)
- Privacy policy
- Terms of service

### Modal
- Triggered by contact button or "Otevřít formulář"
- Overlay with contact info and form access
- Close button (×)

---

## ContactForm

**File**: `src/components/ContactForm.tsx`

### Features
- Modal form component
- Multiple input types
- Service selection checkboxes
- File upload capability
- Submit status feedback
- Supabase integration ready
- Smooth animations

### Props
```typescript
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
```

### Form Fields
1. **Name** - Text input (required)
2. **Email** - Email input (required)
3. **Phone** - Tel input with country code selector (required)
4. **Services** - 5 checkboxes:
   - Webová stránka
   - E-shop
   - Marketingová kampaň
   - Správa webu
   - Optimalizace
5. **Message** - Textarea (required)
6. **File** - Optional file upload

### Country Codes
- +420 (Czechia)
- +421 (Slovakia)
- +43 (Austria)
- +49 (Germany)
- +33 (France)

### States
- Idle: Default state
- Submitting: Loading state with disabled button
- Success: Green message with auto-close
- Error: Red error message

### Styling
- Dark background (bg-gray-950)
- Form inputs: White/5 background with white border on focus
- Submit button: Red background with hover effect
- Modal: Smooth scale and fade animations

### Integration
- Ready for Supabase connection via `@/lib/supabase`
- Simulated 1-second API call
- Auto-closes on success after 2 seconds

---

## SideLabels

**File**: `src/components/SideLabels.tsx`

### Features
- Fixed side labels for branding
- Desktop and mobile versions
- Animated scroll indicator
- Clipboard icon for contact
- Responsive visibility

### Desktop Layout
- **Left**: "KONTAKT" label with clipboard icon
  - Fixed position: left-8, top-1/2
  - Vertical orientation
  - Hover effects

- **Right**: "SCROLL" label with line and dot
  - Fixed position: right-8, top-1/2
  - Vertical line (6px height)
  - Dot indicator below

### Mobile Layout
- "SCROLL" label positioned at bottom center
- Animated bouncing dot
- Smaller text size

### Styling
- Text color: White/60 opacity
- Hover: Transitions to red
- Icons: SVG or text-based
- Font: Small (text-xs), bold, letter-spacing

### Animations
- Bounce animation on scroll indicator
- Duration: Infinite loop
- Opacity and position changes

---

## Usage Example

```typescript
import {
  Header,
  Hero,
  Testimonials,
  Services,
  References,
  AboutMe,
  Footer,
  ContactForm,
  SideLabels,
} from '@/components';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <main>
      <Header />
      <SideLabels />
      <Hero />
      <Testimonials />
      <Services />
      <References />
      <AboutMe />
      <Footer />
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </main>
  );
}
```

---

## Styling System

### Color Palette
- **Primary Dark**: #0a0a0a (background)
- **Secondary Dark**: #111111 (cards)
- **Accent Red**: #ED0D32 (buttons, highlights)
- **White**: #FFFFFF (text)
- **White with opacity**: #FFFFFF with 60%, 40%, 20%

### Typography
- **Font Family**: Inter (sans-serif)
- **Font Weights**: 400, 600, 700, 900
- **Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl

### Spacing
- Uses Tailwind's standard spacing scale
- Padding and margins in increments of 0.25rem

### Responsive Classes
- `md:` - Tablets and up (768px+)
- `lg:` - Desktops and up (1024px+)
- `hidden md:flex` - Hide on mobile, show on tablet+

### Transitions
- Default: `transition` (150ms)
- Custom durations: `duration-300`, `duration-500`
- Easing: `ease`, `ease-in`, `ease-out`, `ease-in-out`

---

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (webkit prefixes included)
- Mobile browsers: Full support with responsive design

---

## Performance Notes

1. **Images**: Use Next.js Image component for optimization
2. **Animations**: Framer Motion handles GPU acceleration
3. **CSS**: Tailwind purges unused styles in production
4. **Code Splitting**: Next.js automatic with app router
5. **Lazy Loading**: Images load on-demand

---

## Accessibility

- Semantic HTML elements used throughout
- ARIA labels on interactive elements
- Focus states on buttons and links
- Color contrast ratios meet WCAG AA standards
- Form labels properly associated with inputs

---

End of Components Overview
