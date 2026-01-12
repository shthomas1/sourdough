# Quick Start Guide

Get your site up and running in 5 minutes.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Run Setup (Optional)

```bash
npm run setup
```

Answer the questions to auto-configure your site.

## Step 3: Edit Content

Open `src/config/site.config.ts` and update:

```typescript
company: {
  name: 'Your Company',  // ← Change this
  email: 'your@email.com', // ← And this
}
```

## Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Step 5: Customize

### Change Colors

Edit `src/config/theme.config.ts`:

```typescript
colors: {
  light: {
    primary: '#your-color', // ← Your brand color
  }
}
```

### Add Services

Edit `src/config/site.config.ts`:

```typescript
services: [
  {
    id: 'service-1',
    title: 'Your Service',
    description: 'Service description',
    icon: '🎯',
  },
]
```

### Add Testimonials

```typescript
testimonials: [
  {
    id: 'test-1',
    name: 'Client Name',
    content: 'Great service!',
    rating: 5,
  },
]
```

## Step 6: Deploy

### Vercel/Netlify

1. Push to GitHub
2. Import project
3. Build command: `npm run build`
4. Deploy!

### Manual

```bash
npm run build
npm start
```

## That's It! 🎉

Your site is ready. All content is in `site.config.ts`. No JSX editing needed.

## Need More Help?

- See `README.md` for full documentation
- Check component files for inline docs
- All configs have TypeScript autocomplete
