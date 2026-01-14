# Sourdough Starter

> A production-ready TypeScript React starter template for building professional business websites in under 30 minutes.

**Sourdough Starter** is the official starter template for all tools developed by the Sourdough community. This template makes it trivial to build, customize, and deploy professional business websites. Edit one config file, deploy, and you're done. No design skills required.

## Thank You, Contributors!

This starter template is built and maintained by the Sourdough community. Thank you to all contributors who have helped make this project better. Your contributions make it possible for developers to build professional websites quickly and easily.

If you're a Sourdough contributor, this starter is designed to be the foundation for all Sourdough tools and projects. Feel free to extend it, customize it, and make it your own!

## Features

- **React 18 + TypeScript** - Type-safe, modern development
- **Config-Driven Content** - Edit `site.config.ts`, not JSX
- **Section Components** - Hero, Services, About, Testimonials, CTA, Contact, Footer
- **Theme System** - Light/dark mode with easy customization
- **Contact Forms** - Zod validation + multiple providers (EmailJS, Resend, Formspree, Netlify, API)
- **SEO Ready** - Automatic meta tags, sitemap, robots.txt
- **Layout Primitives** - Page, Section, Grid components for consistent structure
- **Trust Signals** - Testimonials, client logos, stats, certifications
- **Mobile-First** - Responsive by default
- **Accessible** - Semantic HTML, ARIA labels, keyboard navigation
- **Full-Stack** - Express server with API endpoints
- **Page Templates** - One-page, multi-page, and portfolio variants

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd sourdough
npm install
```

### 2. Run Setup Script (Optional)

```bash
npm run setup
```

This interactive script will:
- Ask for your site name and email
- Choose a template (one-page, multi-page, portfolio)
- Update `site.config.ts` automatically

### 3. Customize Content

Edit **one file** to customize your entire site:

```typescript
// src/config/site.config.ts
export const siteConfig: SiteConfig = {
  company: {
    name: 'Your Company Name',  // ← Change this
    email: 'hello@example.com',  // ← And this
    // ... rest of config
  },
  // ... customize services, testimonials, etc.
}
```

### 4. Run Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173` (frontend) and `http://localhost:3001` (API)

### 5. Build & Deploy

```bash
npm run build
npm start
```

## 📖 How to Change Content (Without Touching JSX)

**Everything** is controlled by `src/config/site.config.ts`. You never need to edit JSX files.

### Company Information

```typescript
company: {
  name: 'Acme Corp',
  email: 'contact@acme.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
}
```

### Navigation

```typescript
navigation: [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]
```

### Services

```typescript
services: [
  {
    id: 'service-1',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies.',
    icon: '💻',
    features: ['React', 'TypeScript', 'Node.js'],
  },
  // ... more services
]
```

### Testimonials

```typescript
testimonials: [
  {
    id: 'testimonial-1',
    name: 'John Doe',
    role: 'CEO',
    company: 'Example Corp',
    content: 'Amazing service! Highly recommended.',
    rating: 5,
  },
]
```

All sections automatically read from this config. Change the config, refresh the page, done.

## Customizing Theme

Edit `src/config/theme.config.ts` to change colors, fonts, spacing:

```typescript
export const themeConfig: ThemeConfig = {
  colors: {
    light: {
      primary: '#b89d7a',      // ← Your brand color
      background: '#f5f1e8',   // ← Background
      text: '#3d2e1f',         // ← Text color
      // ... more colors
    },
    dark: {
      // Dark mode colors
    },
  },
  fonts: {
    heading: 'Your Font, sans-serif',
    body: 'Your Font, sans-serif',
  },
  // ... spacing, border radius
}
```

The theme system automatically:
- Generates CSS variables
- Applies to all components
- Supports light/dark toggle (button in navigation)

## Contact Form Configuration

The contact form supports multiple providers. Configure in `src/pages/Contact.tsx`:

### Option 1: API (Default - uses your Express server)

```typescript
<Contact
  formProvider="api"
  formProviderConfig={{
    api: {
      endpoint: '/api/contacts',
      table: 'contacts',
    },
  }}
/>
```

### Option 2: Formspree (No backend needed)

```typescript
<Contact
  formProvider="formspree"
  formProviderConfig={{
    formspree: {
      formId: 'your-form-id',
    },
  }}
/>
```

### Option 3: Netlify Forms

```typescript
<Contact
  formProvider="netlify"
  formProviderConfig={{
    netlify: {
      formName: 'contact',
    },
  }}
/>
```

### Option 4: EmailJS

```typescript
<Contact
  formProvider="emailjs"
  formProviderConfig={{
    emailjs: {
      serviceId: 'your-service-id',
      templateId: 'your-template-id',
      publicKey: 'your-public-key',
    },
  }}
/>
```

**Note**: Install `@emailjs/browser` for EmailJS support.

## Page Templates

Three pre-built templates are available in `src/pages/templates/`:

### One-Page Template

All content on a single scrollable page:
- Hero
- Stats
- Services
- About
- Client Logos
- Testimonials
- CTA
- Contact

### Multi-Page Template

Content split across pages:
- **Home**: Hero, Stats, Services, Testimonials, CTA
- **About**: About section, Stats, Testimonials
- **Services**: Services grid, CTA
- **Contact**: Contact form

### Portfolio Template

Showcase work/projects:
- Hero
- About
- Stats
- Portfolio grid
- Client Logos
- Testimonials
- CTA
- Contact

To use a template, import and use in your routes:

```typescript
import { OnePage } from './pages/templates'

// In App.tsx
<Route path="/" element={<OnePage />} />
```

## SEO Configuration

### Automatic Meta Tags

Use the `<SEO>` component on any page:

```typescript
import { SEO } from '../components/SEO'

<SEO
  title="About Us"
  description="Learn more about our company"
  keywords={['business', 'services']}
  image="/og-image.png"
/>
```

### Generate Sitemap & Robots.txt

```bash
npm run generate:seo
```

Update `SITE_URL` in the script or set environment variable:

```bash
SITE_URL=https://yoursite.com npm run generate:seo
```

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

### Traditional Hosting

1. Run `npm run build`
2. Upload `dist/` folder to your server
3. Configure server to serve `dist/index.html` for all routes
4. Set up API endpoints if using the Express server

### Environment Variables

Create a `.env` file:

```env
PORT=3001
DATABASE_URL=your-database-connection-string
NODE_ENV=production
SITE_URL=https://yoursite.com
```

## 📚 Project Structure

```
sourdough/
├── src/
│   ├── components/
│   │   ├── layout/          # Page, Section, Grid, SectionHeader
│   │   ├── sections/        # Hero, Services, About, etc.
│   │   ├── forms/           # ContactForm
│   │   ├── trust/            # Stats, ClientLogos, Certifications
│   │   └── ThemeToggle.tsx
│   ├── config/
│   │   ├── site.config.ts   # ← Edit this for content
│   │   └── theme.config.ts  # ← Edit this for styling
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── pages/
│   │   ├── templates/       # OnePage, MultiPage, Portfolio
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── utils/
│   │   ├── api.ts           # API client
│   │   └── seo.ts           # SEO utilities
│   └── App.tsx
├── server/
│   ├── routes/              # API routes
│   ├── utils/               # Database utilities
│   └── index.ts             # Express server
├── public/                  # Static assets
└── scripts/                 # Build scripts
```

## Guarantees

This project guarantees:

- **Mobile-First** - Responsive on all devices
- **Accessible** - WCAG compliant, semantic HTML
- **SEO-Ready** - Meta tags, sitemap, robots.txt
- **Production-Safe** - TypeScript, error handling, validation
- **Fast** - Optimized builds, lazy loading
- **Maintainable** - Clear structure, typed configs

## Available Scripts

- `npm run dev` - Start development servers (frontend + backend)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run setup` - Interactive setup wizard
- `npm run generate:seo` - Generate sitemap and robots.txt
- `npm run lint` - Run ESLint

## Component API

### Layout Components

```typescript
<Page>
  <Section padding="lg" variant="primary">
    <SectionHeader title="Title" subtitle="Subtitle" />
    <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
      {/* Content */}
    </Grid>
  </Section>
</Page>
```

### Section Components

All sections accept props to override config:

```typescript
<Hero
  title="Custom Title"
  subtitle="Custom subtitle"
  primaryButton={{ text: 'Get Started', href: '/contact' }}
/>

<Services
  services={customServices}
  title="Our Offerings"
/>

<About
  content="Custom about content"
  stats={customStats}
/>
```

## Common Customizations

### Add a New Section

1. Create component in `src/components/sections/`
2. Add to `site.config.ts` if needed
3. Use in your page template

### Change Colors

Edit `src/config/theme.config.ts` → `colors.light` or `colors.dark`

### Add Custom Pages

1. Create page in `src/pages/`
2. Add route in `src/App.tsx`
3. Add to navigation in `site.config.ts`

### Customize Contact Form Fields

```typescript
<ContactForm
  fields={{
    name: true,
    email: true,
    phone: true,      // ← Enable phone
    company: true,    // ← Enable company
    message: true,
  }}
/>
```

## Contributing to Sourdough

This starter template is part of the Sourdough ecosystem. We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or suggesting ideas, your help makes Sourdough better for everyone.

**Thank you to all Sourdough contributors** who have helped build and improve this starter template and the entire Sourdough toolset. Your dedication and contributions are what make this project possible.

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open-source and available for use in any project.

## Need Help?

- Check `SETUP.md` (generated by setup script)
- Review component files for inline documentation
- All config files have TypeScript types for autocomplete

---

**Built with 🍞 by the Sourdough team and community contributors**
