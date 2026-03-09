# Complete File Structure

This document lists all files created for the LEDU Clone project.

## Directory Tree

```
ledu-clone/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata and styling
│   │   ├── page.tsx                # Home page - main content entry point
│   │   └── globals.css             # Global CSS with Tailwind imports
│   ├── components/
│   │   ├── Header.tsx              # Navigation header with logo
│   │   ├── Hero.tsx                # Hero section with animated text
│   │   ├── Testimonials.tsx        # Client testimonials carousel
│   │   ├── Services.tsx            # Service offerings with tab interface
│   │   ├── References.tsx          # Portfolio projects showcase
│   │   ├── AboutMe.tsx             # About section with FAQ accordion
│   │   ├── Footer.tsx              # Footer with contact CTA
│   │   ├── ContactForm.tsx         # Contact form modal component
│   │   ├── SideLabels.tsx          # Fixed side labels and indicators
│   │   └── index.ts                # Barrel export for all components
│   └── lib/
│       └── supabase.ts             # Supabase client setup and helpers
├── public/                         # Static assets directory (empty)
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── eslint.config.mjs               # ESLint main config (optional)
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration for Tailwind
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── README.md                       # Project overview and quick start
├── SETUP.md                        # Detailed setup and installation guide
├── COMPONENTS_OVERVIEW.md          # Detailed component documentation
├── FILE_STRUCTURE.md               # This file - directory structure
└── tailwind.config.ts              # Alternative Tailwind config (TypeScript)
```

## File Descriptions

### src/app/

#### layout.tsx (73 lines)
- **Purpose**: Root layout wrapper for all pages
- **Features**: Metadata setup, font imports from Google Fonts
- **Language**: TypeScript + React
- **Exports**: Default function RootLayout
- **Key Props**: children: React.ReactNode
- **Tailwind**: Body background and text color setup

#### page.tsx (47 lines)
- **Purpose**: Main home page content
- **Features**: Imports all components, manages contact form state
- **Language**: TypeScript + React (use client)
- **Exports**: Default function Home
- **State**: isContactFormOpen (boolean)
- **Components Used**: All 9 components in sequence

#### globals.css (68 lines)
- **Purpose**: Global styles and animations
- **Features**: 
  - Tailwind directives (@tailwind)
  - Scrollbar styling
  - Selection colors
  - Custom animations (@keyframes)
  - Text stroke effects
- **Language**: CSS with Tailwind
- **Custom Animations**: float (3s ease-in-out)

### src/components/

#### Header.tsx (135 lines)
- **Purpose**: Fixed navigation header
- **Features**: Logo with SVG, responsive menu, scroll detection
- **Language**: TypeScript + React (use client)
- **State**: isScrolled, isMenuOpen (booleans)
- **Dependencies**: next/link, Framer Motion
- **Responsive**: Hidden menu on desktop, hamburger on mobile
- **Tailwind Classes**: ~40+ for styling and layout

#### Hero.tsx (81 lines)
- **Purpose**: Full-screen hero section
- **Features**: 
  - Outline text with webkit-text-stroke
  - Rotating word animation (5 words)
  - Scroll indicator with animation
- **Language**: TypeScript + React (use client)
- **State**: wordIndex (number)
- **Dependencies**: Framer Motion (motion, AnimatePresence)
- **Animations**: 3s intervals for word rotation, 2s bounce for indicator
- **Content**: All Czech text hardcoded

#### Testimonials.tsx (125 lines)
- **Purpose**: Client testimonials carousel
- **Features**:
  - 3 testimonials with auto-play
  - Navigation dots and arrow buttons
  - Smooth fade and slide transitions
- **Language**: TypeScript + React (use client)
- **State**: currentIndex, isAutoPlay (numbers/booleans)
- **Dependencies**: Framer Motion (motion, AnimatePresence)
- **Data Structure**: Testimonial interface with 3 items
- **Animations**: Fade in/out with x-axis slide (100px)

#### Services.tsx (287 lines)
- **Purpose**: Service offerings with tabbed interface
- **Features**:
  - 5 service tabs with smooth transitions
  - Feature cards with descriptions
  - Illustration placeholders
  - Multiple service categories
- **Language**: TypeScript + React (use client)
- **State**: activeTab (string)
- **Dependencies**: Framer Motion (motion, AnimatePresence)
- **Data Structure**: Tab and features interfaces
- **Styling**: Red active tab, outline section header
- **Content**: All Czech text with detailed descriptions

#### References.tsx (196 lines)
- **Purpose**: Portfolio projects showcase
- **Features**:
  - 7 projects with alternating layout
  - Dark and red background alternation
  - Tag pills for project categories
  - Links to live websites
- **Language**: TypeScript + React
- **Data Structure**: Project interface with 7 items
- **Styling**: 
  - Dark projects: bg-gray-900
  - Red projects: bg-red-500
  - Image placeholders with gradients
- **Content**: All project descriptions in Czech
- **CTA Buttons**: Contact (red) and All References (outline)

#### AboutMe.tsx (167 lines)
- **Purpose**: About section with FAQ
- **Features**:
  - Two-column layout (photo + content)
  - Photo placeholder with gradient
  - 4-item FAQ accordion
  - Statistics section with blue highlights
- **Language**: TypeScript + React (use client)
- **State**: openIndex (number | null)
- **Dependencies**: Framer Motion (motion, AnimatePresence)
- **Data Structures**: FAQItem interface with 4 questions
- **Animations**: Accordion height/opacity transitions (0.2s)
- **Statistics**: 4 stats with blue highlighted numbers

#### Footer.tsx (128 lines)
- **Purpose**: Footer with contact integration
- **Features**:
  - Large heading section
  - Email display with outline text
  - Green active status indicator
  - Circular contact button (48rem x 48rem)
  - Social links and back-to-top
  - Contact modal integration
- **Language**: TypeScript + React (use client)
- **State**: isContactOpen (boolean)
- **Styling**: Red gradient button, pulse animations
- **Links**: Facebook, Instagram, Privacy, Terms
- **Content**: All Czech text

#### ContactForm.tsx (198 lines)
- **Purpose**: Contact form modal component
- **Features**:
  - 6 form fields (name, email, phone with country code, services, message, file)
  - 5 service checkboxes
  - File upload capability
  - Status feedback (success/error)
  - Supabase integration ready
- **Language**: TypeScript + React (use client)
- **Props**: isOpen (boolean), onClose (function)
- **State**: formData, isSubmitting, submitStatus
- **Form Data Structure**: ContactFormData interface
- **Dependencies**: Framer Motion (motion, AnimatePresence)
- **Country Codes**: 5 options (CZ, SK, AT, DE, FR)
- **Animations**: Modal scale/fade on open/close
- **Content**: All Czech text, auto-close on success

#### SideLabels.tsx (66 lines)
- **Purpose**: Fixed side labels and scroll indicator
- **Features**:
  - Desktop left label: "KONTAKT"
  - Desktop right label: "SCROLL"
  - Mobile bottom scroll indicator
  - Animated scroll indicator
- **Language**: TypeScript + React
- **Dependencies**: SVG for clipboard icon
- **Responsive**: Hidden/shown based on md: breakpoint
- **Styling**: White/60 opacity, hover transitions to red
- **Animations**: Bouncing dot animation on mobile

#### index.ts (9 lines)
- **Purpose**: Barrel export for all components
- **Content**: Default exports from all 9 components
- **Usage**: Import from @/components instead of individual files

### src/lib/

#### supabase.ts (82 lines)
- **Purpose**: Supabase client setup and helper functions
- **Features**:
  - Supabase client initialization
  - saveContactSubmission() function
  - uploadContactFile() function
  - Error handling
- **Language**: TypeScript
- **Dependencies**: @supabase/supabase-js
- **Environment Variables**: 
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Exports**: supabase client, two async functions
- **Error Handling**: Try/catch with console.error logging

### Configuration Files

#### package.json (40 lines)
- **Dependencies**:
  - next (^14.0.0)
  - react (^18.2.0)
  - react-dom (^18.2.0)
  - framer-motion (^10.16.0)
  - @supabase/supabase-js (^2.38.0)
- **DevDependencies**: TypeScript, Tailwind CSS, PostCSS, Autoprefixer, ESLint
- **Scripts**: dev, build, start, lint, type-check
- **Type**: "module" (ES modules)

#### tsconfig.json (28 lines)
- **Target**: ES2020
- **Module**: ESNext
- **Lib**: ES2020, DOM, DOM.Iterable
- **JSX**: react-jsx
- **Path Aliases**: @/* -> ./src/*
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler

#### tailwind.config.js (16 lines)
- **Content**: src/**/*.{js,ts,jsx,tsx,mdx}
- **Theme Extensions**:
  - Custom colors (black, red)
  - Font family (Inter)
- **Plugins**: None (extensible)

#### next.config.js (7 lines)
- **ReactStrictMode**: true
- **SwcMinify**: true (SWC minification)

#### postcss.config.js (5 lines)
- **Plugins**: tailwindcss, autoprefixer

#### .eslintrc.json (9 lines)
- **Extends**: next/core-web-vitals
- **Rules**: Custom rules for Next.js and React Hooks

#### .gitignore (30 lines)
- **Next.js**: .next, out, build, dist
- **Node**: node_modules, .pnp
- **Environment**: .env, .env.local, etc.
- **IDE**: .vscode, .idea
- **OS**: .DS_Store, Thumbs.db, etc.

### Documentation Files

#### README.md (180+ lines)
- Project overview
- Features list
- Component descriptions
- Installation instructions
- Running and building
- Customization guide
- Browser support
- Supabase integration info

#### SETUP.md (250+ lines)
- Complete setup guide
- Prerequisites
- Quick start steps
- Environment setup
- Supabase database setup with SQL
- Project structure
- Customization instructions
- Build and deployment options
- Troubleshooting guide
- Useful commands reference

#### COMPONENTS_OVERVIEW.md (450+ lines)
- Detailed component documentation
- Features for each component
- Props and interfaces
- Content details
- Styling information
- Animation descriptions
- Usage examples
- Styling system guide
- Performance notes
- Accessibility information

#### FILE_STRUCTURE.md (This file)
- Directory tree
- File descriptions
- File sizes and line counts
- Key features
- Dependencies
- Content overview

## Component Statistics

| Component | Lines | Features | Dependencies |
|-----------|-------|----------|--------------|
| Header | 135 | Logo, Menu, Scroll detection | next/link, FM |
| Hero | 81 | Outline text, Word rotation, Animations | FM |
| Testimonials | 125 | Carousel, Navigation, Auto-play | FM |
| Services | 287 | Tabs, Features, Illustrations | FM |
| References | 196 | Projects, Alternating layout, Links | - |
| AboutMe | 167 | FAQ, Photo, Stats | FM |
| Footer | 128 | Contact, Modal, Links | - |
| ContactForm | 198 | Form, File upload, Validation | FM |
| SideLabels | 66 | Labels, Animations | - |

FM = Framer Motion

## Total Project Stats

- **Total Components**: 9 React components
- **Total Lines of Code**: ~1,400+ (components only)
- **Total Files**: 22+ (including config, docs)
- **TypeScript**: 100% typed
- **Tailwind Classes**: 300+ used throughout
- **Animations**: 10+ using Framer Motion
- **Responsive Breakpoints**: md (768px), lg (1024px)
- **Browser Support**: Chrome, Firefox, Safari, Mobile
- **Documentation Pages**: 4 comprehensive guides

## Key Technologies

1. **Framework**: Next.js 14
2. **UI Library**: React 18
3. **Language**: TypeScript
4. **Styling**: Tailwind CSS
5. **Animations**: Framer Motion
6. **Backend**: Supabase (optional)
7. **Fonts**: Google Fonts (Inter)

## Environment Variables Required

```env
# For Supabase integration (optional)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Installation Size

- **node_modules**: ~500MB (after npm install)
- **Source code**: ~200KB
- **Documentation**: ~100KB

## Getting Started

1. Navigate to project directory
2. Run: `npm install`
3. Run: `npm run dev`
4. Open: http://localhost:3000

---

Last updated: 2024
