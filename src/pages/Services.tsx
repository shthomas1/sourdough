import { Page } from '../components/layout'
import { SEO } from '../components/SEO'
import { Services as ServicesSection } from '../components/sections'
import { siteConfig } from '../config/site.config'
import './Services.css'

/**
 * Services page using section components
 */
const Services = () => {
  return (
    <Page>
      <SEO
        title="Services"
        description={`Services offered by ${siteConfig.company.name}`}
      />
      <div className="services-page">
        <div className="page-header">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">
            Discover what we offer to help your business grow and succeed.
          </p>
        </div>
        <div className="page-content">
          <ServicesSection 
            title="What We Offer"
            subtitle="Comprehensive solutions tailored to your needs"
          />
        </div>
      </div>
    </Page>
  )
}

export default Services
