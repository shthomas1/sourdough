import { Link } from 'react-router-dom'
import { siteConfig, CTA as CTAType } from '../../config/site.config'
import { Section } from '../layout'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './CTA.css'

interface CTAProps {
  cta?: CTAType
  title?: string
  description?: string
  primaryButton?: { text: string; href: string; external?: boolean }
  secondaryButton?: { text: string; href: string; external?: boolean }
}

/**
 * Call-to-action section component
 * Prominent CTA with primary and secondary buttons
 */
export const CTA = ({
  cta = siteConfig.ctas?.[0],
  title,
  description,
  primaryButton,
  secondaryButton,
}: CTAProps) => {
  const ctaTitle = title || cta?.title || 'Ready to Get Started?'
  const ctaDescription = description || cta?.description
  const primaryBtn = primaryButton || cta?.primaryButton
  const secondaryBtn = secondaryButton || cta?.secondaryButton

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px',
  })

  if (!primaryBtn) {
    return null
  }

  const Button = ({ button, isPrimary }: { button: { text: string; href: string; external?: boolean }, isPrimary: boolean }) => {
    const className = isPrimary ? 'cta-button cta-button-primary' : 'cta-button cta-button-secondary'
    
    if (button.external) {
      return (
        <a href={button.href} className={className} target="_blank" rel="noopener noreferrer">
          {button.text}
        </a>
      )
    }
    
    return (
      <Link to={button.href} className={className}>
        {button.text}
      </Link>
    )
  }

  return (
    <Section variant="primary" padding="xl" className="cta-section" ref={sectionRef}>
      <div className={`cta-content fade-in-up ${sectionVisible ? 'visible' : ''}`}>
        <h2 className="cta-title">{ctaTitle}</h2>
        {ctaDescription && <p className="cta-description">{ctaDescription}</p>}
        <div className="cta-buttons">
          <Button button={primaryBtn} isPrimary={true} />
          {secondaryBtn && <Button button={secondaryBtn} isPrimary={false} />}
        </div>
      </div>
    </Section>
  )
}
