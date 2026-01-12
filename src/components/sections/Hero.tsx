import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site.config'
import { Section } from '../layout/Section'
import './Hero.css'

interface HeroProps {
  title?: string
  subtitle?: string
  primaryButton?: {
    text: string
    href: string
    external?: boolean
  }
  secondaryButton?: {
    text: string
    href: string
    external?: boolean
  }
  backgroundImage?: string
}

/**
 * Hero section component
 * Displays main headline and call-to-action buttons
 */
export const Hero = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  backgroundImage,
}: HeroProps) => {
  // Use props or fall back to config
  const heroTitle = title || `Welcome to ${siteConfig.company.name}`
  const heroSubtitle = subtitle || 'Replace this with your compelling value proposition.'
  const primaryBtn = primaryButton || siteConfig.ctas?.[0]?.primaryButton
  const secondaryBtn = secondaryButton || siteConfig.ctas?.[0]?.secondaryButton

  const Button = ({ button, isPrimary }: { button: { text: string; href: string; external?: boolean }, isPrimary: boolean }) => {
    const className = isPrimary ? 'hero-button hero-button-primary' : 'hero-button hero-button-secondary'
    
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
    <Section 
      variant="primary" 
      padding="xl"
      className="hero-section"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="hero-content">
        <h1 className="hero-title">{heroTitle}</h1>
        <p className="hero-subtitle">{heroSubtitle}</p>
        <div className="hero-buttons">
          {primaryBtn && <Button button={primaryBtn} isPrimary={true} />}
          {secondaryBtn && <Button button={secondaryBtn} isPrimary={false} />}
        </div>
      </div>
    </Section>
  )
}
