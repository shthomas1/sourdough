import { Page } from '../components/layout'
import { SEO } from '../components/SEO'
import { About as AboutSection, Testimonials } from '../components/sections'
import { Stats } from '../components/trust'
import { siteConfig } from '../config/site.config'

/**
 * About page using section components
 */
const About = () => {
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

export default About
