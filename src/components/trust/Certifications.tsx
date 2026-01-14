import { siteConfig, Certification } from '../../config/site.config'
import { Section, SectionHeader, Grid } from '../layout'
import './Certifications.css'

interface CertificationsProps {
  certifications?: Certification[]
  title?: string
  subtitle?: string
}

/**
 * Certifications component
 * Displays certifications and affiliations
 */
export const Certifications = ({
  certifications = siteConfig.certifications,
  title = 'Certifications & Affiliations',
  subtitle = 'Our credentials and partnerships',
}: CertificationsProps) => {
  if (!certifications || certifications.length === 0) {
    return null
  }

  return (
    <Section variant="muted" padding="lg" className="certifications-section">
      <SectionHeader title={title} subtitle={subtitle} />
      <Grid columns={{ sm: 1, md: 2, lg: certifications.length }} gap="md">
        {certifications.map((cert) => (
          <div key={cert.id} className="certification-item">
            {cert.icon && <div className="certification-icon">{cert.icon}</div>}
            <div className="certification-content">
              <h3 className="certification-name">{cert.name}</h3>
              {cert.issuer && (
                <p className="certification-issuer">{cert.issuer}</p>
              )}
            </div>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="certification-link"
                aria-label={`View ${cert.name} certification`}
              >
                &gt;
              </a>
            )}
          </div>
        ))}
      </Grid>
    </Section>
  )
}
