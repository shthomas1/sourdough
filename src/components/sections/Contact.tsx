import { Section } from '../layout'
import { ContactForm } from '../forms/ContactForm'
import { siteConfig } from '../../config/site.config'

interface ContactProps {
  title?: string
  subtitle?: string
  formProvider?: 'emailjs' | 'resend' | 'formspree' | 'netlify' | 'api' | 'none'
  formProviderConfig?: {
    emailjs?: { serviceId: string; templateId: string; publicKey: string }
    resend?: { apiKey: string; to: string }
    formspree?: { formId: string }
    netlify?: { formName: string }
    api?: { endpoint: string; table?: string }
  }
}

/**
 * Contact section component
 * Wraps ContactForm in a section with optional company info
 */
export const Contact = ({
  title = 'Contact Us',
  subtitle,
  formProvider = 'api',
  formProviderConfig,
}: ContactProps) => {
  const defaultSubtitle = subtitle || `Get in touch with ${siteConfig.company.name}. We'd love to hear from you.`

  return (
    <Section id="contact" padding="xl">
      <div className="contact-section-content">
        <div className="contact-info">
          <h2 className="contact-section-title">{title}</h2>
          <p className="contact-section-subtitle">{defaultSubtitle}</p>
          
          {siteConfig.company.email && (
            <div className="contact-detail">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a>
            </div>
          )}
          
          {siteConfig.company.phone && (
            <div className="contact-detail">
              <strong>Phone:</strong>{' '}
              <a href={`tel:${siteConfig.company.phone}`}>{siteConfig.company.phone}</a>
            </div>
          )}
          
          {siteConfig.company.location && (
            <div className="contact-detail">
              <strong>Location:</strong> {siteConfig.company.location}
            </div>
          )}
        </div>
        
        <ContactForm
          provider={formProvider}
          providerConfig={formProviderConfig}
          title=""
          subtitle=""
        />
      </div>
    </Section>
  )
}
