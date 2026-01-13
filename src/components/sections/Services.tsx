import { siteConfig, Service } from '../../config/site.config'
import { Section, SectionHeader, Grid } from '../layout'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
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
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
  })

  if (!services || services.length === 0) {
    return null
  }

  return (
    <Section id="services" padding="xl" ref={sectionRef}>
      <SectionHeader title={title} subtitle={subtitle} />
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
        {services.map((service, index) => {
          const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({
            threshold: 0.1,
            rootMargin: '0px',
            delay: index * 100, // Stagger animation
          })

          return (
            <div
              key={service.id}
              ref={cardRef}
              className={`service-card fade-in-up ${cardVisible ? 'visible' : ''} stagger-${Math.min(index + 1, 6)}`}
            >
              {service.icon && <div className="service-icon">{service.icon}</div>}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              {service.features && service.features.length > 0 && (
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </Grid>
    </Section>
  )
}
