import { Page } from '../../components/layout'
import { SEO } from '../../components/SEO'
import { Hero, Services, About as AboutSection, Testimonials, CTA, Contact } from '../../components/sections'
import { Stats, ClientLogos } from '../../components/trust'
import { siteConfig } from '../../config/site.config'

/**
 * One-page business site template
 * All content on a single scrollable page
 */
export const OnePage = () => {
  return (
    <Page>
      <SEO
        title="Home"
        description={siteConfig.company.name}
        keywords={['business', 'services', 'company']}
      />
      <Hero />
      <Stats />
      <Services />
      <AboutSection />
      <ClientLogos />
      <Testimonials />
      <CTA />
      <Contact />
    </Page>
  )
}
