import { siteConfig } from '../../config/site.config'
import { Section, SectionHeader, Grid } from '../layout'
import './About.css'

interface AboutProps {
  title?: string
  subtitle?: string
  content?: string | string[]
  image?: string
  showStats?: boolean
  stats?: Array<{ value: string; label: string; icon?: string }>
}

/**
 * About section component
 * Displays company information and optional statistics
 */
export const About = ({
  title = 'About Us',
  subtitle,
  content,
  image,
  showStats = false,
  stats,
}: AboutProps) => {
  const aboutContent = content || [
    'Replace this with information about your company, mission, and values.',
    'Add more paragraphs to tell your story and connect with visitors.',
  ]

  const contentArray = Array.isArray(aboutContent) ? aboutContent : [aboutContent]

  return (
    <Section id="about" padding="xl">
      <SectionHeader 
        title={title} 
        subtitle={subtitle || `Learn more about ${siteConfig.company.name}`}
      />
      <div className="about-content">
        {image && (
          <div className="about-image">
            <img src={image} alt={title} />
          </div>
        )}
        <div className="about-text">
          {contentArray.map((paragraph, index) => (
            <p key={index} className="about-paragraph">{paragraph}</p>
          ))}
        </div>
      </div>
      {showStats && stats && stats.length > 0 && (
        <div className="about-stats">
          <Grid columns={{ sm: 2, md: 3, lg: stats.length }} gap="lg">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-item">
                {stat.icon && <div className="stat-icon">{stat.icon}</div>}
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </Grid>
        </div>
      )}
    </Section>
  )
}
