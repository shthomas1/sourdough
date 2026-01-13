import { Page } from '../components/layout'
import { SEO } from '../components/SEO'
import { Hero, Services, About as AboutSection, Testimonials, CTA, Map } from '../components/sections'
import { Stats, ClientLogos } from '../components/trust'
import { siteConfig } from '../config/site.config'

/**
 * Home page using section components
 * Replace this with a template from src/pages/templates if preferred
 */
const Home = () => {
  return (
    <Page>
      <SEO
        title="Home"
        description={`Welcome to ${siteConfig.company.name}`}
      />
      <Hero />
      <Stats />
      <Services />
      <Map />
      <AboutSection />
      <ClientLogos />
      <Testimonials />
      <CTA />
    </Page>
  )
}

export default Home
