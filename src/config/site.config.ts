/**
 * Global Site Configuration
 * 
 * This is the single source of truth for all website content.
 * Edit this file to customize your entire site without touching JSX.
 */

export interface CompanyInfo {
  name: string
  email: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
  location?: string // Simple string format alternative
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string // Emoji or icon identifier
  features?: string[]
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  avatar?: string // URL or emoji
  rating?: number // 1-5
}

export interface CTA {
  id: string
  title: string
  description?: string
  primaryButton: {
    text: string
    href: string
    external?: boolean
  }
  secondaryButton?: {
    text: string
    href: string
    external?: boolean
  }
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

export interface Stat {
  id: string
  value: string
  label: string
  icon?: string
}

export interface ClientLogo {
  id: string
  name: string
  logo?: string // URL or emoji
  url?: string
}

export interface Certification {
  id: string
  name: string
  issuer?: string
  icon?: string
  url?: string
}

export interface SiteConfig {
  company: CompanyInfo
  navigation: NavItem[]
  services?: Service[]
  testimonials?: Testimonial[]
  ctas?: CTA[]
  socialLinks?: SocialLink[]
  stats?: Stat[]
  clientLogos?: ClientLogo[]
  certifications?: Certification[]
  footer?: {
    copyright?: string
    links?: NavItem[]
  }
}

// Default configuration - Edit this to customize your site
export const siteConfig: SiteConfig = {
  company: {
    name: 'Davitas Sourdough Bread',
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    {
      id: 'service-1',
      title: 'Service One',
      description: 'Replace this with your first service description.',
      icon: '🥖',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      id: 'service-2',
      title: 'Service Two',
      description: 'Replace this with your second service description.',
      icon: '🌾',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      id: 'service-3',
      title: 'Service Three',
      description: 'Replace this with your third service description.',
      icon: '🔥',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      name: 'John Doe',
      role: 'CEO',
      company: 'Example Corp',
      content: 'Replace this with a real testimonial from a satisfied client.',
      rating: 5,
    },
    {
      id: 'testimonial-2',
      name: 'Jane Smith',
      role: 'Founder',
      company: 'Startup Inc',
      content: 'Replace this with another testimonial to build trust.',
      rating: 5,
    },
  ],
  ctas: [
    {
      id: 'cta-main',
      title: 'Ready to Get Started?',
      description: 'Replace this with your main call-to-action message.',
      primaryButton: {
        text: 'Contact Us',
        href: '/contact',
      },
      secondaryButton: {
        text: 'Learn More',
        href: '/about',
      },
    },
  ],
  socialLinks: [
    { platform: 'Twitter', url: 'https://twitter.com/yourhandle', icon: '🐦' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/yourcompany', icon: '💼' },
    { platform: 'GitHub', url: 'https://github.com/yourusername', icon: '💻' },
  ],
  stats: [
    { id: 'stat-1', value: '10+', label: 'Years Experience', icon: '📅' },
    { id: 'stat-2', value: '500+', label: 'Happy Clients', icon: '😊' },
    { id: 'stat-3', value: '1000+', label: 'Projects Completed', icon: '✅' },
  ],
  clientLogos: [
    { id: 'client-1', name: 'Client One' },
    { id: 'client-2', name: 'Client Two' },
    { id: 'client-3', name: 'Client Three' },
  ],
  certifications: [
    { id: 'cert-1', name: 'Certification Name', issuer: 'Issuing Organization' },
  ],
  footer: {
    copyright: `© ${new Date().getFullYear()} Davitas Sourdough Bread. All rights reserved.`,
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
}
