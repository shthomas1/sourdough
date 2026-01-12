import { Page } from '../../components/layout'
import { SEO } from '../../components/SEO'
import { Hero, Services, About as AboutSection, Testimonials, CTA } from '../../components/sections'
import { Stats, ClientLogos } from '../../components/trust'
import { siteConfig } from '../../config/site.config'

/**
 * Multi-page template - Home page
 * Landing page with key sections
 */
export const MultiPageHome = () => {
  return (
    <Page>
      <SEO
        title="Home"
        description={`Welcome to ${siteConfig.company.name}`}
      />
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <ClientLogos />
      <CTA />
    </Page>
  )
}

/**
 * Multi-page template - About page
 */
export const MultiPageAbout = () => {
  return (
    <Page>
      <SEO
        title="About"
        description={`Learn more about ${siteConfig.company.name}`}
      />
      <AboutSection />
      <Stats />
      <Testimonials />
    </Page>
  )
}

/**
 * Multi-page template - Services page
 */
export const MultiPageServices = () => {
  return (
    <Page>
      <SEO
        title="Services"
        description={`Services offered by ${siteConfig.company.name}`}
      />
      <Services />
      <CTA />
    </Page>
  )
}
