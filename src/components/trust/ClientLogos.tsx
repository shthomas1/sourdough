import { siteConfig, ClientLogo } from '../../config/site.config'
import { Section, SectionHeader, Grid } from '../layout'
import './ClientLogos.css'

interface ClientLogosProps {
  logos?: ClientLogo[]
  title?: string
  subtitle?: string
}

/**
 * Client logos component
 * Displays client/partner logos in a grid
 */
export const ClientLogos = ({
  logos = siteConfig.clientLogos,
  title = 'Trusted By',
  subtitle = 'Companies we work with',
}: ClientLogosProps) => {
  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <Section variant="muted" padding="lg" className="client-logos-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <Grid columns={{ sm: 2, md: 3, lg: logos.length }} gap="lg">
        {logos.map((logo) => (
          <div key={logo.id} className="client-logo-item">
            {logo.url ? (
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="client-logo-link"
              >
                {logo.logo ? (
                  <img src={logo.logo} alt={logo.name} className="client-logo-image" />
                ) : (
                  <div className="client-logo-placeholder">{logo.name}</div>
                )}
              </a>
            ) : (
              <>
                {logo.logo ? (
                  <img src={logo.logo} alt={logo.name} className="client-logo-image" />
                ) : (
                  <div className="client-logo-placeholder">{logo.name}</div>
                )}
              </>
            )}
          </div>
        ))}
      </Grid>
    </Section>
  )
}
