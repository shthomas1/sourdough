import { siteConfig } from '../config/site.config'

export interface SEOData {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: string[]
}

/**
 * Set page title and meta tags
 */
export const setPageSEO = (data: SEOData) => {
  const defaultTitle = siteConfig.company.name
  const defaultDescription = `Welcome to ${siteConfig.company.name}`
  const defaultUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const title = data.title 
    ? `${data.title} | ${defaultTitle}`
    : defaultTitle
  const description = data.description || defaultDescription
  const image = data.image || '/og-image.png'
  const url = data.url || defaultUrl

  // Set document title
  if (typeof document !== 'undefined') {
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    if (data.keywords && data.keywords.length > 0) {
      updateMetaTag('keywords', data.keywords.join(', '))
    }

    // OpenGraph tags
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:image', image, 'property')
    updateMetaTag('og:url', url, 'property')
    updateMetaTag('og:type', data.type || 'website', 'property')
    updateMetaTag('og:site_name', defaultTitle, 'property')

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

    // Additional tags
    updateMetaTag('author', defaultTitle)
  }
}

/**
 * Generate sitemap XML
 */
export const generateSitemap = (routes: string[], baseUrl: string): string => {
  const urls = routes.map(route => {
    const url = `${baseUrl}${route === '/' ? '' : route}`
    return `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

/**
 * Generate robots.txt
 */
export const generateRobotsTxt = (baseUrl: string, allowAll: boolean = true): string => {
  if (allowAll) {
    return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`
  }
  
  return `User-agent: *
Disallow: /

Sitemap: ${baseUrl}/sitemap.xml`
}

/**
 * React hook for SEO
 */
export const useSEO = (data: SEOData) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useEffect } = require('react')
    useEffect(() => {
      setPageSEO(data)
    }, [data.title, data.description, data.image, data.url])
  }
}
