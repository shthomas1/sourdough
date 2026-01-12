import { siteConfig, Service } from '../../config/site.config'
import { Section, SectionHeader, Grid } from '../layout'
import './Services.css'

interface ServicesProps {
  services?: Service[]
  title?: string
  subtitle?: string
}

/**
 * Services section component
 * Displays service cards in a grid layout
 */
export const Services = ({ 
  services = siteConfig.services,
  title = 'Our Services',
  subtitle = 'What we offer to help your business grow.'
}: ServicesProps) => {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <Section id="services" padding="xl">
      <SectionHeader title={title} subtitle={subtitle} />
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {service.icon && <div className="service-icon">{service.icon}</div>}
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            {service.features && service.features.length > 0 && (
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Grid>
    </Section>
  )
}
