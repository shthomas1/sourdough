import { writeFileSync } from 'fs'
import { join } from 'path'
import { generateSitemap, generateRobotsTxt } from '../src/utils/seo'

/**
 * Generate sitemap.xml and robots.txt files
 * Run this script during build: npm run generate:seo
 */

const baseUrl = process.env.SITE_URL || 'https://yoursite.com'
const routes = [
  '/',
  '/about',
  '/contact',
  '/services',
]

// Generate sitemap
const sitemap = generateSitemap(routes, baseUrl)
const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
writeFileSync(sitemapPath, sitemap, 'utf-8')
console.log('✅ Generated sitemap.xml')

// Generate robots.txt
const robots = generateRobotsTxt(baseUrl, true)
const robotsPath = join(process.cwd(), 'public', 'robots.txt')
writeFileSync(robotsPath, robots, 'utf-8')
console.log('✅ Generated robots.txt')
